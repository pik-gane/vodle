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
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS
} from "./chunk-PKPTYHZH.js";

// src/app/delegation-matrix-path.spec.ts
var require_delegation_matrix_path_spec = __commonJS({
  "src/app/delegation-matrix-path.spec.ts"(exports) {
    init_testing();
    init_ionic_storage_angular();
    init_matrix_service();
    init_data_service();
    init_environment();
    describe("the delegation path on the Matrix backend (#327)", () => {
      describe("MatrixService recognises voter data that is not a rating", () => {
        let service;
        beforeEach(() => {
          TestBed.configureTestingModule({
            providers: [
              MatrixService,
              { provide: Storage, useValue: jasmine.createSpyObj("Storage", ["get", "set", "remove"]) }
            ]
          });
          service = TestBed.inject(MatrixService);
        });
        it("takes the vodle key out of a voter room state event type", () => {
          expect(MatrixService.voterDataKeyOf("m.room.vodle.voter.rating.rating.o1")).toBe("rating.o1");
          expect(MatrixService.voterDataKeyOf("m.room.vodle.voter.rating.del_request.d1")).toBe("del_request.d1");
          expect(MatrixService.voterDataKeyOf("m.room.vodle.voter.rating.del_response.d1")).toBe("del_response.d1");
          expect(MatrixService.voterDataKeyOf("m.room.vodle.poll.title")).toBeNull();
          expect(MatrixService.voterDataKeyOf("m.room.message")).toBeNull();
          expect(MatrixService.voterDataKeyOf(void 0)).toBeNull();
        });
        it("tells the listeners when a voter empties the event, which is a deletion", () => __async(null, null, function* () {
          const seen = [];
          service.pollEventListeners.set("p1", [{
            onVoterDataChange: (pollId, vid, key, value) => seen.push([pollId, vid, key, value])
          }]);
          service.voterVidMap.set("p1:@someone:hs", "v9");
          yield service.handleVoterDataEvent("p1", "@someone:hs", "del_request.d1", { getContent: () => ({}) });
          expect(seen).withContext("an empty content is how deleteVoterData deletes").toEqual([["p1", "v9", "del_request.d1", null]]);
        }));
        it("hands a delegation request to the poll's listeners", () => __async(null, null, function* () {
          const seen = [];
          service.pollEventListeners.set("p1", [{
            onVoterDataChange: (pollId, vid, key, value) => seen.push([pollId, vid, key, value])
          }]);
          yield service.handleVoterDataEvent("p1", "@someone:hs", "del_request.d1", { getContent: () => ({ value: '{"option_spec":{"type":"-","oids":[]}}', voter_vid: "v9" }) });
          expect(seen).withContext("the delegate's device is told, with the vodle vid").toEqual([["p1", "v9", "del_request.d1", '{"option_spec":{"type":"-","oids":[]}}']]);
        }));
        it("does not mistake it for a rating", () => __async(null, null, function* () {
          const ratings = [];
          service.pollEventListeners.set("p1", [{
            onRatingUpdate: (...args) => ratings.push(args),
            onVoterDataChange: () => {
            }
          }]);
          yield service.handleVoterDataEvent("p1", "@someone:hs", "del_request.d1", { getContent: () => ({ value: "whatever", voter_vid: "v9" }) });
          expect(ratings).toEqual([]);
        }));
      });
      describe("DataService routes it the way the CouchDB backend does", () => {
        let svc;
        let processed;
        beforeEach(() => {
          environment.useMatrixBackend = true;
          svc = new DataService(null, null, null, null, null, null, null);
          svc.poll_caches = {};
          svc.user_cache = {};
          svc._pids = /* @__PURE__ */ new Set(["p1"]);
          processed = [];
          svc.G = {
            L: {
              entry: () => {
              },
              exit: () => {
              },
              trace: () => {
              },
              debug: () => {
              },
              info: () => {
              },
              warn: () => {
              },
              error: () => {
              }
            },
            P: { polls: {} },
            Del: {
              process_request_from_db: (pid, did, vid) => processed.push(["request", pid, did, vid]),
              process_signed_response_from_db: (pid, did, vid) => processed.push(["response", pid, did, vid]),
              process_deleted_request_from_db: (pid, did, vid) => processed.push(["deleted", pid, did, vid])
            },
            D: svc
          };
        });
        it("stores the request where getv finds it, and tells the delegation service", () => {
          svc.matrix_voter_data_arrived("p1", "v9", "del_request.d1", '{"x":1}');
          expect(svc.getv("p1", "del_request.d1", "v9")).withContext("readable by get_request").toBe('{"x":1}');
          expect(processed).toEqual([["request", "p1", "d1", "v9"]]);
        });
        it("does the same for a response", () => {
          svc.matrix_voter_data_arrived("p1", "v9", "del_response.d1", "signed");
          expect(svc.getv("p1", "del_response.d1", "v9")).toBe("signed");
          expect(processed).toEqual([["response", "p1", "d1", "v9"]]);
        });
        it("stores anything else without inventing a delegation for it", () => {
          svc.matrix_voter_data_arrived("p1", "v9", "something.else", "x");
          expect(svc.getv("p1", "something.else", "v9")).toBe("x");
          expect(processed).toEqual([]);
        });
        it("treats an emptied request as the revocation it is", () => {
          svc.matrix_voter_data_arrived("p1", "v9", "del_request.d1", '{"x":1}');
          processed.length = 0;
          svc.matrix_voter_data_arrived("p1", "v9", "del_request.d1", null);
          expect(processed).toEqual([["deleted", "p1", "d1", "v9"]]);
          expect(svc.getv("p1", "del_request.d1", "v9")).withContext("and the value is gone, not an empty request").toBe("");
        });
        it("does not read an emptied response as an answer", () => {
          svc.matrix_voter_data_arrived("p1", "v9", "del_response.d1", "");
          expect(processed).toEqual([]);
          expect(svc.getv("p1", "del_response.d1", "v9")).toBe("");
        });
        it("carries the rank and the trust that ride in a request", () => {
          const request = '{"option_spec":{"type":"-","oids":[]},"public_key":"k","rank":2,"trust":40}';
          svc.matrix_voter_data_arrived("p1", "v9", "del_request.d1", request);
          const stored = JSON.parse(svc.getv("p1", "del_request.d1", "v9"));
          expect(stored.rank).toBe(2);
          expect(stored.trust).toBe(40);
        });
        it("survives a delegation service that throws, rather than losing the value", () => {
          svc.G.Del.process_request_from_db = () => {
            throw new Error("the poll is not loaded yet");
          };
          expect(() => svc.matrix_voter_data_arrived("p1", "v9", "del_request.d1", '{"x":1}')).not.toThrow();
          expect(svc.getv("p1", "del_request.d1", "v9")).withContext("still stored").toBe('{"x":1}');
        });
      });
    });
  }
});
export default require_delegation_matrix_path_spec();
//# debugId=c295fd94-37f0-52e9-9178-71511e3b92e2
//# sourceMappingURL=spec-app-delegation-matrix-path.spec.js.map
