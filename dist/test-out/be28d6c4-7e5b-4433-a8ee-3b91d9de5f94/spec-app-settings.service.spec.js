import {
  SettingsService,
  init_settings_service
} from "./chunk-NPENKYN7.js";
import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/settings.service.spec.ts
init_testing();
init_settings_service();
init_environment();
describe("SettingsService", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  describe("default_wap (#327)", () => {
    function reading(stored) {
      const svc = new SettingsService();
      svc.G = { D: {
        getu: (key) => key === "default_wap" ? stored : void 0,
        setu: () => true
      } };
      return svc;
    }
    it("falls back to the deployment's setting when the voter has none", () => {
      expect(reading(void 0).default_wap).toBe(environment.default_wap);
      expect(reading("").default_wap).withContext("an empty value is no value").toBe(environment.default_wap);
    });
    it("keeps a value the voter chose, zero included", () => {
      expect(reading("0").default_wap).withContext("someone chose to approve nothing by default").toBe(0);
      expect(reading("55").default_wap).toBe(55);
    });
  });
});
//# debugId=b4784f43-53a2-5616-a886-d745f12e61dc
//# sourceMappingURL=spec-app-settings.service.spec.js.map
