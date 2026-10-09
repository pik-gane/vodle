import {
  init_compare_with_utils_sObYyvOy,
  isOptionSelected
} from "./chunk-TYMJ667S.js";
import {
  createItemMultipleInputsObserver,
  init_item_multiple_inputs_Bd2LO7qK
} from "./chunk-SIOF2F5B.js";
import {
  checkInvalidState,
  init_validity_DJztqcrH
} from "./chunk-MXARAUZW.js";
import {
  addEventListener,
  init_helpers_BJqKF1pr,
  removeEventListener,
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
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-radio_2.entry.js
var radioIosCss, radioMdCss, Radio, radioButtonIds, radioGroupIosCss, radioGroupMdCss, RadioGroup, radioGroupIds;
var init_ion_radio_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-radio_2.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_compare_with_utils_sObYyvOy();
    init_item_multiple_inputs_Bd2LO7qK();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_validity_DJztqcrH();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    radioIosCss = () => `:host{--inner-border-radius:50%;display:inline-block;position:relative;max-width:100%;min-height:inherit;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;contain:layout size style}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host(:focus){outline:none}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0;width:100%;height:100%}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #1a65eb);content:"";opacity:0.2}.radio-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:inherit;min-height:inherit;cursor:inherit}.label-text-wrapper{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host(.in-item) .label-text-wrapper{margin-top:10px;margin-bottom:10px}:host(.in-item.radio-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.radio-label-placement-stacked) .native-wrapper{margin-bottom:10px}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between) .radio-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.radio-justify-start) .radio-wrapper{-ms-flex-pack:start;justify-content:start}:host(.radio-justify-end) .radio-wrapper{-ms-flex-pack:end;justify-content:end}:host(.radio-alignment-start) .radio-wrapper{-ms-flex-align:start;align-items:start}:host(.radio-alignment-center) .radio-wrapper{-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between),:host(.radio-justify-start),:host(.radio-justify-end),:host(.radio-alignment-start),:host(.radio-alignment-center){display:block}:host(.radio-label-placement-start) .radio-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.radio-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-end) .radio-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.radio-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.radio-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px}:host(.radio-label-placement-stacked) .radio-wrapper{-ms-flex-direction:column;flex-direction:column}:host(.radio-label-placement-stacked) .label-text-wrapper{-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-start .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-start:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper{-webkit-transform-origin:center top;transform-origin:center top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-center .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-center:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}}:host{--color-checked:var(--ion-color-primary, #0054e9)}:host(.ion-color.radio-checked) .radio-inner{border-color:var(--ion-color-base)}.item-radio.item-ios ion-label{-webkit-margin-start:0;margin-inline-start:0}.radio-inner{width:33%;height:50%}:host(.radio-checked) .radio-inner{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:0.125rem;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}:host(.radio-disabled){opacity:0.3}.native-wrapper .radio-icon{width:0.9375rem;height:1.5rem}`;
    radioMdCss = () => `:host{--inner-border-radius:50%;display:inline-block;position:relative;max-width:100%;min-height:inherit;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;contain:layout size style}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host(:focus){outline:none}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0;width:100%;height:100%}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #1a65eb);content:"";opacity:0.2}.radio-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:inherit;min-height:inherit;cursor:inherit}.label-text-wrapper{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:host(.in-item) .label-text-wrapper{margin-top:10px;margin-bottom:10px}:host(.in-item.radio-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.radio-label-placement-stacked) .native-wrapper{margin-bottom:10px}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between) .radio-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.radio-justify-start) .radio-wrapper{-ms-flex-pack:start;justify-content:start}:host(.radio-justify-end) .radio-wrapper{-ms-flex-pack:end;justify-content:end}:host(.radio-alignment-start) .radio-wrapper{-ms-flex-align:start;align-items:start}:host(.radio-alignment-center) .radio-wrapper{-ms-flex-align:center;align-items:center}:host(.radio-justify-space-between),:host(.radio-justify-start),:host(.radio-justify-end),:host(.radio-alignment-start),:host(.radio-alignment-center){display:block}:host(.radio-label-placement-start) .radio-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.radio-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-end) .radio-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.radio-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.radio-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}:host(.radio-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px}:host(.radio-label-placement-stacked) .radio-wrapper{-ms-flex-direction:column;flex-direction:column}:host(.radio-label-placement-stacked) .label-text-wrapper{-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-start) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-start .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-start:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper{-webkit-transform-origin:center top;transform-origin:center top}:host-context([dir=rtl]):host(.radio-label-placement-stacked.radio-alignment-center) .label-text-wrapper,:host-context([dir=rtl]).radio-label-placement-stacked.radio-alignment-center .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}@supports selector(:dir(rtl)){:host(.radio-label-placement-stacked.radio-alignment-center:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:calc(100% - center) top;transform-origin:calc(100% - center) top}}:host{--color:rgb(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--color-checked:var(--ion-color-primary, #0054e9);--border-width:0.125rem;--border-style:solid;--border-radius:50%}:host(.ion-color) .radio-inner{background:var(--ion-color-base)}:host(.ion-color.radio-checked) .radio-icon{border-color:var(--ion-color-base)}.radio-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:var(--border-radius);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--color)}.radio-inner{border-radius:var(--inner-border-radius);width:calc(50% + var(--border-width));height:calc(50% + var(--border-width));-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0);-webkit-transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);background:var(--color-checked)}:host(.radio-checked) .radio-icon{border-color:var(--color-checked)}:host(.radio-checked) .radio-inner{-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}:host(.radio-disabled) .label-text-wrapper{opacity:0.38}:host(.radio-disabled) .native-wrapper{opacity:0.63}.native-wrapper .radio-icon{width:1.25rem;height:1.25rem}`;
    Radio = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.inputId = `ion-rb-${radioButtonIds++}`;
        this.radioGroup = null;
        this.checked = false;
        this.buttonTabindex = -1;
        this.name = this.inputId;
        this.disabled = false;
        this.labelPlacement = "start";
        this.updateState = () => {
          if (this.radioGroup) {
            const { compareWith, value: radioGroupValue } = this.radioGroup;
            this.checked = isOptionSelected(radioGroupValue, this.value, compareWith);
          }
        };
        this.onClick = () => {
          const { radioGroup, checked, disabled } = this;
          if (disabled) {
            return;
          }
          if (checked && radioGroup?.allowEmptySelection) {
            this.checked = false;
          } else {
            this.checked = true;
          }
        };
        this.onFocus = () => {
          this.ionFocus.emit();
        };
        this.onBlur = () => {
          this.ionBlur.emit();
        };
      }
      valueChanged() {
        this.updateState();
      }
      componentDidLoad() {
        this.updateState();
      }
      /** @internal */
      setFocus(ev) {
        return __async(this, null, function* () {
          if (ev !== void 0) {
            ev.stopPropagation();
            ev.preventDefault();
          }
          this.el.focus();
        });
      }
      /** @internal */
      setButtonTabindex(value) {
        return __async(this, null, function* () {
          this.buttonTabindex = value;
        });
      }
      connectedCallback() {
        if (this.value === void 0) {
          this.value = this.inputId;
        }
        const radioGroup = this.radioGroup = this.el.closest("ion-radio-group");
        if (radioGroup) {
          this.updateState();
          addEventListener(radioGroup, "ionValueChange", this.updateState);
        }
        this.itemFocusObserver = createItemMultipleInputsObserver(this.el, () => forceUpdate(this));
      }
      disconnectedCallback() {
        const radioGroup = this.radioGroup;
        if (radioGroup) {
          removeEventListener(radioGroup, "ionValueChange", this.updateState);
          this.radioGroup = null;
        }
        if (this.itemFocusObserver) {
          this.itemFocusObserver.disconnect();
          this.itemFocusObserver = void 0;
        }
      }
      get hasLabel() {
        return this.el.textContent !== "";
      }
      renderRadioControl() {
        return h("div", { class: "radio-icon", part: "container" }, h("div", { class: "radio-inner", part: "mark" }), h("div", { class: "radio-ripple" }));
      }
      render() {
        const { checked, disabled, color, el, justify, labelPlacement, hasLabel, buttonTabindex, alignment } = this;
        const mode = getIonMode(this);
        const inItem = hostContext("ion-item", el);
        const inMultipleInputsItem = hostContext("ion-item.item-multiple-inputs", el);
        return h(Host, { key: "ad7ac0bdc4d3216ecc19402e5b8d6f9e4d09334b", onFocus: this.onFocus, onBlur: this.onBlur, onClick: this.onClick, class: createColorClasses(color, {
          [mode]: true,
          "in-item": inItem,
          "radio-checked": checked,
          "radio-disabled": disabled,
          [`radio-justify-${justify}`]: justify !== void 0,
          [`radio-alignment-${alignment}`]: alignment !== void 0,
          [`radio-label-placement-${labelPlacement}`]: true,
          // A single-input item has the input cover and draws the indicator itself.
          // A multi-input item has no cover, so each control draws its own. Active
          // styling stays suppressed either way.
          "ion-activatable": !inItem,
          "ion-focusable": !inItem || inMultipleInputsItem
        }), role: "radio", "aria-checked": checked ? "true" : "false", "aria-disabled": disabled ? "true" : null, tabindex: buttonTabindex }, h("label", { key: "59c09125633120e2000447b8a3bc24c54490aa85", class: "radio-wrapper" }, h("div", { key: "1a98f3e0027deeac52647ba37aa9a99be0231966", class: {
          "label-text-wrapper": true,
          "label-text-wrapper-hidden": !hasLabel
        }, part: "label" }, h("slot", { key: "6a48e76ac8793d2aacebd3a8f193e3537272e5c2" })), h("div", { key: "68e4350bac8dad29c6b7a180560de2bb4dfc8c41", class: "native-wrapper" }, this.renderRadioControl())));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "value": [{
            "valueChanged": 0
          }]
        };
      }
    };
    radioButtonIds = 0;
    Radio.style = {
      ios: radioIosCss(),
      md: radioMdCss()
    };
    radioGroupIosCss = () => `ion-radio-group{vertical-align:top}.radio-group-top{line-height:1.5}.radio-group-top .error-text{display:none;color:var(--ion-color-danger, #c5000f)}.radio-group-top .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid .radio-group-top .error-text{display:block}.ion-touched.ion-invalid .radio-group-top .helper-text{display:none}ion-list .radio-group-top{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}`;
    radioGroupMdCss = () => `ion-radio-group{vertical-align:top}.radio-group-top{line-height:1.5}.radio-group-top .error-text{display:none;color:var(--ion-color-danger, #c5000f)}.radio-group-top .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid .radio-group-top .error-text{display:block}.ion-touched.ion-invalid .radio-group-top .helper-text{display:none}ion-list .radio-group-top{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}`;
    RadioGroup = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionValueChange = createEvent(this, "ionValueChange", 7);
        this.inputId = `ion-rg-${radioGroupIds++}`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.labelId = `${this.inputId}-lbl`;
        this.isInvalid = false;
        this.allowEmptySelection = false;
        this.name = this.inputId;
        this.setRadioTabindex = (value) => {
          const radios = this.getRadios();
          const first = radios.find((radio) => !radio.disabled);
          const checked = radios.find((radio) => radio.value === value && !radio.disabled);
          if (!first && !checked) {
            return;
          }
          const focusable = checked || first;
          for (const radio of radios) {
            const tabindex = radio === focusable ? 0 : -1;
            radio.setButtonTabindex(tabindex);
          }
        };
        this.onClick = (ev) => {
          ev.preventDefault();
          const selectedRadio = ev.target && ev.target.closest("ion-radio");
          if (selectedRadio && !selectedRadio.disabled) {
            const currentValue = this.value;
            const newValue = selectedRadio.value;
            if (newValue !== currentValue) {
              this.value = newValue;
              this.emitValueChange(ev);
            } else if (this.allowEmptySelection) {
              this.value = void 0;
              this.emitValueChange(ev);
            }
          }
        };
      }
      valueChanged(value) {
        this.setRadioTabindex(value);
        this.ionValueChange.emit({ value });
      }
      componentDidLoad() {
        this.valueChanged(this.value);
      }
      connectedCallback() {
        return __async(this, null, function* () {
          const header = this.el.querySelector("ion-list-header") || this.el.querySelector("ion-item-divider");
          if (header) {
            const label = this.label = header.querySelector("ion-label");
            if (label) {
              this.labelId = label.id = this.name + "-lbl";
            }
          }
          if (typeof MutationObserver !== "undefined") {
            this.validationObserver = new MutationObserver(() => {
              const newIsInvalid = checkInvalidState(this.el);
              if (this.isInvalid !== newIsInvalid) {
                this.isInvalid = newIsInvalid;
                Promise.resolve().then(() => {
                  this.hintTextId = this.getHintTextId();
                });
              }
            });
            this.validationObserver.observe(this.el, {
              attributes: true,
              attributeFilter: ["class"]
            });
          }
          this.isInvalid = checkInvalidState(this.el);
        });
      }
      componentWillLoad() {
        this.hintTextId = this.getHintTextId();
      }
      disconnectedCallback() {
        if (this.validationObserver) {
          this.validationObserver.disconnect();
          this.validationObserver = void 0;
        }
      }
      getRadios() {
        return Array.from(this.el.querySelectorAll("ion-radio"));
      }
      /**
       * Emits an `ionChange` event.
       *
       * This API should be called for user committed changes.
       * This API should not be used for external value changes.
       */
      emitValueChange(event) {
        const { value } = this;
        this.ionChange.emit({ value, event });
      }
      onKeydown(ev) {
        const inSelectInterface = !!this.el.closest("ion-select-popover") || !!this.el.closest("ion-select-modal");
        if (ev.target && !this.el.contains(ev.target)) {
          return;
        }
        const radios = this.getRadios().filter((radio) => !radio.disabled);
        if (ev.target && radios.includes(ev.target)) {
          const index = radios.findIndex((radio) => radio === ev.target);
          const current = radios[index];
          let next;
          if (["ArrowDown", "ArrowRight"].includes(ev.key)) {
            next = index === radios.length - 1 ? radios[0] : radios[index + 1];
          }
          if (["ArrowUp", "ArrowLeft"].includes(ev.key)) {
            next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
          }
          if (next && radios.includes(next)) {
            next.setFocus(ev);
            if (!inSelectInterface) {
              this.value = next.value;
              this.emitValueChange(ev);
            }
          }
          if ([" "].includes(ev.key)) {
            const previousValue = this.value;
            this.value = this.allowEmptySelection && this.value !== void 0 ? void 0 : current.value;
            if (previousValue !== this.value || this.allowEmptySelection) {
              this.emitValueChange(ev);
            }
            ev.preventDefault();
          }
          if (ev.key === "Enter" && inSelectInterface && !ev.repeat) {
            const previousValue = this.value;
            this.value = current.value;
            if (previousValue !== this.value) {
              this.emitValueChange(ev);
            }
            ev.preventDefault();
          }
        }
      }
      /** @internal */
      setFocus() {
        return __async(this, null, function* () {
          const radioToFocus = this.getRadios().find((r) => r.tabIndex !== -1);
          radioToFocus?.setFocus();
        });
      }
      /**
       * Renders the helper text or error text values
       */
      renderHintText() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        const hasHintText = !!helperText || !!errorText;
        if (!hasHintText) {
          return;
        }
        return h("div", { class: "radio-group-top" }, h("div", { id: helperTextId, class: "helper-text", "aria-live": "polite" }, !isInvalid ? helperText : null), h("div", { id: errorTextId, class: "error-text", role: "alert" }, isInvalid ? errorText : null));
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
      render() {
        const { label, labelId, el, name, value } = this;
        const mode = getIonMode(this);
        renderHiddenInput(true, el, name, value, false);
        return h(Host, { key: "8d926a17e800adf0184274215c9689c96a8d6dfd", role: "radiogroup", "aria-labelledby": label ? labelId : null, "aria-describedby": this.hintTextId, "aria-invalid": this.isInvalid ? "true" : void 0, onClick: this.onClick, class: mode }, this.renderHintText(), h("slot", { key: "2ff891123d5971a581b70d0886d23a074358c2dc" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "value": [{
            "valueChanged": 0
          }]
        };
      }
    };
    radioGroupIds = 0;
    RadioGroup.style = {
      ios: radioGroupIosCss(),
      md: radioGroupMdCss()
    };
  }
});
init_ion_radio_2_entry();
export {
  Radio as ion_radio,
  RadioGroup as ion_radio_group
};
//# debugId=29a748c5-d12f-52d9-b1e4-b38c39c3816e
//# sourceMappingURL=chunk-CNQNDPVK.js.map
