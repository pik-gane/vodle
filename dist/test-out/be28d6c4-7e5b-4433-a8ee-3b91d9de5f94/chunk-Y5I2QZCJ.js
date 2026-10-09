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
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-textarea.entry.js
var textareaIosCss, textareaMdCss, Textarea, textareaIds;
var init_ion_textarea_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-textarea.entry.js"() {
    init_index_BpRUsN_W();
    init_slot_mutation_controller_hAS2uJ7c();
    init_validity_DJztqcrH();
    init_helpers_BJqKF1pr();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_input_utils_DZY_K8Po();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    textareaIosCss = () => `.sc-ion-textarea-ios-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);--padding-top:0;--padding-end:0;--padding-bottom:8px;--padding-start:0;--border-radius:0;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #0054e9);--highlight-color-valid:var(--ion-color-success, #2dd55b);--highlight-color-invalid:var(--ion-color-danger, #c5000f);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;min-height:44px;color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}[cols].sc-ion-textarea-ios-h:not([auto-grow]){width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.ion-color.sc-ion-textarea-ios-h{--highlight-color-focused:var(--ion-color-base);background:initial}ion-item.sc-ion-textarea-ios-h,ion-item .sc-ion-textarea-ios-h{-ms-flex-item-align:baseline;align-self:baseline}ion-item[slot=start].sc-ion-textarea-ios-h,ion-item [slot=start].sc-ion-textarea-ios-h,ion-item[slot=end].sc-ion-textarea-ios-h,ion-item [slot=end].sc-ion-textarea-ios-h{width:auto}.native-textarea.sc-ion-textarea-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;position:relative;-ms-flex:1;flex:1;width:100%;min-width:2ch;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;white-space:pre-wrap;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;resize:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.native-textarea.sc-ion-textarea-ios::-webkit-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::-moz-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios:-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-ios{color:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-align:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;grid-area:1/1/2/2;word-break:break-word}.cloned-input.sc-ion-textarea-ios{position:absolute;top:0;bottom:0;height:auto;max-height:none;pointer-events:none}.cloned-input.sc-ion-textarea-ios:disabled{opacity:1}[auto-grow].sc-ion-textarea-ios-h .cloned-input.sc-ion-textarea-ios{height:100%}[auto-grow].sc-ion-textarea-ios-h .native-textarea.sc-ion-textarea-ios{overflow:hidden}.textarea-wrapper.sc-ion-textarea-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:0;padding-bottom:0;border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:start;align-items:flex-start;height:inherit;min-height:inherit;-webkit-transition:background-color 15ms linear;transition:background-color 15ms linear;background:var(--background);line-height:normal}.textarea-control.sc-ion-textarea-ios{padding-left:0;padding-right:0;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:start;align-items:start;-ms-flex-item-align:stretch;align-self:stretch;width:100%;min-width:0}.native-wrapper.sc-ion-textarea-ios{position:relative;width:100%;height:100%}.textarea-label-placement-start.sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios,.textarea-label-placement-end.sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios,.textarea-label-placement-fixed.sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios{-ms-flex:1 1 0px;flex:1 1 0}.has-focus.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios{caret-color:var(--highlight-color)}.native-wrapper.sc-ion-textarea-ios{display:grid;min-width:2ch;max-width:inherit;min-height:inherit;max-height:inherit;grid-auto-rows:100%}.native-wrapper.sc-ion-textarea-ios::after{white-space:pre-wrap;content:attr(data-replicated-value) " ";visibility:hidden}.native-wrapper.sc-ion-textarea-ios::after{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:var(--border-radius);color:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-align:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;grid-area:1/1/2/2;word-break:break-word}.ion-touched.ion-invalid.sc-ion-textarea-ios-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-textarea-ios-h{--highlight-color:var(--highlight-color-valid)}.textarea-bottom.sc-ion-textarea-ios{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:0.75rem;white-space:normal}.has-focus.ion-valid.sc-ion-textarea-ios-h,.ion-touched.ion-invalid.sc-ion-textarea-ios-h{--border-color:var(--highlight-color)}.textarea-bottom.sc-ion-textarea-ios .error-text.sc-ion-textarea-ios{display:none;color:var(--highlight-color-invalid)}.textarea-bottom.sc-ion-textarea-ios .helper-text.sc-ion-textarea-ios{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid.sc-ion-textarea-ios-h .textarea-bottom.sc-ion-textarea-ios .error-text.sc-ion-textarea-ios{display:block}.ion-touched.ion-invalid.sc-ion-textarea-ios-h .textarea-bottom.sc-ion-textarea-ios .helper-text.sc-ion-textarea-ios{display:none}.textarea-bottom.sc-ion-textarea-ios .counter.sc-ion-textarea-ios{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));white-space:nowrap;-webkit-padding-start:16px;padding-inline-start:16px}.label-text-wrapper.sc-ion-textarea-ios{min-width:0;max-width:200px;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.skip-label-transition.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-transition:none;transition:none}.label-text.sc-ion-textarea-ios,.sc-ion-textarea-ios-s>[slot=label]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden.sc-ion-textarea-ios,.textarea-outline-notch-hidden.sc-ion-textarea-ios{display:none}.textarea-wrapper.sc-ion-textarea-ios textarea.sc-ion-textarea-ios{-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.textarea-label-placement-start.sc-ion-textarea-ios-h .textarea-control.sc-ion-textarea-ios{-ms-flex-direction:row;flex-direction:row}.textarea-label-placement-start.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.textarea-label-placement-end.sc-ion-textarea-ios-h .textarea-control.sc-ion-textarea-ios{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.textarea-label-placement-end.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-ios-h .label-text.sc-ion-textarea-ios{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.textarea-label-placement-stacked.sc-ion-textarea-ios-h,.textarea-label-placement-floating.sc-ion-textarea-ios-h{--padding-top:20px;--padding-bottom:6px}.textarea-label-placement-stacked.sc-ion-textarea-ios-h .textarea-control.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h .textarea-control.sc-ion-textarea-ios{padding-top:0;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start}.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-transform-origin:left top;transform-origin:left top;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;max-width:100%;z-index:2}[dir=rtl].sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl].textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .textarea-label-placement-stacked.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl].sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .sc-ion-textarea-ios-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl].textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios,[dir=rtl] .textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.textarea-label-placement-stacked.sc-ion-textarea-ios-h:dir(rtl) .label-text-wrapper.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h:dir(rtl) .label-text-wrapper.sc-ion-textarea-ios{-webkit-transform-origin:right top;transform-origin:right top}}.textarea-label-placement-stacked.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios,.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios,.textarea-label-placement-stacked[auto-grow].sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios::after,.textarea-label-placement-floating[auto-grow].sc-ion-textarea-ios-h .native-wrapper.sc-ion-textarea-ios::after{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:8px;margin-bottom:0px}.textarea-label-placement-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-transform:translateY(100%) scale(1);transform:translateY(100%) scale(1)}.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios{opacity:0}.has-focus.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios,.has-value.textarea-label-placement-floating.sc-ion-textarea-ios-h textarea.sc-ion-textarea-ios{opacity:1}.label-floating.sc-ion-textarea-ios-h .label-text-wrapper.sc-ion-textarea-ios{-webkit-transform:translateY(50%) scale(0.75);transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.textarea-start.sc-ion-textarea-ios,.textarea-end.sc-ion-textarea-ios{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-item-align:start;align-self:start}.sc-ion-textarea-ios-s>[slot=start],.sc-ion-textarea-ios-s>[slot=end]{margin-top:var(--padding-top)}.sc-ion-textarea-ios-s>[slot=start]:last-of-type{-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-start:0;margin-inline-start:0}.sc-ion-textarea-ios-s>[slot=end]:first-of-type{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}.sc-ion-textarea-ios-h{--border-width:0.55px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))));--padding-top:10px;--padding-end:0px;--padding-bottom:8px;--padding-start:0px;--highlight-height:0px;font-size:inherit}.textarea-label-placement-floating.sc-ion-textarea-ios-h,.textarea-label-placement-stacked.sc-ion-textarea-ios-h{min-height:56px}.textarea-disabled.sc-ion-textarea-ios-h{opacity:0.3}.sc-ion-textarea-ios-s>ion-button[slot=start],.sc-ion-textarea-ios-s>ion-button[slot=end]{margin-top:2px}.sc-ion-textarea-ios-h.textarea-label-placement-floating.sc-ion-textarea-ios-s>ion-button[slot=start],.sc-ion-textarea-ios-h.textarea-label-placement-floating .sc-ion-textarea-ios-s>ion-button[slot=start],.sc-ion-textarea-ios-h.textarea-label-placement-floating.sc-ion-textarea-ios-s>ion-button[slot=end],.sc-ion-textarea-ios-h.textarea-label-placement-floating .sc-ion-textarea-ios-s>ion-button[slot=end],.sc-ion-textarea-ios-h.textarea-label-placement-stacked.sc-ion-textarea-ios-s>ion-button[slot=start],.sc-ion-textarea-ios-h.textarea-label-placement-stacked .sc-ion-textarea-ios-s>ion-button[slot=start],.sc-ion-textarea-ios-h.textarea-label-placement-stacked.sc-ion-textarea-ios-s>ion-button[slot=end],.sc-ion-textarea-ios-h.textarea-label-placement-stacked .sc-ion-textarea-ios-s>ion-button[slot=end]{margin-top:10px}.sc-ion-textarea-ios-s>ion-button[slot=start].button-has-icon-only,.sc-ion-textarea-ios-s>ion-button[slot=end].button-has-icon-only{--border-radius:50%;--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;aspect-ratio:1}`;
    textareaMdCss = () => `.sc-ion-textarea-md-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);--padding-top:0;--padding-end:0;--padding-bottom:8px;--padding-start:0;--border-radius:0;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #0054e9);--highlight-color-valid:var(--ion-color-success, #2dd55b);--highlight-color-invalid:var(--ion-color-danger, #c5000f);--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;min-height:44px;color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2;-webkit-box-sizing:border-box;box-sizing:border-box}[cols].sc-ion-textarea-md-h:not([auto-grow]){width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.ion-color.sc-ion-textarea-md-h{--highlight-color-focused:var(--ion-color-base);background:initial}ion-item.sc-ion-textarea-md-h,ion-item .sc-ion-textarea-md-h{-ms-flex-item-align:baseline;align-self:baseline}ion-item[slot=start].sc-ion-textarea-md-h,ion-item [slot=start].sc-ion-textarea-md-h,ion-item[slot=end].sc-ion-textarea-md-h,ion-item [slot=end].sc-ion-textarea-md-h{width:auto}.native-textarea.sc-ion-textarea-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;position:relative;-ms-flex:1;flex:1;width:100%;min-width:2ch;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;white-space:pre-wrap;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;resize:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.native-textarea.sc-ion-textarea-md::-webkit-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::-moz-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md:-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md{color:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-align:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;grid-area:1/1/2/2;word-break:break-word}.cloned-input.sc-ion-textarea-md{position:absolute;top:0;bottom:0;height:auto;max-height:none;pointer-events:none}.cloned-input.sc-ion-textarea-md:disabled{opacity:1}[auto-grow].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md{height:100%}[auto-grow].sc-ion-textarea-md-h .native-textarea.sc-ion-textarea-md{overflow:hidden}.textarea-wrapper.sc-ion-textarea-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:0;padding-bottom:0;border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:start;align-items:flex-start;height:inherit;min-height:inherit;-webkit-transition:background-color 15ms linear;transition:background-color 15ms linear;background:var(--background);line-height:normal}.textarea-control.sc-ion-textarea-md{padding-left:0;padding-right:0;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:start;align-items:start;-ms-flex-item-align:stretch;align-self:stretch;width:100%;min-width:0}.native-wrapper.sc-ion-textarea-md{position:relative;width:100%;height:100%}.textarea-label-placement-start.sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md,.textarea-label-placement-end.sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md,.textarea-label-placement-fixed.sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md{-ms-flex:1 1 0px;flex:1 1 0}.has-focus.sc-ion-textarea-md-h textarea.sc-ion-textarea-md{caret-color:var(--highlight-color)}.native-wrapper.sc-ion-textarea-md{display:grid;min-width:2ch;max-width:inherit;min-height:inherit;max-height:inherit;grid-auto-rows:100%}.native-wrapper.sc-ion-textarea-md::after{white-space:pre-wrap;content:attr(data-replicated-value) " ";visibility:hidden}.native-wrapper.sc-ion-textarea-md::after{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:var(--border-radius);color:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-align:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;grid-area:1/1/2/2;word-break:break-word}.ion-touched.ion-invalid.sc-ion-textarea-md-h{--highlight-color:var(--highlight-color-invalid)}.ion-valid.sc-ion-textarea-md-h{--highlight-color:var(--highlight-color-valid)}.textarea-bottom.sc-ion-textarea-md{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:0.75rem;white-space:normal}.has-focus.ion-valid.sc-ion-textarea-md-h,.ion-touched.ion-invalid.sc-ion-textarea-md-h{--border-color:var(--highlight-color)}.textarea-bottom.sc-ion-textarea-md .error-text.sc-ion-textarea-md{display:none;color:var(--highlight-color-invalid)}.textarea-bottom.sc-ion-textarea-md .helper-text.sc-ion-textarea-md{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}.ion-touched.ion-invalid.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md .error-text.sc-ion-textarea-md{display:block}.ion-touched.ion-invalid.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md .helper-text.sc-ion-textarea-md{display:none}.textarea-bottom.sc-ion-textarea-md .counter.sc-ion-textarea-md{-webkit-margin-start:auto;margin-inline-start:auto;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));white-space:nowrap;-webkit-padding-start:16px;padding-inline-start:16px}.label-text-wrapper.sc-ion-textarea-md{min-width:0;max-width:200px;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.skip-label-transition.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transition:none;transition:none}.label-text.sc-ion-textarea-md,.sc-ion-textarea-md-s>[slot=label]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden.sc-ion-textarea-md,.textarea-outline-notch-hidden.sc-ion-textarea-md{display:none}.textarea-wrapper.sc-ion-textarea-md textarea.sc-ion-textarea-md{-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.textarea-label-placement-start.sc-ion-textarea-md-h .textarea-control.sc-ion-textarea-md{-ms-flex-direction:row;flex-direction:row}.textarea-label-placement-start.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.textarea-label-placement-end.sc-ion-textarea-md-h .textarea-control.sc-ion-textarea-md{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.textarea-label-placement-end.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}.textarea-label-placement-fixed.sc-ion-textarea-md-h .label-text.sc-ion-textarea-md{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.textarea-label-placement-stacked.sc-ion-textarea-md-h,.textarea-label-placement-floating.sc-ion-textarea-md-h{--padding-top:20px;--padding-bottom:6px}.textarea-label-placement-stacked.sc-ion-textarea-md-h .textarea-control.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h .textarea-control.sc-ion-textarea-md{padding-top:0;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start}.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform-origin:left top;transform-origin:left top;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;max-width:100%;z-index:2}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.textarea-label-placement-stacked.sc-ion-textarea-md-h:dir(rtl) .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h:dir(rtl) .label-text-wrapper.sc-ion-textarea-md{-webkit-transform-origin:right top;transform-origin:right top}}.textarea-label-placement-stacked.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-label-placement-stacked[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after,.textarea-label-placement-floating[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:8px;margin-bottom:0px}.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform:translateY(100%) scale(1);transform:translateY(100%) scale(1)}.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md{opacity:0}.has-focus.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.has-value.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md{opacity:1}.label-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform:translateY(50%) scale(0.75);transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.textarea-start.sc-ion-textarea-md,.textarea-end.sc-ion-textarea-md{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-item-align:start;align-self:start}.sc-ion-textarea-md-s>[slot=start],.sc-ion-textarea-md-s>[slot=end]{margin-top:var(--padding-top)}.sc-ion-textarea-md-s>[slot=start]:last-of-type{-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-start:0;margin-inline-start:0}.sc-ion-textarea-md-s>[slot=end]:first-of-type{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}.textarea-fill-solid.sc-ion-textarea-md-h{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--border-color:var(--ion-color-step-500, var(--ion-background-color-step-500, gray));--border-radius:4px;--padding-start:16px;--padding-end:16px}.textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-bottom:var(--border-width) var(--border-style) var(--border-color)}.has-focus.textarea-fill-solid.ion-valid.sc-ion-textarea-md-h,.textarea-fill-solid.ion-touched.ion-invalid.sc-ion-textarea-md-h{--border-color:var(--highlight-color)}.textarea-fill-solid.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md{border-top:none}@media (any-hover: hover){.textarea-fill-solid.sc-ion-textarea-md-h:hover{--background:var(--ion-color-step-100, var(--ion-background-color-step-100, #e6e6e6));--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}}.textarea-fill-solid.has-focus.sc-ion-textarea-md-h{--background:var(--ion-color-step-150, var(--ion-background-color-step-150, #d9d9d9));--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}.textarea-fill-solid.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0px;border-end-start-radius:0px}.label-floating.textarea-fill-solid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{max-width:calc(100% / 0.75)}.textarea-fill-outline.sc-ion-textarea-md-h{--border-color:var(--ion-color-step-300, var(--ion-background-color-step-300, #b3b3b3));--border-radius:4px;--padding-start:16px;--padding-end:16px;--internal-start-container-adjustment:0px}.textarea-fill-outline.textarea-shape-round.sc-ion-textarea-md-h{--border-radius:28px;--padding-start:32px;--padding-end:32px}.has-focus.textarea-fill-outline.ion-valid.sc-ion-textarea-md-h,.textarea-fill-outline.ion-touched.ion-invalid.sc-ion-textarea-md-h{--border-color:var(--highlight-color)}@media (any-hover: hover){.textarea-fill-outline.sc-ion-textarea-md-h:hover{--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}}.textarea-fill-outline.has-focus.sc-ion-textarea-md-h{--border-width:var(--highlight-height);--border-color:var(--highlight-color)}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-bottom.sc-ion-textarea-md{border-top:none}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-wrapper.sc-ion-textarea-md{border-bottom:none}.textarea-fill-outline.sc-ion-textarea-md-h:not(.label-floating) .textarea-control.sc-ion-textarea-md{position:relative}.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform-origin:left top;transform-origin:left top;position:absolute;max-width:100%}[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .sc-ion-textarea-md-h -no-combinator.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl].textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,[dir=rtl] .textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h:dir(rtl) .label-text-wrapper.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h:dir(rtl) .label-text-wrapper.sc-ion-textarea-md{-webkit-transform-origin:right top;transform-origin:right top}}.textarea-fill-outline.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{position:relative}.label-floating.textarea-fill-outline.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{-webkit-transform:translate(var(--internal-start-container-adjustment, 0px), -32%) scale(0.75);transform:translate(var(--internal-start-container-adjustment, 0px), -32%) scale(0.75);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;max-width:calc(     (100% - var(--padding-start) - var(--padding-end) - 8px) / 0.75   )}.textarea-fill-outline.textarea-label-placement-stacked.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-floating.sc-ion-textarea-md-h textarea.sc-ion-textarea-md,.textarea-fill-outline.textarea-label-placement-stacked[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after,.textarea-fill-outline.textarea-label-placement-floating[auto-grow].sc-ion-textarea-md-h .native-wrapper.sc-ion-textarea-md::after{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:0px;margin-inline-end:0px;margin-top:19px;margin-bottom:0px}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-container.sc-ion-textarea-md{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;width:100%;height:100%}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{pointer-events:none}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md,.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md,.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{border-top:var(--border-width) var(--border-style) var(--border-color);border-bottom:var(--border-width) var(--border-style) var(--border-color)}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md{max-width:calc(100% - var(--padding-start) - var(--padding-end))}.textarea-fill-outline.sc-ion-textarea-md-h .notch-spacer.sc-ion-textarea-md{-webkit-padding-end:8px;padding-inline-end:8px;font-size:calc(1em * 0.75);opacity:0;pointer-events:none;-webkit-box-sizing:content-box;box-sizing:content-box}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-start.sc-ion-textarea-md{border-start-start-radius:var(--border-radius);border-start-end-radius:0px;border-end-end-radius:0px;border-end-start-radius:var(--border-radius);-webkit-border-start:var(--border-width) var(--border-style) var(--border-color);border-inline-start:var(--border-width) var(--border-style) var(--border-color);width:calc(var(--padding-start) - 4px)}.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-end.sc-ion-textarea-md{-webkit-border-end:var(--border-width) var(--border-style) var(--border-color);border-inline-end:var(--border-width) var(--border-style) var(--border-color);border-start-start-radius:0px;border-start-end-radius:var(--border-radius);border-end-end-radius:var(--border-radius);border-end-start-radius:0px;-ms-flex-positive:1;flex-grow:1}.label-floating.textarea-fill-outline.sc-ion-textarea-md-h .textarea-outline-notch.sc-ion-textarea-md{border-top:none}.sc-ion-textarea-md-h{--border-width:1px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))));--padding-top:18px;--padding-end:0px;--padding-bottom:8px;--padding-start:0px;--highlight-height:2px;min-height:72px;font-size:inherit}.textarea-bottom.sc-ion-textarea-md .counter.sc-ion-textarea-md{letter-spacing:0.0333333333em}.textarea-label-placement-floating.has-focus.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-stacked.has-focus.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{color:var(--highlight-color)}.has-focus.textarea-label-placement-floating.ion-valid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-floating.ion-touched.ion-invalid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.has-focus.textarea-label-placement-stacked.ion-valid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md,.textarea-label-placement-stacked.ion-touched.ion-invalid.sc-ion-textarea-md-h .label-text-wrapper.sc-ion-textarea-md{color:var(--highlight-color)}.textarea-disabled.sc-ion-textarea-md-h{opacity:0.38}.textarea-highlight.sc-ion-textarea-md{bottom:-1px;position:absolute;width:100%;height:var(--highlight-height);-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform 200ms;transition:-webkit-transform 200ms;transition:transform 200ms;transition:transform 200ms, -webkit-transform 200ms;background:var(--highlight-color)}.textarea-highlight.sc-ion-textarea-md{inset-inline-start:0}.has-focus.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{-webkit-transform:scale(1);transform:scale(1)}.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{bottom:0}.in-item.sc-ion-textarea-md-h .textarea-highlight.sc-ion-textarea-md{inset-inline-start:0}.textarea-shape-round.sc-ion-textarea-md-h{--border-radius:16px}.sc-ion-textarea-md-s>ion-button[slot=start],.sc-ion-textarea-md-s>ion-button[slot=end]{margin-top:7px}.sc-ion-textarea-md-s>ion-button[slot=start].button-has-icon-only,.sc-ion-textarea-md-s>ion-button[slot=end].button-has-icon-only{--border-radius:50%;--padding-start:8px;--padding-end:8px;--padding-top:8px;--padding-bottom:8px;aspect-ratio:1;min-height:40px}`;
    Textarea = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionInput = createEvent(this, "ionInput", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.inputId = `ion-textarea-${textareaIds++}`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.didTextareaClearOnEdit = false;
        this.inheritedAttributes = {};
        this.hasFocus = false;
        this.isInvalid = false;
        this.autocapitalize = "none";
        this.autofocus = false;
        this.clearOnEdit = false;
        this.disabled = false;
        this.name = this.inputId;
        this.readonly = false;
        this.required = false;
        this.spellcheck = false;
        this.autoGrow = false;
        this.value = "";
        this.counter = false;
        this.labelPlacement = "start";
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
        this.onFocus = (ev) => {
          this.hasFocus = true;
          this.focusedValue = this.value;
          this.ionFocus.emit(ev);
        };
        this.onBlur = (ev) => {
          this.hasFocus = false;
          if (this.focusedValue !== this.value) {
            this.emitValueChange(ev);
          }
          this.didTextareaClearOnEdit = false;
          this.ionBlur.emit(ev);
        };
        this.onKeyDown = (ev) => {
          this.checkClearOnEdit(ev);
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
       * Update the native input element when the value changes
       */
      valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();
        if (nativeInput && nativeInput.value !== value) {
          nativeInput.value = value;
        }
        this.runAutoGrow();
      }
      /**
       * dir is a globally enumerated attribute.
       * As a result, creating these as properties
       * can have unintended side effects. Instead, we
       * listen for attribute changes and inherit them
       * to the inner `<textarea>` element.
       */
      onDirChanged(newValue) {
        this.inheritedAttributes = __spreadProps(__spreadValues({}, this.inheritedAttributes), {
          dir: newValue
        });
        forceUpdate(this);
      }
      /**
       * This prevents the native input from emitting the click event.
       * Instead, the click event from the ion-textarea is emitted.
       */
      onClickCapture(ev) {
        this.clickController?.handleClickCapture(ev);
      }
      connectedCallback() {
        const { el } = this;
        this.slotMutationController = createSlotMutationController(el, ["label", "start", "end"], () => {
          this.startContainerController?.calculateStartContainerWidth();
          forceUpdate(this);
        });
        this.notchController = createNotchController(el, () => this.notchSpacerEl, () => this.labelSlot);
        this.startContainerController = createStartContainerController(el, () => this.startContainerEl, () => {
          return getIonMode(this) === "md" && this.fill === "outline";
        });
        this.startContainerController.calculateStartContainerWidth();
        this.clickController = createClickController(el, () => this.nativeInput);
        if (typeof MutationObserver !== "undefined") {
          this.validationObserver = new MutationObserver(() => {
            const newIsInvalid = checkInvalidState(this.el);
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
        this.isInvalid = checkInvalidState(this.el);
        this.debounceChanged();
        {
          document.dispatchEvent(new CustomEvent("ionInputDidLoad", {
            detail: el
          }));
        }
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
      componentWillLoad() {
        this.inheritedAttributes = __spreadValues(__spreadValues({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ["data-form-type", "title", "tabindex", "dir"]));
      }
      componentDidLoad() {
        this.originalIonInput = this.ionInput;
        this.runAutoGrow();
      }
      componentDidRender() {
        this.notchController?.calculateNotchWidth();
        this.startContainerController?.calculateStartContainerWidth();
      }
      /**
       * Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
       * `textarea.focus()`.
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
       * Returns the native `<textarea>` element used under the hood.
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
        this.ionInput.emit({ value, event });
      }
      runAutoGrow() {
        if (this.nativeInput && this.autoGrow) {
          writeTask(() => {
            if (this.textareaWrapper) {
              this.textareaWrapper.dataset.replicatedValue = this.value ?? "";
            }
          });
        }
      }
      /**
       * Check if we need to clear the text input if clearOnEdit is enabled
       */
      checkClearOnEdit(ev) {
        if (!this.clearOnEdit) {
          return;
        }
        const IGNORED_KEYS = ["Tab", "Shift", "Meta", "Alt", "Control"];
        const pressedIgnoredKey = IGNORED_KEYS.includes(ev.key);
        if (!this.didTextareaClearOnEdit && this.hasValue() && !pressedIgnoredKey) {
          this.value = "";
          this.emitInputChange(ev);
        }
        if (!pressedIgnoredKey) {
          this.didTextareaClearOnEdit = true;
        }
      }
      hasValue() {
        return this.getValue() !== "";
      }
      getValue() {
        return this.value || "";
      }
      renderLabel() {
        const { label } = this;
        return h("div", { class: {
          "label-text-wrapper": true,
          "label-text-wrapper-hidden": !this.hasLabel
        } }, label === void 0 ? h("slot", { name: "label" }) : h("div", { class: "label-text" }, label));
      }
      /**
       * Gets any content passed into the `label` slot,
       * not the <slot> definition.
       */
      get labelSlot() {
        return this.el.querySelector('[slot="label"]');
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
        return h("div", { class: "textarea-outline-container" }, h("div", { class: "textarea-outline-start" }), h("div", { class: {
          "textarea-outline-notch": true,
          "textarea-outline-notch-hidden": !this.hasLabel
        } }, h("div", { class: "notch-spacer", "aria-hidden": "true", ref: (el) => this.notchSpacerEl = el }, this.label)), h("div", { class: "textarea-outline-end" }));
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
        return h("div", { class: "textarea-bottom" }, this.renderHintText(), this.renderCounter());
      }
      render() {
        const { inputId, disabled, fill, shape, labelPlacement, hasFocus } = this;
        const mode = getIonMode(this);
        const value = this.getValue();
        const inItem = hostContext("ion-item", this.el);
        const shouldRenderHighlight = mode === "md" && fill !== "outline" && !inItem;
        const hasValue = this.hasValue();
        const hasOutlineFill = mode === "md" && fill === "outline";
        const labelShouldFloat = labelPlacement === "stacked" || labelPlacement === "floating" && (hasValue || hasFocus);
        return h(Host, { key: "0f01ed6565313c45beaea5e0aa429a86b9cfa1a0", class: createColorClasses(this.color, {
          [mode]: true,
          "has-value": hasValue,
          "has-focus": hasFocus,
          "label-floating": labelShouldFloat,
          [`textarea-fill-${fill}`]: fill !== void 0,
          [`textarea-shape-${shape}`]: shape !== void 0,
          [`textarea-label-placement-${labelPlacement}`]: true,
          "textarea-disabled": disabled
        }) }, h("label", { key: "a59548c3d3bf66543fd6e06b5c3b6e649f963164", class: "textarea-wrapper", htmlFor: inputId, onClick: this.onLabelClick }, hasOutlineFill && this.renderOutlineContainer(), h("div", { key: "29055193d664d9fe84ba0340fdcbbc54fec0e403", class: "textarea-start", ref: (el) => this.startContainerEl = el }, h("slot", { key: "2cc122d9541ce7ae3c2309c27123b6c6c91cbfc7", name: "start" })), h("div", { key: "c847a6fa1eaf6ef2b296415cd72bdd3aee9828a2", class: "textarea-control" }, this.renderLabel(), h("div", { key: "f9205f82d6346daa86dc7e0f6e1eb221c76ed7b0", class: "native-wrapper", ref: (el) => this.textareaWrapper = el }, h("textarea", __spreadValues({ key: "0bdb517fa5b3a44eeb3bb2ed1f9a8eab21a9a6a1", class: "native-textarea", ref: (el) => this.nativeInput = el, id: inputId, disabled, autoCapitalize: this.autocapitalize, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, minLength: this.minlength, maxLength: this.maxlength, name: this.name, placeholder: this.placeholder || "", readOnly: this.readonly, required: this.required, spellcheck: this.spellcheck, cols: this.cols, rows: this.rows, wrap: this.wrap, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown, "aria-describedby": this.getHintTextID(), "aria-invalid": this.isInvalid ? "true" : void 0 }, this.inheritedAttributes), value))), h("div", { key: "1ce661b800ef12146bdb97fb193e22be227ea052", class: "textarea-end" }, h("slot", { key: "aca5704db48fe8e0e784cf57f2978ae2d63b3edc", name: "end" })), shouldRenderHighlight && h("div", { key: "d916816d44cbdb4bc9a05032c5490eaa9bf3ba47", class: "textarea-highlight" })), this.renderBottomContent());
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "debounce": [{
            "debounceChanged": 0
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
    textareaIds = 0;
    Textarea.style = {
      ios: textareaIosCss(),
      md: textareaMdCss()
    };
  }
});
init_ion_textarea_entry();
export {
  Textarea as ion_textarea
};
//# debugId=50129c68-26f8-59dd-9269-7b655855421a
//# sourceMappingURL=chunk-Y5I2QZCJ.js.map
