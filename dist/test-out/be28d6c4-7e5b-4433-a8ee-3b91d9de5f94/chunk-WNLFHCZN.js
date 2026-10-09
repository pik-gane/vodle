import {
  A,
  init_p_C7r5Gja6,
  init_p_ChsJlFCQ,
  r
} from "./chunk-AAKC2XIS.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/components/p-Dvyv9SMk.js
var n, a, s, e, r2, i, l, c;
var init_p_Dvyv9SMk = __esm({
  "node_modules/@ionic/core/components/p-Dvyv9SMk.js"() {
    init_p_ChsJlFCQ();
    init_p_C7r5Gja6();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    n = (t) => document.querySelector(`${t}.ion-cloned-element`);
    a = (t) => t.shadowRoot || t;
    s = (t) => {
      const o = "ION-TABS" === t.tagName ? t : t.querySelector("ion-tabs"), n2 = "ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large";
      if (null != o) {
        const t2 = o.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");
        return null != t2 ? t2.querySelector(n2) : null;
      }
      return t.querySelector(n2);
    };
    e = (t, o) => {
      const n2 = "ION-TABS" === t.tagName ? t : t.querySelector("ion-tabs");
      let a2 = [];
      if (null != n2) {
        const t2 = n2.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");
        null != t2 && (a2 = t2.querySelectorAll("ion-buttons"));
      } else a2 = t.querySelectorAll("ion-buttons");
      for (const t2 of a2) {
        const n3 = t2.closest("ion-header"), a3 = n3 && !n3.classList.contains("header-collapse-condense-inactive"), s2 = t2.querySelector("ion-back-button"), e2 = t2.classList.contains("buttons-collapse");
        if (null !== s2 && ("start" === t2.slot || "" === t2.slot) && (e2 && a3 && o || !e2)) return s2;
      }
      return null;
    };
    r2 = (o, s2, e2, r3, i2, l2, f, p, $) => {
      const d = s2 ? `calc(100% - ${i2.right + 4}px)` : i2.left - 4 + "px", b = s2 ? "right" : "left", m = s2 ? "left" : "right", u = s2 ? "right" : "left";
      let y = 1, X = 1, x = `scale(${X})`;
      const h = "scale(1)";
      if (l2 && f) {
        const t = l2.textContent?.trim() === p.textContent?.trim();
        y = $.width / f.width, X = ($.height - c) / f.height, x = t ? `scale(${y}, ${X})` : `scale(${X})`;
      }
      const g = a(r3).querySelector("ion-icon").getBoundingClientRect(), w = s2 ? g.width / 2 - (g.right - i2.right) + "px" : i2.left - g.width / 2 + "px", k = s2 ? `-${window.innerWidth - i2.right}px` : `${i2.left}px`, v = `${$.top}px`, T = `${i2.top}px`, A2 = e2 ? [{ offset: 0, transform: `translate3d(${k}, ${T}, 0)` }, { offset: 1, transform: `translate3d(${w}, ${v}, 0)` }] : [{ offset: 0, transform: `translate3d(${w}, ${v}, 0)` }, { offset: 1, transform: `translate3d(${k}, ${T}, 0)` }], j = e2 ? [{ offset: 0, opacity: 1, transform: h }, { offset: 1, opacity: 0, transform: x }] : [{ offset: 0, opacity: 0, transform: x }, { offset: 1, opacity: 1, transform: h }], C = e2 ? [{ offset: 0, opacity: 1, transform: "scale(1)" }, { offset: 0.2, opacity: 0, transform: "scale(0.6)" }, { offset: 1, opacity: 0, transform: "scale(0.6)" }] : [{ offset: 0, opacity: 0, transform: "scale(0.6)" }, { offset: 0.6, opacity: 0, transform: "scale(0.6)" }, { offset: 1, opacity: 1, transform: "scale(1)" }], B = r(), I = r(), N = r(), O = n("ion-back-button"), S = a(O).querySelector(".button-text"), z = a(O).querySelector("ion-icon");
      O.text = r3.text, O.mode = r3.mode, O.icon = r3.icon, O.color = r3.color, O.disabled = r3.disabled, O.style.setProperty("display", "block"), O.style.setProperty("position", "fixed"), I.addElement(z), B.addElement(S), N.addElement(O), N.beforeStyles({ position: "absolute", top: "0px", [u]: "0px" }).beforeAddWrite((() => {
        r3.style.setProperty("display", "none"), O.style.setProperty(b, d);
      })).afterAddWrite((() => {
        r3.style.setProperty("display", ""), O.style.setProperty("display", "none"), O.style.removeProperty(b);
      })).keyframes(A2), B.beforeStyles({ "transform-origin": `${b} top` }).keyframes(j), I.beforeStyles({ "transform-origin": `${m} center` }).keyframes(C), o.addAnimation([B, I, N]);
    };
    i = (o, a2, s2, e2, r3, i2, l2, f, p) => {
      const $ = a2 ? "right" : "left", d = a2 ? `calc(100% - ${r3.right}px)` : `${r3.left}px`, b = `${r3.top}px`;
      let m = a2 ? `-${window.innerWidth - l2.right - 8}px` : `${l2.x + 8}px`, u = 0.5;
      const y = "scale(1)";
      let X = `scale(${u})`;
      if (f && p) {
        m = a2 ? `-${window.innerWidth - p.right - 8}px` : p.x - 8 + "px";
        const t = f.textContent?.trim() === e2.textContent?.trim();
        u = p.height / (i2.height - c), X = t ? `scale(${p.width / i2.width}, ${u})` : `scale(${u})`;
      }
      const x = l2.top + l2.height / 2 - r3.height * u / 2 + "px", h = s2 ? [{ offset: 0, opacity: 0, transform: `translate3d(${m}, ${x}, 0) ${X}` }, { offset: 0.1, opacity: 0 }, { offset: 1, opacity: 1, transform: `translate3d(0px, ${b}, 0) ${y}` }] : [{ offset: 0, opacity: 0.99, transform: `translate3d(0px, ${b}, 0) ${y}` }, { offset: 0.6, opacity: 0 }, { offset: 1, opacity: 0, transform: `translate3d(${m}, ${x}, 0) ${X}` }], g = n("ion-title"), w = r();
      g.innerText = e2.innerText, g.size = e2.size, g.color = e2.color, w.addElement(g), w.beforeStyles({ "transform-origin": `${$} top`, height: `${r3.height}px`, display: "", position: "relative", [$]: d }).beforeAddWrite((() => {
        e2.style.setProperty("opacity", "0");
      })).afterAddWrite((() => {
        e2.style.setProperty("opacity", ""), g.style.setProperty("display", "none");
      })).keyframes(h), o.addAnimation(w);
    };
    l = (n2, l2) => {
      try {
        const c2 = "cubic-bezier(0.32,0.72,0,1)", f = "opacity", p = "transform", $ = "0%", d = 0.8, b = "rtl" === n2.ownerDocument.dir, m = b ? "-99.5%" : "99.5%", u = b ? "33%" : "-33%", y = l2.enteringEl, X = l2.leavingEl, x = "back" === l2.direction, h = y.querySelector(":scope > ion-content"), g = y.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), w = y.querySelectorAll(":scope > ion-header > ion-toolbar"), k = r(), v = r();
        if (k.addElement(y).duration((l2.duration ?? 0) || 540).easing(l2.easing || c2).fill("both").beforeRemoveClass("ion-page-invisible"), X && null != n2) {
          const o = r();
          o.addElement(n2), k.addAnimation(o);
        }
        if (h || 0 !== w.length || 0 !== g.length ? (v.addElement(h), v.addElement(g)) : v.addElement(y.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")), k.addAnimation(v), x ? v.beforeClearStyles([f]).fromTo("transform", `translateX(${u})`, `translateX(${$})`).fromTo(f, d, 1) : v.beforeClearStyles([f]).fromTo("transform", `translateX(${m})`, `translateX(${$})`), h) {
          const o = a(h).querySelector(".transition-effect");
          if (o) {
            const n3 = o.querySelector(".transition-cover"), a2 = o.querySelector(".transition-shadow"), s2 = r(), e2 = r(), r3 = r();
            s2.addElement(o).beforeStyles({ opacity: "1", display: "block" }).afterStyles({ opacity: "", display: "" }), e2.addElement(n3).beforeClearStyles([f]).fromTo(f, 0, 0.1), r3.addElement(a2).beforeClearStyles([f]).fromTo(f, 0.03, 0.7), s2.addAnimation([e2, r3]), v.addAnimation([s2]);
          }
        }
        const T = y.querySelector("ion-header.header-collapse-condense"), { forward: A2, backward: j } = ((t, o, n3, l3, c3) => {
          const f2 = e(l3, n3), p2 = s(c3), $2 = s(l3), d2 = e(c3, n3), b2 = null !== f2 && null !== p2 && !n3, m2 = null !== $2 && null !== d2 && n3;
          if (b2) {
            const s2 = p2.getBoundingClientRect(), e2 = f2.getBoundingClientRect(), l4 = a(f2).querySelector(".button-text"), c4 = l4?.getBoundingClientRect(), $3 = a(p2).querySelector(".toolbar-title").getBoundingClientRect();
            i(t, o, n3, p2, s2, $3, e2, l4, c4), r2(t, o, n3, f2, e2, l4, c4, p2, $3);
          } else if (m2) {
            const s2 = $2.getBoundingClientRect(), e2 = d2.getBoundingClientRect(), l4 = a(d2).querySelector(".button-text"), c4 = l4?.getBoundingClientRect(), f3 = a($2).querySelector(".toolbar-title").getBoundingClientRect();
            i(t, o, n3, $2, s2, f3, e2, l4, c4), r2(t, o, n3, d2, e2, l4, c4, $2, f3);
          }
          return { forward: b2, backward: m2 };
        })(k, b, x, y, X);
        if (w.forEach(((o) => {
          const n3 = r();
          n3.addElement(o), k.addAnimation(n3);
          const s2 = r();
          s2.addElement(o.querySelector("ion-title"));
          const e2 = r(), r3 = Array.from(o.querySelectorAll("ion-buttons,[menuToggle]")), i2 = o.closest("ion-header"), l3 = i2?.classList.contains("header-collapse-condense-inactive");
          let c3;
          c3 = r3.filter(x ? (t) => {
            const o2 = t.classList.contains("buttons-collapse");
            return o2 && !l3 || !o2;
          } : (t) => !t.classList.contains("buttons-collapse")), e2.addElement(c3);
          const p2 = r();
          p2.addElement(o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));
          const d2 = r();
          d2.addElement(a(o).querySelector(".toolbar-background"));
          const y2 = r(), X2 = o.querySelector("ion-back-button");
          if (X2 && y2.addElement(X2), n3.addAnimation([s2, e2, p2, d2, y2]), e2.fromTo(f, 0.01, 1), p2.fromTo(f, 0.01, 1), x) l3 || s2.fromTo("transform", `translateX(${u})`, `translateX(${$})`).fromTo(f, 0.01, 1), p2.fromTo("transform", `translateX(${u})`, `translateX(${$})`), y2.fromTo(f, 0.01, 1);
          else {
            T || s2.fromTo("transform", `translateX(${m})`, `translateX(${$})`).fromTo(f, 0.01, 1), p2.fromTo("transform", `translateX(${m})`, `translateX(${$})`), d2.beforeClearStyles([f, "transform"]);
            const o2 = i2?.translucent;
            if (o2 ? d2.fromTo("transform", b ? "translateX(-100%)" : "translateX(100%)", "translateX(0px)") : d2.fromTo(f, 0.01, "var(--opacity)"), A2 || y2.fromTo(f, 0.01, 1), X2 && !A2) {
              const o3 = r();
              o3.addElement(a(X2).querySelector(".button-text")).fromTo("transform", b ? "translateX(-100px)" : "translateX(100px)", "translateX(0px)"), n3.addAnimation(o3);
            }
          }
        })), X) {
          const n3 = r(), s2 = X.querySelector(":scope > ion-content"), e2 = X.querySelectorAll(":scope > ion-header > ion-toolbar"), r3 = X.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");
          if (s2 || 0 !== e2.length || 0 !== r3.length ? (n3.addElement(s2), n3.addElement(r3)) : n3.addElement(X.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")), k.addAnimation(n3), x) {
            n3.beforeClearStyles([f]).fromTo("transform", `translateX(${$})`, b ? "translateX(-100%)" : "translateX(100%)");
            const t = A(X);
            k.afterAddWrite((() => {
              "normal" === k.getDirection() && t.style.setProperty("display", "none");
            }));
          } else n3.fromTo("transform", `translateX(${$})`, `translateX(${u})`).fromTo(f, 1, d);
          if (s2) {
            const o = a(s2).querySelector(".transition-effect");
            if (o) {
              const a2 = o.querySelector(".transition-cover"), s3 = o.querySelector(".transition-shadow"), e3 = r(), r4 = r(), i2 = r();
              e3.addElement(o).beforeStyles({ opacity: "1", display: "block" }).afterStyles({ opacity: "", display: "" }), r4.addElement(a2).beforeClearStyles([f]).fromTo(f, 0.1, 0), i2.addElement(s3).beforeClearStyles([f]).fromTo(f, 0.7, 0.03), e3.addAnimation([r4, i2]), n3.addAnimation([e3]);
            }
          }
          e2.forEach(((o) => {
            const n4 = r();
            n4.addElement(o);
            const s3 = r();
            s3.addElement(o.querySelector("ion-title"));
            const e3 = r(), r4 = o.querySelectorAll("ion-buttons,[menuToggle]"), i2 = o.closest("ion-header"), l3 = i2?.classList.contains("header-collapse-condense-inactive"), c3 = Array.from(r4).filter(((t) => {
              const o2 = t.classList.contains("buttons-collapse");
              return o2 && !l3 || !o2;
            }));
            e3.addElement(c3);
            const d2 = r(), m2 = o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");
            m2.length > 0 && d2.addElement(m2);
            const y2 = r();
            y2.addElement(a(o).querySelector(".toolbar-background"));
            const X2 = r(), h2 = o.querySelector("ion-back-button");
            if (h2 && X2.addElement(h2), n4.addAnimation([s3, e3, d2, X2, y2]), k.addAnimation(n4), X2.fromTo(f, 0.99, 0), e3.fromTo(f, 0.99, 0), d2.fromTo(f, 0.99, 0), x) {
              l3 || s3.fromTo("transform", `translateX(${$})`, b ? "translateX(-100%)" : "translateX(100%)").fromTo(f, 0.99, 0), d2.fromTo("transform", `translateX(${$})`, b ? "translateX(-100%)" : "translateX(100%)"), y2.beforeClearStyles([f, "transform"]);
              const o2 = i2?.translucent;
              if (o2 ? y2.fromTo("transform", "translateX(0px)", b ? "translateX(-100%)" : "translateX(100%)") : y2.fromTo(f, "var(--opacity)", 0), h2 && !j) {
                const o3 = r();
                o3.addElement(a(h2).querySelector(".button-text")).fromTo("transform", `translateX(${$})`, `translateX(${(b ? -124 : 124) + "px"})`), n4.addAnimation(o3);
              }
            } else l3 || s3.fromTo("transform", `translateX(${$})`, `translateX(${u})`).fromTo(f, 0.99, 0).afterClearStyles([p, f]), d2.fromTo("transform", `translateX(${$})`, `translateX(${u})`).afterClearStyles([p, f]), X2.afterClearStyles([f]), s3.afterClearStyles([f]), e3.afterClearStyles([f]);
          }));
        }
        return k;
      } catch (t) {
        throw t;
      }
    };
    c = 10;
  }
});

export {
  a,
  l,
  init_p_Dvyv9SMk
};
//# debugId=9ee1dbbc-6981-5a7f-86b4-9bab78a85509
//# sourceMappingURL=chunk-WNLFHCZN.js.map
