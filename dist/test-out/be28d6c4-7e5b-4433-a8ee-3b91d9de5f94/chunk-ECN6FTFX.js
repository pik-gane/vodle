import {
  doc,
  init_helpers_BJqKF1pr,
  pointerCoord
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/index-Clv8QC5L.js
var startTapClick, getActivatableTarget, isInstant, getRippleEffect, ACTIVATED, ADD_ACTIVATED_DEFERS, CLEAR_STATE_DEFERS;
var init_index_Clv8QC5L = __esm({
  "node_modules/@ionic/core/dist/esm/index-Clv8QC5L.js"() {
    init_helpers_BJqKF1pr();
    init_index_BpRUsN_W();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    startTapClick = (config) => {
      if (doc === void 0) {
        return;
      }
      let lastActivated = 0;
      let activatableEle;
      let activeRipple;
      let activeDefer;
      const useRippleEffect = config.getBoolean("animated", true) && config.getBoolean("rippleEffect", true);
      const clearDefers = /* @__PURE__ */ new WeakMap();
      const cancelActive = () => {
        if (activeDefer)
          clearTimeout(activeDefer);
        activeDefer = void 0;
        if (activatableEle) {
          removeActivated(false);
          activatableEle = void 0;
        }
      };
      const pointerDown = (ev) => {
        if (activatableEle || ev.button === 2) {
          return;
        }
        setActivatedElement(getActivatableTarget(ev), ev);
      };
      const pointerUp = (ev) => {
        setActivatedElement(void 0, ev);
      };
      const setActivatedElement = (el, ev) => {
        if (el && el === activatableEle) {
          return;
        }
        if (activeDefer)
          clearTimeout(activeDefer);
        activeDefer = void 0;
        const { x, y } = pointerCoord(ev);
        if (activatableEle) {
          if (clearDefers.has(activatableEle)) {
            throw new Error("internal error");
          }
          if (!activatableEle.classList.contains(ACTIVATED)) {
            addActivated(activatableEle, x, y);
          }
          removeActivated(true);
        }
        if (el) {
          const deferId = clearDefers.get(el);
          if (deferId) {
            clearTimeout(deferId);
            clearDefers.delete(el);
          }
          el.classList.remove(ACTIVATED);
          const callback = () => {
            addActivated(el, x, y);
            activeDefer = void 0;
          };
          if (isInstant(el)) {
            callback();
          } else {
            activeDefer = setTimeout(callback, ADD_ACTIVATED_DEFERS);
          }
        }
        activatableEle = el;
      };
      const addActivated = (el, x, y) => {
        lastActivated = Date.now();
        el.classList.add(ACTIVATED);
        if (!useRippleEffect)
          return;
        const rippleEffect = getRippleEffect(el);
        if (rippleEffect !== null) {
          removeRipple();
          activeRipple = rippleEffect.addRipple(x, y);
        }
      };
      const removeRipple = () => {
        if (activeRipple !== void 0) {
          activeRipple.then((remove) => remove());
          activeRipple = void 0;
        }
      };
      const removeActivated = (smooth) => {
        removeRipple();
        const active = activatableEle;
        if (!active) {
          return;
        }
        const time = CLEAR_STATE_DEFERS - Date.now() + lastActivated;
        if (smooth && time > 0 && !isInstant(active)) {
          const deferId = setTimeout(() => {
            active.classList.remove(ACTIVATED);
            clearDefers.delete(active);
          }, CLEAR_STATE_DEFERS);
          clearDefers.set(active, deferId);
        } else {
          active.classList.remove(ACTIVATED);
        }
      };
      doc.addEventListener("ionGestureCaptured", cancelActive);
      doc.addEventListener("pointerdown", pointerDown, true);
      doc.addEventListener("pointerup", pointerUp, true);
      doc.addEventListener("pointercancel", cancelActive, true);
    };
    getActivatableTarget = (ev) => {
      if (ev.composedPath !== void 0) {
        const path = ev.composedPath();
        for (let i = 0; i < path.length - 2; i++) {
          const el = path[i];
          if (!(el instanceof ShadowRoot) && el.classList.contains("ion-activatable")) {
            return el;
          }
        }
      } else {
        return ev.target.closest(".ion-activatable");
      }
    };
    isInstant = (el) => {
      return el.classList.contains("ion-activatable-instant");
    };
    getRippleEffect = (el) => {
      if (el.shadowRoot) {
        const ripple = el.shadowRoot.querySelector("ion-ripple-effect");
        if (ripple) {
          return ripple;
        }
      }
      return el.querySelector("ion-ripple-effect");
    };
    ACTIVATED = "ion-activated";
    ADD_ACTIVATED_DEFERS = 100;
    CLEAR_STATE_DEFERS = 150;
  }
});
init_index_Clv8QC5L();
export {
  startTapClick
};
//# debugId=82cf061a-772d-56c0-8abd-26c389b8e01f
//# sourceMappingURL=chunk-ECN6FTFX.js.map
