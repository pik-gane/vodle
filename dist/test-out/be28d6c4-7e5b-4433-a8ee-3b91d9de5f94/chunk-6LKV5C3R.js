import {
  createColorClasses,
  init_theme_byZM6qHV
} from "./chunk-VEPFSKM7.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-text.entry.js
var textCss, Text;
var init_ion_text_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-text.entry.js"() {
    init_index_BpRUsN_W();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    textCss = () => `:host(.ion-color){color:var(--ion-color-base)}`;
    Text = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "b6f604df1b7aa5705a5b9a458e669a6a921c02a1", class: createColorClasses(this.color, {
          [mode]: true
        }) }, h("slot", { key: "055d07b024a6554dfcf959fc8ed7b405e2730af2" }));
      }
    };
    Text.style = textCss();
  }
});
init_ion_text_entry();
export {
  Text as ion_text
};
//# debugId=1c727a01-10ae-537a-a7a6-55882bfe26d8
//# sourceMappingURL=chunk-6LKV5C3R.js.map
