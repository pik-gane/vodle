import {
  getCounterText,
  init_input_utils_DZY_K8Po
} from "./chunk-J6JYW5OS.js";
import {
  createClickController,
  createNotchController,
  createSlotMutationController,
  createStartContainerController,
  init_slot_mutation_controller_hAS2uJ7c
} from "./chunk-TGPXV6HN.js";
import {
  closeCircle,
  closeSharp,
  init_index_BvabGprD
} from "./chunk-KPUED4ZZ.js";
import {
  checkInvalidState,
  init_validity_DJztqcrH
} from "./chunk-MXARAUZW.js";
import {
  componentOnReady,
  debounceEvent,
  inheritAriaAttributes,
  inheritAttributes,
  init_helpers_BJqKF1pr
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
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-input.entry.js
var inputIosCss, inputMdCss, Input, inputIds;
var init_ion_input_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-input.entry.js"() {
    init_index_BpRUsN_W();
    init_slot_mutation_controller_hAS2uJ7c();
    init_validity_DJztqcrH();
    init_helpers_BJqKF1pr();
    init_theme_byZM6qHV();
    init_index_BvabGprD();
    init_ionic_global_Cep6oYzK();
    init_input_utils_DZY_K8Po();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    inputIosCss = () => `.sc-ion-input-ios-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--background:transparent;--color:initial;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #0054e9);--highlight-color-valid:var(--ion-color-success, #2dd55b);--highlight-color-invalid:var(--ion-color-danger, #c5000f);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;min-height:44px;padding:0 !important;color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2}ion-item[slot=start].sc-ion-input-ios-h,ion-item [slot=start].sc-ion-input-ios-h,ion-item[slot=end].sc-ion-input-ios-h,ion-item [slot=end].sc-ion-input-ios-h{width:auto}.ion-color.sc-ion-input-ios-h{--highlight-color-focused:var(--ion-color-base)}.input-label-placement-floating.sc-ion-input-ios-h,.input-label-placement-stacked.sc-ion-input-ios-h{min-height:56px}.native-input.sc-ion-input-ios{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;position:relative;-ms-flex:1;flex:1;width:100%;min-width:2ch;max-width:100%;height:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;z-index:1}.native-input.sc-ion-input-ios::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-ios:invalid{-webkit-box-shadow:none;box-shadow:none}.native-input.sc-ion-input-ios::-ms-clear{display:none}.cloned-input.sc-ion-input-ios{position:absolute;top:0;bottom:0;height:auto;max-height:none;pointer-events:none}.cloned-input.sc-ion-input-ios:disabled{opacity:1}.input-clear-icon.sc-ion-input-ios{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:center;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:30px;height:30px;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));visibility:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}.in-item-color.sc-ion-input-ios-h .input-clear-icon.sc-ion-input-ios{color:inherit}.input-clear-icon.sc-ion-input-ios:focus{opacity:0.5}.has-value.sc-ion-input-ios-h .input-clear-icon.sc-ion-input-ios{visibility:visible}.input-wrapper.sc-ion-input-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:stretch;align-items:stretch;height:inherit;min-height:inherit;-webkit-transition:background-color 15ms linear;transition:background-color 15ms linear;background:var(--background);line-height:normal}.input-control.sc-ion-input-ios{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;width:100%;min-width:0}.native-wrapper.sc-ion-input-ios{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;width:100%}.input-label-placement-start.sc-ion-input-ios-h .native-wrapper.sc-ion-input-ios,.input-label-placement-end.sc-ion-input-ios-h .native-wrapper.sc-ion-input-ios,.input-label-placement-fixed.sc-ion-input-ios-h .native-wrapper.sc-ion-input-ios{-ms-flex:1 1 0px;flex:1 1 0}.input-start.sc-ion-input-ios,.input-end.sc-ion-input-ios{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center}.ion-touched.ion-invalid.sc-ion-input-ios-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-input-ios-h{--highlight-color:var(--highlight-color-valid)}.input-bottom.sc-ion-input-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:0.75rem;white-space:normal}.has-focus.ion-valid.sc-ion-input-ios-h,.ion-touched.ion-invalid.sc-ion-input-ios-h{--border-color:var(--highlight-color)}.input-bottom.sc-ion-input-ios .error-text.sc-ion-input-ios{display:none;color:var(--highlight-color-invalid)}.input-bottom.sc-ion-input-ios .helper-text.sc-ion-input-ios{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid.sc-ion-input-ios-h .input-bottom.sc-ion-input-ios .error-text.sc-ion-input-ios{display:block}.ion-touched.ion-invalid.sc-ion-input-ios-h .input-bottom.sc-ion-input-ios .helper-text.sc-ion-input-ios{display:none}.input-bottom.sc-ion-input-ios .counter.sc-ion-input-ios{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));white-space:nowrap;-webkit-padding-start:16px;padding-inline-start:16px}.has-focus.sc-ion-input-ios-h input.sc-ion-input-ios{caret-color:var(--highlight-color)}.label-text-wrapper.sc-ion-input-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0;max-width:200px;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.skip-label-transition.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-transition:none;transition:none}.label-text.sc-ion-input-ios,.sc-ion-input-ios-s>[slot=label]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden.sc-ion-input-ios,.input-outline-notch-hidden.sc-ion-input-ios{display:none}.input-wrapper.sc-ion-input-ios input.sc-ion-input-ios{-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.input-label-placement-start.sc-ion-input-ios-h .input-control.sc-ion-input-ios{-ms-flex-direction:row;flex-direction:row}.input-label-placement-start.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.input-label-placement-end.sc-ion-input-ios-h .input-control.sc-ion-input-ios{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.input-label-placement-end.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-ios-h .label-text.sc-ion-input-ios{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.input-label-placement-stacked.sc-ion-input-ios-h .input-control.sc-ion-input-ios,.input-label-placement-floating.sc-ion-input-ios-h .input-control.sc-ion-input-ios{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start}.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-transform-origin:left top;transform-origin:left top;max-width:100%;z-index:2}[dir=rtl].sc-ion-input-ios-h -no-combinator.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .sc-ion-input-ios-h -no-combinator.input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl].input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .input-label-placement-stacked.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl].sc-ion-input-ios-h -no-combinator.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .sc-ion-input-ios-h -no-combinator.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl].input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios,[dir=rtl] .input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.input-label-placement-stacked.sc-ion-input-ios-h:dir(rtl) .label-text-wrapper.sc-ion-input-ios,.input-label-placement-floating.sc-ion-input-ios-h:dir(rtl) .label-text-wrapper.sc-ion-input-ios{-webkit-transform-origin:right top;transform-origin:right top}}.input-label-placement-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-transform:translateY(100%) scale(1);transform:translateY(100%) scale(1)}.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios{opacity:0}.has-focus.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios,.has-value.input-label-placement-floating.sc-ion-input-ios-h input.sc-ion-input-ios{opacity:1}.label-floating.sc-ion-input-ios-h .label-text-wrapper.sc-ion-input-ios{-webkit-transform:translateY(50%) scale(0.75);transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.sc-ion-input-ios-s>[slot=start]:last-of-type{-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-start:0;margin-inline-start:0}.sc-ion-input-ios-s>[slot=end]:first-of-type{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}.sc-ion-input-ios-h[disabled].sc-ion-input-ios-s>ion-input-password-toggle,.sc-ion-input-ios-h[disabled] .sc-ion-input-ios-s>ion-input-password-toggle,.sc-ion-input-ios-h[readonly].sc-ion-input-ios-s>ion-input-password-toggle,.sc-ion-input-ios-h[readonly] .sc-ion-input-ios-s>ion-input-password-toggle{visibility:hidden}.sc-ion-input-ios-h{--border-width:0.55px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))));--highlight-height:0px;font-size:inherit}.input-clear-icon.sc-ion-input-ios ion-icon.sc-ion-input-ios{font-size:18px}.input-disabled.sc-ion-input-ios-h{opacity:0.3}.sc-ion-input-ios-s>ion-button[slot=start].button-has-icon-only,.sc-ion-input-ios-s>ion-button[slot=end].button-has-icon-only{--border-radius:50%;--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;aspect-ratio:1}`;
    inputMdCss = () => `.sc-ion-input-md-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--background:transparent;--color:initial;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #0054e9);--highlight-color-valid:var(--ion-color-success, #2dd55b);--highlight-color-invalid:var(--ion-color-danger, #c5000f);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;min-height:44px;padding:0 !important;color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2}ion-item[slot=start].sc-ion-input-md-h,ion-item [slot=start].sc-ion-input-md-h,ion-item[slot=end].sc-ion-input-md-h,ion-item [slot=end].sc-ion-input-md-h{width:auto}.ion-color.sc-ion-input-md-h{--highlight-color-focused:var(--ion-color-base)}.input-label-placement-floating.sc-ion-input-md-h,.input-label-placement-stacked.sc-ion-input-md-h{min-height:56px}.native-input.sc-ion-input-md{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;position:relative;-ms-flex:1;flex:1;width:100%;min-width:2ch;max-width:100%;height:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;z-index:1}.native-input.sc-ion-input-md::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-md:invalid{-webkit-box-shadow:none;box-shadow:none}.native-input.sc-ion-input-md::-ms-clear{display:none}.cloned-input.sc-ion-input-md{position:absolute;top:0;bottom:0;height:auto;max-height:none;pointer-events:none}.cloned-input.sc-ion-input-md:disabled{opacity:1}.input-clear-icon.sc-ion-input-md{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:center;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:30px;height:30px;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));visibility:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}.in-item-color.sc-ion-input-md-h .input-clear-icon.sc-ion-input-md{color:inherit}.input-clear-icon.sc-ion-input-md:focus{opacity:0.5}.has-value.sc-ion-input-md-h .input-clear-icon.sc-ion-input-md{visibility:visible}.input-wrapper.sc-ion-input-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:stretch;align-items:stretch;height:inherit;min-height:inherit;-webkit-transition:background-color 15ms linear;transition:background-color 15ms linear;background:var(--background);line-height:normal}.input-control.sc-ion-input-md{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;width:100%;min-width:0}.native-wrapper.sc-ion-input-md{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;width:100%}.input-label-placement-start.sc-ion-input-md-h .native-wrapper.sc-ion-input-md,.input-label-placement-end.sc-ion-input-md-h .native-wrapper.sc-ion-input-md,.input-label-placement-fixed.sc-ion-input-md-h .native-wrapper.sc-ion-input-md{-ms-flex:1 1 0px;flex:1 1 0}.input-start.sc-ion-input-md,.input-end.sc-ion-input-md{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center}.ion-touched.ion-invalid.sc-ion-input-md-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-input-md-h{--highlight-color:var(--highlight-color-valid)}.input-bottom.sc-ion-input-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:0.75rem;white-space:normal}.has-focus.ion-valid.sc-ion-input-md-h,.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}.input-bottom.sc-ion-input-md .error-text.sc-ion-input-md{display:none;color:var(--highlight-color-invalid)}.input-bottom.sc-ion-input-md .helper-text.sc-ion-input-md{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid.sc-ion-input-md-h .input-bottom.sc-ion-input-md .error-text.sc-ion-input-md{display:block}.ion-touched.ion-invalid.sc-ion-input-md-h .input-bottom.sc-ion-input-md .helper-text.sc-ion-input-md{display:none}.input-bottom.sc-ion-input-md .counter.sc-ion-input-md{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));white-space:nowrap;-webkit-padding-start:16px;padding-inline-start:16px}.has-focus.sc-ion-input-md-h input.sc-ion-input-md{caret-color:var(--highlight-color)}.label-text-wrapper.sc-ion-input-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0;max-width:200px;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.skip-label-transition.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transition:none;transition:none}.label-text.sc-ion-input-md,.sc-ion-input-md-s>[slot=label]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden.sc-ion-input-md,.input-outline-notch-hidden.sc-ion-input-md{display:none}.input-wrapper.sc-ion-input-md input.sc-ion-input-md{-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.input-label-placement-start.sc-ion-input-md-h .input-control.sc-ion-input-md{-ms-flex-direction:row;flex-direction:row}.input-label-placement-start.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.input-label-placement-end.sc-ion-input-md-h .input-control.sc-ion-input-md{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.input-label-placement-end.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.input-label-placement-fixed.sc-ion-input-md-h .label-text.sc-ion-input-md{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.input-label-placement-stacked.sc-ion-input-md-h .input-control.sc-ion-input-md,.input-label-placement-floating.sc-ion-input-md-h .input-control.sc-ion-input-md{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start}.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform-origin:left top;transform-origin:left top;max-width:100%;z-index:2}[dir=rtl].sc-ion-input-md-h -no-combinator.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h -no-combinator.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.input-label-placement-stacked.sc-ion-input-md-h:dir(rtl) .label-text-wrapper.sc-ion-input-md,.input-label-placement-floating.sc-ion-input-md-h:dir(rtl) .label-text-wrapper.sc-ion-input-md{-webkit-transform-origin:right top;transform-origin:right top}}.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform:translateY(100%) scale(1);transform:translateY(100%) scale(1)}.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md{opacity:0}.has-focus.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md,.has-value.input-label-placement-floating.sc-ion-input-md-h input.sc-ion-input-md{opacity:1}.label-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform:translateY(50%) scale(0.75);transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.sc-ion-input-md-s>[slot=start]:last-of-type{-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-start:0;margin-inline-start:0}.sc-ion-input-md-s>[slot=end]:first-of-type{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}.sc-ion-input-md-h[disabled].sc-ion-input-md-s>ion-input-password-toggle,.sc-ion-input-md-h[disabled] .sc-ion-input-md-s>ion-input-password-toggle,.sc-ion-input-md-h[readonly].sc-ion-input-md-s>ion-input-password-toggle,.sc-ion-input-md-h[readonly] .sc-ion-input-md-s>ion-input-password-toggle{visibility:hidden}.input-fill-solid.sc-ion-input-md-h{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--border-color:var(--ion-color-step-500, var(--ion-background-color-step-500, gray));--border-radius:4px;--padding-start:16px;--padding-end:16px;min-height:56px}.input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-bottom:var(--border-width) var(--border-style) var(--border-color)}.has-focus.input-fill-solid.ion-valid.sc-ion-input-md-h,.input-fill-solid.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}.input-fill-solid.sc-ion-input-md-h .input-bottom.sc-ion-input-md{border-top:none}@media (any-hover: hover){.input-fill-solid.sc-ion-input-md-h:hover{--background:var(--ion-color-step-100, var(--ion-background-color-step-100, #e6e6e6));--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}}.input-fill-solid.has-focus.sc-ion-input-md-h{--background:var(--ion-color-step-150, var(--ion-background-color-step-150, #d9d9d9));--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}.input-fill-solid.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0px;border-end-start-radius:0px}.label-floating.input-fill-solid.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{max-width:calc(100% / 0.75)}.input-fill-outline.sc-ion-input-md-h{--border-color:var(--ion-color-step-300, var(--ion-background-color-step-300, #b3b3b3));--border-radius:4px;--padding-start:16px;--padding-end:16px;--internal-start-container-adjustment:0px;min-height:56px}.input-fill-outline.input-shape-round.sc-ion-input-md-h{--border-radius:28px;--padding-start:32px;--padding-end:32px}.has-focus.input-fill-outline.ion-valid.sc-ion-input-md-h,.input-fill-outline.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}@media (any-hover: hover){.input-fill-outline.sc-ion-input-md-h:hover{--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}}.input-fill-outline.has-focus.sc-ion-input-md-h{--border-width:var(--highlight-height);--border-color:var(--highlight-color)}.input-fill-outline.sc-ion-input-md-h .input-bottom.sc-ion-input-md{border-top:none}.input-fill-outline.sc-ion-input-md-h .input-wrapper.sc-ion-input-md{border-bottom:none}.input-fill-outline.sc-ion-input-md-h:not(.label-floating) .input-control.sc-ion-input-md{position:relative}.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform-origin:left top;transform-origin:left top;position:absolute;max-width:100%}[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h -no-combinator.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl].input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,[dir=rtl] .input-fill-outline.input-label-placement-floating.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.input-fill-outline.input-label-placement-stacked.sc-ion-input-md-h:dir(rtl) .label-text-wrapper.sc-ion-input-md,.input-fill-outline.input-label-placement-floating.sc-ion-input-md-h:dir(rtl) .label-text-wrapper.sc-ion-input-md{-webkit-transform-origin:right top;transform-origin:right top}}.input-fill-outline.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{position:relative}.label-floating.input-fill-outline.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{-webkit-transform:translate(var(--internal-start-container-adjustment, 0px), -32%) scale(0.75);transform:translate(var(--internal-start-container-adjustment, 0px), -32%) scale(0.75);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;max-width:calc((100% - var(--padding-start) - var(--padding-end) - 8px) / 0.75)}.input-fill-outline.sc-ion-input-md-h .input-outline-container.sc-ion-input-md{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;width:100%;height:100%}.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{pointer-events:none}.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md,.input-fill-outline.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md,.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{border-top:var(--border-width) var(--border-style) var(--border-color);border-bottom:var(--border-width) var(--border-style) var(--border-color)}.input-fill-outline.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md{max-width:calc(100% - var(--padding-start) - var(--padding-end))}.input-fill-outline.sc-ion-input-md-h .notch-spacer.sc-ion-input-md{-webkit-padding-end:8px;padding-inline-end:8px;font-size:calc(1em * 0.75);opacity:0;pointer-events:none;-webkit-box-sizing:content-box;box-sizing:content-box}.input-fill-outline.sc-ion-input-md-h .input-outline-start.sc-ion-input-md{border-start-start-radius:var(--border-radius);border-start-end-radius:0px;border-end-end-radius:0px;border-end-start-radius:var(--border-radius);-webkit-border-start:var(--border-width) var(--border-style) var(--border-color);border-inline-start:var(--border-width) var(--border-style) var(--border-color);width:calc(var(--padding-start) - 4px)}.input-fill-outline.sc-ion-input-md-h .input-outline-end.sc-ion-input-md{-webkit-border-end:var(--border-width) var(--border-style) var(--border-color);border-inline-end:var(--border-width) var(--border-style) var(--border-color);border-start-start-radius:0px;border-start-end-radius:var(--border-radius);border-end-end-radius:var(--border-radius);border-end-start-radius:0px;-ms-flex-positive:1;flex-grow:1}.label-floating.input-fill-outline.sc-ion-input-md-h .input-outline-notch.sc-ion-input-md{border-top:none}.sc-ion-input-md-h{--border-width:1px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))));--highlight-height:2px;font-size:inherit}.input-clear-icon.sc-ion-input-md ion-icon.sc-ion-input-md{font-size:22px}.input-disabled.sc-ion-input-md-h{opacity:0.38}.has-focus.ion-valid.sc-ion-input-md-h,.ion-touched.ion-invalid.sc-ion-input-md-h{--border-color:var(--highlight-color)}.input-bottom.sc-ion-input-md .counter.sc-ion-input-md{letter-spacing:0.0333333333em}.input-label-placement-floating.has-focus.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-stacked.has-focus.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{color:var(--highlight-color)}.has-focus.input-label-placement-floating.ion-valid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-floating.ion-touched.ion-invalid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.has-focus.input-label-placement-stacked.ion-valid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,.input-label-placement-stacked.ion-touched.ion-invalid.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md{color:var(--highlight-color)}.input-highlight.sc-ion-input-md{bottom:-1px;position:absolute;width:100%;height:var(--highlight-height);-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform 200ms;transition:-webkit-transform 200ms;transition:transform 200ms;transition:transform 200ms, -webkit-transform 200ms;background:var(--highlight-color)}.input-highlight.sc-ion-input-md{inset-inline-start:0}.has-focus.sc-ion-input-md-h .input-highlight.sc-ion-input-md{-webkit-transform:scale(1);transform:scale(1)}.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md{bottom:0}.in-item.sc-ion-input-md-h .input-highlight.sc-ion-input-md{inset-inline-start:0}.input-shape-round.sc-ion-input-md-h{--border-radius:16px}.sc-ion-input-md-s>ion-button[slot=start].button-has-icon-only,.sc-ion-input-md-s>ion-button[slot=end].button-has-icon-only{--border-radius:50%;--padding-start:8px;--padding-end:8px;--padding-top:8px;--padding-bottom:8px;aspect-ratio:1;min-height:40px}`;
    Input = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionInput = createEvent(this, "ionInput", 7);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.inputId = `ion-input-${inputIds++}`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.labelTextId = `${this.inputId}-label`;
        this.inheritedAttributes = {};
        this.isComposing = false;
        this.didInputClearOnEdit = false;
        this.hasFocus = false;
        this.isInvalid = false;
        this.autocapitalize = "off";
        this.autocomplete = "off";
        this.autocorrect = false;
        this.autofocus = false;
        this.clearInput = false;
        this.counter = false;
        this.disabled = false;
        this.labelPlacement = "start";
        this.name = this.inputId;
        this.readonly = false;
        this.required = false;
        this.spellcheck = false;
        this.type = "text";
        this.value = "";
        this.onInput = (ev) => {
          const input = ev.target;
          if (input) {
            this.value = input.value || "";
          }
          this.emitInputChange(ev);
        };
        this.onChange = (ev) => {
          this.emitValueChange(ev);
        };
        this.onBlur = (ev) => {
          this.hasFocus = false;
          if (this.focusedValue !== this.value) {
            this.emitValueChange(ev);
          }
          this.didInputClearOnEdit = false;
          this.ionBlur.emit(ev);
        };
        this.onFocus = (ev) => {
          this.hasFocus = true;
          this.focusedValue = this.value;
          this.ionFocus.emit(ev);
        };
        this.onKeydown = (ev) => {
          this.checkClearOnEdit(ev);
        };
        this.onCompositionStart = () => {
          this.isComposing = true;
        };
        this.onCompositionEnd = () => {
          this.isComposing = false;
        };
        this.clearTextInput = (ev) => {
          if (this.clearInput && !this.readonly && !this.disabled && ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.setFocus();
          }
          this.value = "";
          this.emitInputChange(ev);
        };
        this.onLabelClick = (ev) => {
          const target = ev.target;
          const slotted = target.closest('[slot="start"], [slot="end"]');
          if (slotted === null || slotted === this.el || !this.el.contains(slotted)) {
            ev.stopPropagation();
          }
        };
      }
      debounceChanged() {
        const { ionInput, debounce, originalIonInput } = this;
        this.ionInput = debounce === void 0 ? originalIonInput ?? ionInput : debounceEvent(ionInput, debounce);
      }
      /**
       * Whenever the type on the input changes we need
       * to update the internal type prop on the password
       * toggle so that that correct icon is shown.
       */
      onTypeChange() {
        const passwordToggle = this.el.querySelector("ion-input-password-toggle");
        if (passwordToggle) {
          passwordToggle.type = this.type;
        }
      }
      /**
       * Update the native input element when the value changes
       */
      valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();
        if (nativeInput && nativeInput.value !== value && !this.isComposing) {
          nativeInput.value = value;
        }
      }
      /**
       * dir is a globally enumerated attribute.
       * As a result, creating these as properties
       * can have unintended side effects. Instead, we
       * listen for attribute changes and inherit them
       * to the inner `<input>` element.
       */
      onDirChanged(newValue) {
        this.inheritedAttributes = __spreadProps(__spreadValues({}, this.inheritedAttributes), {
          dir: newValue
        });
        forceUpdate(this);
      }
      /**
       * This prevents the native input from emitting the click event.
       * Instead, the click event from the ion-input is emitted.
       */
      onClickCapture(ev) {
        this.clickController?.handleClickCapture(ev);
      }
      componentWillLoad() {
        this.inheritedAttributes = __spreadValues(__spreadValues({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ["tabindex", "title", "data-form-type", "dir"]));
      }
      connectedCallback() {
        const { el } = this;
        this.slotMutationController = createSlotMutationController(el, ["label", "start", "end"], () => {
          this.startContainerController?.calculateStartContainerWidth();
          this.setSlottedLabelId();
          forceUpdate(this);
        });
        this.setSlottedLabelId();
        this.notchController = createNotchController(el, () => this.notchSpacerEl, () => this.labelSlot);
        this.startContainerController = createStartContainerController(el, () => this.startContainerEl, () => {
          return getIonMode(this) === "md" && this.fill === "outline";
        });
        this.startContainerController.calculateStartContainerWidth();
        this.clickController = createClickController(el, () => this.nativeInput);
        if (typeof MutationObserver !== "undefined") {
          this.validationObserver = new MutationObserver(() => {
            const newIsInvalid = checkInvalidState(el);
            if (this.isInvalid !== newIsInvalid) {
              this.isInvalid = newIsInvalid;
              forceUpdate(this);
            }
          });
          this.validationObserver.observe(el, {
            attributes: true,
            attributeFilter: ["class"]
          });
        }
        this.isInvalid = checkInvalidState(el);
        this.debounceChanged();
        {
          document.dispatchEvent(new CustomEvent("ionInputDidLoad", {
            detail: this.el
          }));
        }
      }
      componentDidLoad() {
        this.originalIonInput = this.ionInput;
        this.onTypeChange();
        this.debounceChanged();
      }
      componentDidRender() {
        this.notchController?.calculateNotchWidth();
        this.startContainerController?.calculateStartContainerWidth();
      }
      disconnectedCallback() {
        {
          document.dispatchEvent(new CustomEvent("ionInputDidUnload", {
            detail: this.el
          }));
        }
        if (this.slotMutationController) {
          this.slotMutationController.destroy();
          this.slotMutationController = void 0;
        }
        if (this.notchController) {
          this.notchController.destroy();
          this.notchController = void 0;
        }
        if (this.startContainerController) {
          this.startContainerController.destroy();
          this.startContainerController = void 0;
        }
        if (this.validationObserver) {
          this.validationObserver.disconnect();
          this.validationObserver = void 0;
        }
      }
      /**
       * Sets focus on the native `input` in `ion-input`. Use this method instead of the global
       * `input.focus()`.
       *
       * Developers who wish to focus an input when a page enters
       * should call `setFocus()` in the `ionViewDidEnter()` lifecycle method.
       *
       * Developers who wish to focus an input when an overlay is presented
       * should call `setFocus` after `didPresent` has resolved.
       *
       * See [managing focus](/docs/developing/managing-focus) for more information.
       */
      setFocus() {
        return __async(this, null, function* () {
          if (this.nativeInput) {
            this.nativeInput.focus();
          }
        });
      }
      /**
       * Returns the native `<input>` element used under the hood.
       */
      getInputElement() {
        return __async(this, null, function* () {
          if (!this.nativeInput) {
            yield new Promise((resolve) => componentOnReady(this.el, resolve));
          }
          return Promise.resolve(this.nativeInput);
        });
      }
      /**
       * Emits an `ionChange` event.
       *
       * This API should be called for user committed changes.
       * This API should not be used for external value changes.
       */
      emitValueChange(event) {
        const { value } = this;
        const newValue = value == null ? value : value.toString();
        this.focusedValue = newValue;
        this.ionChange.emit({ value: newValue, event });
      }
      /**
       * Emits an `ionInput` event.
       */
      emitInputChange(event) {
        const { value } = this;
        const newValue = value == null ? value : value.toString();
        this.ionInput.emit({ value: newValue, event });
      }
      shouldClearOnEdit() {
        const { type, clearOnEdit } = this;
        return clearOnEdit === void 0 ? type === "password" : clearOnEdit;
      }
      getValue() {
        return typeof this.value === "number" ? this.value.toString() : (this.value || "").toString();
      }
      checkClearOnEdit(ev) {
        if (!this.shouldClearOnEdit()) {
          return;
        }
        const IGNORED_KEYS = ["Enter", "Tab", "Shift", "Meta", "Alt", "Control"];
        const pressedIgnoredKey = IGNORED_KEYS.includes(ev.key);
        if (!this.didInputClearOnEdit && this.hasValue() && !pressedIgnoredKey) {
          this.value = "";
          this.emitInputChange(ev);
        }
        if (!pressedIgnoredKey) {
          this.didInputClearOnEdit = true;
        }
      }
      hasValue() {
        return this.getValue().length > 0;
      }
      /**
       * Renders the helper text or error text values
       */
      renderHintText() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        return [
          h("div", { id: helperTextId, class: "helper-text", "aria-live": "polite" }, !isInvalid ? helperText : null),
          h("div", { id: errorTextId, class: "error-text", role: "alert" }, isInvalid ? errorText : null)
        ];
      }
      getHintTextID() {
        const { isInvalid, helperText, errorText, helperTextId, errorTextId } = this;
        if (isInvalid && errorText) {
          return errorTextId;
        }
        if (helperText) {
          return helperTextId;
        }
        return void 0;
      }
      renderCounter() {
        const { counter, maxlength, counterFormatter, value } = this;
        if (counter !== true || maxlength === void 0) {
          return;
        }
        return h("div", { class: "counter" }, getCounterText(value, maxlength, counterFormatter));
      }
      /**
       * Responsible for rendering helper text,
       * error text, and counter. This element should only
       * be rendered if hint text is set or counter is enabled.
       */
      renderBottomContent() {
        const { counter, helperText, errorText, maxlength } = this;
        const hasHintText = !!helperText || !!errorText;
        const hasCounter = counter === true && maxlength !== void 0;
        if (!hasHintText && !hasCounter) {
          return;
        }
        return h("div", { class: "input-bottom" }, this.renderHintText(), this.renderCounter());
      }
      renderLabel() {
        const { label, labelTextId } = this;
        return h("div", { class: {
          "label-text-wrapper": true,
          "label-text-wrapper-hidden": !this.hasLabel
        }, "aria-hidden": this.hasLabel ? "true" : null }, label === void 0 ? h("slot", { name: "label" }) : h("div", { class: "label-text", id: labelTextId }, label));
      }
      /**
       * Gets any content passed into the `label` slot,
       * not the <slot> definition.
       */
      get labelSlot() {
        return this.el.querySelector('[slot="label"]');
      }
      /**
       * Ensures the slotted label element has an ID for aria-labelledby.
       * If no ID exists, we assign one using our generated labelTextId.
       */
      setSlottedLabelId() {
        const slottedLabel = this.labelSlot;
        if (slottedLabel && !slottedLabel.id) {
          slottedLabel.id = this.labelTextId;
        }
      }
      /**
       * Returns the ID to use for aria-labelledby on the native input,
       * or undefined if aria-label is explicitly set (to avoid conflicts).
       */
      getLabelledById() {
        if (this.inheritedAttributes["aria-label"]) {
          return void 0;
        }
        if (this.label !== void 0) {
          return this.labelTextId;
        }
        return this.labelSlot?.id || void 0;
      }
      /**
       * Returns `true` if label content is provided
       * either by a prop or a content. If you want
       * to get the plaintext value of the label use
       * the `labelText` getter instead.
       */
      get hasLabel() {
        return this.label !== void 0 || this.labelSlot !== null;
      }
      /**
       * Renders the outline border with a notch for the label.
       */
      renderOutlineContainer() {
        return h("div", { class: "input-outline-container" }, h("div", { class: "input-outline-start" }), h("div", { class: {
          "input-outline-notch": true,
          "input-outline-notch-hidden": !this.hasLabel
        } }, h("div", { class: "notch-spacer", "aria-hidden": "true", ref: (el) => this.notchSpacerEl = el }, this.label)), h("div", { class: "input-outline-end" }));
      }
      render() {
        const { disabled, fill, readonly, shape, inputId, labelPlacement, hasFocus, clearInputIcon } = this;
        const mode = getIonMode(this);
        const value = this.getValue();
        const inItem = hostContext("ion-item", this.el);
        const shouldRenderHighlight = mode === "md" && fill !== "outline" && !inItem;
        const defaultClearIcon = mode === "ios" ? closeCircle : closeSharp;
        const clearIconData = clearInputIcon ?? defaultClearIcon;
        const hasValue = this.hasValue();
        const hasOutlineFill = mode === "md" && fill === "outline";
        const labelShouldFloat = labelPlacement === "stacked" || labelPlacement === "floating" && (hasValue || hasFocus);
        return h(Host, { key: "290cf987de670276bf40b9f19d35d3769d9c0540", class: createColorClasses(this.color, {
          [mode]: true,
          "has-value": hasValue,
          "has-focus": hasFocus,
          "label-floating": labelShouldFloat,
          [`input-fill-${fill}`]: fill !== void 0,
          [`input-shape-${shape}`]: shape !== void 0,
          [`input-label-placement-${labelPlacement}`]: true,
          "in-item": inItem,
          "in-item-color": hostContext("ion-item.ion-color", this.el),
          "input-disabled": disabled
        }) }, h("label", { key: "27f4bd671f6084a7e608e4f9442192c950879dc2", class: "input-wrapper", htmlFor: inputId, onClick: this.onLabelClick }, hasOutlineFill && this.renderOutlineContainer(), h("div", { key: "7827c61ffdd02952fc8cf2096f621b50fc51ec03", class: "input-start", ref: (el) => this.startContainerEl = el }, h("slot", { key: "1d8af52d3506742d87334b388859a8bf613e1be0", name: "start" })), h("div", { key: "927a412064538c00df98fabc06a32c564d05e984", class: "input-control" }, this.renderLabel(), h("div", { key: "05f80c0b11a7da57445f976bd2dbb557fa63c9bc", class: "native-wrapper", onClick: this.onLabelClick }, h("input", __spreadValues({ key: "cb6f5d81ba7c2a04cc4c9deb5d3f5bca8562b6db", class: "native-input", ref: (input) => this.nativeInput = input, id: inputId, disabled, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect ? "on" : "off", autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || "", readOnly: readonly, required: this.required, spellcheck: this.spellcheck, step: this.step, type: this.type, value, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown, onCompositionstart: this.onCompositionStart, onCompositionend: this.onCompositionEnd, "aria-describedby": this.getHintTextID(), "aria-invalid": this.isInvalid ? "true" : void 0, "aria-labelledby": this.getLabelledById() }, this.inheritedAttributes)))), h("div", { key: "82cd1b0458dcd491fd1a46b29764f2b79a969bc6", class: "input-end" }, this.clearInput && !readonly && !disabled && h("button", { key: "dfcf0ed81cf36fc61b8e12ed4605ac6b6eb50dad", "aria-label": "reset", type: "button", class: "input-clear-icon", onPointerDown: (ev) => {
          ev.preventDefault();
        }, onClick: this.clearTextInput }, h("ion-icon", { key: "11e2c866135f332e81b4637de178e1c5c7da0d38", "aria-hidden": "true", icon: clearIconData })), h("slot", { key: "afb0e75e7103b2bf925a9c7649c93eb1d5702670", name: "end" })), shouldRenderHighlight && h("div", { key: "1f305bba279e93685d7139acf0aff6bf4a77500c", class: "input-highlight" })), this.renderBottomContent());
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "debounce": [{
            "debounceChanged": 0
          }],
          "type": [{
            "onTypeChange": 0
          }],
          "value": [{
            "valueChanged": 0
          }],
          "dir": [{
            "onDirChanged": 0
          }]
        };
      }
    };
    inputIds = 0;
    Input.style = {
      ios: inputIosCss(),
      md: inputMdCss()
    };
  }
});
init_ion_input_entry();
export {
  Input as ion_input
};
//# debugId=1b322736-d083-5dba-a8d6-5f094e8d4236
//# sourceMappingURL=chunk-X2K2PUJI.js.map
