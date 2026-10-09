import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/focus-visible-BmVRXR1y.js
var ION_FOCUSED, ION_FOCUSABLE, FOCUS_KEYS, startFocusVisible;
var init_focus_visible_BmVRXR1y = __esm({
  "node_modules/@ionic/core/dist/esm/focus-visible-BmVRXR1y.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    ION_FOCUSED = "ion-focused";
    ION_FOCUSABLE = "ion-focusable";
    FOCUS_KEYS = [
      "Tab",
      "ArrowDown",
      "Space",
      "Escape",
      " ",
      "Shift",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "Home",
      "End"
    ];
    startFocusVisible = (rootEl) => {
      let currentFocus = [];
      let keyboardMode = true;
      const ref = rootEl ? rootEl.shadowRoot : document;
      const root = rootEl ? rootEl : document.body;
      const setFocus = (elements) => {
        currentFocus.forEach((el) => el.classList.remove(ION_FOCUSED));
        elements.forEach((el) => el.classList.add(ION_FOCUSED));
        currentFocus = elements;
      };
      const pointerDown = () => {
        keyboardMode = false;
        setFocus([]);
      };
      const onKeydown = (ev) => {
        keyboardMode = FOCUS_KEYS.includes(ev.key);
        if (!keyboardMode) {
          setFocus([]);
        }
      };
      const onFocusin = (ev) => {
        if (keyboardMode && ev.composedPath !== void 0) {
          const toFocus = ev.composedPath().filter((el) => {
            if (el.classList) {
              return el.classList.contains(ION_FOCUSABLE);
            }
            return false;
          });
          setFocus(toFocus);
        }
      };
      const onFocusout = () => {
        if (ref.activeElement === root) {
          setFocus([]);
        }
      };
      ref.addEventListener("keydown", onKeydown);
      ref.addEventListener("focusin", onFocusin);
      ref.addEventListener("focusout", onFocusout);
      ref.addEventListener("touchstart", pointerDown, { passive: true });
      ref.addEventListener("mousedown", pointerDown);
      const destroy = () => {
        ref.removeEventListener("keydown", onKeydown);
        ref.removeEventListener("focusin", onFocusin);
        ref.removeEventListener("focusout", onFocusout);
        ref.removeEventListener("touchstart", pointerDown);
        ref.removeEventListener("mousedown", pointerDown);
      };
      return {
        destroy,
        setFocus
      };
    };
  }
});

export {
  startFocusVisible,
  init_focus_visible_BmVRXR1y
};
//# debugId=84db3223-64f5-59b0-8354-51d53076f161
//# sourceMappingURL=chunk-BXZ5KVKO.js.map
