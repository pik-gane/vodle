import {
  getOverlayLabelJustify,
  getOverlayLabelPlacement,
  init_overlay_control_label_BSQPZ79H
} from "./chunk-YYER5HYK.js";
import {
  createButtonActiveGesture,
  init_button_active_DVk40Sjl
} from "./chunk-ULBNWDRV.js";
import {
  init_select_option_render_BSDT9oSA,
  renderOptionLabel
} from "./chunk-MTZ3RR6I.js";
import {
  init_haptic_WXfMCob9
} from "./chunk-XHGNMG47.js";
import {
  createLockController,
  init_lock_controller_B_hirT0v
} from "./chunk-MZW2T2S4.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  ENABLE_HTML_CONTENT_DEFAULT,
  init_config_DWCzVL3Y
} from "./chunk-QLB7V5XI.js";
import {
  init_index_CK8uF0iB,
  sanitizeDOMString
} from "./chunk-CPN2CPEA.js";
import {
  createAnimation,
  init_animation_DmtJpz89
} from "./chunk-UYK5QVEZ.js";
import {
  init_index_BmLuEdV7
} from "./chunk-OTRSMIBG.js";
import {
  BACKDROP,
  cleanupRootFocusTrapAccessibility,
  createDelegateController,
  createTriggerController,
  dismiss,
  eventMethod,
  init_overlays_DmDY_El7,
  isCancel,
  prepareOverlay,
  present,
  restoreRootFocusTrapAccessibility,
  safeCall,
  setOverlayId
} from "./chunk-VQMD36Q3.js";
import {
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  init_helpers_BJqKF1pr,
  raf
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
  config,
  createEvent,
  forceUpdate,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonWarning,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-alert.entry.js
var iosEnterAnimation, iosLeaveAnimation, mdEnterAnimation, mdLeaveAnimation, alertIosCss, alertMdCss, Alert, inputClass, buttonClass;
var init_ion_alert_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-alert.entry.js"() {
    init_index_BpRUsN_W();
    init_config_DWCzVL3Y();
    init_button_active_DVk40Sjl();
    init_helpers_BJqKF1pr();
    init_lock_controller_B_hirT0v();
    init_overlay_control_label_BSQPZ79H();
    init_overlays_DmDY_El7();
    init_index_CK8uF0iB();
    init_select_option_render_BSDT9oSA();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_animation_DmtJpz89();
    init_haptic_WXfMCob9();
    init_capacitor_CHJaJ9aX();
    init_index_BmLuEdV7();
    init_gesture_controller_B_gJaBk0();
    init_dir_Dojwmvde();
    init_framework_delegate_CDjM1vRH();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    iosEnterAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      wrapperAnimation.addElement(baseEl.querySelector(".alert-wrapper")).keyframes([
        { offset: 0, opacity: "0.01", transform: "scale(1.1)" },
        { offset: 1, opacity: "1", transform: "scale(1)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    iosLeaveAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
      wrapperAnimation.addElement(baseEl.querySelector(".alert-wrapper")).keyframes([
        { offset: 0, opacity: 0.99, transform: "scale(1)" },
        { offset: 1, opacity: 0, transform: "scale(0.9)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    mdEnterAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      wrapperAnimation.addElement(baseEl.querySelector(".alert-wrapper")).keyframes([
        { offset: 0, opacity: "0.01", transform: "scale(0.9)" },
        { offset: 1, opacity: "1", transform: "scale(1)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(150).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    mdLeaveAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
      wrapperAnimation.addElement(baseEl.querySelector(".alert-wrapper")).fromTo("opacity", 0.99, 0);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(150).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    alertIosCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-alert-ios,.alert-radio-label-has-rich-content.sc-ion-alert-ios,.alert-checkbox-label-has-rich-content.sc-ion-alert-ios,.select-option-label-has-rich-content.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-alert-ios,.alert-radio-label-has-rich-content.sc-ion-alert-ios,.alert-checkbox-label-has-rich-content.sc-ion-alert-ios,.select-option-content.sc-ion-alert-ios{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-alert-ios,.alert-checkbox-label-text.sc-ion-alert-ios,.alert-radio-label-text.sc-ion-alert-ios,.select-option-label-text.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-alert-ios{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-alert-ios:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-alert-ios::part(label),ion-radio.select-option-has-rich-content.sc-ion-alert-ios [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-alert-ios::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-alert-ios [part~="label"],.select-option-content.sc-ion-alert-ios{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-alert-ios>ion-avatar.sc-ion-alert-ios,.select-option-start.sc-ion-alert-ios>ion-img.sc-ion-alert-ios,.select-option-start.sc-ion-alert-ios>ion-thumbnail.sc-ion-alert-ios,.select-option-start.sc-ion-alert-ios>img.sc-ion-alert-ios,.select-option-start.sc-ion-alert-ios>svg.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios>ion-avatar.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios>ion-img.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios>ion-thumbnail.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios>img.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios>svg.sc-ion-alert-ios{width:44px;height:44px}.select-option-start.sc-ion-alert-ios>ion-icon.sc-ion-alert-ios,.select-option-end.sc-ion-alert-ios>ion-icon.sc-ion-alert-ios{font-size:28px}.action-sheet-button-label-text.sc-ion-alert-ios{-ms-flex-pack:center;justify-content:center}.select-option-has-rich-content.sc-ion-alert-ios{-webkit-padding-end:16px;padding-inline-end:16px}.sc-ion-alert-ios-h{--min-width:250px;--width:auto;--min-height:auto;--height:auto;--max-height:90%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-alert-ios-h{display:none}.alert-top.sc-ion-alert-ios-h{padding-top:50px;-ms-flex-align:start;align-items:flex-start}.alert-wrapper.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:content;opacity:0;z-index:10}.alert-title.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.alert-sub-title.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-top:5px;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-weight:normal}.alert-message.sc-ion-alert-ios,.alert-input-group.sc-ion-alert-ios{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-overflow-scrolling:touch;overflow-y:auto;overscroll-behavior-y:contain}.alert-checkbox-label.sc-ion-alert-ios,.alert-radio-label.sc-ion-alert-ios{overflow-wrap:anywhere}@media (any-pointer: coarse){.alert-checkbox-group.sc-ion-alert-ios::-webkit-scrollbar,.alert-radio-group.sc-ion-alert-ios::-webkit-scrollbar,.alert-message.sc-ion-alert-ios::-webkit-scrollbar{display:none}}.alert-input.sc-ion-alert-ios{padding-left:0;padding-right:0;padding-top:10px;padding-bottom:10px;width:100%;border:0;background:inherit;font:inherit;-webkit-box-sizing:border-box;box-sizing:border-box}.alert-button-group.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;width:100%}.alert-button-group-vertical.sc-ion-alert-ios{-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.alert-button.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;border:0;font-size:0.875rem;line-height:1.25rem;z-index:0}.alert-button.ion-focused.sc-ion-alert-ios,.alert-tappable.ion-focused.sc-ion-alert-ios{background:var(--ion-color-step-100, var(--ion-background-color-step-100, #e6e6e6))}.alert-button-inner.sc-ion-alert-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;min-height:inherit}.radio-label-placement-start.sc-ion-alert-ios,.checkbox-label-placement-start.sc-ion-alert-ios{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.radio-label-placement-end.sc-ion-alert-ios,.checkbox-label-placement-end.sc-ion-alert-ios{-ms-flex-direction:row;flex-direction:row}.radio-justify-start.sc-ion-alert-ios,.checkbox-justify-start.sc-ion-alert-ios{-ms-flex-pack:start;justify-content:start}.radio-justify-end.sc-ion-alert-ios,.checkbox-justify-end.sc-ion-alert-ios{-ms-flex-pack:end;justify-content:end}.radio-justify-space-between.sc-ion-alert-ios,.checkbox-justify-space-between.sc-ion-alert-ios{-ms-flex-pack:justify;justify-content:space-between}.alert-input-disabled.sc-ion-alert-ios,.alert-checkbox-button-disabled.sc-ion-alert-ios .alert-button-inner.sc-ion-alert-ios,.alert-radio-button-disabled.sc-ion-alert-ios .alert-button-inner.sc-ion-alert-ios{cursor:default;opacity:0.5;pointer-events:none}.alert-tappable.sc-ion-alert-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:-ms-flexbox;display:flex;width:100%;border:0;background:transparent;font-size:inherit;line-height:initial;text-align:start;-webkit-appearance:none;-moz-appearance:none;appearance:none;contain:content}.alert-button.sc-ion-alert-ios,.alert-checkbox.sc-ion-alert-ios,.alert-input.sc-ion-alert-ios,.alert-radio.sc-ion-alert-ios{outline:none}.alert-radio-icon.sc-ion-alert-ios,.alert-checkbox-icon.sc-ion-alert-ios,.alert-checkbox-inner.sc-ion-alert-ios{-webkit-box-sizing:border-box;box-sizing:border-box}textarea.alert-input.sc-ion-alert-ios{min-height:37px;resize:none}.sc-ion-alert-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, var(--ion-background-color-step-100, #f9f9f9)));--max-width:clamp(270px, 16.875rem, 324px);--backdrop-opacity:var(--ion-backdrop-opacity, 0.3);font-size:max(14px, 0.875rem)}.alert-wrapper.sc-ion-alert-ios{border-radius:13px;-webkit-box-shadow:none;box-shadow:none;overflow:hidden}.alert-button.sc-ion-alert-ios .alert-button-inner.sc-ion-alert-ios{pointer-events:none}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.alert-translucent.sc-ion-alert-ios-h .alert-wrapper.sc-ion-alert-ios{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.9);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.alert-head.sc-ion-alert-ios{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:12px;padding-bottom:7px;text-align:center}.alert-title.sc-ion-alert-ios{margin-top:8px;color:var(--ion-text-color, #000);font-size:max(17px, 1.0625rem);font-weight:600}.alert-sub-title.sc-ion-alert-ios{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));font-size:max(14px, 0.875rem)}.alert-message.sc-ion-alert-ios,.alert-input-group.sc-ion-alert-ios{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0;padding-bottom:21px;color:var(--ion-text-color, #000);font-size:max(13px, 0.8125rem);text-align:center}.alert-message.sc-ion-alert-ios{max-height:240px}.alert-message.sc-ion-alert-ios:empty{padding-left:0;padding-right:0;padding-top:0;padding-bottom:12px}.alert-input.sc-ion-alert-ios{border-radius:7px;margin-top:10px;-webkit-padding-start:7px;padding-inline-start:7px;-webkit-padding-end:7px;padding-inline-end:7px;padding-top:7px;padding-bottom:7px;border:0.55px solid var(--ion-color-step-250, var(--ion-background-color-step-250, #bfbfbf));background-color:var(--ion-background-color, #fff);-webkit-appearance:none;-moz-appearance:none;appearance:none;font-size:1rem}.alert-input.sc-ion-alert-ios::-webkit-input-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::-moz-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios:-ms-input-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::-ms-input-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-ios::-ms-clear{display:none}.alert-input.sc-ion-alert-ios::-webkit-date-and-time-value{height:18px}.alert-radio-group.sc-ion-alert-ios,.alert-checkbox-group.sc-ion-alert-ios{-ms-scroll-chaining:none;overscroll-behavior:contain;max-height:240px;border-top:0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);overflow-y:auto;-webkit-overflow-scrolling:touch}.alert-tappable.sc-ion-alert-ios{min-height:44px}.alert-radio-label.sc-ion-alert-ios{-webkit-padding-start:13px;padding-inline-start:13px;-webkit-padding-end:13px;padding-inline-end:13px;padding-top:13px;padding-bottom:13px;color:var(--ion-text-color, #000)}[aria-checked=true].sc-ion-alert-ios .alert-radio-label.sc-ion-alert-ios{color:var(--ion-color-primary, #0054e9)}.alert-radio-icon.sc-ion-alert-ios{position:relative;-ms-flex-negative:0;flex-shrink:0;min-width:30px}[aria-checked=true].sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios{top:-7px;position:absolute;width:6px;height:12px;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--ion-color-primary, #0054e9)}[aria-checked=true].sc-ion-alert-ios .radio-label-placement-end.sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios{inset-inline-end:7px}[aria-checked=true].sc-ion-alert-ios .radio-label-placement-start.sc-ion-alert-ios .alert-radio-inner.sc-ion-alert-ios{inset-inline-start:7px}.alert-checkbox-label.sc-ion-alert-ios{-webkit-padding-start:13px;padding-inline-start:13px;-webkit-padding-end:13px;padding-inline-end:13px;padding-top:13px;padding-bottom:13px;color:var(--ion-text-color, #000)}.alert-checkbox-icon.sc-ion-alert-ios{border-radius:50%;margin-top:10px;margin-bottom:10px;position:relative;-ms-flex-negative:0;flex-shrink:0;width:min(1.375rem, 55.836px);height:min(1.375rem, 55.836px);border-width:0.125rem;border-style:solid;border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))));background-color:var(--ion-item-background, var(--ion-background-color, #fff));contain:strict}.checkbox-label-placement-end.sc-ion-alert-ios .alert-checkbox-icon.sc-ion-alert-ios{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:6px;margin-inline-end:6px}.checkbox-label-placement-start.sc-ion-alert-ios .alert-checkbox-icon.sc-ion-alert-ios{-webkit-margin-start:6px;margin-inline-start:6px;-webkit-margin-end:16px;margin-inline-end:16px}[aria-checked=true].sc-ion-alert-ios .alert-checkbox-icon.sc-ion-alert-ios{border-color:var(--ion-color-primary, #0054e9);background-color:var(--ion-color-primary, #0054e9)}[aria-checked=true].sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios{top:calc(min(1.375rem, 55.836px) / 8);position:absolute;width:calc(min(1.375rem, 55.836px) / 6 + 1px);height:calc(min(1.375rem, 55.836px) * 0.5);-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:0.125rem;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--ion-background-color, #fff)}[aria-checked=true].sc-ion-alert-ios .checkbox-label-placement-end.sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios{inset-inline-start:calc(min(1.375rem, 55.836px) / 3)}[aria-checked=true].sc-ion-alert-ios .checkbox-label-placement-start.sc-ion-alert-ios .alert-checkbox-inner.sc-ion-alert-ios{inset-inline-end:calc(min(1.375rem, 55.836px) / 3)}.alert-button-group.sc-ion-alert-ios{-webkit-margin-end:-0.55px;margin-inline-end:-0.55px;-ms-flex-wrap:wrap;flex-wrap:wrap}.alert-button-group-vertical.sc-ion-alert-ios .alert-button.sc-ion-alert-ios{border-right:none}[dir=rtl].sc-ion-alert-ios-h .alert-button-group-vertical.sc-ion-alert-ios .alert-button.sc-ion-alert-ios:last-child,[dir=rtl] .sc-ion-alert-ios-h .alert-button-group-vertical.sc-ion-alert-ios .alert-button.sc-ion-alert-ios:last-child{border-right:none}[dir=rtl].sc-ion-alert-ios .alert-button-group-vertical.sc-ion-alert-ios .alert-button.sc-ion-alert-ios:last-child{border-right:none}@supports selector(:dir(rtl)){.alert-button-group-vertical.sc-ion-alert-ios .alert-button.sc-ion-alert-ios:last-child:dir(rtl){border-right:none}}.alert-button.sc-ion-alert-ios{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:0;-ms-flex:1 1 auto;flex:1 1 auto;min-width:50%;height:max(44px, 2.75rem);border-top:0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);border-right:0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);background-color:transparent;color:var(--ion-color-primary, #0054e9);font-size:max(17px, 1.0625rem);overflow:hidden}[dir=rtl].sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:first-child,[dir=rtl] .sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:first-child{border-right:0}[dir=rtl].sc-ion-alert-ios .alert-button.sc-ion-alert-ios:first-child{border-right:0}@supports selector(:dir(rtl)){.alert-button.sc-ion-alert-ios:first-child:dir(rtl){border-right:0}}.alert-button.sc-ion-alert-ios:last-child{border-right:0;font-weight:bold}[dir=rtl].sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:last-child,[dir=rtl] .sc-ion-alert-ios-h .alert-button.sc-ion-alert-ios:last-child{border-right:0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2)}[dir=rtl].sc-ion-alert-ios .alert-button.sc-ion-alert-ios:last-child{border-right:0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2)}@supports selector(:dir(rtl)){.alert-button.sc-ion-alert-ios:last-child:dir(rtl){border-right:0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2)}}.alert-button.ion-activated.sc-ion-alert-ios{background-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.1)}.alert-button-role-destructive.sc-ion-alert-ios,.alert-button-role-destructive.ion-activated.sc-ion-alert-ios,.alert-button-role-destructive.ion-focused.sc-ion-alert-ios{color:var(--ion-color-danger, #c5000f)}`;
    alertMdCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-alert-md,.alert-radio-label-has-rich-content.sc-ion-alert-md,.alert-checkbox-label-has-rich-content.sc-ion-alert-md,.select-option-label-has-rich-content.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-alert-md,.alert-radio-label-has-rich-content.sc-ion-alert-md,.alert-checkbox-label-has-rich-content.sc-ion-alert-md,.select-option-content.sc-ion-alert-md{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-alert-md,.alert-checkbox-label-text.sc-ion-alert-md,.alert-radio-label-text.sc-ion-alert-md,.select-option-label-text.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-alert-md,.select-option-end.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-alert-md{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-alert-md:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-alert-md::part(label),ion-radio.select-option-has-rich-content.sc-ion-alert-md [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-alert-md::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-alert-md [part~="label"],.select-option-content.sc-ion-alert-md{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-alert-md>ion-avatar.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>ion-avatar.sc-ion-alert-md{width:40px;height:40px}.select-option-start.sc-ion-alert-md>ion-icon.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>ion-icon.sc-ion-alert-md{font-size:24px}.select-option-start.sc-ion-alert-md>ion-img.sc-ion-alert-md,.select-option-start.sc-ion-alert-md>img.sc-ion-alert-md,.select-option-start.sc-ion-alert-md>svg.sc-ion-alert-md,.select-option-start.sc-ion-alert-md>ion-thumbnail.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>ion-img.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>img.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>svg.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>ion-thumbnail.sc-ion-alert-md{width:56px;height:56px}.select-option-start.sc-ion-alert-md>video.sc-ion-alert-md,.select-option-end.sc-ion-alert-md>video.sc-ion-alert-md{width:114px;height:56px}.sc-ion-alert-md-h{--min-width:250px;--width:auto;--min-height:auto;--height:auto;--max-height:90%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-alert-md-h{display:none}.alert-top.sc-ion-alert-md-h{padding-top:50px;-ms-flex-align:start;align-items:flex-start}.alert-wrapper.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:content;opacity:0;z-index:10}.alert-title.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.alert-sub-title.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:5px;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-weight:normal}.alert-message.sc-ion-alert-md,.alert-input-group.sc-ion-alert-md{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-overflow-scrolling:touch;overflow-y:auto;overscroll-behavior-y:contain}.alert-checkbox-label.sc-ion-alert-md,.alert-radio-label.sc-ion-alert-md{overflow-wrap:anywhere}@media (any-pointer: coarse){.alert-checkbox-group.sc-ion-alert-md::-webkit-scrollbar,.alert-radio-group.sc-ion-alert-md::-webkit-scrollbar,.alert-message.sc-ion-alert-md::-webkit-scrollbar{display:none}}.alert-input.sc-ion-alert-md{padding-left:0;padding-right:0;padding-top:10px;padding-bottom:10px;width:100%;border:0;background:inherit;font:inherit;-webkit-box-sizing:border-box;box-sizing:border-box}.alert-button-group.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;width:100%}.alert-button-group-vertical.sc-ion-alert-md{-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.alert-button.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;border:0;font-size:0.875rem;line-height:1.25rem;z-index:0}.alert-button.ion-focused.sc-ion-alert-md,.alert-tappable.ion-focused.sc-ion-alert-md{background:var(--ion-color-step-100, var(--ion-background-color-step-100, #e6e6e6))}.alert-button-inner.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;min-height:inherit}.radio-label-placement-start.sc-ion-alert-md,.checkbox-label-placement-start.sc-ion-alert-md{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.radio-label-placement-end.sc-ion-alert-md,.checkbox-label-placement-end.sc-ion-alert-md{-ms-flex-direction:row;flex-direction:row}.radio-justify-start.sc-ion-alert-md,.checkbox-justify-start.sc-ion-alert-md{-ms-flex-pack:start;justify-content:start}.radio-justify-end.sc-ion-alert-md,.checkbox-justify-end.sc-ion-alert-md{-ms-flex-pack:end;justify-content:end}.radio-justify-space-between.sc-ion-alert-md,.checkbox-justify-space-between.sc-ion-alert-md{-ms-flex-pack:justify;justify-content:space-between}.alert-input-disabled.sc-ion-alert-md,.alert-checkbox-button-disabled.sc-ion-alert-md .alert-button-inner.sc-ion-alert-md,.alert-radio-button-disabled.sc-ion-alert-md .alert-button-inner.sc-ion-alert-md{cursor:default;opacity:0.5;pointer-events:none}.alert-tappable.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:-ms-flexbox;display:flex;width:100%;border:0;background:transparent;font-size:inherit;line-height:initial;text-align:start;-webkit-appearance:none;-moz-appearance:none;appearance:none;contain:content}.alert-button.sc-ion-alert-md,.alert-checkbox.sc-ion-alert-md,.alert-input.sc-ion-alert-md,.alert-radio.sc-ion-alert-md{outline:none}.alert-radio-icon.sc-ion-alert-md,.alert-checkbox-icon.sc-ion-alert-md,.alert-checkbox-inner.sc-ion-alert-md{-webkit-box-sizing:border-box;box-sizing:border-box}textarea.alert-input.sc-ion-alert-md{min-height:37px;resize:none}.sc-ion-alert-md-h{--background:var(--ion-overlay-background-color, var(--ion-background-color, #fff));--max-width:280px;--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);font-size:0.875rem}.alert-wrapper.sc-ion-alert-md{border-radius:4px;-webkit-box-shadow:0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);box-shadow:0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)}.alert-head.sc-ion-alert-md{-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px;padding-top:20px;padding-bottom:15px;text-align:start}.alert-title.sc-ion-alert-md{color:var(--ion-text-color, #000);font-size:1.25rem;font-weight:500}.alert-sub-title.sc-ion-alert-md{color:var(--ion-text-color, #000);font-size:1rem}.alert-message.sc-ion-alert-md,.alert-input-group.sc-ion-alert-md{-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px;padding-top:20px;padding-bottom:20px;color:var(--ion-color-step-550, var(--ion-text-color-step-450, #737373))}.alert-message.sc-ion-alert-md{font-size:1rem}@media screen and (max-width: 767px){.alert-message.sc-ion-alert-md{max-height:266px}}.alert-message.sc-ion-alert-md:empty{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.alert-head.sc-ion-alert-md+.alert-message.sc-ion-alert-md{padding-top:0}.alert-input.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px;border-bottom:1px solid var(--ion-color-step-150, var(--ion-background-color-step-150, #d9d9d9));color:var(--ion-text-color, #000)}.alert-input.sc-ion-alert-md::-webkit-input-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::-moz-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md:-ms-input-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::-ms-input-placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::placeholder{color:var(--ion-placeholder-color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::-ms-clear{display:none}.alert-input.sc-ion-alert-md:focus{margin-bottom:4px;border-bottom:2px solid var(--ion-color-primary, #0054e9)}.alert-radio-group.sc-ion-alert-md,.alert-checkbox-group.sc-ion-alert-md{position:relative;border-top:1px solid var(--ion-color-step-150, var(--ion-background-color-step-150, #d9d9d9));border-bottom:1px solid var(--ion-color-step-150, var(--ion-background-color-step-150, #d9d9d9));overflow:auto}@media screen and (max-width: 767px){.alert-radio-group.sc-ion-alert-md,.alert-checkbox-group.sc-ion-alert-md{max-height:266px}}.alert-tappable.sc-ion-alert-md{position:relative;min-height:48px}.alert-radio-label.sc-ion-alert-md{padding-top:13px;padding-bottom:13px;max-width:calc(100% - 20px);color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));font-size:1rem}.radio-label-placement-end.sc-ion-alert-md .alert-radio-label.sc-ion-alert-md{-webkit-padding-start:56px;padding-inline-start:56px;-webkit-padding-end:24px;padding-inline-end:24px}.radio-label-placement-start.sc-ion-alert-md .alert-radio-label.sc-ion-alert-md{-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:56px;padding-inline-end:56px}.alert-radio-icon.sc-ion-alert-md{top:0;border-radius:50%;display:block;position:relative;-ms-flex-negative:0;flex-shrink:0;width:20px;height:20px;border-width:2px;border-style:solid;border-color:var(--ion-color-step-550, var(--ion-background-color-step-550, #737373))}.radio-label-placement-end.sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md{inset-inline-start:24px}.radio-label-placement-start.sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md{inset-inline-end:24px}.alert-radio-inner.sc-ion-alert-md{top:3px;border-radius:50%;position:absolute;width:10px;height:10px;-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0);-webkit-transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--ion-color-primary, #0054e9)}.alert-radio-inner.sc-ion-alert-md{inset-inline-start:3px}[aria-checked=true].sc-ion-alert-md .alert-radio-label.sc-ion-alert-md{color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626))}[aria-checked=true].sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md{border-color:var(--ion-color-primary, #0054e9)}[aria-checked=true].sc-ion-alert-md .alert-radio-inner.sc-ion-alert-md{-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}.alert-checkbox-label.sc-ion-alert-md{padding-top:13px;padding-bottom:13px;max-width:calc(100% - 16px);color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));font-size:1rem}.checkbox-label-placement-end.sc-ion-alert-md .alert-checkbox-label.sc-ion-alert-md{-webkit-padding-start:56px;padding-inline-start:56px;-webkit-padding-end:24px;padding-inline-end:24px}.checkbox-label-placement-start.sc-ion-alert-md .alert-checkbox-label.sc-ion-alert-md{-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:56px;padding-inline-end:56px}.alert-checkbox-icon.sc-ion-alert-md{top:0;border-radius:2px;position:relative;-ms-flex-negative:0;flex-shrink:0;width:16px;height:16px;border-width:2px;border-style:solid;border-color:var(--ion-color-step-550, var(--ion-background-color-step-550, #737373));contain:strict}.checkbox-label-placement-end.sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md{inset-inline-start:24px}.checkbox-label-placement-start.sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md{inset-inline-end:24px}[aria-checked=true].sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md{border-color:var(--ion-color-primary, #0054e9);background-color:var(--ion-color-primary, #0054e9)}[aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md{top:0;position:absolute;width:6px;height:10px;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--ion-color-primary-contrast, #fff)}[aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md{inset-inline-start:3px}.alert-button-group.sc-ion-alert-md{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse;-ms-flex-pack:end;justify-content:flex-end}.alert-button.sc-ion-alert-md{border-radius:2px;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:0;margin-bottom:0;-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;color:var(--ion-color-primary, #0054e9);font-weight:500;text-align:end;text-transform:uppercase;overflow:hidden}.alert-button-group.sc-ion-alert-md .alert-button-inner.sc-ion-alert-md{-ms-flex-pack:end;justify-content:flex-end}@media screen and (min-width: 768px){.sc-ion-alert-md-h{--max-width:min(100vw - 96px, 560px);--max-height:min(100vh - 96px, 560px)}}`;
    Alert = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didPresent = createEvent(this, "ionAlertDidPresent", 7);
        this.willPresent = createEvent(this, "ionAlertWillPresent", 7);
        this.willDismiss = createEvent(this, "ionAlertWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionAlertDidDismiss", 7);
        this.didPresentShorthand = createEvent(this, "didPresent", 7);
        this.willPresentShorthand = createEvent(this, "willPresent", 7);
        this.willDismissShorthand = createEvent(this, "willDismiss", 7);
        this.didDismissShorthand = createEvent(this, "didDismiss", 7);
        this.delegateController = createDelegateController(this);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.customHTMLEnabled = config.get("innerHTMLTemplatesEnabled", ENABLE_HTML_CONTENT_DEFAULT);
        this.processedInputs = [];
        this.processedButtons = [];
        this.isButtonGroupWrapped = false;
        this.presented = false;
        this.hasController = false;
        this.keyboardClose = true;
        this.buttons = [];
        this.inputs = [];
        this.backdropDismiss = true;
        this.translucent = false;
        this.animated = true;
        this.isOpen = false;
        this.onBackdropTap = () => {
          this.dismiss(void 0, BACKDROP);
        };
        this.dispatchCancelHandler = (ev) => {
          const role = ev.detail.role;
          if (isCancel(role)) {
            const cancelButton = this.processedButtons.find((b) => b.role === "cancel");
            this.callButtonHandler(cancelButton);
          }
        };
      }
      onIsOpenChange(newValue, oldValue) {
        if (newValue === true && oldValue === false) {
          this.present();
        } else if (newValue === false && oldValue === true) {
          this.dismiss();
        }
      }
      triggerChanged() {
        const { trigger, el, triggerController } = this;
        if (trigger) {
          triggerController.addClickListener(el, trigger);
        }
      }
      onKeydown(ev) {
        const inputTypes = new Set(this.processedInputs.map((i) => i.type));
        if (inputTypes.has("checkbox") && ev.key === "Enter") {
          ev.preventDefault();
          return;
        }
        if (ev.target.classList.contains("alert-wrapper")) {
          if (ev.key === "Tab" && ev.shiftKey) {
            ev.preventDefault();
            const lastChildBtn = this.wrapperEl?.querySelector(".alert-button:last-child");
            lastChildBtn.focus();
            return;
          }
        }
        if (!inputTypes.has("radio") || ev.target && !this.el.contains(ev.target) || ev.target.classList.contains("alert-button")) {
          return;
        }
        const query = this.el.querySelectorAll(".alert-radio");
        const radios = Array.from(query).filter((radio) => !radio.disabled);
        const index = radios.findIndex((radio) => radio.id === ev.target.id);
        let nextEl;
        if (["ArrowDown", "ArrowRight"].includes(ev.key)) {
          nextEl = index === radios.length - 1 ? radios[0] : radios[index + 1];
        }
        if (["ArrowUp", "ArrowLeft"].includes(ev.key)) {
          nextEl = index === 0 ? radios[radios.length - 1] : radios[index - 1];
        }
        if (nextEl && radios.includes(nextEl)) {
          const nextProcessed = this.processedInputs.find((input) => input.id === nextEl?.id);
          if (nextProcessed) {
            this.rbClick(nextProcessed);
            nextEl.focus();
          }
        }
      }
      buttonsChanged() {
        const buttons = this.buttons;
        this.processedButtons = buttons.map((btn) => {
          return typeof btn === "string" ? { text: btn, role: btn.toLowerCase() === "cancel" ? "cancel" : void 0 } : btn;
        });
        this.isButtonGroupWrapped = false;
        this.checkButtonGroupWrap();
      }
      inputsChanged() {
        const inputs = this.inputs;
        const first = inputs.find((input) => !input.disabled);
        const checked = inputs.find((input) => input.checked && !input.disabled);
        const focusable = checked || first;
        const inputTypes = new Set(inputs.map((i) => i.type));
        if (inputTypes.has("checkbox") && inputTypes.has("radio")) {
          printIonWarning(`[ion-alert] - Alert cannot mix input types: ${Array.from(inputTypes.values()).join("/")}. Please see alert docs for more info.`);
        }
        this.inputType = inputTypes.values().next().value;
        this.processedInputs = inputs.map((i, index) => {
          return __spreadProps(__spreadValues({}, i), {
            type: i.type || "text",
            name: i.name || `${index}`,
            placeholder: i.placeholder || "",
            checked: !!i.checked,
            disabled: !!i.disabled,
            id: i.id || `alert-input-${this.overlayIndex}-${index}`,
            cssClass: i.cssClass ?? "",
            attributes: i.attributes || {},
            tabindex: i.type === "radio" && i !== focusable ? -1 : 0
          });
        });
      }
      connectedCallback() {
        prepareOverlay(this.el);
        this.triggerChanged();
        this.setupButtonGroupResizeObserver();
        this.setupButtonActiveGesture();
        if (this.presented) {
          restoreRootFocusTrapAccessibility(this.el);
        }
      }
      componentWillLoad() {
        if (!this.htmlAttributes?.id) {
          setOverlayId(this.el);
        }
        this.inputsChanged();
        this.buttonsChanged();
      }
      disconnectedCallback() {
        this.triggerController.removeClickListener();
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
        if (this.presented) {
          cleanupRootFocusTrapAccessibility();
        }
        this.buttonGroupResizeObserver?.disconnect();
        this.buttonGroupResizeObserver = void 0;
      }
      /**
       * Only create gesture if:
       * 1. A gesture does not already exist
       * 2. App is running in iOS mode
       * 3. A wrapper ref exists
       */
      setupButtonActiveGesture() {
        if (!this.gesture && getIonMode(this) === "ios" && this.wrapperEl) {
          this.gesture = createButtonActiveGesture(this.wrapperEl, (refEl) => refEl.classList.contains("alert-button"));
          this.gesture.enable(true);
        }
      }
      componentDidLoad() {
        this.setupButtonActiveGesture();
        this.setupButtonGroupResizeObserver();
        if (this.isOpen === true) {
          raf(() => this.present());
        }
        this.triggerChanged();
      }
      /**
       * Present the alert overlay after it has been created.
       */
      present() {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          yield this.delegateController.attachViewToDom();
          yield present(this, "alertEnter", iosEnterAnimation, mdEnterAnimation).then(() => {
            if (this.buttons.length === 1 && this.inputs.length === 0) {
              const queryBtn = this.wrapperEl?.querySelector(".alert-button");
              queryBtn.focus();
            } else {
              this.wrapperEl?.focus();
            }
          });
          unlock();
        });
      }
      /**
       * Dismiss the alert overlay after it has been presented.
       * This is a no-op if the overlay has not been presented yet. If you want
       * to remove an overlay from the DOM that was never presented, use the
       * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
       *
       * @param data Any data to emit in the dismiss events.
       * @param role The role of the element that is dismissing the alert.
       * This can be useful in a button handler for determining which button was
       * clicked to dismiss the alert. Some examples include:
       * `"cancel"`, `"destructive"`, `"selected"`, and `"backdrop"`.
       */
      dismiss(data, role) {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          const dismissed = yield dismiss(this, data, role, "alertLeave", iosLeaveAnimation, mdLeaveAnimation);
          if (dismissed) {
            this.delegateController.removeViewFromDom();
          }
          unlock();
          return dismissed;
        });
      }
      /**
       * Returns a promise that resolves when the alert did dismiss.
       */
      onDidDismiss() {
        return eventMethod(this.el, "ionAlertDidDismiss");
      }
      /**
       * Returns a promise that resolves when the alert will dismiss.
       */
      onWillDismiss() {
        return eventMethod(this.el, "ionAlertWillDismiss");
      }
      rbClick(selectedInput) {
        for (const input of this.processedInputs) {
          input.checked = input === selectedInput;
          input.tabindex = input === selectedInput ? 0 : -1;
        }
        this.activeId = selectedInput.id;
        safeCall(selectedInput.handler, selectedInput);
        forceUpdate(this);
      }
      cbClick(selectedInput) {
        selectedInput.checked = !selectedInput.checked;
        safeCall(selectedInput.handler, selectedInput);
        forceUpdate(this);
      }
      buttonClick(button) {
        return __async(this, null, function* () {
          const role = button.role;
          const values = this.getValues();
          if (isCancel(role)) {
            return this.dismiss({ values }, role);
          }
          const returnData = yield this.callButtonHandler(button, values);
          if (returnData !== false) {
            return this.dismiss(__spreadValues({ values }, returnData), button.role);
          }
          return false;
        });
      }
      callButtonHandler(button, data) {
        return __async(this, null, function* () {
          if (button?.handler) {
            const returnData = yield safeCall(button.handler, data);
            if (returnData === false) {
              return false;
            }
            if (typeof returnData === "object") {
              return returnData;
            }
          }
          return {};
        });
      }
      getValues() {
        if (this.processedInputs.length === 0) {
          return void 0;
        }
        if (this.inputType === "radio") {
          const checkedInput = this.processedInputs.find((i) => !!i.checked);
          return checkedInput ? checkedInput.value : void 0;
        }
        if (this.inputType === "checkbox") {
          return this.processedInputs.filter((i) => i.checked).map((i) => i.value);
        }
        const values = {};
        this.processedInputs.forEach((i) => {
          values[i.name] = i.value || "";
        });
        return values;
      }
      renderAlertInputs() {
        switch (this.inputType) {
          case "checkbox":
            return this.renderCheckbox();
          case "radio":
            return this.renderRadio();
          default:
            return this.renderInput();
        }
      }
      renderCheckbox() {
        const inputs = this.processedInputs;
        const mode = getIonMode(this);
        if (inputs.length === 0) {
          return null;
        }
        return h("div", { class: "alert-checkbox-group" }, inputs.map((i) => {
          const richInput = i;
          const optionLabelOptions = {
            id: richInput.id,
            label: richInput.label,
            startContent: richInput.startContent,
            endContent: richInput.endContent,
            description: richInput.description
          };
          const defaultLabelPlacement = getOverlayLabelPlacement(mode, "checkbox");
          const defaultJustify = getOverlayLabelJustify(mode, "checkbox");
          return h("button", { type: "button", onClick: () => this.cbClick(i), "aria-checked": `${i.checked}`, id: i.id, disabled: i.disabled, tabIndex: i.tabindex, role: "checkbox", class: __spreadProps(__spreadValues({}, getClassMap(i.cssClass)), {
            "alert-tappable": true,
            "alert-checkbox": true,
            "alert-checkbox-button": true,
            "ion-focusable": !i.disabled,
            "ion-activatable": !i.disabled,
            "alert-checkbox-button-disabled": i.disabled || false
          }) }, h("div", { class: {
            "alert-button-inner": true,
            [`checkbox-label-placement-${richInput.labelPlacement ?? defaultLabelPlacement}`]: true,
            [`checkbox-justify-${richInput.justify ?? defaultJustify}`]: true
          } }, h("div", { class: "alert-checkbox-icon" }, h("div", { class: "alert-checkbox-inner" })), renderOptionLabel(optionLabelOptions, "alert-checkbox-label")), mode === "md" && h("ion-ripple-effect", null));
        }));
      }
      renderRadio() {
        const inputs = this.processedInputs;
        const mode = getIonMode(this);
        if (inputs.length === 0) {
          return null;
        }
        return h("div", { class: "alert-radio-group", role: "radiogroup", "aria-activedescendant": this.activeId }, inputs.map((i) => {
          const richInput = i;
          const optionLabelOptions = {
            id: richInput.id,
            label: richInput.label,
            startContent: richInput.startContent,
            endContent: richInput.endContent,
            description: richInput.description
          };
          const defaultLabelPlacement = getOverlayLabelPlacement(mode, "radio");
          const defaultJustify = getOverlayLabelJustify(mode, "radio");
          return h("button", { type: "button", onClick: () => this.rbClick(i), "aria-checked": `${i.checked}`, disabled: i.disabled, id: i.id, tabIndex: i.tabindex, class: __spreadProps(__spreadValues({}, getClassMap(i.cssClass)), {
            "alert-radio-button": true,
            "alert-tappable": true,
            "alert-radio": true,
            "ion-focusable": !i.disabled,
            "ion-activatable": !i.disabled,
            "alert-radio-button-disabled": i.disabled || false
          }), role: "radio" }, h("div", { class: {
            "alert-button-inner": true,
            [`radio-label-placement-${richInput.labelPlacement ?? defaultLabelPlacement}`]: true,
            [`radio-justify-${richInput.justify ?? defaultJustify}`]: true
          } }, h("div", { class: "alert-radio-icon" }, h("div", { class: "alert-radio-inner" })), renderOptionLabel(optionLabelOptions, "alert-radio-label")));
        }));
      }
      renderInput() {
        const inputs = this.processedInputs;
        if (inputs.length === 0) {
          return null;
        }
        return h("div", { class: "alert-input-group" }, inputs.map((i) => {
          if (i.type === "textarea") {
            return h("div", { class: "alert-input-wrapper" }, h("textarea", __spreadProps(__spreadValues({ placeholder: i.placeholder, value: i.value, id: i.id, tabIndex: i.tabindex }, i.attributes), { disabled: i.attributes?.disabled ?? i.disabled, class: inputClass(i), onInput: (e) => {
              i.value = e.target.value;
              if (i.attributes?.onInput) {
                i.attributes.onInput(e);
              }
            } })));
          } else {
            return h("div", { class: "alert-input-wrapper" }, h("input", __spreadProps(__spreadValues({ placeholder: i.placeholder, type: i.type, min: i.min, max: i.max, value: i.value, id: i.id, tabIndex: i.tabindex }, i.attributes), { disabled: i.attributes?.disabled ?? i.disabled, class: inputClass(i), onInput: (e) => {
              i.value = e.target.value;
              if (i.attributes?.onInput) {
                i.attributes.onInput(e);
              }
            } })));
          }
        }));
      }
      setupButtonGroupResizeObserver() {
        if (!this.buttonGroupEl || typeof ResizeObserver === "undefined") {
          return;
        }
        this.buttonGroupResizeObserver?.disconnect();
        this.buttonGroupResizeObserver = new ResizeObserver(() => this.checkButtonGroupWrap());
        this.buttonGroupResizeObserver.observe(this.buttonGroupEl);
        this.checkButtonGroupWrap();
      }
      checkButtonGroupWrap() {
        raf(() => {
          if (!this.buttonGroupResizeObserver) {
            return;
          }
          const groupEl = this.buttonGroupEl;
          if (!groupEl) {
            return;
          }
          const buttons = Array.from(groupEl.querySelectorAll(".alert-button"));
          if (buttons.length < 2) {
            this.isButtonGroupWrapped = false;
            return;
          }
          const firstTop = buttons[0].offsetTop;
          this.isButtonGroupWrapped = buttons.some((btn) => btn.offsetTop !== firstTop);
        });
      }
      renderAlertButtons() {
        const buttons = this.processedButtons;
        const mode = getIonMode(this);
        const alertButtonGroupClass = {
          "alert-button-group": true,
          "alert-button-group-vertical": buttons.length > 2 || this.isButtonGroupWrapped
        };
        return h("div", { class: alertButtonGroupClass, ref: (el) => this.buttonGroupEl = el }, buttons.map((button) => h("button", __spreadProps(__spreadValues({}, button.htmlAttributes), { type: "button", id: button.id, class: buttonClass(button), tabIndex: 0, onClick: () => this.buttonClick(button) }), h("span", { class: "alert-button-inner" }, button.text), mode === "md" && h("ion-ripple-effect", null))));
      }
      renderAlertMessage(msgId) {
        const { customHTMLEnabled, message } = this;
        if (customHTMLEnabled) {
          return h("div", { id: msgId, class: "alert-message", innerHTML: sanitizeDOMString(message) });
        }
        return h("div", { id: msgId, class: "alert-message" }, message);
      }
      render() {
        const { overlayIndex, header, subHeader, message, htmlAttributes } = this;
        const mode = getIonMode(this);
        const hdrId = `alert-${overlayIndex}-hdr`;
        const msgId = `alert-${overlayIndex}-msg`;
        const subHdrId = `alert-${overlayIndex}-sub-hdr`;
        const role = this.inputs.length > 0 || this.buttons.length > 0 ? "alertdialog" : "alert";
        const ariaLabelledBy = header && subHeader ? `${hdrId} ${subHdrId}` : header ? hdrId : subHeader ? subHdrId : null;
        return h(Host, { key: "083b5250dc4c76e85240e0225abcb7ca2b66de2f", tabindex: "-1", style: {
          zIndex: `${2e4 + overlayIndex}`
        }, class: __spreadProps(__spreadValues({}, getClassMap(this.cssClass)), {
          [mode]: true,
          "overlay-hidden": true,
          "alert-translucent": this.translucent
        }), onIonAlertWillDismiss: this.dispatchCancelHandler, onIonBackdropTap: this.onBackdropTap }, h("ion-backdrop", { key: "65c92a956d998ae9016396dd2a29c42ab7376d0e", tappable: this.backdropDismiss }), h("div", { key: "f2288fa0b7ef9d0bf031c168fe78c48422cf91c8", tabindex: "0", "aria-hidden": "true" }), h("div", __spreadValues({ key: "dbb109435c378f77c6b0231e58756f8a0467732d", class: "alert-wrapper ion-overlay-wrapper", role, "aria-modal": "true", "aria-labelledby": ariaLabelledBy, "aria-describedby": message !== void 0 ? msgId : null, tabindex: "0", ref: (el) => this.wrapperEl = el }, htmlAttributes), h("div", { key: "075597f94719673cf1f894a8566e1036849afa75", class: "alert-head" }, header && h("h2", { key: "f96f4b1db8473c62040beed6e96108c733978d73", id: hdrId, class: "alert-title" }, header), subHeader && !header && h("h2", { key: "dbd824ef19a07bddde4eb928f11de7c7cadf98b8", id: subHdrId, class: "alert-sub-title" }, subHeader), subHeader && header && h("h3", { key: "4774fa13700dd23aec7930492acae80de3bdf5d1", id: subHdrId, class: "alert-sub-title" }, subHeader)), this.renderAlertMessage(msgId), this.renderAlertInputs(), this.renderAlertButtons()), h("div", { key: "5c728b7457e231f64294bbec821bdb547c6437dd", tabindex: "0", "aria-hidden": "true" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "isOpen": [{
            "onIsOpenChange": 0
          }],
          "trigger": [{
            "triggerChanged": 0
          }],
          "buttons": [{
            "buttonsChanged": 0
          }],
          "inputs": [{
            "inputsChanged": 0
          }]
        };
      }
    };
    inputClass = (input) => {
      return __spreadValues(__spreadValues({
        "alert-input": true,
        "alert-input-disabled": (input.attributes?.disabled ?? input.disabled) || false
      }, getClassMap(input.cssClass)), getClassMap(input.attributes ? input.attributes.class?.toString() : ""));
    };
    buttonClass = (button) => {
      return __spreadValues({
        "alert-button": true,
        "ion-focusable": true,
        "ion-activatable": true,
        [`alert-button-role-${button.role}`]: button.role !== void 0
      }, getClassMap(button.cssClass));
    };
    Alert.style = {
      ios: alertIosCss(),
      md: alertMdCss()
    };
  }
});
init_ion_alert_entry();
export {
  Alert as ion_alert
};
//# debugId=5b7cfbfa-2082-5bb3-9c93-c280666228d0
//# sourceMappingURL=chunk-P77Q4242.js.map
