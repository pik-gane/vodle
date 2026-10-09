import {
  DataAdapter,
  init_data_adapter_service
} from "./chunk-APZ6T4YC.js";
import "./chunk-D4BX2DV5.js";
import "./chunk-XXC2S6M6.js";
import {
  TestBed,
  init_testing
} from "./chunk-KSMDN5RK.js";
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
import {
  MatrixService,
  init_matrix_service
} from "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import {
  Storage,
  init_ionic_storage_angular
} from "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-DRVLPRFI.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/data-adapter.service.spec.ts
init_testing();
init_data_adapter_service();
init_matrix_service();
init_data_service();
init_ionic_storage_angular();
describe("DataAdapter", () => {
  let service;
  let matrixServiceSpy;
  let dataServiceSpy;
  let storageSpy;
  beforeEach(() => {
    const matrixSpy = jasmine.createSpyObj("MatrixService", [
      "init",
      "initClient",
      "login",
      "register",
      "logout",
      "isLoggedIn",
      "getUserData",
      "setUserData",
      "deleteUserData",
      "getUserRoom"
    ]);
    const dataSpy = jasmine.createSpyObj("DataService", [
      "setu",
      "getu",
      "delu",
      "setp",
      "getp",
      "delp",
      "getv",
      "setv",
      "delv",
      "setv_in_polldb"
    ], {
      ready: true
    });
    const storageSpy2 = jasmine.createSpyObj("Storage", ["get", "set", "remove"]);
    TestBed.configureTestingModule({
      providers: [
        DataAdapter,
        { provide: MatrixService, useValue: matrixSpy },
        { provide: DataService, useValue: dataSpy },
        { provide: Storage, useValue: storageSpy2 }
      ]
    });
    service = TestBed.inject(DataAdapter);
    matrixServiceSpy = TestBed.inject(MatrixService);
    dataServiceSpy = TestBed.inject(DataService);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should have correct backend type", () => {
    const backendType = service.getBackendType();
    expect(backendType === "couchdb" || backendType === "matrix").toBe(true);
  });
  it("should have getUserData method", () => {
    expect(service.getUserData).toBeDefined();
  });
  it("should have setUserData method", () => {
    expect(service.setUserData).toBeDefined();
  });
  it("should have deleteUserData method", () => {
    expect(service.deleteUserData).toBeDefined();
  });
  it("should have isLoggedIn method", () => {
    expect(service.isLoggedIn).toBeDefined();
  });
  it("should provide access to underlying backend", () => {
    const backend = service.getBackend();
    expect(backend).toBeTruthy();
  });
  describe("Phase 3: Poll Data Methods", () => {
    it("should have createPoll method", () => {
      expect(service.createPoll).toBeDefined();
    });
    it("should have getPollData method", () => {
      expect(service.getPollData).toBeDefined();
    });
    it("should have setPollData method", () => {
      expect(service.setPollData).toBeDefined();
    });
    it("should have deletePollData method", () => {
      expect(service.deletePollData).toBeDefined();
    });
    it("should have getVoterData method", () => {
      expect(service.getVoterData).toBeDefined();
    });
    it("should have setVoterData method", () => {
      expect(service.setVoterData).toBeDefined();
    });
    it("should have deleteVoterData method", () => {
      expect(service.deleteVoterData).toBeDefined();
    });
  });
  describe("Phase 4: Voting Implementation", () => {
    it("should have submitRating method", () => {
      expect(service.submitRating).toBeDefined();
    });
    it("should have getRatings method", () => {
      expect(service.getRatings).toBeDefined();
    });
    it("should have requestDelegation method", () => {
      expect(service.requestDelegation).toBeDefined();
    });
    it("should have respondToDelegation method", () => {
      expect(service.respondToDelegation).toBeDefined();
    });
    it("should have setupPollEventHandlers method", () => {
      expect(service.setupPollEventHandlers).toBeDefined();
    });
    it("should have teardownPollEventHandlers method", () => {
      expect(service.teardownPollEventHandlers).toBeDefined();
    });
  });
  describe("Phase 5: Advanced Features", () => {
    it("should have isOnline method", () => {
      expect(service.isOnline).toBeDefined();
    });
    it("should have getOfflineQueueSize method", () => {
      expect(service.getOfflineQueueSize).toBeDefined();
    });
    it("should have processOfflineQueue method", () => {
      expect(service.processOfflineQueue).toBeDefined();
    });
    it("should have clearOfflineQueue method", () => {
      expect(service.clearOfflineQueue).toBeDefined();
    });
    it("should have encryptWithPassword method", () => {
      expect(service.encryptWithPassword).toBeDefined();
    });
    it("should have decryptWithPassword method", () => {
      expect(service.decryptWithPassword).toBeDefined();
    });
    it("should have warmupCache method", () => {
      expect(service.warmupCache).toBeDefined();
    });
  });
});
//# debugId=b3fa8f81-3603-5995-8dcf-61c70646b64f
//# sourceMappingURL=spec-app-data-adapter.service.spec.js.map
