import {
  GlobalService,
  init_global_service,
  web_share_available,
  web_share_broke
} from "./chunk-DWAKSAT2.js";
import "./chunk-4BFNV2UU.js";
import "./chunk-NPENKYN7.js";
import "./chunk-HQCDYSGJ.js";
import {
  RouterTestingModule,
  init_http_testing,
  init_testing as init_testing2,
  provideHttpClientTesting
} from "./chunk-IGR47T2Z.js";
import "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
import {
  IonicModule,
  init_http,
  init_lazy,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from "./chunk-BLEMCJOU.js";
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
import {
  IonicStorageModule,
  init_ionic_storage_angular
} from "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import {
  init_ngx_translate_core,
  provideTranslateService
} from "./chunk-DRVLPRFI.js";
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

// src/app/global.service.spec.ts
var require_global_service_spec = __commonJS({
  "src/app/global.service.spec.ts"(exports) {
    init_testing();
    init_testing2();
    init_http_testing();
    init_http();
    init_lazy();
    init_ionic_storage_angular();
    init_ngx_translate_core();
    init_global_service();
    init_environment();
    describe("GlobalService", () => {
      let service;
      let previous_onerror, previous_onrejection, previous_onbeforeunload;
      beforeEach(() => {
        previous_onerror = window.onerror;
        previous_onrejection = window.onunhandledrejection;
        previous_onbeforeunload = window.onbeforeunload;
        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            IonicModule.forRoot(),
            IonicStorageModule.forRoot()
          ],
          providers: [
            GlobalService,
            provideTranslateService(),
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
          ]
        });
        service = TestBed.inject(GlobalService);
      });
      afterEach(() => {
        service.D.ngOnDestroy();
        window.onerror = previous_onerror;
        window.onunhandledrejection = previous_onrejection;
        window.onbeforeunload = previous_onbeforeunload;
      });
      it("should be created", () => {
        expect(service).toBeTruthy();
        expect(service.D.G).toBe(service);
        expect(service.P.G).toBe(service);
      });
      describe("the handover of a deployment (environment.handover)", () => {
        let previous;
        beforeEach(() => {
          previous = __spreadValues({}, environment.handover);
          service.translate.setTranslation("en", {
            cancel: "Cancel",
            handover: {
              "successor-title": "New polls are started elsewhere",
              "successor-message": "Please use {{host}} from now on.",
              "successor-go": "Go to {{host}}"
            }
          }, true);
          service.translate.use("en");
        });
        afterEach(() => {
          environment.handover = previous;
        });
        it("shows nothing without a successor", () => __async(null, null, function* () {
          environment.handover.successor_url = "";
          const create = spyOn(service.alertCtrl, "create");
          expect(service.successor_url).toBe("");
          expect(yield service.show_successor_notice()).toBeFalse();
          expect(create).not.toHaveBeenCalled();
        }));
        it("names the successor and offers to go there", () => __async(null, null, function* () {
          environment.handover.successor_url = "https://matrix.vodle.it/#/";
          const notice = jasmine.createSpyObj("HTMLIonAlertElement", ["present"]);
          notice.present.and.returnValue(Promise.resolve());
          const create = spyOn(service.alertCtrl, "create").and.returnValue(Promise.resolve(notice));
          expect(yield service.show_successor_notice()).toBeTrue();
          const options = create.calls.mostRecent().args[0];
          expect(options.message).toBe("Please use matrix.vodle.it from now on.");
          expect(options.buttons.map((b) => b.text)).toEqual(["Cancel", "Go to matrix.vodle.it"]);
          expect(notice.present).toHaveBeenCalled();
        }));
        it("takes the host name out of a URL for the notices", () => {
          expect(GlobalService.host_of("https://matrix.vodle.it/#/")).toBe("matrix.vodle.it");
          expect(GlobalService.host_of("https://vodle.example.org:8443/#/")).toBe("vodle.example.org:8443");
          expect(GlobalService.host_of("not a url")).toBe("not a url");
          environment.handover.predecessor_url = "https://app.vodle.it/#/";
          expect(service.predecessor_url).toBe("https://app.vodle.it/#/");
        });
      });
      describe("the Web Share capability check", () => {
        const nav = navigator;
        const set = (name, value) => Object.defineProperty(nav, name, { configurable: true, value });
        afterEach(() => {
          delete nav.share;
          delete nav.canShare;
        });
        it("says no when the browser has no Web Share at all", () => {
          set("share", void 0);
          set("canShare", void 0);
          expect(web_share_available()).toBeFalse();
        });
        it("says yes on a browser that shares but cannot be asked in advance", () => {
          set("share", () => Promise.resolve());
          set("canShare", void 0);
          expect(web_share_available()).toBeTrue();
        });
        it("follows canShare where there is one", () => {
          set("share", () => Promise.resolve());
          set("canShare", () => false);
          expect(web_share_available()).toBeFalse();
          set("canShare", () => true);
          expect(web_share_available()).toBeTrue();
        });
        it("says no when canShare refuses to answer", () => {
          set("share", () => Promise.resolve());
          set("canShare", () => {
            throw new Error("not supported here");
          });
          expect(web_share_available()).toBeFalse();
        });
        it("asks about the data the share buttons would send", () => {
          let asked = null;
          set("share", () => Promise.resolve());
          set("canShare", (data) => {
            asked = data;
            return true;
          });
          web_share_available();
          expect(asked).toEqual({ title: "vodle", text: "vodle" });
        });
        it("reads a failed attempt as the browser being unable to share", () => {
          expect(web_share_broke({ name: "NotSupportedError" })).toBeTrue();
          expect(web_share_broke(new Error("no idea what went wrong"))).toBeTrue();
        });
        it("does not read a cancelled share sheet as a broken browser", () => {
          expect(web_share_broke({ name: "AbortError" })).toBeFalse();
          expect(web_share_broke(null)).toBeFalse();
          expect(web_share_broke(void 0)).toBeFalse();
        });
        it("starts out believing the browser", () => {
          expect(service.web_share_broken).toBeFalse();
        });
      });
    });
  }
});
export default require_global_service_spec();
//# debugId=9f594aa9-da27-5d90-a083-f83377dc4fe5
//# sourceMappingURL=spec-app-global.service.spec.js.map
