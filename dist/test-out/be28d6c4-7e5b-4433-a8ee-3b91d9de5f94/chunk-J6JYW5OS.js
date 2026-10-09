import {
  init_index_BpRUsN_W,
  printIonError
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/input.utils-DZY_K8Po.js
var getCounterText, defaultCounterFormatter;
var init_input_utils_DZY_K8Po = __esm({
  "node_modules/@ionic/core/dist/esm/input.utils-DZY_K8Po.js"() {
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getCounterText = (value, maxLength, counterFormatter) => {
      const valueLength = value == null ? 0 : value.toString().length;
      const defaultCounterText = defaultCounterFormatter(valueLength, maxLength);
      if (counterFormatter === void 0) {
        return defaultCounterText;
      }
      try {
        return counterFormatter(valueLength, maxLength);
      } catch (e) {
        printIonError("[ion-input] - Exception in provided `counterFormatter`:", e);
        return defaultCounterText;
      }
    };
    defaultCounterFormatter = (length, maxlength) => {
      return `${length} / ${maxlength}`;
    };
  }
});

export {
  getCounterText,
  init_input_utils_DZY_K8Po
};
//# debugId=c696ea14-ccf6-5f89-bd8a-7850983e0c23
//# sourceMappingURL=chunk-J6JYW5OS.js.map
