import {
  ExplainApprovalPage
} from "./chunk-4LWBO6R6.js";
import {
  VODLE_PAGE_TEST_IMPORTS,
  init_vodle_testing,
  silent_logger,
  vodle_page_test_providers
} from "./chunk-37Y4QSVM.js";
import "./chunk-DWAKSAT2.js";
import "./chunk-4BFNV2UU.js";
import "./chunk-NPENKYN7.js";
import "./chunk-HQCDYSGJ.js";
import "./chunk-IGR47T2Z.js";
import "./chunk-BRAISI3V.js";
import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
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
import "./chunk-6F7MEYLU.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-DRVLPRFI.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import "./chunk-CWEVXFNP.js";
import "./chunk-PKPTYHZH.js";

// src/app/explain-approval/explain-approval.page.spec.ts
init_testing();
init_vodle_testing();
describe("ExplainApprovalPage", () => {
  let component;
  let fixture;
  function make_parent(tally) {
    const T = {
      effective_ratings_ascending_map: /* @__PURE__ */ new Map([["o1", tally.stale || []]]),
      thresholds_map: /* @__PURE__ */ new Map(),
      approval_scores_map: /* @__PURE__ */ new Map(),
      n_not_abstaining: 0,
      all_vids_set: /* @__PURE__ */ new Set(),
      votes_map: /* @__PURE__ */ new Map(),
      approvals_map: /* @__PURE__ */ new Map([["o1", /* @__PURE__ */ new Map()]])
    };
    const p = {
      myvid: "v1",
      oids: ["o1"],
      options: { o1: { name: "Option 1" } },
      tally_all: jasmine.createSpy("tally_all").and.callFake(() => {
        T.effective_ratings_ascending_map.set("o1", [...tally.effective]);
        T.thresholds_map.set("o1", tally.threshold);
        T.approval_scores_map.set("o1", tally.approvals);
        T.n_not_abstaining = tally.n;
        T.all_vids_set = new Set(tally.vids);
      }),
      get_my_effective_rating: () => tally.my_effective,
      get_my_proxy_rating: () => tally.my_proxy,
      T
    };
    return { G: { L: silent_logger() }, oidsorted: ["o1"], pieradius: 20, two_pi: 2 * Math.PI, p };
  }
  const empty_tally = { effective: [], threshold: 0, approvals: 0, n: 0, vids: [], my_effective: 0, my_proxy: 0 };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExplainApprovalPage],
      imports: VODLE_PAGE_TEST_IMPORTS,
      providers: vodle_page_test_providers()
    }).compileComponents();
    fixture = TestBed.createComponent(ExplainApprovalPage);
    component = fixture.componentInstance;
    component.oid = "o1";
  }));
  it("should create", () => {
    component.parent = make_parent(empty_tally);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  describe("tally shown (#186)", () => {
    it("recomputes the tally before reading it and depicts the effective ratings", () => {
      component.parent = make_parent({
        stale: [10, 10, 10],
        effective: [20, 60, 90],
        threshold: 50,
        approvals: 2,
        n: 3,
        vids: ["v1", "v2", "v3"],
        my_effective: 60,
        my_proxy: 90
      });
      fixture.detectChanges();
      expect(component.parent.p.tally_all).toHaveBeenCalledTimes(1);
      expect(component.rs).toEqual([20, 60, 90]);
      expect(component.rmin).toBe(50);
      expect(component.n).toBe(3);
      expect(component.a).toBeCloseTo(2 / 3, 10);
      expect(component.thresholdi).toBe(1);
      expect(component.myi).toBe(1);
      expect(component.has_my_rating).toBeTrue();
      expect(component.mypos).toBeCloseTo(component.poss[1], 10);
      expect(component.eff_unequal_proxy).toBeTrue();
    });
    it("pads the ratings of voters who did not rate this option with zeros", () => {
      component.parent = make_parent({
        effective: [70],
        threshold: 50,
        approvals: 1,
        n: 3,
        vids: ["v1", "v2", "v3"],
        my_effective: 70,
        my_proxy: 70
      });
      fixture.detectChanges();
      expect(component.rs).toEqual([0, 0, 70]);
      expect(component.myi).toBe(2);
      expect(component.eff_unequal_proxy).toBeFalse();
    });
    it("shows no own marker when the own vote is not part of the tally", () => {
      component.parent = make_parent({
        effective: [60, 90],
        threshold: 50,
        approvals: 1,
        n: 2,
        vids: ["v2", "v3"],
        my_effective: 0,
        my_proxy: 0
      });
      fixture.detectChanges();
      expect(component.myi).toBe(-1);
      expect(component.has_my_rating).toBeFalse();
      expect(component.mypos).toBeCloseTo(100 * (1 - 0.5), 10);
    });
  });
  describe("the share page starts from its initial state (#345)", () => {
    const svg = () => fixture.nativeElement.querySelector("svg#animation");
    it("turns the clock back before the second page is rendered, so nothing of it is painted finished", () => {
      component.parent = make_parent({
        effective: [60, 90],
        threshold: 50,
        approvals: 2,
        n: 2,
        vids: ["v2", "v3"],
        my_effective: 0,
        my_proxy: 0
      });
      component.ready = true;
      fixture.detectChanges();
      expect(svg()).withContext("the first page is rendered").toBeTruthy();
      svg().setCurrentTime(20);
      component.forward();
      fixture.detectChanges();
      const bar = fixture.nativeElement.querySelector('[data-vodle="share-approval-bar"]');
      expect(bar).withContext("the share page is rendered").toBeTruthy();
      const fade_in = bar.querySelector('animate[attributeName="opacity"]');
      const begins_at = parseFloat(fade_in.getAttribute("begin"));
      expect(begins_at).toBe(3);
      expect(svg().getCurrentTime()).withContext("the clock was turned back before the page was rendered").toBeLessThan(1);
      expect(svg().getCurrentTime()).withContext("so nothing of the finished graph is painted yet").toBeLessThan(begins_at);
    });
    it("does not replay a page that has been seen", () => {
      component.parent = make_parent(empty_tally);
      component.ready = true;
      fixture.detectChanges();
      component.forward();
      fixture.detectChanges();
      svg().setCurrentTime(20);
      component.back();
      fixture.detectChanges();
      expect(svg().getCurrentTime()).toBeGreaterThan(10);
    });
  });
});
//# debugId=32507351-9e4e-5290-8c4a-70f7ee23a59e
//# sourceMappingURL=spec-app-explain-approval-explain-approval.page.spec.js.map
