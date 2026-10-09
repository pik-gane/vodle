import {
  hapticSelectionChanged,
  hapticSelectionEnd,
  hapticSelectionStart,
  init_haptic_WXfMCob9
} from "./chunk-XHGNMG47.js";
import {
  createGesture,
  init_index_BmLuEdV7
} from "./chunk-OTRSMIBG.js";
import {
  init_index_BpRUsN_W,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/button-active-DVk40Sjl.js
var createButtonActiveGesture;
var init_button_active_DVk40Sjl = __esm({
  "node_modules/@ionic/core/dist/esm/button-active-DVk40Sjl.js"() {
    init_index_BpRUsN_W();
    init_haptic_WXfMCob9();
    init_index_BmLuEdV7();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    createButtonActiveGesture = (el, isButton) => {
      let currentTouchedButton;
      let initialTouchedButton;
      const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
        if (typeof document === "undefined") {
          return;
        }
        const target = document.elementFromPoint(x, y);
        if (!target || !isButton(target) || target.disabled) {
          clearActiveButton();
          return;
        }
        if (target !== currentTouchedButton) {
          clearActiveButton();
          setActiveButton(target, hapticFeedbackFn);
        }
      };
      const setActiveButton = (button, hapticFeedbackFn) => {
        currentTouchedButton = button;
        if (!initialTouchedButton) {
          initialTouchedButton = currentTouchedButton;
        }
        const buttonToModify = currentTouchedButton;
        writeTask(() => buttonToModify.classList.add("ion-activated"));
        hapticFeedbackFn();
      };
      const clearActiveButton = (dispatchClick = false) => {
        if (!currentTouchedButton) {
          return;
        }
        const buttonToModify = currentTouchedButton;
        writeTask(() => buttonToModify.classList.remove("ion-activated"));
        if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
          currentTouchedButton.click();
        }
        currentTouchedButton = void 0;
      };
      return createGesture({
        el,
        gestureName: "buttonActiveDrag",
        threshold: 0,
        onStart: (ev) => activateButtonAtPoint(ev.currentX, ev.currentY, hapticSelectionStart),
        onMove: (ev) => activateButtonAtPoint(ev.currentX, ev.currentY, hapticSelectionChanged),
        onEnd: () => {
          clearActiveButton(true);
          hapticSelectionEnd();
          initialTouchedButton = void 0;
        }
      });
    };
  }
});

export {
  createButtonActiveGesture,
  init_button_active_DVk40Sjl
};
//# debugId=bc563003-6a92-598a-9b11-88ea6e698424
//# sourceMappingURL=chunk-ULBNWDRV.js.map
