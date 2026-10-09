import {
  init_dir_Dojwmvde,
  isRTL
} from "./chunk-Z6RQ22J2.js";
import {
  init_index_BpRUsN_W,
  printIonError
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/helpers-BJqKF1pr.js
var win, doc, transitionEndAsync, transitionEnd, componentOnReady, hasLazyBuild, inheritAttributes, ariaAttributes, inheritAriaAttributes, addEventListener, removeEventListener, onCustomPropertyChange, getElementRoot, raf, hasShadowDom, focusVisibleElement, renderHiddenInput, clamp, assert, pointerCoord, isEndSide, debounceEvent, debounce, shallowEqualStringMap, isSafeNumber;
var init_helpers_BJqKF1pr = __esm({
  "node_modules/@ionic/core/dist/esm/helpers-BJqKF1pr.js"() {
    init_index_BpRUsN_W();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    win = typeof window !== "undefined" ? window : void 0;
    doc = typeof document !== "undefined" ? document : void 0;
    transitionEndAsync = (el, expectedDuration = 0) => {
      return new Promise((resolve) => {
        transitionEnd(el, expectedDuration, resolve);
      });
    };
    transitionEnd = (el, expectedDuration = 0, callback) => {
      let unRegTrans;
      let animationTimeout;
      const opts = { passive: true };
      const ANIMATION_FALLBACK_TIMEOUT = 500;
      const unregister = () => {
        if (unRegTrans) {
          unRegTrans();
        }
      };
      const onTransitionEnd = (ev) => {
        if (ev === void 0 || el === ev.target) {
          unregister();
          callback(ev);
        }
      };
      if (el) {
        el.addEventListener("webkitTransitionEnd", onTransitionEnd, opts);
        el.addEventListener("transitionend", onTransitionEnd, opts);
        animationTimeout = setTimeout(onTransitionEnd, expectedDuration + ANIMATION_FALLBACK_TIMEOUT);
        unRegTrans = () => {
          if (animationTimeout !== void 0) {
            clearTimeout(animationTimeout);
            animationTimeout = void 0;
          }
          el.removeEventListener("webkitTransitionEnd", onTransitionEnd, opts);
          el.removeEventListener("transitionend", onTransitionEnd, opts);
        };
      }
      return unregister;
    };
    componentOnReady = (el, callback) => {
      if (el.componentOnReady) {
        el.componentOnReady().then((resolvedEl) => callback(resolvedEl));
      } else {
        raf(() => callback(el));
      }
    };
    hasLazyBuild = (stencilEl) => {
      return stencilEl.componentOnReady !== void 0;
    };
    inheritAttributes = (el, attributes = []) => {
      const attributeObject = {};
      attributes.forEach((attr) => {
        if (el.hasAttribute(attr)) {
          const value = el.getAttribute(attr);
          if (value !== null) {
            attributeObject[attr] = el.getAttribute(attr);
          }
          el.removeAttribute(attr);
        }
      });
      return attributeObject;
    };
    ariaAttributes = [
      "role",
      "aria-activedescendant",
      "aria-atomic",
      "aria-autocomplete",
      "aria-braillelabel",
      "aria-brailleroledescription",
      "aria-busy",
      "aria-checked",
      "aria-colcount",
      "aria-colindex",
      "aria-colindextext",
      "aria-colspan",
      "aria-controls",
      "aria-current",
      "aria-describedby",
      "aria-description",
      "aria-details",
      "aria-disabled",
      "aria-errormessage",
      "aria-expanded",
      "aria-flowto",
      "aria-haspopup",
      "aria-hidden",
      "aria-invalid",
      "aria-keyshortcuts",
      "aria-label",
      "aria-labelledby",
      "aria-level",
      "aria-live",
      "aria-multiline",
      "aria-multiselectable",
      "aria-orientation",
      "aria-owns",
      "aria-placeholder",
      "aria-posinset",
      "aria-pressed",
      "aria-readonly",
      "aria-relevant",
      "aria-required",
      "aria-roledescription",
      "aria-rowcount",
      "aria-rowindex",
      "aria-rowindextext",
      "aria-rowspan",
      "aria-selected",
      "aria-setsize",
      "aria-sort",
      "aria-valuemax",
      "aria-valuemin",
      "aria-valuenow",
      "aria-valuetext"
    ];
    inheritAriaAttributes = (el, ignoreList) => {
      let attributesToInherit = ariaAttributes;
      return inheritAttributes(el, attributesToInherit);
    };
    addEventListener = (el, eventName, callback, opts) => {
      return el.addEventListener(eventName, callback, opts);
    };
    removeEventListener = (el, eventName, callback, opts) => {
      return el.removeEventListener(eventName, callback, opts);
    };
    onCustomPropertyChange = (hostEl, property, callback, initialValue) => {
      const doc2 = win?.document;
      if (!doc2 || !hostEl || typeof ResizeObserver === "undefined") {
        return () => void 0;
      }
      const probe = doc2.createElement("div");
      probe.style.cssText = `position:fixed;visibility:hidden;pointer-events:none;top:0;left:0;width:0;height:var(${property},0px);`;
      hostEl.appendChild(probe);
      let lastHeight = initialValue;
      const observer = new ResizeObserver((entries) => {
        const { height } = entries[0].contentRect;
        if (lastHeight !== void 0 && height !== lastHeight) {
          callback(height);
        }
        lastHeight = height;
      });
      observer.observe(probe);
      return () => {
        observer.disconnect();
        probe.remove();
      };
    };
    getElementRoot = (el, fallback = el) => {
      return el.shadowRoot || fallback;
    };
    raf = (h) => {
      if (typeof __zone_symbol__requestAnimationFrame === "function") {
        return __zone_symbol__requestAnimationFrame(h);
      }
      if (typeof requestAnimationFrame === "function") {
        return requestAnimationFrame(h);
      }
      return setTimeout(h);
    };
    hasShadowDom = (el) => {
      return !!el.shadowRoot && !!el.attachShadow;
    };
    focusVisibleElement = (el) => {
      el.focus();
      if (el.classList.contains("ion-focusable")) {
        const app = el.closest("ion-app");
        if (app) {
          app.setFocus([el]);
        }
      }
    };
    renderHiddenInput = (always, container, name, value, disabled) => {
      {
        let input = container.querySelector("input.aux-input");
        if (!input) {
          input = container.ownerDocument.createElement("input");
          input.type = "hidden";
          input.classList.add("aux-input");
          container.appendChild(input);
        }
        input.disabled = disabled;
        input.name = name;
        input.value = value || "";
      }
    };
    clamp = (min, n, max) => {
      return Math.max(min, Math.min(n, max));
    };
    assert = (actual, reason) => {
      if (!actual) {
        const message = "ASSERT: " + reason;
        printIonError(message);
        debugger;
        throw new Error(message);
      }
    };
    pointerCoord = (ev) => {
      if (ev) {
        const changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
          const touch = changedTouches[0];
          return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== void 0) {
          return { x: ev.pageX, y: ev.pageY };
        }
      }
      return { x: 0, y: 0 };
    };
    isEndSide = (side, hostEl) => {
      const rtl = isRTL(hostEl);
      switch (side) {
        case "start":
          return rtl;
        case "end":
          return !rtl;
        default:
          throw new Error(`"${side}" is not a valid value for [side]. Use "start" or "end" instead.`);
      }
    };
    debounceEvent = (event, wait) => {
      const original = event._original || event;
      return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
      };
    };
    debounce = (func, wait = 0) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(func, wait, ...args);
      };
    };
    shallowEqualStringMap = (map1, map2) => {
      map1 ??= {};
      map2 ??= {};
      if (map1 === map2) {
        return true;
      }
      const keys1 = Object.keys(map1);
      if (keys1.length !== Object.keys(map2).length) {
        return false;
      }
      for (const k1 of keys1) {
        if (!(k1 in map2)) {
          return false;
        }
        if (map1[k1] !== map2[k1]) {
          return false;
        }
      }
      return true;
    };
    isSafeNumber = (input) => {
      return typeof input === "number" && !isNaN(input) && isFinite(input);
    };
  }
});

export {
  win,
  doc,
  transitionEndAsync,
  componentOnReady,
  hasLazyBuild,
  inheritAttributes,
  ariaAttributes,
  inheritAriaAttributes,
  addEventListener,
  removeEventListener,
  onCustomPropertyChange,
  getElementRoot,
  raf,
  hasShadowDom,
  focusVisibleElement,
  renderHiddenInput,
  clamp,
  assert,
  pointerCoord,
  isEndSide,
  debounceEvent,
  debounce,
  shallowEqualStringMap,
  isSafeNumber,
  init_helpers_BJqKF1pr
};
//# debugId=a5212c78-a423-53d7-b170-2d44763d7389
//# sourceMappingURL=chunk-LEFG5EZ6.js.map
