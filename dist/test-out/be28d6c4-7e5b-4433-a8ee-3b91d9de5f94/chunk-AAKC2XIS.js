import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/components/p-Ct2aBEue.js
var n, e, u, f, a, h, $, b, x, A, L, B, T, _, F, U, D, W, V, H, P, q, z, J, Y, cn, un;
var init_p_Ct2aBEue = __esm({
  "node_modules/@ionic/core/components/p-Ct2aBEue.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    n = class {
      constructor() {
        this.m = /* @__PURE__ */ new Map();
      }
      reset(t3) {
        this.m = new Map(Object.entries(t3));
      }
      get(t3, n4) {
        const e2 = this.m.get(t3);
        return void 0 !== e2 ? e2 : n4;
      }
      getBoolean(t3, n4 = false) {
        const e2 = this.m.get(t3);
        return void 0 === e2 ? n4 : "string" == typeof e2 ? "true" === e2 : !!e2;
      }
      getNumber(t3, n4) {
        const e2 = parseFloat(this.m.get(t3));
        return isNaN(e2) ? void 0 !== n4 ? n4 : NaN : e2;
      }
      set(t3, n4) {
        this.m.set(t3, n4);
      }
    };
    e = new n();
    !(function(t3) {
      t3.OFF = "OFF", t3.ERROR = "ERROR", t3.WARN = "WARN", t3.DEBUG = "DEBUG";
    })(u || (u = {}));
    f = { [u.OFF]: 0, [u.ERROR]: 1, [u.WARN]: 2, [u.DEBUG]: 3 };
    a = (t3) => {
      const n4 = String(e.get("logLevel", u.WARN)).toUpperCase();
      return f[n4] >= f[t3];
    };
    h = (t3, ...n4) => {
      if (a(u.ERROR)) return console.error(`[Ionic Error]: ${t3}`, ...n4);
    };
    $ = ((t3) => (t3.Undefined = "undefined", t3.Null = "null", t3.String = "string", t3.Number = "number", t3.SpecialNumber = "number", t3.Boolean = "boolean", t3.BigInt = "bigint", t3))($ || {});
    b = ((t3) => (t3.Array = "array", t3.Date = "date", t3.Map = "map", t3.Object = "object", t3.RegularExpression = "regexp", t3.Set = "set", t3.Channel = "channel", t3.Symbol = "symbol", t3))(b || {});
    x = (t3, n4) => (0, console.error)(t3, n4);
    A = "undefined" != typeof window ? window : {};
    L = A.HTMLElement || class {
    };
    B = { i: 0, u: "", jmp: (t3) => t3(), raf: (t3) => requestAnimationFrame(t3), ael: (t3, n4, e2, o) => t3.addEventListener(n4, e2, o), rel: (t3, n4, e2, o) => t3.removeEventListener(n4, e2, o), ce: (t3, n4) => new CustomEvent(t3, n4) };
    T = (() => {
      var t3;
      let n4 = false;
      try {
        null == (t3 = A.document) || t3.addEventListener("e", null, Object.defineProperty({}, "passive", { get() {
          n4 = true;
        } }));
      } catch (t4) {
      }
      return n4;
    })();
    _ = (() => {
      try {
        return !!A.document.adoptedStyleSheets && (new CSSStyleSheet(), "function" == typeof new CSSStyleSheet().replaceSync);
      } catch (t3) {
      }
      return false;
    })();
    F = !!_ && (() => !!A.document && Object.getOwnPropertyDescriptor(A.document.adoptedStyleSheets, "length").writable)();
    U = false;
    D = [];
    W = [];
    V = () => {
      var t3;
      return (null == (t3 = A.document) ? void 0 : t3.hidden) ? setTimeout(q, 16) : B.raf(q);
    };
    H = (t3, n4) => (e2) => {
      t3.push(e2), U || (U = true, n4 && 4 & B.i ? z(q) : V());
    };
    P = (t3) => {
      for (let n4 = 0; n4 < t3.length; n4++) try {
        t3[n4](performance.now());
      } catch (t4) {
        x(t4);
      }
      t3.length = 0;
    };
    q = () => {
      P(D), P(W), (U = D.length > 0) && V();
    };
    z = (t3) => Promise.resolve(void 0).then(t3);
    J = H(D, false);
    Y = H(W, true);
    cn = "Capture";
    un = new RegExp(cn + "$");
  }
});

// node_modules/@ionic/core/components/p-ZjP4CjeZ.js
var d;
var init_p_ZjP4CjeZ = __esm({
  "node_modules/@ionic/core/components/p-ZjP4CjeZ.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    d = "undefined" != typeof window ? window : void 0;
  }
});

// node_modules/@ionic/core/components/p-ChsJlFCQ.js
var t, i, n2, r;
var init_p_ChsJlFCQ = __esm({
  "node_modules/@ionic/core/components/p-ChsJlFCQ.js"() {
    init_p_Ct2aBEue();
    init_p_ZjP4CjeZ();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    i = (e2, o, i2) => {
      const n4 = o.startsWith("animation") ? (r3 = e2, void 0 === t && (t = void 0 === r3.style.animationName && void 0 !== r3.style.webkitAnimationName ? "-webkit-" : ""), t) : "";
      var r3;
      e2.style.setProperty(n4 + o, i2);
    };
    n2 = (e2 = [], o) => {
      if (void 0 !== o) {
        const t3 = Array.isArray(o) ? o : [o];
        return [...e2, ...t3];
      }
      return e2;
    };
    r = (t3) => {
      let r3, a2, s2, d2, f3, l2, c2, v, m, u2, p, y = [], g = [], A3 = [], b2 = false, C = {}, E = [], h2 = [], S = {}, k = 0, R = false, j = false, w = true, T2 = false, D2 = true, F2 = false;
      const W2 = t3, I = [], K = [], M = [], P2 = [], Z = [], x2 = [], B2 = [], q2 = [], z2 = [], G = [], H2 = [], J2 = "function" == typeof AnimationEffect || void 0 !== d && "function" == typeof d.AnimationEffect, L2 = "function" == typeof Element && "function" == typeof Element.prototype.animate && J2, N = () => H2, O = (e2, o) => {
        const t4 = o.findIndex(((o2) => o2.c === e2));
        t4 > -1 && o.splice(t4, 1);
      }, Q = (e2, o) => ((o?.oneTimeCallback ? K : I).push({ c: e2, o }), p), U2 = () => {
        L2 && (H2.forEach(((e2) => {
          e2.cancel();
        })), H2.length = 0);
      }, V2 = () => {
        x2.forEach(((e2) => {
          e2?.parentNode && e2.parentNode.removeChild(e2);
        })), x2.length = 0;
      }, X = () => void 0 !== f3 ? f3 : c2 ? c2.getFill() : "both", Y2 = () => void 0 !== v ? v : void 0 !== l2 ? l2 : c2 ? c2.getDirection() : "normal", $2 = () => R ? "linear" : void 0 !== s2 ? s2 : c2 ? c2.getEasing() : "linear", _2 = () => j ? 0 : void 0 !== m ? m : void 0 !== a2 ? a2 : c2 ? c2.getDuration() : 0, ee = () => void 0 !== d2 ? d2 : c2 ? c2.getIterations() : 1, oe = () => void 0 !== u2 ? u2 : void 0 !== r3 ? r3 : c2 ? c2.getDelay() : 0, te = () => {
        0 !== k && (k--, 0 === k && ((() => {
          z2.forEach(((e3) => e3())), G.forEach(((e3) => e3()));
          const e2 = w ? 1 : 0, o = E, t4 = h2, n4 = S;
          P2.forEach(((e3) => {
            const r4 = e3.classList;
            o.forEach(((e4) => r4.add(e4))), t4.forEach(((e4) => r4.remove(e4)));
            for (const o2 in n4) n4.hasOwnProperty(o2) && i(e3, o2, n4[o2]);
          })), m = void 0, v = void 0, u2 = void 0, I.forEach(((o2) => o2.c(e2, p))), K.forEach(((o2) => o2.c(e2, p))), K.length = 0, D2 = true, w && (T2 = true), w = true;
        })(), c2 && c2.animationFinish()));
      }, ie = () => {
        (() => {
          B2.forEach(((e3) => e3())), q2.forEach(((e3) => e3()));
          const e2 = g, o = A3, t4 = C;
          P2.forEach(((n4) => {
            const r4 = n4.classList;
            e2.forEach(((e3) => r4.add(e3))), o.forEach(((e3) => r4.remove(e3)));
            for (const e3 in t4) t4.hasOwnProperty(e3) && i(n4, e3, t4[e3]);
          }));
        })(), y.length > 0 && L2 && (P2.forEach(((e2) => {
          const o = e2.animate(y, { id: W2, delay: oe(), duration: _2(), easing: $2(), iterations: ee(), fill: X(), direction: Y2() });
          o.pause(), H2.push(o);
        })), H2.length > 0 && (H2[0].onfinish = () => {
          te();
        })), b2 = true;
      }, ne = (e2) => {
        e2 = Math.min(Math.max(e2, 0), 0.9999), L2 && H2.forEach(((o) => {
          o.currentTime = o.effect.getComputedTiming().delay + _2() * e2, o.pause();
        }));
      }, re = (e2) => {
        H2.forEach(((e3) => {
          e3.effect.updateTiming({ delay: oe(), duration: _2(), easing: $2(), iterations: ee(), fill: X(), direction: Y2() });
        })), void 0 !== e2 && ne(e2);
      }, ae = (e2 = false, o = true, t4) => (e2 && Z.forEach(((i2) => {
        i2.update(e2, o, t4);
      })), L2 && re(t4), p), se = () => {
        b2 && (L2 ? H2.forEach(((e2) => {
          e2.pause();
        })) : P2.forEach(((e2) => {
          i(e2, "animation-play-state", "paused");
        })), F2 = true);
      }, de = (e2) => new Promise(((o) => {
        e2?.sync && (j = true, Q((() => j = false), { oneTimeCallback: true })), b2 || ie(), T2 && (L2 && (ne(0), re()), T2 = false), D2 && (k = Z.length + 1, D2 = false);
        const t4 = () => {
          O(i2, K), o();
        }, i2 = () => {
          O(t4, M), o();
        };
        Q(i2, { oneTimeCallback: true }), M.push({ c: t4, o: { oneTimeCallback: true } }), Z.forEach(((e3) => {
          e3.play();
        })), L2 ? (H2.forEach(((e3) => {
          e3.play();
        })), 0 !== y.length && 0 !== P2.length || te()) : te(), F2 = false;
      })), fe = (e2, o) => {
        const t4 = y[0];
        return void 0 === t4 || void 0 !== t4.offset && 0 !== t4.offset ? y = [{ offset: 0, [e2]: o }, ...y] : t4[e2] = o, p;
      };
      return p = { parentAnimation: c2, elements: P2, childAnimations: Z, id: W2, animationFinish: te, from: fe, to: (e2, o) => {
        const t4 = y[y.length - 1];
        return void 0 === t4 || void 0 !== t4.offset && 1 !== t4.offset ? y = [...y, { offset: 1, [e2]: o }] : t4[e2] = o, p;
      }, fromTo: (e2, o, t4) => fe(e2, o).to(e2, t4), parent: (e2) => (c2 = e2, p), play: de, pause: () => (Z.forEach(((e2) => {
        e2.pause();
      })), se(), p), stop: () => {
        Z.forEach(((e2) => {
          e2.stop();
        })), b2 && (U2(), b2 = false), R = false, j = false, D2 = true, v = void 0, m = void 0, u2 = void 0, k = 0, T2 = false, w = true, F2 = false, M.forEach(((e2) => e2.c(0, p))), M.length = 0;
      }, destroy: (e2) => (Z.forEach(((o) => {
        o.destroy(e2);
      })), ((e3) => {
        U2(), e3 && V2();
      })(e2), P2.length = 0, Z.length = 0, y.length = 0, I.length = 0, K.length = 0, b2 = false, D2 = true, p), keyframes: (e2) => {
        const o = y !== e2;
        return y = e2, o && ((e3) => {
          L2 && N().forEach(((o2) => {
            const t4 = o2.effect;
            if (t4.setKeyframes) t4.setKeyframes(e3);
            else {
              const i2 = new KeyframeEffect(t4.target, e3, t4.getTiming());
              o2.effect = i2;
            }
          }));
        })(y), p;
      }, addAnimation: (e2) => {
        if (null != e2) if (Array.isArray(e2)) for (const o of e2) o.parent(p), Z.push(o);
        else e2.parent(p), Z.push(e2);
        return p;
      }, addElement: (o) => {
        if (null != o) if (1 === o.nodeType) P2.push(o);
        else if (o.length >= 0) for (let e2 = 0; e2 < o.length; e2++) P2.push(o[e2]);
        else h("createAnimation - Invalid addElement value.");
        return p;
      }, update: ae, fill: (e2) => (f3 = e2, ae(true), p), direction: (e2) => (l2 = e2, ae(true), p), iterations: (e2) => (d2 = e2, ae(true), p), duration: (e2) => (L2 || 0 !== e2 || (e2 = 1), a2 = e2, ae(true), p), easing: (e2) => (s2 = e2, ae(true), p), delay: (e2) => (r3 = e2, ae(true), p), getWebAnimations: N, getKeyframes: () => y, getFill: X, getDirection: Y2, getDelay: oe, getIterations: ee, getEasing: $2, getDuration: _2, afterAddRead: (e2) => (z2.push(e2), p), afterAddWrite: (e2) => (G.push(e2), p), afterClearStyles: (e2 = []) => {
        for (const o of e2) S[o] = "";
        return p;
      }, afterStyles: (e2 = {}) => (S = e2, p), afterRemoveClass: (e2) => (h2 = n2(h2, e2), p), afterAddClass: (e2) => (E = n2(E, e2), p), beforeAddRead: (e2) => (B2.push(e2), p), beforeAddWrite: (e2) => (q2.push(e2), p), beforeClearStyles: (e2 = []) => {
        for (const o of e2) C[o] = "";
        return p;
      }, beforeStyles: (e2 = {}) => (C = e2, p), beforeRemoveClass: (e2) => (A3 = n2(A3, e2), p), beforeAddClass: (e2) => (g = n2(g, e2), p), onFinish: Q, isRunning: () => 0 !== k && !F2, progressStart: (e2 = false, o) => (Z.forEach(((t4) => {
        t4.progressStart(e2, o);
      })), se(), R = e2, b2 || ie(), ae(false, true, o), p), progressStep: (e2) => (Z.forEach(((o) => {
        o.progressStep(e2);
      })), ne(e2), p), progressEnd: (e2, o, t4) => (R = false, Z.forEach(((i2) => {
        i2.progressEnd(e2, o, t4);
      })), void 0 !== t4 && (m = t4), T2 = false, w = true, 0 === e2 ? (v = "reverse" === Y2() ? "normal" : "reverse", "reverse" === v && (w = false), L2 ? (ae(), ne(1 - o)) : (u2 = (1 - o) * _2() * -1, ae(false, false))) : 1 === e2 && (L2 ? (ae(), ne(o)) : (u2 = o * _2() * -1, ae(false, false))), void 0 === e2 || c2 || de(), p) };
    };
  }
});

// node_modules/@ionic/core/components/p-B4IBdPVJ.js
var n3, f2;
var init_p_B4IBdPVJ = __esm({
  "node_modules/@ionic/core/components/p-B4IBdPVJ.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    n3 = (a2, i2) => {
      a2.componentOnReady ? a2.componentOnReady().then(((a3) => i2(a3))) : f2((() => i2(a2)));
    };
    f2 = (a2) => "function" == typeof __zone_symbol__requestAnimationFrame ? __zone_symbol__requestAnimationFrame(a2) : "function" == typeof requestAnimationFrame ? requestAnimationFrame(a2) : setTimeout(a2);
  }
});

// node_modules/@ionic/core/components/p-C7r5Gja6.js
var r2, t2, s, c, l, A2;
var init_p_C7r5Gja6 = __esm({
  "node_modules/@ionic/core/components/p-C7r5Gja6.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    r2 = "ionViewWillEnter";
    t2 = "ionViewDidEnter";
    s = "ionViewWillLeave";
    c = "ionViewDidLeave";
    l = "ionViewWillUnload";
    A2 = (n4) => {
      if (n4.classList.contains("ion-page")) return n4;
      return n4.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || n4;
    };
  }
});

export {
  e,
  init_p_Ct2aBEue,
  r,
  init_p_ChsJlFCQ,
  n3 as n,
  init_p_B4IBdPVJ,
  r2,
  t2 as t,
  s,
  c,
  l,
  A2 as A,
  init_p_C7r5Gja6
};
//# debugId=8d57b4c3-f772-58a0-8fde-ad5b71409c1f
//# sourceMappingURL=chunk-AAKC2XIS.js.map
