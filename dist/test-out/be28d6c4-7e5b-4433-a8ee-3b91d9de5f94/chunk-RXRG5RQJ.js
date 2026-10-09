import {
  Keyboard,
  init_keyboard_Cmqp5iZD
} from "./chunk-VYSD5BUA.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/keyboard-B4Y-Gph8.js
var KEYBOARD_DID_OPEN, KEYBOARD_DID_CLOSE, KEYBOARD_THRESHOLD, previousVisualViewport, currentVisualViewport, keyboardOpen, resetKeyboardAssist, startKeyboardAssist, startNativeListeners, setKeyboardOpen, setKeyboardClose, keyboardDidOpen, keyboardDidResize, keyboardDidClose, fireKeyboardOpenEvent, fireKeyboardCloseEvent, trackViewportChanges, copyVisualViewport;
var init_keyboard_B4Y_Gph8 = __esm({
  "node_modules/@ionic/core/dist/esm/keyboard-B4Y-Gph8.js"() {
    init_keyboard_Cmqp5iZD();
    init_capacitor_CHJaJ9aX();
    init_helpers_BJqKF1pr();
    init_index_BpRUsN_W();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    KEYBOARD_DID_OPEN = "ionKeyboardDidShow";
    KEYBOARD_DID_CLOSE = "ionKeyboardDidHide";
    KEYBOARD_THRESHOLD = 150;
    previousVisualViewport = {};
    currentVisualViewport = {};
    keyboardOpen = false;
    resetKeyboardAssist = () => {
      previousVisualViewport = {};
      currentVisualViewport = {};
      keyboardOpen = false;
    };
    startKeyboardAssist = (win) => {
      const nativeEngine = Keyboard.getEngine();
      if (nativeEngine) {
        startNativeListeners(win);
      } else {
        if (!win.visualViewport) {
          return;
        }
        currentVisualViewport = copyVisualViewport(win.visualViewport);
        win.visualViewport.onresize = () => {
          trackViewportChanges(win);
          if (keyboardDidOpen() || keyboardDidResize(win)) {
            setKeyboardOpen(win);
          } else if (keyboardDidClose(win)) {
            setKeyboardClose(win);
          }
        };
      }
    };
    startNativeListeners = (win) => {
      win.addEventListener("keyboardDidShow", (ev) => setKeyboardOpen(win, ev));
      win.addEventListener("keyboardDidHide", () => setKeyboardClose(win));
    };
    setKeyboardOpen = (win, ev) => {
      fireKeyboardOpenEvent(win, ev);
      keyboardOpen = true;
    };
    setKeyboardClose = (win) => {
      fireKeyboardCloseEvent(win);
      keyboardOpen = false;
    };
    keyboardDidOpen = () => {
      const scaledHeightDifference = (previousVisualViewport.height - currentVisualViewport.height) * currentVisualViewport.scale;
      return !keyboardOpen && previousVisualViewport.width === currentVisualViewport.width && scaledHeightDifference > KEYBOARD_THRESHOLD;
    };
    keyboardDidResize = (win) => {
      return keyboardOpen && !keyboardDidClose(win);
    };
    keyboardDidClose = (win) => {
      return keyboardOpen && currentVisualViewport.height === win.innerHeight;
    };
    fireKeyboardOpenEvent = (win, nativeEv) => {
      const keyboardHeight = nativeEv ? nativeEv.keyboardHeight : win.innerHeight - currentVisualViewport.height;
      const ev = new CustomEvent(KEYBOARD_DID_OPEN, {
        detail: { keyboardHeight }
      });
      win.dispatchEvent(ev);
    };
    fireKeyboardCloseEvent = (win) => {
      const ev = new CustomEvent(KEYBOARD_DID_CLOSE);
      win.dispatchEvent(ev);
    };
    trackViewportChanges = (win) => {
      previousVisualViewport = __spreadValues({}, currentVisualViewport);
      currentVisualViewport = copyVisualViewport(win.visualViewport);
    };
    copyVisualViewport = (visualViewport) => {
      return {
        width: Math.round(visualViewport.width),
        height: Math.round(visualViewport.height),
        offsetTop: visualViewport.offsetTop,
        offsetLeft: visualViewport.offsetLeft,
        pageTop: visualViewport.pageTop,
        pageLeft: visualViewport.pageLeft,
        scale: visualViewport.scale
      };
    };
  }
});

export {
  KEYBOARD_DID_OPEN,
  KEYBOARD_DID_CLOSE,
  resetKeyboardAssist,
  startKeyboardAssist,
  setKeyboardOpen,
  setKeyboardClose,
  keyboardDidOpen,
  keyboardDidResize,
  keyboardDidClose,
  trackViewportChanges,
  copyVisualViewport,
  init_keyboard_B4Y_Gph8
};
//# debugId=a2ba40b8-a932-5691-b016-9e9239ed4640
//# sourceMappingURL=chunk-RXRG5RQJ.js.map
