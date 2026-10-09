import {
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/item-multiple-inputs-Bd2LO7qK.js
var createItemMultipleInputsObserver;
var init_item_multiple_inputs_Bd2LO7qK = __esm({
  "node_modules/@ionic/core/dist/esm/item-multiple-inputs-Bd2LO7qK.js"() {
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    createItemMultipleInputsObserver = (el, onChange, classNames = ["item-multiple-inputs"]) => {
      const item = el.closest("ion-item");
      if (!item || false || typeof MutationObserver === "undefined") {
        return void 0;
      }
      const readClasses = () => classNames.map((name) => item.classList.contains(name)).join(",");
      let previousClasses = readClasses();
      const observer = new MutationObserver(() => {
        const currentClasses = readClasses();
        if (currentClasses !== previousClasses) {
          previousClasses = currentClasses;
          onChange();
        }
      });
      observer.observe(item, { attributes: true, attributeFilter: ["class"] });
      return observer;
    };
  }
});

export {
  createItemMultipleInputsObserver,
  init_item_multiple_inputs_Bd2LO7qK
};
//# debugId=f6ff314a-7c76-51d6-98d6-0758a4624f5d
//# sourceMappingURL=chunk-SIOF2F5B.js.map
