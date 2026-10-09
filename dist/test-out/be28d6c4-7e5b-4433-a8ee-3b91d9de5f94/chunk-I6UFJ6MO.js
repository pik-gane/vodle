import {
  inheritAttributes,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
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
  getElement,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-picker-column-option.entry.js
var pickerColumnOptionIosCss, pickerColumnOptionMdCss, PickerColumnOption;
var init_ion_picker_column_option_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-picker-column-option.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    pickerColumnOptionIosCss = () => `.picker-column-option-button{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden}:host(.option-disabled){opacity:0.4}:host(.option-disabled) .picker-column-option-button{cursor:default}`;
    pickerColumnOptionMdCss = () => `.picker-column-option-button{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden}:host(.option-disabled){opacity:0.4}:host(.option-disabled) .picker-column-option-button{cursor:default}:host(.option-active),:host([part~=active]){color:var(--ion-color-primary, #0054e9)}:host(.ion-color.option-active),:host(.ion-color[part~=active]){color:var(--ion-color-base)}`;
    PickerColumnOption = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.pickerColumn = null;
        this.ariaLabel = null;
        this.disabled = false;
      }
      /**
       * The aria-label of the option has changed after the
       * first render and needs to be updated within the component.
       *
       * @param ariaLbl The new aria-label value.
       */
      onAriaLabelChange(ariaLbl) {
        this.ariaLabel = ariaLbl;
      }
      componentWillLoad() {
        const inheritedAttributes = inheritAttributes(this.el, ["aria-label"]);
        this.ariaLabel = inheritedAttributes["aria-label"] || null;
      }
      connectedCallback() {
        this.pickerColumn = this.el.closest("ion-picker-column");
      }
      disconnectedCallback() {
        this.pickerColumn = null;
      }
      /**
       * The column options can load at any time
       * so the options needs to tell the
       * parent picker column when it is loaded
       * so the picker column can ensure it is
       * centered in the view.
       *
       * We intentionally run this for every
       * option. If we only ran this from
       * the selected option then if the newly
       * loaded options were not selected then
       * scrollActiveItemIntoView would not be called.
       */
      componentDidLoad() {
        const { pickerColumn } = this;
        if (pickerColumn !== null) {
          pickerColumn.scrollActiveItemIntoView();
        }
      }
      /**
       * When an option is clicked, update the
       * parent picker column value. This
       * component will handle centering the option
       * in the column view.
       */
      onClick() {
        const { pickerColumn } = this;
        if (pickerColumn !== null) {
          pickerColumn.setValue(this.value);
        }
      }
      render() {
        const { color, disabled, ariaLabel } = this;
        const mode = getIonMode(this);
        return h(Host, { key: "81f1938e0114392a6e035442b8bc9fcdf73fda84", class: createColorClasses(color, {
          [mode]: true,
          ["option-disabled"]: disabled
        }) }, h("div", { key: "b0bb84fd39ea38ea3037ad43c6be8e8dfca2e7d1", class: "picker-column-option-button", role: "button", "aria-label": ariaLabel, onClick: () => this.onClick() }, h("slot", { key: "e0305b721618aef05823032ccd58214b0f184ca9" })));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "aria-label": [{
            "onAriaLabelChange": 0
          }]
        };
      }
    };
    PickerColumnOption.style = {
      ios: pickerColumnOptionIosCss(),
      md: pickerColumnOptionMdCss()
    };
  }
});
init_ion_picker_column_option_entry();
export {
  PickerColumnOption as ion_picker_column_option
};
//# debugId=1cadd2c6-c9f6-5215-9387-8ea811ae4492
//# sourceMappingURL=chunk-I6UFJ6MO.js.map
