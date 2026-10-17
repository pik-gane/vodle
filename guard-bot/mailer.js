/**
 * Sending email for the guard bot (notifier.js): an SMTP server given by
 * environment variables, through nodemailer. Without SMTP_HOST there is no
 * mailer and email notifications are off; the app then offers none.
 *
 *   SMTP_HOST, SMTP_PORT (587), SMTP_SECURE ("true" for implicit TLS, as on
 *   port 465; otherwise STARTTLS when the server offers it), SMTP_USER,
 *   SMTP_PASSWORD, MAIL_FROM (e.g. "vodle <noreply@example.org>")
 *
 * nodemailer is loaded only when a server is configured, so that the bot
 * runs without it (the test harness starts it from the repository's
 * node_modules).
 */

export async function createMailer(env = process.env) {
  if (!env.SMTP_HOST) return null;
  const { default: nodemailer } = await import("nodemailer");
  const port = parseInt(env.SMTP_PORT || "587", 10);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: (env.SMTP_SECURE || (port === 465 ? "true" : "false")) === "true",
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD || "" } : undefined,
  });
  const from = env.MAIL_FROM || `vodle <noreply@${env.SMTP_HOST}>`;
  return {
    async send({ to, subject, text }) {
      await transport.sendMail({ from, to, subject, text });
    },
  };
}
