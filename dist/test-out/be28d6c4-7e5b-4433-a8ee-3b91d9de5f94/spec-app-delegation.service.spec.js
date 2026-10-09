import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
import {
  IonicStorageModule,
  init_ionic_storage_angular
} from "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import {
  DelegationService,
  init_delegation_service
} from "./chunk-6F7MEYLU.js";
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
import "./chunk-PKPTYHZH.js";

// src/app/delegation.service.spec.ts
init_testing();
init_ionic_storage_angular();
init_ngx_translate_core();
init_delegation_service();
init_environment();
describe("DelegationService", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [provideTranslateService()]
    });
    service = TestBed.inject(DelegationService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("puts into a delegation link what the invitation link carries, so that someone not in the poll yet can join it (#341)", () => {
    const G = {
      L: { debug: () => {
      } },
      P: { polls: { P1: { password: "secret", db_server_url: "couch.example", db_password: "dbpw" }, P2: {} } },
      D: { poll_origin_server_known: () => "hs.example" }
    };
    service.G = G;
    const base = environment.magic_link_base_url, previous = environment.useMatrixBackend;
    try {
      environment.useMatrixBackend = true;
      expect(service.get_delegation_link("P1", "D1", "some one", "privkey", ["o1", "o2"])).toBe(base + "delrespond/P1/D1/some%20one/privkey?oids=o1&oids=o2&db_server_url=hs.example&db_password=_&poll_password=secret");
      environment.useMatrixBackend = false;
      expect(service.get_delegation_link("P1", "D1", "x", "k")).toBe(base + "delrespond/P1/D1/x/k?db_server_url=couch.example&db_password=dbpw&poll_password=secret");
      expect(service.get_delegation_link("P2", "D2", "x", "k")).toBe(base + "delrespond/P2/D2/x/k");
    } finally {
      environment.useMatrixBackend = previous;
    }
  });
});
//# debugId=a57907b9-ca7e-55b8-9c18-94ddf5dd8a06
//# sourceMappingURL=spec-app-delegation.service.spec.js.map
