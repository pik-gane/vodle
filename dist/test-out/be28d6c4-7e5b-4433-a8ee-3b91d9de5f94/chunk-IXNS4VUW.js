import {
  A,
  init_p_C7r5Gja6,
  init_p_ChsJlFCQ,
  r
} from "./chunk-AAKC2XIS.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/components/p-Uk13YgEc.js
var a;
var init_p_Uk13YgEc = __esm({
  "node_modules/@ionic/core/components/p-Uk13YgEc.js"() {
    init_p_ChsJlFCQ();
    init_p_C7r5Gja6();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    a = (a2, o) => {
      const i = "40px", s = "back" === o.direction, n = o.leavingEl, e = A(o.enteringEl), c = e.querySelector("ion-toolbar"), p = r();
      if (p.addElement(e).fill("both").beforeRemoveClass("ion-page-invisible"), s ? p.duration((o.duration ?? 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : p.duration((o.duration ?? 0) || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform", `translateY(${i})`, "translateY(0px)").fromTo("opacity", 0.01, 1), c) {
        const r2 = r();
        r2.addElement(c), p.addAnimation(r2);
      }
      if (n && s) {
        p.duration((o.duration ?? 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
        const a3 = r();
        a3.addElement(A(n)).onFinish(((t) => {
          1 === t && a3.elements.length > 0 && a3.elements[0].style.setProperty("display", "none");
        })).fromTo("transform", "translateY(0px)", `translateY(${i})`).fromTo("opacity", 1, 0), p.addAnimation(a3);
      }
      return p;
    };
  }
});

export {
  a,
  init_p_Uk13YgEc
};
//# debugId=dcc41a1b-66da-520f-9c2c-cdf162056262
//# sourceMappingURL=chunk-IXNS4VUW.js.map
