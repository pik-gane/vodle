import {
  DataService,
  init_data_service
} from "./chunk-WCO77UR5.js";
import "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-DRVLPRFI.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// src/app/user-settings-sync.spec.ts
var require_user_settings_sync_spec = __commonJS({
  "src/app/user-settings-sync.spec.ts"(exports) {
    init_data_service();
    init_environment();
    describe("the settings a person chose (#327)", () => {
      let room;
      function device(stored = {}, browser_language = "en") {
        environment.useMatrixBackend = true;
        const svc = new DataService(null, null, null, null, null, null, null);
        const local_storage = __spreadValues({}, stored);
        svc.user_cache = __spreadValues({}, stored);
        svc.poll_caches = {};
        svc.local_poll_dbs = {};
        svc.remote_poll_dbs = {};
        svc.poll_db_sync_handlers = {};
        svc._pids = /* @__PURE__ */ new Set();
        svc.store_user_data = (key) => {
          local_storage[key] = svc.user_cache[key];
          return true;
        };
        svc.save_state = () => {
          Object.assign(local_storage, svc.user_cache);
          return Promise.resolve();
        };
        svc.check_whether_poll_or_option = () => false;
        svc.show_loading = () => {
        };
        svc.hide_loading = () => {
        };
        svc.email_and_password_exist = () => Promise.resolve();
        let logged_in = false;
        svc.matrixService = {
          isLoggedIn: () => logged_in,
          // the user room as the homeserver holds it. A write lands in it at
          // once, like a state event the server accepted:
          setUserData: (key, value) => {
            room[key] = value;
            return Promise.resolve();
          },
          getAllUserData: () => Promise.resolve(__spreadValues({}, room))
        };
        svc.log_in = () => {
          logged_in = true;
        };
        let shown = "";
        svc.translate = { use: (lang) => {
          shown = lang;
        } };
        svc.document = { documentElement: {} };
        svc.G = {
          L: { entry: () => {
          }, exit: () => {
          }, trace: () => {
          }, info: () => {
          }, warn: () => {
          }, error: () => {
          } },
          P: { polls: {} },
          D: svc,
          add_spinning_reason: () => {
          },
          remove_spinning_reason: () => {
          }
        };
        svc.router = { url: "/", navigate: () => {
        } };
        const S = {
          get email() {
            return svc.getu("email");
          },
          set email(v) {
            svc.setu("email", v);
          },
          get password() {
            return svc.getu("password");
          },
          set password(v) {
            svc.setu("password", v);
          },
          get language() {
            return svc.getu("language");
          },
          set language(v) {
            svc.setu("language", v);
          },
          get display_language() {
            return svc.getu("local_language");
          },
          set display_language(v) {
            svc.setu("local_language", v);
          },
          get theme() {
            return svc.getu("theme");
          },
          set theme(v) {
            svc.setu("theme", v);
          },
          get default_wap() {
            return Number.parseInt(svc.getu("default_wap") || String(environment.default_wap));
          },
          set default_wap(v) {
            svc.setu("default_wap", v);
          },
          get db() {
            return svc.getu("db");
          },
          set db(v) {
            svc.setu("db", v);
          }
        };
        svc.G.S = S;
        S.display_language = browser_language;
        return {
          svc,
          S,
          showing: () => shown,
          storage: () => {
            svc.save_state();
            return __spreadValues({}, local_storage);
          }
        };
      }
      function log_in(dev) {
        return __async(this, null, function* () {
          dev.svc.log_in();
          yield dev.svc.sync_and_settle_user_data();
        });
      }
      function choose_language_in_the_settings(dev, language) {
        dev.S.language = language;
      }
      beforeEach(() => {
        room = {};
        environment.useMatrixBackend = true;
      });
      it("reaches the account when it is chosen in the settings", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        expect(phone.showing()).withContext("this device turns German at once").toBe("de");
        expect(room["language"]).withContext("and the account holds the choice").toBe("de");
      }));
      it("reaches a second device that has never been used", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        const laptop = device({}, "en");
        yield log_in(laptop);
        expect(laptop.showing()).withContext("the second device shows the chosen language").toBe("de");
        expect(room["language"]).withContext("and did not push its own over it").toBe("de");
      }));
      it("reaches a second device that has been used before in its own language", () => __async(null, null, function* () {
        const laptop_first_start = device({}, "en");
        yield log_in(laptop_first_start);
        const laptop_storage = laptop_first_start.storage();
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        const laptop = device(laptop_storage, "en");
        yield log_in(laptop);
        expect(room["language"]).withContext("the account still holds the choice").toBe("de");
        expect(laptop.showing()).withContext("and the second device shows it").toBe("de");
      }));
      it("survives a logout and a login on the same device", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        const after_logout = device({}, "en");
        yield log_in(after_logout);
        expect(after_logout.showing()).withContext("German, as it was left").toBe("de");
        expect(room["language"]).toBe("de");
      }));
      it("survives a logout that left the storage behind", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        const stored = phone.storage();
        const again = device(stored, "en");
        yield log_in(again);
        expect(again.showing()).toBe("de");
        expect(room["language"]).toBe("de");
      }));
      it("is changed again by a later choice on any device", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        const laptop = device({}, "en");
        yield log_in(laptop);
        choose_language_in_the_settings(laptop, "fr");
        expect(room["language"]).withContext("the newest choice wins").toBe("fr");
        const phone_next_start = device(phone.storage(), "en");
        yield log_in(phone_next_start);
        expect(phone_next_start.showing()).withContext("and reaches the other device").toBe("fr");
      }));
      it("is not emptied by a login while the client is still signed in", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        choose_language_in_the_settings(phone, "de");
        phone.svc.login_submitted();
        expect(room["language"]).withContext("the account still holds the choice").toBe("de");
        expect(phone.showing()).withContext("and the screen is still German").toBe("de");
      }));
      it("leaves the account alone while nobody has chosen anything", () => __async(null, null, function* () {
        const phone = device({}, "de");
        yield log_in(phone);
        expect(phone.showing()).withContext("this device keeps what the browser said").toBe("de");
        expect(room["language"]).withContext("the account stores nothing").toBeUndefined();
        const laptop = device({}, "fr");
        yield log_in(laptop);
        expect(laptop.showing()).withContext("and so does the other one").toBe("fr");
      }));
      it("keeps the other settings the person chose, on a device that is new", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        phone.S.default_wap = 51;
        phone.S.theme = "dark";
        const laptop = device({}, "en");
        yield log_in(laptop);
        expect(laptop.S.default_wap).toBe(51);
        expect(laptop.S.theme).toBe("dark");
        expect(room["default_wap"]).toBe(51);
      }));
      it("keeps the other settings the person chose, on a device used before", () => __async(null, null, function* () {
        const laptop_first_start = device({}, "en");
        yield log_in(laptop_first_start);
        const laptop_storage = laptop_first_start.storage();
        const phone = device({}, "en");
        yield log_in(phone);
        phone.S.default_wap = 51;
        phone.S.theme = "dark";
        const laptop = device(laptop_storage, "en");
        yield log_in(laptop);
        expect(room["default_wap"]).withContext("the account still holds the choice").toBe(51);
        expect(laptop.S.default_wap).withContext("and the second device shows it").toBe(51);
        expect(laptop.S.theme).withContext("and the theme with it").toBe("dark");
      }));
      it("keeps the other settings across a logout that left the storage behind", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        phone.S.default_wap = 51;
        phone.S.theme = "dark";
        const stored = phone.storage();
        const again = device(stored, "en");
        yield log_in(again);
        expect(again.S.default_wap).toBe(51);
        expect(again.S.theme).toBe("dark");
        expect(room["default_wap"]).toBe(51);
      }));
      it("does not store the deployment default in the account", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        expect(phone.S.default_wap).withContext("shown").toBe(environment.default_wap);
        expect(room["default_wap"]).withContext("not stored").toBeUndefined();
      }));
      it("gives a person with no setting of their own the deployment default wap", () => __async(null, null, function* () {
        const phone = device({}, "en");
        yield log_in(phone);
        expect(phone.S.default_wap).toBe(environment.default_wap);
      }));
    });
  }
});
export default require_user_settings_sync_spec();
//# debugId=9242c8e5-fff2-5198-8caa-39756bc8df95
//# sourceMappingURL=spec-app-user-settings-sync.spec.js.map
