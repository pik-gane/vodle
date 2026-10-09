import {
  Keyboard,
  KeyboardResize,
  init_keyboard_Cmqp5iZD
} from "./chunk-VYSD5BUA.js";
import {
  doc,
  init_helpers_BJqKF1pr,
  win
} from "./chunk-LEFG5EZ6.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/keyboard-controller-B2NoF7bV.js
var getResizeContainer, getResizeContainerHeight, createKeyboardController;
var init_keyboard_controller_B2NoF7bV = __esm({
  "node_modules/@ionic/core/dist/esm/keyboard-controller-B2NoF7bV.js"() {
    init_helpers_BJqKF1pr();
    init_keyboard_Cmqp5iZD();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getResizeContainer = (resizeMode) => {
      if (doc === void 0 || resizeMode === KeyboardResize.None || resizeMode === void 0) {
        return null;
      }
      const ionApp = doc.querySelector("ion-app");
      return ionApp ?? doc.body;
    };
    getResizeContainerHeight = (resizeMode) => {
      const containerElement = getResizeContainer(resizeMode);
      return containerElement === null ? 0 : containerElement.clientHeight;
    };
    createKeyboardController = (keyboardChangeCallback) => __async(null, null, function* () {
      let keyboardWillShowHandler;
      let keyboardWillHideHandler;
      let keyboardVisible;
      let initialResizeContainerHeight;
      const init = () => __async(null, null, function* () {
        const resizeOptions = yield Keyboard.getResizeMode();
        const resizeMode = resizeOptions === void 0 ? void 0 : resizeOptions.mode;
        keyboardWillShowHandler = () => {
          if (initialResizeContainerHeight === void 0) {
            initialResizeContainerHeight = getResizeContainerHeight(resizeMode);
          }
          keyboardVisible = true;
          fireChangeCallback(keyboardVisible, resizeMode);
        };
        keyboardWillHideHandler = () => {
          keyboardVisible = false;
          fireChangeCallback(keyboardVisible, resizeMode);
        };
        win?.addEventListener("keyboardWillShow", keyboardWillShowHandler);
        win?.addEventListener("keyboardWillHide", keyboardWillHideHandler);
      });
      const fireChangeCallback = (state, resizeMode) => {
        if (keyboardChangeCallback) {
          keyboardChangeCallback(state, createResizePromiseIfNeeded(resizeMode));
        }
      };
      const createResizePromiseIfNeeded = (resizeMode) => {
        if (
          /**
           * If we are in an SSR environment then there is
           * no window to resize. Additionally, if there
           * is no resize mode or the resize mode is "None"
           * then initialResizeContainerHeight will be 0
           */
          initialResizeContainerHeight === 0 || /**
           * If the keyboard is closed before the webview resizes initially
           * then the webview will never resize.
           */
          initialResizeContainerHeight === getResizeContainerHeight(resizeMode)
        ) {
          return;
        }
        const containerElement = getResizeContainer(resizeMode);
        if (containerElement === null) {
          return;
        }
        return new Promise((resolve) => {
          const callback = () => {
            if (containerElement.clientHeight === initialResizeContainerHeight) {
              ro.disconnect();
              resolve();
            }
          };
          const ro = new ResizeObserver(callback);
          ro.observe(containerElement);
        });
      };
      const destroy = () => {
        win?.removeEventListener("keyboardWillShow", keyboardWillShowHandler);
        win?.removeEventListener("keyboardWillHide", keyboardWillHideHandler);
        keyboardWillShowHandler = keyboardWillHideHandler = void 0;
      };
      const isKeyboardVisible = () => keyboardVisible;
      yield init();
      return { init, destroy, isKeyboardVisible };
    });
  }
});

export {
  createKeyboardController,
  init_keyboard_controller_B2NoF7bV
};
//# debugId=00918094-c3bf-5d4d-b071-488374f7c66c
//# sourceMappingURL=chunk-XVMV6EZN.js.map
