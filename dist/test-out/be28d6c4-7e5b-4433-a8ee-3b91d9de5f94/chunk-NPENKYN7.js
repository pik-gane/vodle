import {
  Injectable,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/settings.service.ts
var SettingsService;
var init_settings_service = __esm({
  "src/app/settings.service.ts"() {
    init_tslib_es6();
    init_core();
    init_environment();
    SettingsService = class SettingsService2 {
      /** whether this device takes part with a guest account vodle created
       *  (#193); user data, so a second device of the guest knows it too */
      get use_guest() {
        return this.G.D.getu("guest") == "1";
      }
      set use_guest(value) {
        this.G.D.setu("guest", value ? "1" : "");
      }
      constructor() {
        this.notification_classes = [
          "delegation_accepted",
          "delegation_declined",
          "new_option",
          "poll_closing_soon",
          "poll_closed"
        ];
        this.closing_soon_fraction = 1 / 7;
        this.password_regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*";
        this.language_names = {
          de: "Deutsch",
          en: "English",
          es: "Espa\xF1ol",
          //    fr: 'Français',  // translation still incomplete
          hi: "\u0939\u093F\u0928\u094D\u0926\u0940",
          it: "Italiano",
          ko: "\uD55C\uAD6D\uC5B4",
          pl: "Polski",
          fi: "Suomi",
          ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
          zh: "\u4E2D\u6587",
          nn: "[JSON file keys]"
        };
        this.validation_messages = {
          email: [
            { type: "required", message: "validation.email-required" },
            { type: "email", message: "validation.email-valid" }
          ],
          password: [
            { type: "required", message: "validation.password-required" },
            { type: "minlength", message: "validation.password-length" },
            { type: "pattern", message: "validation.password-pattern" }
          ],
          passwords_match: [
            { message: "validation.passwords-match" }
          ]
        };
      }
      init(G) {
        this.G = G;
      }
      // properties:
      get consent() {
        return this.G.D.getu("consent") != "0";
      }
      set consent(value) {
        this.G.D.setu("consent", value ? "1" : "0");
      }
      get email() {
        return this.G.D.getu("email");
      }
      set email(value) {
        this.G.D.setu("email", value);
      }
      get password() {
        return this.G.D.getu("password");
      }
      set password(value) {
        this.G.D.setu("password", value);
      }
      get db() {
        return this.G.D.getu("db");
      }
      set db(value) {
        this.G.D.setu("db", value);
        this.compute_db_credentials();
      }
      get db_from_pid() {
        return this.G.D.getu("db_from_pid");
      }
      set db_from_pid(value) {
        this.G.D.setu("db_from_pid", value);
        this.compute_db_credentials();
      }
      get db_custom_server_url() {
        return this.G.D.getu("db_custom_server_url");
      }
      set db_custom_server_url(value) {
        this.G.D.setu("db_custom_server_url", value);
        this.compute_db_credentials();
      }
      get db_custom_password() {
        return this.G.D.getu("db_custom_password");
      }
      set db_custom_password(value) {
        this.G.D.setu("db_custom_password", value);
        this.compute_db_credentials();
      }
      get db_server_url() {
        return this.G.D.getu("db_server_url");
      }
      set db_server_url(value) {
        this.G.D.setu("db_server_url", value);
      }
      get db_password() {
        return this.G.D.getu("db_password");
      }
      set db_password(value) {
        this.G.D.setu("db_password", value);
      }
      /** the language the person has CHOSEN, which is synced with their account */
      get language() {
        return this.G.D.getu("language");
      }
      set language(value) {
        this.G.D.setu("language", value);
      }
      /** The language this device is showing right now.
       *
       *  The login page sets this one and not `language`, because before the user
       *  data has synced its value is a guess — the browser's language, or the
       *  answer to a question asked of someone the app cannot yet identify. The
       *  sync is local-wins, so writing that guess to `language` had it pushed
       *  over the preference the person's account already held, which is how a
       *  language survived everything except a logout (#327).
       *  DataService.ensure_user_defaults settles the two afterwards: the stored
       *  preference is brought to this device, or, if the account has none, this
       *  device's language becomes the stored one. */
      get display_language() {
        return this.G.D.getu("local_language");
      }
      set display_language(value) {
        this.G.D.setu("local_language", value);
      }
      get theme() {
        return this.G.D.getu("theme");
      }
      set theme(value) {
        this.G.D.setu("theme", value);
      }
      /** The wap an option gets when this voter has not rated it, falling back
       *  to the deployment's setting when they have none of their own.
       *
       *  On the Matrix backend default_wap lives in the user room rather than on
       *  the device, so on a device that has not synced it yet this fallback is
       *  also what a voter WITH a setting of their own sees for a moment. That
       *  is fine for display, and PollPage.seed_default_ratings — the one place
       *  that WRITES this into a poll — waits for DataService.user_data_ready
       *  first, so the deployment's default can never be stored over a setting
       *  that was merely still on its way (#327). */
      get default_wap() {
        return Number.parseInt(this.G.D.getu("default_wap") || String(environment.default_wap));
      }
      set default_wap(value) {
        this.G.D.setu("default_wap", value.toString());
      }
      get_notify_of(cls) {
        return this.G.D.getu("notify_of_" + cls) != "0";
      }
      // by default, all notifications are on
      set_notify_of(cls, value) {
        this.G.D.setu("notify_of_" + cls, value ? "1" : "0");
      }
      passwords_match(control) {
        if (control) {
          const password = control.get("password");
          const confirm_password = control.get("confirm_password");
          if (password.errors) {
            return password.errors;
          }
          if (confirm_password.value !== password.value) {
            return { must_match: true };
          }
        }
        return null;
      }
      // OTHER METHODS:
      compute_db_credentials() {
        var url;
        if (this.db == "central") {
          url = environment.data_service.central_db_server_url;
          this.db_password = environment.data_service.central_db_password;
        } else if (this.db == "poll") {
          url = this.G.P.polls[this.db_from_pid].db_server_url;
          this.db_password = this.G.P.polls[this.db_from_pid].db_password;
        } else if (this.db == "other") {
          url = this.db_custom_server_url;
          this.db_password = this.db_custom_password;
        }
        this.db_server_url = this.G.D.fix_url(url);
      }
      static {
        this.ctorParameters = () => [];
      }
    };
    SettingsService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], SettingsService);
  }
});

export {
  SettingsService,
  init_settings_service
};
//# debugId=228626f1-f6a7-5ab5-8b01-761ed91aeb04
//# sourceMappingURL=chunk-NPENKYN7.js.map
