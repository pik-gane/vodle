import {
  getCapacitor,
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/keyboard-Cmqp5iZD.js
var ExceptionCode, KeyboardResize, Keyboard;
var init_keyboard_Cmqp5iZD = __esm({
  "node_modules/@ionic/core/dist/esm/keyboard-Cmqp5iZD.js"() {
    init_capacitor_CHJaJ9aX();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    (function(ExceptionCode2) {
      ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
      ExceptionCode2["Unavailable"] = "UNAVAILABLE";
    })(ExceptionCode || (ExceptionCode = {}));
    (function(KeyboardResize2) {
      KeyboardResize2["Body"] = "body";
      KeyboardResize2["Ionic"] = "ionic";
      KeyboardResize2["Native"] = "native";
      KeyboardResize2["None"] = "none";
    })(KeyboardResize || (KeyboardResize = {}));
    Keyboard = {
      getEngine() {
        const capacitor = getCapacitor();
        if (capacitor?.isPluginAvailable("Keyboard")) {
          return capacitor.Plugins.Keyboard;
        }
        return void 0;
      },
      getResizeMode() {
        const engine = this.getEngine();
        if (!engine?.getResizeMode) {
          return Promise.resolve(void 0);
        }
        return engine.getResizeMode().catch((e) => {
          if (e.code === ExceptionCode.Unimplemented) {
            return void 0;
          }
          throw e;
        });
      }
    };
  }
});

export {
  KeyboardResize,
  Keyboard,
  init_keyboard_Cmqp5iZD
};
//# debugId=6d3d8f7b-543c-5294-8d4f-6768fdfcf4da
//# sourceMappingURL=chunk-VYSD5BUA.js.map
