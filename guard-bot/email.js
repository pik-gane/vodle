/**
 * Email notifications sent by the guard bot: the pure parts.
 *
 * A person can have vodle's notifications (a poll closes soon, it has closed,
 * new options, a delegation request was answered) sent to an email address
 * as well as shown on their devices. The app and this bot arrange it over
 * the request channel (requests.js):
 *
 *   1. email_send_code {email, language}: the bot sends a code to the
 *      address. The text of that email is fixed here, not the app's: anybody
 *      can ask for a code to any address, so the bot must not carry other
 *      text there, and it limits how many codes it sends (RateLimiter).
 *   2. email_confirm {email, code}: a right code proves the address; the
 *      answer carries a token, HMAC(secret, address), with which the app
 *      subscribes. Codes and tokens are derived from a secret rather than
 *      stored, so they survive a restart of the bot.
 *   3. email_subscribe {poll_id, email, token, types, ...}: sent by the
 *      person's account in that poll (the one that is a member of the poll
 *      room), so that the bot links an address to a poll only where its
 *      owner asked for it. The texts of the emails come with it, in the
 *      person's language and with the poll's title only if they chose to
 *      have titles in emails (the bot cannot read titles: they are encrypted
 *      with the poll password). The bot fills in the deadline, the link and
 *      the number of new options.
 *   4. email_unsubscribe {poll_id} and email_forget {email, token}: one
 *      poll, or every poll of an address.
 *
 * What the bot learns is the address and which polls it is subscribed for;
 * a delegation's answer stays encrypted, so the email says only that the
 * request was answered. Subscriptions are dropped once their poll is closed.
 */
import crypto from "node:crypto";

/** the bot's own room account data in a poll room, holding its subscriptions */
export const EMAIL_ACCOUNT_DATA_TYPE = "org.vodle.email_notifications";
/** what one can be notified of by email (the app's classes, see settings.service.ts) */
export const EMAIL_TYPES = ["closing_soon", "closed", "new_option", "delegation_answered"];
/** the share of a poll's running time before its deadline at which "closes soon"
 *  is sent; the app's own notification uses the same (SettingsService.closing_soon_fraction) */
export const CLOSING_SOON_FRACTION = 1 / 7;
/** a code is valid in the window it was made in and the next one */
export const CODE_WINDOW_MS = 15 * 60 * 1000;
export const LANGUAGES = ["en", "de", "es", "fi", "hi", "it", "ko", "pl", "ta", "zh"];

const EMAIL_RE = /^[^\s@<>()",;:\\[\]]{1,64}@[^\s@<>()",;:\\[\]]+\.[^\s@<>()",;:\\[\]]{2,}$/;

/** the address as compared and stored: trimmed, lower case */
export function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function isEmail(email) {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

/** the token that proves an address was confirmed (32 hex digits) */
export function emailToken(secret, email) {
  return crypto.createHmac("sha256", secret).update("vodle-email-token:" + normalizeEmail(email)).digest("hex").slice(0, 32);
}

export function isValidToken(secret, email, token) {
  if (typeof token !== "string" || token.length !== 32) return false;
  const expected = Buffer.from(emailToken(secret, email));
  const given = Buffer.from(token);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

/** the six-digit code for an address in the time window of `now` */
export function emailCode(secret, email, now, windowMs = CODE_WINDOW_MS) {
  const window = Math.floor(now / windowMs);
  const mac = crypto.createHmac("sha256", secret).update(`vodle-email-code:${normalizeEmail(email)}:${window}`).digest();
  return String(mac.readUInt32BE(0) % 1000000).padStart(6, "0");
}

/** whether `code` is the address's code of this window or the previous one */
export function isValidCode(secret, email, code, now, windowMs = CODE_WINDOW_MS) {
  if (typeof code !== "string" || !/^\d{6}$/.test(code)) return false;
  return code === emailCode(secret, email, now, windowMs) || code === emailCode(secret, email, now - windowMs, windowMs);
}

/** when "closes soon" is due for a poll that started at startMs and ends at dueMs */
export function closingSoonAt(dueMs, startMs) {
  return dueMs - CLOSING_SOON_FRACTION * Math.max(0, dueMs - startMs);
}

/** a template's {{name}} replaced by values[name]; unknown names stay */
export function render(template, values) {
  return String(template).replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (all, name) => (name in values ? String(values[name]) : all));
}

/** a deadline as people read it, in their language and time zone, with the zone named */
export function formatDue(dueMs, language, timeZone) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short" };
  try {
    return new Date(dueMs).toLocaleString(language || "en", { ...options, timeZone: timeZone || "UTC" });
  } catch (e) {
    return new Date(dueMs).toLocaleString("en", { ...options, timeZone: "UTC" });
  }
}

export function isTimeZone(zone) {
  if (typeof zone !== "string" || zone.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: zone });
    return true;
  } catch (e) {
    return false;
  }
}

/** one line for an email header: no line breaks, at most 200 characters */
export function headerLine(text) {
  return String(text).replace(/[\r\n\t]+/g, " ").trim().slice(0, 200);
}

const LANGUAGE_RE = /^[a-z]{2}(-[A-Za-z]{2,4})?$/;
const TEXT_MAX = 2000, SUBJECT_MAX = 200, TITLE_MAX = 300;

function cleanLanguage(language) {
  return typeof language === "string" && LANGUAGE_RE.test(language) ? language : "en";
}

function isText(value, max) {
  return typeof value === "string" && value.length > 0 && value.length <= max && !/[\u0000-\u0008\u000b-\u001f]/.test(value);
}

function isAppUrl(url) {
  if (typeof url !== "string" || url.length > 200) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || (parsed.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsed.hostname));
  } catch (e) {
    return false;
  }
}

/**
 * The email request in a request's content, validated, or null. Called by
 * requests.js parseRequest for the email kinds; `base` holds its request_id
 * and kind, `isPollId` checks a poll id as requests.js does.
 */
export function parseEmailRequest(content, base, isPollId) {
  const { kind } = base;
  if (kind === "email_send_code") {
    if (!isEmail(normalizeEmail(content.email))) return null;
    return { ...base, email: normalizeEmail(content.email), language: cleanLanguage(content.language) };
  }
  if (kind === "email_confirm") {
    if (!isEmail(normalizeEmail(content.email)) || typeof content.code !== "string" || !/^\d{6}$/.test(content.code)) return null;
    return { ...base, email: normalizeEmail(content.email), code: content.code };
  }
  if (kind === "email_forget") {
    if (!isEmail(normalizeEmail(content.email)) || typeof content.token !== "string") return null;
    return { ...base, email: normalizeEmail(content.email), token: content.token };
  }
  if (kind === "email_unsubscribe") {
    if (!isPollId(content.poll_id)) return null;
    return { ...base, poll_id: content.poll_id };
  }
  if (kind === "email_subscribe") {
    const { poll_id, email, token, types, texts, time_zone, app_url } = content;
    if (!isPollId(poll_id) || !isEmail(normalizeEmail(email)) || typeof token !== "string") return null;
    if (!Array.isArray(types) || types.length === 0 || types.length > EMAIL_TYPES.length
        || !types.every((t) => EMAIL_TYPES.includes(t)) || new Set(types).size !== types.length) return null;
    if (!texts || typeof texts !== "object") return null;
    const cleanTexts = {};
    for (const type of types) {
      const t = texts[type];
      if (!t || !isText(t.subject, SUBJECT_MAX) || !isText(t.body, TEXT_MAX)) return null;
      cleanTexts[type] = { subject: t.subject, body: t.body };
    }
    if (!isTimeZone(time_zone) || !isAppUrl(app_url)) return null;
    if (content.title !== undefined && content.title !== null && !isText(content.title, TITLE_MAX)) return null;
    return {
      ...base, poll_id, email: normalizeEmail(email), token, types: [...types], texts: cleanTexts,
      language: cleanLanguage(content.language), time_zone, app_url,
      title: typeof content.title === "string" && content.title ? content.title : null,
    };
  }
  return null;
}

/**
 * What is due to be sent in a poll room, given the bot's stored state for it
 * (see EmailNotifier) and the poll's facts. Returns [{subscriber, type}] for
 * "closes soon" and "closed"; new options and delegation answers are
 * triggered by their events.
 */
export function dueTimedEmails(stored, { now, dueMs, startMs, closed }) {
  const due = [];
  for (const [subscriber, sub] of Object.entries(stored.subs || {})) {
    const sent = sub.sent || {};
    if (closed) {
      if (sub.types.includes("closed") && !sent.closed) due.push({ subscriber, type: "closed" });
    } else if (dueMs && sub.types.includes("closing_soon") && !sent.closing_soon) {
      const start = Number.isFinite(startMs) ? startMs : (sub.since || now);
      if (now >= closingSoonAt(dueMs, start) && now < dueMs) due.push({ subscriber, type: "closing_soon" });
    }
  }
  return due;
}

/** limits per key and window: allow(key) says whether one more is allowed now */
export class RateLimiter {
  constructor(max, windowMs) {
    this.max = max;
    this.windowMs = windowMs;
    this.hits = new Map();
  }
  allow(key, now = Date.now()) {
    const recent = (this.hits.get(key) || []).filter((t) => t > now - this.windowMs);
    if (recent.length >= this.max) {
      this.hits.set(key, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 10000) {
      for (const [k, v] of this.hits) {
        if (!v.some((t) => t > now - this.windowMs)) this.hits.delete(k);
      }
    }
    return true;
  }
}

// The texts this bot writes itself: the code email, which may go to any
// address, and the footer of every email. The notifications' own texts come
// from the app, translated there.
const TEXTS = {
  en: {
    code_subject: "Your vodle confirmation code: {{code}}",
    code_body: "Someone, probably you, asked vodle to send notifications to this email address.\n\nTo confirm, enter this code in vodle's settings within {{minutes}} minutes:\n\n    {{code}}\n\nIf it was not you, ignore this email; nothing will be sent to this address.",
    footer: "You receive this email because you asked vodle to notify you by email. To stop, switch the email notifications off in vodle's settings: {{settings_link}}",
  },
  de: {
    code_subject: "Dein vodle-Bestätigungscode: {{code}}",
    code_body: "Jemand, vermutlich du, hat vodle gebeten, Benachrichtigungen an diese E-Mail-Adresse zu senden.\n\nZur Bestätigung gib diesen Code innerhalb von {{minutes}} Minuten in den Einstellungen von vodle ein:\n\n    {{code}}\n\nWarst du es nicht, ignoriere diese E-Mail; an diese Adresse wird dann nichts gesendet.",
    footer: "Du erhältst diese E-Mail, weil du vodle um Benachrichtigungen per E-Mail gebeten hast. Um sie zu beenden, schalte die E-Mail-Benachrichtigungen in den Einstellungen von vodle aus: {{settings_link}}",
  },
  es: {
    code_subject: "Tu código de confirmación de vodle: {{code}}",
    code_body: "Alguien, probablemente tú, ha pedido a vodle que envíe notificaciones a esta dirección de correo.\n\nPara confirmarlo, introduce este código en los ajustes de vodle en los próximos {{minutes}} minutos:\n\n    {{code}}\n\nSi no has sido tú, ignora este correo; no se enviará nada a esta dirección.",
    footer: "Recibes este correo porque pediste a vodle que te avisara por correo electrónico. Para dejar de recibirlos, desactiva las notificaciones por correo en los ajustes de vodle: {{settings_link}}",
  },
  fi: {
    code_subject: "vodlen vahvistuskoodisi: {{code}}",
    code_body: "Joku, luultavasti sinä, pyysi vodlea lähettämään ilmoituksia tähän sähköpostiosoitteeseen.\n\nVahvista syöttämällä tämä koodi vodlen asetuksiin {{minutes}} minuutin kuluessa:\n\n    {{code}}\n\nJos se et ollut sinä, jätä tämä viesti huomiotta; tähän osoitteeseen ei lähetetä mitään.",
    footer: "Saat tämän viestin, koska pyysit vodlea ilmoittamaan sinulle sähköpostitse. Lopettaaksesi kytke sähköposti-ilmoitukset pois vodlen asetuksista: {{settings_link}}",
  },
  hi: {
    code_subject: "आपका vodle पुष्टि कोड: {{code}}",
    code_body: "किसी ने, शायद आपने, vodle से इस ईमेल पते पर सूचनाएँ भेजने को कहा है।\n\nपुष्टि करने के लिए {{minutes}} मिनट के भीतर vodle की सेटिंग्स में यह कोड दर्ज करें:\n\n    {{code}}\n\nयदि यह आप नहीं थे, तो इस ईमेल को अनदेखा करें; इस पते पर कुछ नहीं भेजा जाएगा।",
    footer: "आपको यह ईमेल इसलिए मिल रहा है क्योंकि आपने vodle से ईमेल द्वारा सूचित करने को कहा था। रोकने के लिए vodle की सेटिंग्स में ईमेल सूचनाएँ बंद करें: {{settings_link}}",
  },
  it: {
    code_subject: "Il tuo codice di conferma vodle: {{code}}",
    code_body: "Qualcuno, probabilmente tu, ha chiesto a vodle di inviare notifiche a questo indirizzo email.\n\nPer confermare, inserisci questo codice nelle impostazioni di vodle entro {{minutes}} minuti:\n\n    {{code}}\n\nSe non sei stato tu, ignora questa email; a questo indirizzo non verrà inviato nulla.",
    footer: "Ricevi questa email perché hai chiesto a vodle di avvisarti via email. Per smettere, disattiva le notifiche via email nelle impostazioni di vodle: {{settings_link}}",
  },
  ko: {
    code_subject: "vodle 확인 코드: {{code}}",
    code_body: "누군가(아마도 본인)가 vodle에 이 이메일 주소로 알림을 보내 달라고 요청했습니다.\n\n확인하려면 {{minutes}}분 안에 vodle 설정에 이 코드를 입력하세요:\n\n    {{code}}\n\n본인이 아니라면 이 이메일을 무시하세요. 이 주소로는 아무것도 발송되지 않습니다.",
    footer: "vodle에 이메일 알림을 요청하셨기 때문에 이 이메일을 받으셨습니다. 중지하려면 vodle 설정에서 이메일 알림을 끄세요: {{settings_link}}",
  },
  pl: {
    code_subject: "Twój kod potwierdzający vodle: {{code}}",
    code_body: "Ktoś, prawdopodobnie Ty, poprosił vodle o wysyłanie powiadomień na ten adres e-mail.\n\nAby potwierdzić, wpisz ten kod w ustawieniach vodle w ciągu {{minutes}} minut:\n\n    {{code}}\n\nJeśli to nie Ty, zignoruj tę wiadomość; na ten adres nic nie zostanie wysłane.",
    footer: "Otrzymujesz tę wiadomość, ponieważ poprosiłeś vodle o powiadomienia e-mailem. Aby je wyłączyć, wyłącz powiadomienia e-mail w ustawieniach vodle: {{settings_link}}",
  },
  ta: {
    code_subject: "உங்கள் vodle உறுதிப்படுத்தல் குறியீடு: {{code}}",
    code_body: "யாரோ ஒருவர், பெரும்பாலும் நீங்கள், இந்த மின்னஞ்சல் முகவரிக்கு அறிவிப்புகளை அனுப்ப vodle-இடம் கேட்டுள்ளார்.\n\nஉறுதிப்படுத்த, {{minutes}} நிமிடங்களுக்குள் vodle அமைப்புகளில் இந்தக் குறியீட்டை உள்ளிடவும்:\n\n    {{code}}\n\nஅது நீங்கள் இல்லையென்றால், இந்த மின்னஞ்சலைப் புறக்கணிக்கவும்; இந்த முகவரிக்கு எதுவும் அனுப்பப்படாது.",
    footer: "மின்னஞ்சல் மூலம் அறிவிக்க vodle-இடம் நீங்கள் கேட்டதால் இந்த மின்னஞ்சலைப் பெறுகிறீர்கள். நிறுத்த, vodle அமைப்புகளில் மின்னஞ்சல் அறிவிப்புகளை அணைக்கவும்: {{settings_link}}",
  },
  zh: {
    code_subject: "您的 vodle 确认码：{{code}}",
    code_body: "有人（很可能是您）请求 vodle 向此邮箱地址发送通知。\n\n如需确认，请在 {{minutes}} 分钟内在 vodle 的设置中输入此确认码：\n\n    {{code}}\n\n如果不是您本人，请忽略此邮件；我们不会向此地址发送任何内容。",
    footer: "您收到此邮件，是因为您请求 vodle 通过邮件通知您。如需停止，请在 vodle 的设置中关闭邮件通知：{{settings_link}}",
  },
};

function textsFor(language) {
  return TEXTS[String(language || "en").slice(0, 2)] || TEXTS.en;
}

/** the email with a confirmation code */
export function codeEmail(language, code, minutes, settingsLink) {
  const t = textsFor(language);
  const values = { code, minutes, settings_link: settingsLink };
  return { subject: headerLine(render(t.code_subject, values)), text: render(t.code_body, values) };
}

/** a notification email: the app's texts, filled in, with this bot's footer */
export function notificationEmail(sub, type, values) {
  const texts = sub.texts[type];
  const t = textsFor(sub.language);
  const filled = { ...values, title: sub.title || "" };
  return {
    subject: headerLine(render(texts.subject, filled)),
    text: render(texts.body, filled) + "\n\n-- \n" + render(t.footer, { settings_link: values.settings_link }),
  };
}
