import {
  createItemMultipleInputsObserver,
  init_item_multiple_inputs_Bd2LO7qK
} from "./chunk-SIOF2F5B.js";
import {
  checkInvalidState,
  init_validity_DJztqcrH
} from "./chunk-MXARAUZW.js";
import {
  inheritAriaAttributes,
  init_helpers_BJqKF1pr,
  renderHiddenInput
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  createColorClasses,
  hostContext,
  init_theme_byZM6qHV
} from "./chunk-VEPFSKM7.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  createEvent,
  forceUpdate,
  getElement,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-checkbox.entry.js
var checkboxIosCss, checkboxMdCss, Checkbox, checkboxIds;
var init_ion_checkbox_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-checkbox.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_item_multiple_inputs_Bd2LO7qK();
    init_validity_DJztqcrH();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    checkboxIosCss = () => `:host{--checkbox-background-checked:var(--ion-color-primary, #0054e9);--border-color-checked:var(--ion-color-primary, #0054e9);--checkmark-color:var(--ion-color-primary-contrast, #fff);--transition:none;display:inline-block;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0;width:100%;height:100%}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}:host(.ion-color){--checkbox-background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}.checkbox-wrapper{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:inherit;cursor:inherit}.label-text-wrapper{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host(.in-item) .label-text-wrapper,:host(.in-item:not(.checkbox-label-placement-stacked):not([slot])) .native-wrapper{margin-top:10px;margin-bottom:10px}:host(.in-item.checkbox-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.checkbox-label-placement-stacked) .native-wrapper{margin-bottom:10px}.label-text-wrapper-hidden{display:none}input{display:none}:host(:focus){outline:none}.native-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center}.checkbox-icon{border-radius:var(--border-radius);position:relative;width:var(--size);height:var(--size);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--checkbox-background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.ion-focused) .native-wrapper::after{border-radius:50%;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #1a65eb);content:"";opacity:0.2;inset-block-start:calc(50% - 36px / 2);inset-inline-start:calc(50% - 36px / 2)}.checkbox-bottom{padding-top:4px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;font-size:0.75rem;white-space:normal}:host(.checkbox-label-placement-stacked) .checkbox-bottom{font-size:1rem}.checkbox-bottom .error-text{display:none;color:var(--ion-color-danger, #c5000f)}.checkbox-bottom .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}:host(.ion-touched.ion-invalid) .checkbox-bottom .error-text{display:block}:host(.ion-touched.ion-invalid) .checkbox-bottom .helper-text{display:none}:host(.checkbox-label-placement-start) .checkbox-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.checkbox-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.checkbox-label-placement-end) .checkbox-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-pack:start;justify-content:start}:host(.checkbox-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.checkbox-label-placement-stacked) .checkbox-wrapper{-ms-flex-direction:column;flex-direction:column;text-align:center}:host(.checkbox-label-placement-stacked) .label-text-wrapper{-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host(.checkbox-label-placement-stacked.checkbox-alignment-start) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]):host(.checkbox-label-placement-stacked.checkbox-alignment-start) .label-text-wrapper,:host-context([dir=rtl]).checkbox-label-placement-stacked.checkbox-alignment-start .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.checkbox-label-placement-stacked.checkbox-alignment-start:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.checkbox-label-placement-stacked.checkbox-alignment-center) .label-text-wrapper{-webkit-transform-origin:center top;transform-origin:center top}:host-context([dir=rtl]):host(.checkbox-label-placement-stacked.checkbox-alignment-center) .label-text-wrapper,:host-context([dir=rtl]).checkbox-label-placement-stacked.checkbox-alignment-center .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}@supports selector(:dir(rtl)){:host(.checkbox-label-placement-stacked.checkbox-alignment-center:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}}:host(.checkbox-justify-space-between) .checkbox-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.checkbox-justify-start) .checkbox-wrapper{-ms-flex-pack:start;justify-content:start}:host(.checkbox-justify-end) .checkbox-wrapper{-ms-flex-pack:end;justify-content:end}:host(.checkbox-alignment-start) .checkbox-wrapper{-ms-flex-align:start;align-items:start}:host(.checkbox-alignment-center) .checkbox-wrapper{-ms-flex-align:center;align-items:center}:host(.checkbox-justify-space-between),:host(.checkbox-justify-start),:host(.checkbox-justify-end),:host(.checkbox-alignment-start),:host(.checkbox-alignment-center){display:block}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--checkbox-background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:50%;--border-width:0.125rem;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.23);--checkbox-background:var(--ion-item-background, var(--ion-background-color, #fff));--size:min(1.375rem, 55.836px);--checkmark-width:1.5px}:host(.checkbox-disabled){opacity:0.3}`;
    checkboxMdCss = () => `:host{--checkbox-background-checked:var(--ion-color-primary, #0054e9);--border-color-checked:var(--ion-color-primary, #0054e9);--checkmark-color:var(--ion-color-primary-contrast, #fff);--transition:none;display:inline-block;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0;width:100%;height:100%}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}:host(.ion-color){--checkbox-background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}.checkbox-wrapper{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:inherit;cursor:inherit}.label-text-wrapper{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host(.in-item) .label-text-wrapper,:host(.in-item:not(.checkbox-label-placement-stacked):not([slot])) .native-wrapper{margin-top:10px;margin-bottom:10px}:host(.in-item.checkbox-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.checkbox-label-placement-stacked) .native-wrapper{margin-bottom:10px}.label-text-wrapper-hidden{display:none}input{display:none}:host(:focus){outline:none}.native-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center}.checkbox-icon{border-radius:var(--border-radius);position:relative;width:var(--size);height:var(--size);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--checkbox-background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.ion-focused) .native-wrapper::after{border-radius:50%;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #1a65eb);content:"";opacity:0.2;inset-block-start:calc(50% - 36px / 2);inset-inline-start:calc(50% - 36px / 2)}.checkbox-bottom{padding-top:4px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;font-size:0.75rem;white-space:normal}:host(.checkbox-label-placement-stacked) .checkbox-bottom{font-size:1rem}.checkbox-bottom .error-text{display:none;color:var(--ion-color-danger, #c5000f)}.checkbox-bottom .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}:host(.ion-touched.ion-invalid) .checkbox-bottom .error-text{display:block}:host(.ion-touched.ion-invalid) .checkbox-bottom .helper-text{display:none}:host(.checkbox-label-placement-start) .checkbox-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.checkbox-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.checkbox-label-placement-end) .checkbox-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-pack:start;justify-content:start}:host(.checkbox-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.checkbox-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.checkbox-label-placement-stacked) .checkbox-wrapper{-ms-flex-direction:column;flex-direction:column;text-align:center}:host(.checkbox-label-placement-stacked) .label-text-wrapper{-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host(.checkbox-label-placement-stacked.checkbox-alignment-start) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]):host(.checkbox-label-placement-stacked.checkbox-alignment-start) .label-text-wrapper,:host-context([dir=rtl]).checkbox-label-placement-stacked.checkbox-alignment-start .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.checkbox-label-placement-stacked.checkbox-alignment-start:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.checkbox-label-placement-stacked.checkbox-alignment-center) .label-text-wrapper{-webkit-transform-origin:center top;transform-origin:center top}:host-context([dir=rtl]):host(.checkbox-label-placement-stacked.checkbox-alignment-center) .label-text-wrapper,:host-context([dir=rtl]).checkbox-label-placement-stacked.checkbox-alignment-center .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}@supports selector(:dir(rtl)){:host(.checkbox-label-placement-stacked.checkbox-alignment-center:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}}:host(.checkbox-justify-space-between) .checkbox-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.checkbox-justify-start) .checkbox-wrapper{-ms-flex-pack:start;justify-content:start}:host(.checkbox-justify-end) .checkbox-wrapper{-ms-flex-pack:end;justify-content:end}:host(.checkbox-alignment-start) .checkbox-wrapper{-ms-flex-align:start;align-items:start}:host(.checkbox-alignment-center) .checkbox-wrapper{-ms-flex-align:center;align-items:center}:host(.checkbox-justify-space-between),:host(.checkbox-justify-start),:host(.checkbox-justify-end),:host(.checkbox-alignment-start),:host(.checkbox-alignment-center){display:block}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--checkbox-background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:calc(var(--size) * .125);--border-width:2px;--border-style:solid;--border-color:rgb(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--checkmark-width:3;--checkbox-background:var(--ion-item-background, var(--ion-background-color, #fff));--transition:background 180ms cubic-bezier(0.4, 0, 0.2, 1);--size:18px}.checkbox-icon path{stroke-dasharray:30;stroke-dashoffset:30}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{stroke-dashoffset:0;-webkit-transition:stroke-dashoffset 90ms linear 90ms;transition:stroke-dashoffset 90ms linear 90ms}:host(.checkbox-disabled) .label-text-wrapper{opacity:0.38}:host(.checkbox-disabled) .native-wrapper{opacity:0.63}`;
    Checkbox = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.inputId = `ion-cb-${checkboxIds++}`;
        this.inputLabelId = `${this.inputId}-lbl`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.inheritedAttributes = {};
        this.name = this.inputId;
        this.checked = false;
        this.indeterminate = false;
        this.disabled = false;
        this.value = "on";
        this.labelPlacement = "start";
        this.required = false;
        this.isInvalid = false;
        this.hasLabelContent = false;
        this.setChecked = (state) => {
          const isChecked = this.checked = state;
          this.ionChange.emit({
            checked: isChecked,
            value: this.value
          });
        };
        this.toggleChecked = (ev) => {
          ev.preventDefault();
          this.setChecked(!this.checked);
          this.indeterminate = false;
        };
        this.onFocus = () => {
          this.ionFocus.emit();
        };
        this.onBlur = () => {
          this.ionBlur.emit();
        };
        this.onKeyDown = (ev) => {
          if (ev.key === " ") {
            ev.preventDefault();
            if (!this.disabled) {
              this.toggleChecked(ev);
            }
          }
        };
        this.onClick = (ev) => {
          if (this.disabled) {
            return;
          }
          this.toggleChecked(ev);
        };
        this.onDivLabelClick = (ev) => {
          ev.stopPropagation();
        };
      }
      connectedCallback() {
        const { el } = this;
        if (typeof MutationObserver !== "undefined") {
          this.validationObserver = new MutationObserver((mutations) => {
            if (mutations.some((mutation) => mutation.type === "characterData" || mutation.type === "childList")) {
              this.hasLabelContent = this.el.textContent !== "";
            }
            if (mutations.some((mutation) => mutation.type === "attributes" && mutation.target === el)) {
              const newIsInvalid = checkInvalidState(el);
              if (this.isInvalid !== newIsInvalid) {
                this.isInvalid = newIsInvalid;
                Promise.resolve().then(() => {
                  this.hintTextId = this.getHintTextId();
                });
              }
            }
          });
          this.validationObserver.observe(el, {
            attributes: true,
            attributeFilter: ["class"],
            characterData: true,
            childList: true,
            subtree: true
          });
        }
        this.isInvalid = checkInvalidState(el);
        this.hasLabelContent = this.el.textContent !== "";
        this.itemFocusObserver = createItemMultipleInputsObserver(el, () => forceUpdate(this));
      }
      componentWillLoad() {
        this.inheritedAttributes = __spreadValues({}, inheritAriaAttributes(this.el));
        this.hintTextId = this.getHintTextId();
      }
      disconnectedCallback() {
        if (this.validationObserver) {
          this.validationObserver.disconnect();
          this.validationObserver = void 0;
        }
        if (this.itemFocusObserver) {
          this.itemFocusObserver.disconnect();
          this.itemFocusObserver = void 0;
        }
      }
      /** @internal */
      setFocus() {
        return __async(this, null, function* () {
          this.el.focus();
        });
      }
      getHintTextId() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        if (isInvalid && errorText) {
          return errorTextId;
        }
        if (helperText) {
          return helperTextId;
        }
        return void 0;
      }
      /**
       * Responsible for rendering helper text and error text.
       * This element should only be rendered if hint text is set.
       */
      renderHintText() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        const hasHintText = !!helperText || !!errorText;
        if (!hasHintText) {
          return;
        }
        return h("div", { class: "checkbox-bottom" }, h("div", { id: helperTextId, class: "helper-text", part: "supporting-text helper-text", "aria-live": "polite" }, !isInvalid ? helperText : null), h("div", { id: errorTextId, class: "error-text", part: "supporting-text error-text", role: "alert" }, isInvalid ? errorText : null));
      }
      render() {
        const { color, checked, disabled, el, getSVGPath, indeterminate, inheritedAttributes, inputId, justify, labelPlacement, name, value, alignment, required } = this;
        const mode = getIonMode(this);
        const path = getSVGPath(mode, indeterminate);
        const inItem = hostContext("ion-item", el);
        const inMultipleInputsItem = hostContext("ion-item.item-multiple-inputs", el);
        renderHiddenInput(true, el, name, checked ? value : "", disabled);
        return h(Host, { key: "6de0a71ffc45e65a4cf5ab0a1216f3ccd159d8de", role: "checkbox", "aria-checked": indeterminate ? "mixed" : `${checked}`, "aria-describedby": this.hintTextId, "aria-invalid": this.isInvalid ? "true" : void 0, "aria-labelledby": this.hasLabelContent ? this.inputLabelId : null, "aria-label": inheritedAttributes["aria-label"] || null, "aria-disabled": disabled ? "true" : null, "aria-required": required ? "true" : void 0, tabindex: disabled ? void 0 : 0, onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur, onClick: this.onClick, class: createColorClasses(color, {
          [mode]: true,
          "in-item": inItem,
          "checkbox-checked": checked,
          "checkbox-disabled": disabled,
          "checkbox-indeterminate": indeterminate,
          interactive: true,
          // A single-input item has the input cover and draws the indicator itself.
          // A multi-input item has no cover, so each control draws its own.
          "ion-focusable": !inItem || inMultipleInputsItem,
          [`checkbox-justify-${justify}`]: justify !== void 0,
          [`checkbox-alignment-${alignment}`]: alignment !== void 0,
          [`checkbox-label-placement-${labelPlacement}`]: true
        }) }, h("label", { key: "acca2f5b0a37aa70930b2f74ff4857939b2be2b0", class: "checkbox-wrapper", htmlFor: inputId }, h("input", __spreadValues({ key: "f46e409383e9d3ffc3daae8e7cd4159427d4c8fe", type: "checkbox", checked: checked ? true : void 0, disabled, id: inputId, onChange: this.toggleChecked, required }, inheritedAttributes)), h("div", { key: "69d8bf21c781cd9b1f56ceae40ff7911e6f5adfe", class: {
          "label-text-wrapper": true,
          "label-text-wrapper-hidden": !this.hasLabelContent
        }, part: "label", id: this.inputLabelId, onClick: this.onDivLabelClick }, h("slot", { key: "3c444ab897456c522588fc6cee616030f16b0586" }), this.renderHintText()), h("div", { key: "0a18dfe7a68a8eec08ce8764bd2c8a59c4a38802", class: "native-wrapper" }, h("svg", { key: "56b298b54ebc88a429a9dd67b8dabd7063759b3a", class: "checkbox-icon", viewBox: "0 0 24 24", part: "container", "aria-hidden": "true" }, path))));
      }
      getSVGPath(mode, indeterminate) {
        let path = indeterminate ? h("path", { d: "M6 12L18 12", part: "mark" }) : h("path", { d: "M5.9,12.5l3.8,3.8l8.8-8.8", part: "mark" });
        if (mode === "md") {
          path = indeterminate ? h("path", { d: "M2 12H22", part: "mark" }) : h("path", { d: "M1.73,12.91 8.1,19.28 22.79,4.59", part: "mark" });
        }
        return path;
      }
      get el() {
        return getElement(this);
      }
    };
    checkboxIds = 0;
    Checkbox.style = {
      ios: checkboxIosCss(),
      md: checkboxMdCss()
    };
  }
});
init_ion_checkbox_entry();
export {
  Checkbox as ion_checkbox
};
//# debugId=d544db99-8cff-5227-a0d0-fb5bf19e992a
//# sourceMappingURL=chunk-EPLU3RZB.js.map
