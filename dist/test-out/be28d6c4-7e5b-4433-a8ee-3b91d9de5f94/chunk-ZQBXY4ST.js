import {
  getOverlayLabelJustify,
  getOverlayLabelPlacement,
  init_overlay_control_label_BSQPZ79H
} from "./chunk-YYER5HYK.js";
import {
  init_select_option_render_BSDT9oSA,
  renderOptionLabel
} from "./chunk-MTZ3RR6I.js";
import {
  init_index_CK8uF0iB
} from "./chunk-CPN2CPEA.js";
import {
  init_overlays_DmDY_El7,
  safeCall
} from "./chunk-VQMD36Q3.js";
import {
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  getClassMap,
  init_theme_byZM6qHV
} from "./chunk-VEPFSKM7.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  forceUpdate,
  getElement,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-select-modal.entry.js
var ionicSelectModalMdCss, selectModalIosCss, selectModalMdCss, SelectModal;
var init_ion_select_modal_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-select-modal.entry.js"() {
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    init_overlay_control_label_BSQPZ79H();
    init_overlays_DmDY_El7();
    init_select_option_render_BSDT9oSA();
    init_theme_byZM6qHV();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    init_framework_delegate_CDjM1vRH();
    init_gesture_controller_B_gJaBk0();
    init_index_CK8uF0iB();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    ionicSelectModalMdCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-select-modal-ionic,.alert-radio-label-has-rich-content.sc-ion-select-modal-ionic,.alert-checkbox-label-has-rich-content.sc-ion-select-modal-ionic,.select-option-label-has-rich-content.sc-ion-select-modal-ionic{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-select-modal-ionic,.alert-radio-label-has-rich-content.sc-ion-select-modal-ionic,.alert-checkbox-label-has-rich-content.sc-ion-select-modal-ionic,.select-option-content.sc-ion-select-modal-ionic{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-select-modal-ionic,.alert-checkbox-label-text.sc-ion-select-modal-ionic,.alert-radio-label-text.sc-ion-select-modal-ionic,.select-option-label-text.sc-ion-select-modal-ionic{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-select-modal-ionic{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-select-modal-ionic:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-select-modal-ionic{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-select-modal-ionic::part(label),ion-radio.select-option-has-rich-content.sc-ion-select-modal-ionic [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-select-modal-ionic::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-select-modal-ionic [part~="label"],.select-option-content.sc-ion-select-modal-ionic{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-select-modal-ionic>ion-avatar.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>ion-avatar.sc-ion-select-modal-ionic{width:40px;height:40px}.select-option-start.sc-ion-select-modal-ionic>ion-icon.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>ion-icon.sc-ion-select-modal-ionic{font-size:24px}.select-option-start.sc-ion-select-modal-ionic>ion-img.sc-ion-select-modal-ionic,.select-option-start.sc-ion-select-modal-ionic>img.sc-ion-select-modal-ionic,.select-option-start.sc-ion-select-modal-ionic>svg.sc-ion-select-modal-ionic,.select-option-start.sc-ion-select-modal-ionic>ion-thumbnail.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>ion-img.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>img.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>svg.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>ion-thumbnail.sc-ion-select-modal-ionic{width:56px;height:56px}.select-option-start.sc-ion-select-modal-ionic>video.sc-ion-select-modal-ionic,.select-option-end.sc-ion-select-modal-ionic>video.sc-ion-select-modal-ionic{width:114px;height:56px}.sc-ion-select-modal-ionic-h{height:100%}ion-list.sc-ion-select-modal-ionic ion-radio.sc-ion-select-modal-ionic::part(container),ion-list.sc-ion-select-modal-ionic ion-radio.sc-ion-select-modal-ionic [part~="container"]{display:none}ion-list.sc-ion-select-modal-ionic ion-radio.sc-ion-select-modal-ionic::part(label),ion-list.sc-ion-select-modal-ionic ion-radio.sc-ion-select-modal-ionic [part~="label"]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-item.sc-ion-select-modal-ionic{--inner-border-width:0}.item-radio-checked.sc-ion-select-modal-ionic{--background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.08);--background-focused:var(--ion-color-primary, #0054e9);--background-focused-opacity:0.2;--background-hover:var(--ion-color-primary, #0054e9);--background-hover-opacity:0.12}.item-checkbox-checked.sc-ion-select-modal-ionic{--background-activated:var(--ion-item-color, var(--ion-text-color, #000));--background-focused:var(--ion-item-color, var(--ion-text-color, #000));--background-hover:var(--ion-item-color, var(--ion-text-color, #000));--color:var(--ion-color-primary, #0054e9)}`;
    selectModalIosCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-select-modal-ios,.alert-radio-label-has-rich-content.sc-ion-select-modal-ios,.alert-checkbox-label-has-rich-content.sc-ion-select-modal-ios,.select-option-label-has-rich-content.sc-ion-select-modal-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-select-modal-ios,.alert-radio-label-has-rich-content.sc-ion-select-modal-ios,.alert-checkbox-label-has-rich-content.sc-ion-select-modal-ios,.select-option-content.sc-ion-select-modal-ios{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-select-modal-ios,.alert-checkbox-label-text.sc-ion-select-modal-ios,.alert-radio-label-text.sc-ion-select-modal-ios,.select-option-label-text.sc-ion-select-modal-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-select-modal-ios{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-select-modal-ios:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-select-modal-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-select-modal-ios::part(label),ion-radio.select-option-has-rich-content.sc-ion-select-modal-ios [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-select-modal-ios::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-select-modal-ios [part~="label"],.select-option-content.sc-ion-select-modal-ios{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-select-modal-ios>ion-avatar.sc-ion-select-modal-ios,.select-option-start.sc-ion-select-modal-ios>ion-img.sc-ion-select-modal-ios,.select-option-start.sc-ion-select-modal-ios>ion-thumbnail.sc-ion-select-modal-ios,.select-option-start.sc-ion-select-modal-ios>img.sc-ion-select-modal-ios,.select-option-start.sc-ion-select-modal-ios>svg.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios>ion-avatar.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios>ion-img.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios>ion-thumbnail.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios>img.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios>svg.sc-ion-select-modal-ios{width:44px;height:44px}.select-option-start.sc-ion-select-modal-ios>ion-icon.sc-ion-select-modal-ios,.select-option-end.sc-ion-select-modal-ios>ion-icon.sc-ion-select-modal-ios{font-size:28px}.action-sheet-button-label-text.sc-ion-select-modal-ios{-ms-flex-pack:center;justify-content:center}.select-option-has-rich-content.sc-ion-select-modal-ios{-webkit-padding-end:16px;padding-inline-end:16px}.sc-ion-select-modal-ios-h{height:100%}ion-item.sc-ion-select-modal-ios{--inner-padding-end:0}ion-radio.sc-ion-select-modal-ios::after{bottom:0;position:absolute;width:calc(100% - 0.9375rem - 16px);border-width:0px 0px 0.55px 0px;border-style:solid;border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))));content:""}ion-radio.sc-ion-select-modal-ios::after{inset-inline-start:calc(0.9375rem + 16px)}`;
    selectModalMdCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-select-modal-md,.alert-radio-label-has-rich-content.sc-ion-select-modal-md,.alert-checkbox-label-has-rich-content.sc-ion-select-modal-md,.select-option-label-has-rich-content.sc-ion-select-modal-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-select-modal-md,.alert-radio-label-has-rich-content.sc-ion-select-modal-md,.alert-checkbox-label-has-rich-content.sc-ion-select-modal-md,.select-option-content.sc-ion-select-modal-md{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-select-modal-md,.alert-checkbox-label-text.sc-ion-select-modal-md,.alert-radio-label-text.sc-ion-select-modal-md,.select-option-label-text.sc-ion-select-modal-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-select-modal-md{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-select-modal-md:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-select-modal-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-select-modal-md::part(label),ion-radio.select-option-has-rich-content.sc-ion-select-modal-md [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-select-modal-md::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-select-modal-md [part~="label"],.select-option-content.sc-ion-select-modal-md{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-select-modal-md>ion-avatar.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>ion-avatar.sc-ion-select-modal-md{width:40px;height:40px}.select-option-start.sc-ion-select-modal-md>ion-icon.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>ion-icon.sc-ion-select-modal-md{font-size:24px}.select-option-start.sc-ion-select-modal-md>ion-img.sc-ion-select-modal-md,.select-option-start.sc-ion-select-modal-md>img.sc-ion-select-modal-md,.select-option-start.sc-ion-select-modal-md>svg.sc-ion-select-modal-md,.select-option-start.sc-ion-select-modal-md>ion-thumbnail.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>ion-img.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>img.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>svg.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>ion-thumbnail.sc-ion-select-modal-md{width:56px;height:56px}.select-option-start.sc-ion-select-modal-md>video.sc-ion-select-modal-md,.select-option-end.sc-ion-select-modal-md>video.sc-ion-select-modal-md{width:114px;height:56px}.sc-ion-select-modal-md-h{height:100%}ion-list.sc-ion-select-modal-md ion-radio.sc-ion-select-modal-md::part(container),ion-list.sc-ion-select-modal-md ion-radio.sc-ion-select-modal-md [part~="container"]{display:none}ion-list.sc-ion-select-modal-md ion-radio.sc-ion-select-modal-md::part(label),ion-list.sc-ion-select-modal-md ion-radio.sc-ion-select-modal-md [part~="label"]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-item.sc-ion-select-modal-md{--inner-border-width:0}.item-radio-checked.sc-ion-select-modal-md{--background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.08);--background-focused:var(--ion-color-primary, #0054e9);--background-focused-opacity:0.2;--background-hover:var(--ion-color-primary, #0054e9);--background-hover-opacity:0.12}.item-checkbox-checked.sc-ion-select-modal-md{--background-activated:var(--ion-item-color, var(--ion-text-color, #000));--background-focused:var(--ion-item-color, var(--ion-text-color, #000));--background-hover:var(--ion-item-color, var(--ion-text-color, #000));--color:var(--ion-color-primary, #0054e9)}`;
    SelectModal = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.pendingEnterTarget = null;
        this.cancelText = "Close";
        this.options = [];
      }
      closeModal() {
        const modal = this.el.closest("ion-modal");
        if (modal) {
          modal.dismiss();
        }
      }
      findOptionFromEvent(ev) {
        const { options } = this;
        return options.find((o) => o.value === ev.target.value);
      }
      getValues(ev) {
        const { multiple, options } = this;
        if (multiple) {
          return options.filter((o) => o.checked).map((o) => o.value);
        }
        const option = ev ? this.findOptionFromEvent(ev) : null;
        return option ? option.value : void 0;
      }
      callOptionHandler(ev) {
        const option = this.findOptionFromEvent(ev);
        const values = this.getValues(ev);
        if (option?.handler) {
          safeCall(option.handler, values);
        }
      }
      setChecked(ev) {
        const { multiple } = this;
        const option = this.findOptionFromEvent(ev);
        if (multiple && option) {
          option.checked = ev.detail.checked;
        }
      }
      renderRadioOptions() {
        const mode = getIonMode(this);
        const checked = this.options.filter((o) => o.checked).map((o) => o.value)[0];
        return h("ion-radio-group", { value: checked, onIonChange: (ev) => this.callOptionHandler(ev) }, this.options.map((option, index) => {
          const richOption = option;
          const hasRichContent = !!richOption.startContent || !!richOption.endContent || !!richOption.description;
          const optionLabelOptions = {
            id: `modal-option-${index}`,
            label: richOption.text,
            startContent: richOption.startContent,
            endContent: richOption.endContent,
            description: richOption.description
          };
          const defaultLabelPlacement = getOverlayLabelPlacement(mode, "radio", "modal");
          const defaultJustify = getOverlayLabelJustify(mode, "radio", "modal");
          return h("ion-item", {
            lines: "none",
            // TODO FW-4784
            disabled: option.disabled,
            class: __spreadValues({
              // TODO FW-4784
              "item-radio-checked": option.value === checked
            }, getClassMap(option.cssClass))
          }, h("ion-radio", { class: {
            "select-option-has-rich-content": hasRichContent
          }, value: option.value, disabled: option.disabled, justify: richOption.justify ?? defaultJustify, labelPlacement: richOption.labelPlacement ?? defaultLabelPlacement, onClick: () => this.closeModal(), onKeyDown: (ev) => {
            if (ev.key === "Enter" && !ev.repeat) {
              this.pendingEnterTarget = ev.currentTarget;
            }
          }, onKeyUp: (ev) => {
            if (ev.key === " ") {
              this.closeModal();
            } else if (ev.key === "Enter") {
              const shouldClose = this.pendingEnterTarget === ev.currentTarget;
              this.pendingEnterTarget = null;
              if (shouldClose) {
                this.closeModal();
              }
            }
          } }, renderOptionLabel(optionLabelOptions, "select-option-label")));
        }));
      }
      renderCheckboxOptions() {
        const mode = getIonMode(this);
        return this.options.map((option, index) => {
          const richOption = option;
          const hasRichContent = !!richOption.startContent || !!richOption.endContent || !!richOption.description;
          const optionLabelOptions = {
            id: `modal-option-${index}`,
            label: richOption.text,
            startContent: richOption.startContent,
            endContent: richOption.endContent,
            description: richOption.description
          };
          const defaultLabelPlacement = getOverlayLabelPlacement(mode, "checkbox", "modal");
          const defaultJustify = getOverlayLabelJustify(mode, "checkbox", "modal");
          return h("ion-item", {
            // TODO FW-4784
            disabled: option.disabled,
            class: __spreadValues({
              // TODO FW-4784
              "item-checkbox-checked": option.checked
            }, getClassMap(option.cssClass))
          }, h("ion-checkbox", { class: {
            "select-option-has-rich-content": hasRichContent
          }, value: option.value, disabled: option.disabled, checked: option.checked, justify: richOption.justify ?? defaultJustify, labelPlacement: richOption.labelPlacement ?? defaultLabelPlacement, onIonChange: (ev) => {
            this.setChecked(ev);
            this.callOptionHandler(ev);
            forceUpdate(this);
          } }, renderOptionLabel(optionLabelOptions, "select-option-label")));
        });
      }
      render() {
        return h(Host, { key: "791e95b985dd4b135db17a25fc678e9f8b73c597", class: getIonMode(this) }, h("ion-header", { key: "697d18eef394c4c11c73afe69b9eadd1bad97d38" }, h("ion-toolbar", { key: "036968824ad8771020fe2b7604a6e72b73efc8ae" }, this.header !== void 0 && h("ion-title", { key: "102e0346be83e879e733f9b410437b26216156aa" }, this.header), h("ion-buttons", { key: "436b997e990ce2f5e12e1651f8afc31ae231f7b0", slot: "end" }, h("ion-button", { key: "ee4ddfd0612d33583aa0b93ebdb5257b10d4fda5", onClick: () => this.closeModal() }, this.cancelText)))), h("ion-content", { key: "38ea098f85ac69226e614e0a09f668e9209f7ea1" }, h("ion-list", { key: "20becc2537a1a027915fe0598203039ceb8ba4f3" }, this.multiple === true ? this.renderCheckboxOptions() : this.renderRadioOptions())));
      }
      get el() {
        return getElement(this);
      }
    };
    SelectModal.style = {
      ionic: ionicSelectModalMdCss(),
      ios: selectModalIosCss(),
      md: selectModalMdCss()
    };
  }
});
init_ion_select_modal_entry();
export {
  SelectModal as ion_select_modal
};
//# debugId=6b113a90-a992-58f3-8a01-0253a7176069
//# sourceMappingURL=chunk-ZQBXY4ST.js.map
