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
  init_index_CK8uF0iB
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
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  readTask,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-action-sheet.entry.js
var iosEnterAnimation, iosLeaveAnimation, mdEnterAnimation, mdLeaveAnimation, actionSheetIosCss, actionSheetMdCss, ActionSheet, buttonClass;
var init_ion_action_sheet_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-action-sheet.entry.js"() {
    init_index_BpRUsN_W();
    init_button_active_DVk40Sjl();
    init_helpers_BJqKF1pr();
    init_lock_controller_B_hirT0v();
    init_overlays_DmDY_El7();
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
    init_index_CK8uF0iB();
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
      wrapperAnimation.addElement(baseEl.querySelector(".action-sheet-wrapper")).fromTo("transform", "translateY(100%)", "translateY(0%)");
      return baseAnimation.addElement(baseEl).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    iosLeaveAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
      wrapperAnimation.addElement(baseEl.querySelector(".action-sheet-wrapper")).fromTo("transform", "translateY(0%)", "translateY(100%)");
      return baseAnimation.addElement(baseEl).easing("cubic-bezier(.36,.66,.04,1)").duration(450).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    mdEnterAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      wrapperAnimation.addElement(baseEl.querySelector(".action-sheet-wrapper")).fromTo("transform", "translateY(100%)", "translateY(0%)");
      return baseAnimation.addElement(baseEl).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    mdLeaveAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
      wrapperAnimation.addElement(baseEl.querySelector(".action-sheet-wrapper")).fromTo("transform", "translateY(0%)", "translateY(100%)");
      return baseAnimation.addElement(baseEl).easing("cubic-bezier(.36,.66,.04,1)").duration(450).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    actionSheetIosCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-action-sheet-ios,.alert-radio-label-has-rich-content.sc-ion-action-sheet-ios,.alert-checkbox-label-has-rich-content.sc-ion-action-sheet-ios,.select-option-label-has-rich-content.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-action-sheet-ios,.alert-radio-label-has-rich-content.sc-ion-action-sheet-ios,.alert-checkbox-label-has-rich-content.sc-ion-action-sheet-ios,.select-option-content.sc-ion-action-sheet-ios{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-action-sheet-ios,.alert-checkbox-label-text.sc-ion-action-sheet-ios,.alert-radio-label-text.sc-ion-action-sheet-ios,.select-option-label-text.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-action-sheet-ios{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-action-sheet-ios:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-action-sheet-ios::part(label),ion-radio.select-option-has-rich-content.sc-ion-action-sheet-ios [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-action-sheet-ios::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-action-sheet-ios [part~="label"],.select-option-content.sc-ion-action-sheet-ios{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-action-sheet-ios>ion-avatar.sc-ion-action-sheet-ios,.select-option-start.sc-ion-action-sheet-ios>ion-img.sc-ion-action-sheet-ios,.select-option-start.sc-ion-action-sheet-ios>ion-thumbnail.sc-ion-action-sheet-ios,.select-option-start.sc-ion-action-sheet-ios>img.sc-ion-action-sheet-ios,.select-option-start.sc-ion-action-sheet-ios>svg.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios>ion-avatar.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios>ion-img.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios>ion-thumbnail.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios>img.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios>svg.sc-ion-action-sheet-ios{width:44px;height:44px}.select-option-start.sc-ion-action-sheet-ios>ion-icon.sc-ion-action-sheet-ios,.select-option-end.sc-ion-action-sheet-ios>ion-icon.sc-ion-action-sheet-ios{font-size:28px}.action-sheet-button-label-text.sc-ion-action-sheet-ios{-ms-flex-pack:center;justify-content:center}.select-option-has-rich-content.sc-ion-action-sheet-ios{-webkit-padding-end:16px;padding-inline-end:16px}.sc-ion-action-sheet-ios-h{--color:initial;--button-color-activated:var(--button-color);--button-color-focused:var(--button-color);--button-color-hover:var(--button-color);--button-color-selected:var(--button-color);--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--height:auto;--max-height:calc(100% - (var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:block;position:fixed;outline:none;font-family:var(--ion-font-family, inherit);-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-action-sheet-ios-h{display:none}.action-sheet-wrapper.sc-ion-action-sheet-ios{left:0;right:0;bottom:0;-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);display:block;position:absolute;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);z-index:10;pointer-events:none}.action-sheet-button.sc-ion-action-sheet-ios{display:block;position:relative;width:100%;border:0;outline:none;background:var(--button-background);color:var(--button-color);font-family:inherit;overflow:hidden}.action-sheet-button.sc-ion-action-sheet-ios:disabled{color:var(--button-color-disabled);opacity:0.4}.action-sheet-button.sc-ion-action-sheet-ios:disabled ion-icon.sc-ion-action-sheet-ios{color:currentColor}.action-sheet-button-inner.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;pointer-events:none;width:100%;height:100%;z-index:1}.action-sheet-container.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;-ms-flex-pack:end;justify-content:flex-end;height:100%;max-height:calc(100vh - (var(--ion-safe-area-top, 0) + var(--ion-safe-area-bottom, 0)));max-height:calc(100dvh - (var(--ion-safe-area-top, 0) + var(--ion-safe-area-bottom, 0)))}.action-sheet-group.sc-ion-action-sheet-ios{-ms-flex-negative:2;flex-shrink:2;overscroll-behavior-y:contain;overflow-y:auto;-webkit-overflow-scrolling:touch;pointer-events:all;background:var(--background)}@media (any-pointer: coarse){.action-sheet-group.sc-ion-action-sheet-ios::-webkit-scrollbar{display:none}}.action-sheet-group-cancel.sc-ion-action-sheet-ios{-ms-flex-negative:0;flex-shrink:0;overflow:hidden}.action-sheet-button.sc-ion-action-sheet-ios::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.action-sheet-selected.sc-ion-action-sheet-ios{color:var(--button-color-selected)}.action-sheet-selected.sc-ion-action-sheet-ios::after{background:var(--button-background-selected);opacity:var(--button-background-selected-opacity)}.action-sheet-button.ion-activated.sc-ion-action-sheet-ios{color:var(--button-color-activated)}.action-sheet-button.ion-activated.sc-ion-action-sheet-ios::after{background:var(--button-background-activated);opacity:var(--button-background-activated-opacity)}.action-sheet-button.ion-focused.sc-ion-action-sheet-ios:not(.ion-activated){color:var(--button-color-focused)}.action-sheet-button.ion-focused.sc-ion-action-sheet-ios:not(.ion-activated)::after{background:var(--button-background-focused);opacity:var(--button-background-focused-opacity)}.action-sheet-button.ion-focused.sc-ion-action-sheet-ios:not(.ion-activated).action-sheet-selected::after{background:var(--button-background-focused, var(--button-background-selected));opacity:var(--button-background-focused-opacity, var(--button-background-selected-opacity))}@media (any-hover: hover){.action-sheet-button.sc-ion-action-sheet-ios:not(:disabled):hover{color:var(--button-color-hover)}.action-sheet-button.sc-ion-action-sheet-ios:not(:disabled):hover::after{background:var(--button-background-hover);opacity:var(--button-background-hover-opacity)}}.sc-ion-action-sheet-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, var(--ion-background-color-step-100, #f9f9f9)));--backdrop-opacity:var(--ion-backdrop-opacity, 0.4);--button-background:linear-gradient(0deg, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08), rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08) 50%, transparent 50%) bottom/100% 1px no-repeat transparent;--button-background-activated:var(--ion-text-color, #000);--button-background-activated-opacity:.08;--button-background-hover:currentColor;--button-background-hover-opacity:.04;--button-background-focused:currentColor;--button-background-focused-opacity:.12;--button-background-selected:var(--ion-color-step-150, var(--ion-background-color-step-150, var(--ion-background-color, #fff)));--button-background-selected-opacity:1;--button-color:var(--ion-color-primary, #0054e9);--button-color-disabled:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));--color:var(--ion-color-step-400, var(--ion-text-color-step-600, #999999));text-align:center}.action-sheet-wrapper.sc-ion-action-sheet-ios{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:var(--ion-safe-area-top, 0);padding-bottom:var(--ion-safe-area-bottom, 0);-webkit-box-sizing:content-box;box-sizing:content-box}.action-sheet-container.sc-ion-action-sheet-ios{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:0;padding-bottom:0}.action-sheet-group.sc-ion-action-sheet-ios{border-radius:13px;margin-bottom:8px}.action-sheet-group.sc-ion-action-sheet-ios:first-child{margin-top:10px}.action-sheet-group.sc-ion-action-sheet-ios:last-child{margin-bottom:10px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-group.sc-ion-action-sheet-ios{background-color:transparent;-webkit-backdrop-filter:saturate(280%) blur(20px);backdrop-filter:saturate(280%) blur(20px)}.action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-title.sc-ion-action-sheet-ios,.action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-button.sc-ion-action-sheet-ios{background-color:transparent;background-image:-webkit-gradient(linear, left bottom, left top, from(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8)), to(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8))), -webkit-gradient(linear, left bottom, left top, from(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4)), color-stop(50%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4)), color-stop(50%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8)));background-image:linear-gradient(0deg, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8), rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 100%), linear-gradient(0deg, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4), rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.4) 50%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 50%);background-repeat:no-repeat;background-position:top, bottom;background-size:100% calc(100% - 1px), 100% 1px;-webkit-backdrop-filter:saturate(120%);backdrop-filter:saturate(120%)}.action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-button.ion-activated.sc-ion-action-sheet-ios{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.7);background-image:none}.action-sheet-translucent.sc-ion-action-sheet-ios-h .action-sheet-cancel.sc-ion-action-sheet-ios{background:var(--button-background-selected)}}.action-sheet-title.sc-ion-action-sheet-ios{background:-webkit-gradient(linear, left bottom, left top, from(rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08)), color-stop(50%, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08)), color-stop(50%, transparent)) bottom/100% 1px no-repeat transparent;background:linear-gradient(0deg, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08), rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.08) 50%, transparent 50%) bottom/100% 1px no-repeat transparent}.action-sheet-title.sc-ion-action-sheet-ios{-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px;padding-top:14px;padding-bottom:13px;color:var(--color, var(--ion-color-step-400, var(--ion-text-color-step-600, #999999)));font-size:max(13px, 0.8125rem);font-weight:400;text-align:center}.action-sheet-title.action-sheet-has-sub-title.sc-ion-action-sheet-ios{font-weight:600}.action-sheet-sub-title.sc-ion-action-sheet-ios{padding-left:0;padding-right:0;padding-top:6px;padding-bottom:0;font-size:max(13px, 0.8125rem);font-weight:400}.action-sheet-button.sc-ion-action-sheet-ios{-webkit-padding-start:14px;padding-inline-start:14px;-webkit-padding-end:14px;padding-inline-end:14px;padding-top:14px;padding-bottom:14px;min-height:56px;font-size:max(20px, 1.25rem);contain:content}.action-sheet-button.sc-ion-action-sheet-ios .action-sheet-icon.sc-ion-action-sheet-ios{-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:max(28px, 1.75rem);pointer-events:none}.action-sheet-button.sc-ion-action-sheet-ios:last-child{background-image:none}.action-sheet-selected.sc-ion-action-sheet-ios{font-weight:bold}.action-sheet-cancel.sc-ion-action-sheet-ios{font-weight:600}.action-sheet-cancel.sc-ion-action-sheet-ios::after{background:var(--button-background-selected);opacity:var(--button-background-selected-opacity)}.action-sheet-destructive.sc-ion-action-sheet-ios,.action-sheet-destructive.ion-activated.sc-ion-action-sheet-ios,.action-sheet-destructive.ion-focused.sc-ion-action-sheet-ios{color:var(--ion-color-danger, #c5000f)}@media (any-hover: hover){.action-sheet-destructive.sc-ion-action-sheet-ios:hover{color:var(--ion-color-danger, #c5000f)}}`;
    actionSheetMdCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-action-sheet-md,.alert-radio-label-has-rich-content.sc-ion-action-sheet-md,.alert-checkbox-label-has-rich-content.sc-ion-action-sheet-md,.select-option-label-has-rich-content.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-action-sheet-md,.alert-radio-label-has-rich-content.sc-ion-action-sheet-md,.alert-checkbox-label-has-rich-content.sc-ion-action-sheet-md,.select-option-content.sc-ion-action-sheet-md{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-action-sheet-md,.alert-checkbox-label-text.sc-ion-action-sheet-md,.alert-radio-label-text.sc-ion-action-sheet-md,.select-option-label-text.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-action-sheet-md{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-action-sheet-md:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-action-sheet-md::part(label),ion-radio.select-option-has-rich-content.sc-ion-action-sheet-md [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-action-sheet-md::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-action-sheet-md [part~="label"],.select-option-content.sc-ion-action-sheet-md{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-action-sheet-md>ion-avatar.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>ion-avatar.sc-ion-action-sheet-md{width:40px;height:40px}.select-option-start.sc-ion-action-sheet-md>ion-icon.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>ion-icon.sc-ion-action-sheet-md{font-size:24px}.select-option-start.sc-ion-action-sheet-md>ion-img.sc-ion-action-sheet-md,.select-option-start.sc-ion-action-sheet-md>img.sc-ion-action-sheet-md,.select-option-start.sc-ion-action-sheet-md>svg.sc-ion-action-sheet-md,.select-option-start.sc-ion-action-sheet-md>ion-thumbnail.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>ion-img.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>img.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>svg.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>ion-thumbnail.sc-ion-action-sheet-md{width:56px;height:56px}.select-option-start.sc-ion-action-sheet-md>video.sc-ion-action-sheet-md,.select-option-end.sc-ion-action-sheet-md>video.sc-ion-action-sheet-md{width:114px;height:56px}.sc-ion-action-sheet-md-h{--color:initial;--button-color-activated:var(--button-color);--button-color-focused:var(--button-color);--button-color-hover:var(--button-color);--button-color-selected:var(--button-color);--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--height:auto;--max-height:calc(100% - (var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:block;position:fixed;outline:none;font-family:var(--ion-font-family, inherit);-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-action-sheet-md-h{display:none}.action-sheet-wrapper.sc-ion-action-sheet-md{left:0;right:0;bottom:0;-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);display:block;position:absolute;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);z-index:10;pointer-events:none}.action-sheet-button.sc-ion-action-sheet-md{display:block;position:relative;width:100%;border:0;outline:none;background:var(--button-background);color:var(--button-color);font-family:inherit;overflow:hidden}.action-sheet-button.sc-ion-action-sheet-md:disabled{color:var(--button-color-disabled);opacity:0.4}.action-sheet-button.sc-ion-action-sheet-md:disabled ion-icon.sc-ion-action-sheet-md{color:currentColor}.action-sheet-button-inner.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;pointer-events:none;width:100%;height:100%;z-index:1}.action-sheet-container.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;-ms-flex-pack:end;justify-content:flex-end;height:100%;max-height:calc(100vh - (var(--ion-safe-area-top, 0) + var(--ion-safe-area-bottom, 0)));max-height:calc(100dvh - (var(--ion-safe-area-top, 0) + var(--ion-safe-area-bottom, 0)))}.action-sheet-group.sc-ion-action-sheet-md{-ms-flex-negative:2;flex-shrink:2;overscroll-behavior-y:contain;overflow-y:auto;-webkit-overflow-scrolling:touch;pointer-events:all;background:var(--background)}@media (any-pointer: coarse){.action-sheet-group.sc-ion-action-sheet-md::-webkit-scrollbar{display:none}}.action-sheet-group-cancel.sc-ion-action-sheet-md{-ms-flex-negative:0;flex-shrink:0;overflow:hidden}.action-sheet-button.sc-ion-action-sheet-md::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.action-sheet-selected.sc-ion-action-sheet-md{color:var(--button-color-selected)}.action-sheet-selected.sc-ion-action-sheet-md::after{background:var(--button-background-selected);opacity:var(--button-background-selected-opacity)}.action-sheet-button.ion-activated.sc-ion-action-sheet-md{color:var(--button-color-activated)}.action-sheet-button.ion-activated.sc-ion-action-sheet-md::after{background:var(--button-background-activated);opacity:var(--button-background-activated-opacity)}.action-sheet-button.ion-focused.sc-ion-action-sheet-md:not(.ion-activated){color:var(--button-color-focused)}.action-sheet-button.ion-focused.sc-ion-action-sheet-md:not(.ion-activated)::after{background:var(--button-background-focused);opacity:var(--button-background-focused-opacity)}.action-sheet-button.ion-focused.sc-ion-action-sheet-md:not(.ion-activated).action-sheet-selected::after{background:var(--button-background-focused, var(--button-background-selected));opacity:var(--button-background-focused-opacity, var(--button-background-selected-opacity))}@media (any-hover: hover){.action-sheet-button.sc-ion-action-sheet-md:not(:disabled):hover{color:var(--button-color-hover)}.action-sheet-button.sc-ion-action-sheet-md:not(:disabled):hover::after{background:var(--button-background-hover);opacity:var(--button-background-hover-opacity)}}.sc-ion-action-sheet-md-h{--background:var(--ion-overlay-background-color, var(--ion-background-color, #fff));--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);--button-background:transparent;--button-background-selected:currentColor;--button-background-selected-opacity:0;--button-background-activated:transparent;--button-background-activated-opacity:0;--button-background-hover:currentColor;--button-background-hover-opacity:.04;--button-background-focused:currentColor;--button-background-focused-opacity:.12;--button-color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));--button-color-disabled:var(--button-color);--color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54)}.action-sheet-wrapper.sc-ion-action-sheet-md{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:var(--ion-safe-area-top, 0);margin-bottom:0}.action-sheet-title.sc-ion-action-sheet-md{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:20px;padding-bottom:17px;min-height:60px;color:var(--color, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54));font-size:1rem;text-align:start}.action-sheet-sub-title.sc-ion-action-sheet-md{padding-left:0;padding-right:0;padding-top:16px;padding-bottom:0;font-size:0.875rem}.action-sheet-group.sc-ion-action-sheet-md:first-child{padding-top:0}.action-sheet-group.sc-ion-action-sheet-md:last-child{padding-bottom:var(--ion-safe-area-bottom)}.action-sheet-button.sc-ion-action-sheet-md{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:12px;padding-bottom:12px;position:relative;min-height:52px;font-size:1rem;text-align:start;contain:content;overflow:hidden}.action-sheet-icon.sc-ion-action-sheet-md{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:0;margin-bottom:0;color:var(--color);font-size:1.5rem}.action-sheet-button-inner.sc-ion-action-sheet-md{-ms-flex-pack:start;justify-content:flex-start}.action-sheet-selected.sc-ion-action-sheet-md{font-weight:bold}`;
    ActionSheet = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didPresent = createEvent(this, "ionActionSheetDidPresent", 7);
        this.willPresent = createEvent(this, "ionActionSheetWillPresent", 7);
        this.willDismiss = createEvent(this, "ionActionSheetWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionActionSheetDidDismiss", 7);
        this.didPresentShorthand = createEvent(this, "didPresent", 7);
        this.willPresentShorthand = createEvent(this, "willPresent", 7);
        this.willDismissShorthand = createEvent(this, "willDismiss", 7);
        this.didDismissShorthand = createEvent(this, "didDismiss", 7);
        this.delegateController = createDelegateController(this);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.hasRadioButtons = false;
        this.presented = false;
        this.hasController = false;
        this.keyboardClose = true;
        this.buttons = [];
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
            const cancelButton = this.getButtons().find((b) => b.role === "cancel");
            this.callButtonHandler(cancelButton);
          }
        };
      }
      buttonsChanged() {
        const radioButtons = this.getRadioButtons();
        this.hasRadioButtons = radioButtons.length > 0;
        if (this.hasRadioButtons) {
          const checkedButton = radioButtons.find((b) => b.htmlAttributes?.["aria-checked"] === "true");
          if (checkedButton) {
            const allButtons = this.getButtons();
            const checkedIndex = allButtons.indexOf(checkedButton);
            this.activeRadioId = this.getButtonId(checkedButton, checkedIndex);
          }
        }
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
      /**
       * Present the action sheet overlay after it has been created.
       */
      present() {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          yield this.delegateController.attachViewToDom();
          yield present(this, "actionSheetEnter", iosEnterAnimation, mdEnterAnimation);
          unlock();
        });
      }
      /**
       * Dismiss the action sheet overlay after it has been presented.
       * This is a no-op if the overlay has not been presented yet. If you want
       * to remove an overlay from the DOM that was never presented, use the
       * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
       *
       * @param data Any data to emit in the dismiss events.
       * @param role The role of the element that is dismissing the action sheet.
       * This can be useful in a button handler for determining which button was
       * clicked to dismiss the action sheet. Some examples include:
       * `"cancel"`, `"destructive"`, `"selected"`, and `"backdrop"`.
       */
      dismiss(data, role) {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          const dismissed = yield dismiss(this, data, role, "actionSheetLeave", iosLeaveAnimation, mdLeaveAnimation);
          if (dismissed) {
            this.delegateController.removeViewFromDom();
          }
          unlock();
          return dismissed;
        });
      }
      /**
       * Returns a promise that resolves when the action sheet did dismiss.
       */
      onDidDismiss() {
        return eventMethod(this.el, "ionActionSheetDidDismiss");
      }
      /**
       * Returns a promise that resolves when the action sheet will dismiss.
       *
       */
      onWillDismiss() {
        return eventMethod(this.el, "ionActionSheetWillDismiss");
      }
      buttonClick(button) {
        return __async(this, null, function* () {
          const role = button.role;
          if (isCancel(role)) {
            return this.dismiss(button.data, role);
          }
          const shouldDismiss = yield this.callButtonHandler(button);
          if (shouldDismiss) {
            return this.dismiss(button.data, button.role);
          }
          return Promise.resolve();
        });
      }
      callButtonHandler(button) {
        return __async(this, null, function* () {
          if (button) {
            const rtn = yield safeCall(button.handler);
            if (rtn === false) {
              return false;
            }
          }
          return true;
        });
      }
      /**
       * Get all buttons regardless of role.
       */
      getButtons() {
        return this.buttons.map((b) => {
          return typeof b === "string" ? { text: b } : b;
        });
      }
      /**
       * Get all radio buttons (buttons with role="radio").
       */
      getRadioButtons() {
        return this.getButtons().filter((b) => {
          const role = b.htmlAttributes?.role;
          return role === "radio" && !isCancel(role);
        });
      }
      /**
       * Handle radio button selection and update aria-checked state.
       *
       * @param button The radio button that was selected.
       */
      selectRadioButton(button) {
        const buttonId = this.getButtonId(button);
        this.activeRadioId = buttonId;
      }
      /**
       * Get or generate an ID for a button.
       *
       * @param button The button for which to get the ID.
       * @param index Optional index of the button in the buttons array.
       * @returns The ID of the button.
       */
      getButtonId(button, index) {
        if (button.id) {
          return button.id;
        }
        const allButtons = this.getButtons();
        const buttonIndex = index !== void 0 ? index : allButtons.indexOf(button);
        return `action-sheet-button-${this.overlayIndex}-${buttonIndex}`;
      }
      /**
       * When the action sheet has radio buttons, we want to follow the
       * keyboard navigation pattern for radio groups:
       * - Arrow Down/Right: Move to the next radio button (wrap to first if at end)
       * - Arrow Up/Left: Move to the previous radio button (wrap to last if at start)
       * - Space/Enter: Select the focused radio button and trigger its handler
       */
      onKeydown(ev) {
        if (!this.hasRadioButtons || !this.presented) {
          return;
        }
        const target = ev.target;
        if (!this.el.contains(target) || !target.classList.contains("action-sheet-button") || target.getAttribute("role") !== "radio") {
          return;
        }
        const radios = Array.from(this.el.querySelectorAll('.action-sheet-button[role="radio"]')).filter((el) => !el.disabled);
        const currentIndex = radios.findIndex((radio) => radio.id === target.id);
        if (currentIndex === -1) {
          return;
        }
        const allButtons = this.getButtons();
        const radioButtons = this.getRadioButtons();
        const buttonIdMap = /* @__PURE__ */ new Map();
        radioButtons.forEach((b) => {
          const allIndex = allButtons.indexOf(b);
          const buttonId = this.getButtonId(b, allIndex);
          buttonIdMap.set(buttonId, b);
        });
        let nextEl;
        if (["ArrowDown", "ArrowRight"].includes(ev.key)) {
          ev.preventDefault();
          ev.stopPropagation();
          nextEl = currentIndex === radios.length - 1 ? radios[0] : radios[currentIndex + 1];
        } else if (["ArrowUp", "ArrowLeft"].includes(ev.key)) {
          ev.preventDefault();
          ev.stopPropagation();
          nextEl = currentIndex === 0 ? radios[radios.length - 1] : radios[currentIndex - 1];
        } else if (ev.key === " " || ev.key === "Enter") {
          ev.preventDefault();
          ev.stopPropagation();
          const button = buttonIdMap.get(target.id);
          if (button) {
            this.selectRadioButton(button);
            this.buttonClick(button);
          }
          return;
        }
        if (nextEl) {
          const button = buttonIdMap.get(nextEl.id);
          if (button) {
            this.selectRadioButton(button);
            nextEl.focus();
          }
        }
      }
      connectedCallback() {
        prepareOverlay(this.el);
        this.triggerChanged();
        this.setupButtonActiveGesture();
        if (this.presented) {
          restoreRootFocusTrapAccessibility(this.el);
        }
      }
      disconnectedCallback() {
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
        this.triggerController.removeClickListener();
        if (this.presented) {
          cleanupRootFocusTrapAccessibility();
        }
      }
      componentWillLoad() {
        if (!this.htmlAttributes?.id) {
          setOverlayId(this.el);
        }
        this.buttonsChanged();
      }
      /**
       * Only create gesture if:
       * 1. A gesture does not already exist
       * 2. App is running in iOS mode
       * 3. A wrapper ref exists
       * 4. A group ref exists
       * 5. The host is still connected, since a reconnect can schedule this and
       *    disconnect again before the task runs
       */
      setupButtonActiveGesture() {
        const { groupEl, wrapperEl } = this;
        if (getIonMode(this) !== "ios" || !wrapperEl || !groupEl) {
          return;
        }
        readTask(() => {
          if (this.gesture || !this.el.isConnected || groupEl.scrollHeight > groupEl.clientHeight) {
            return;
          }
          this.gesture = createButtonActiveGesture(wrapperEl, (refEl) => refEl.classList.contains("action-sheet-button"));
          this.gesture.enable(true);
        });
      }
      componentDidLoad() {
        this.setupButtonActiveGesture();
        if (this.isOpen === true) {
          raf(() => this.present());
        }
        this.triggerChanged();
      }
      renderActionSheetButtons(filteredButtons) {
        const mode = getIonMode(this);
        const { activeRadioId } = this;
        return filteredButtons.map((b, index) => {
          const isRadio = b.htmlAttributes?.role === "radio";
          const buttonId = this.getButtonId(b, index);
          const radioButtons = this.getRadioButtons();
          const isActiveRadio = isRadio && buttonId === activeRadioId;
          const isFirstRadio = isRadio && b === radioButtons[0];
          let tabIndex;
          if (isRadio) {
            if (isActiveRadio) {
              tabIndex = 0;
            } else if (!activeRadioId && isFirstRadio) {
              tabIndex = 0;
            } else {
              tabIndex = -1;
            }
          } else {
            tabIndex = void 0;
          }
          const htmlAttrs = __spreadValues({}, b.htmlAttributes);
          if (isRadio) {
            htmlAttrs["aria-checked"] = isActiveRadio ? "true" : "false";
          }
          const richButton = b;
          const optionLabelOptions = {
            id: buttonId,
            label: richButton.text,
            startContent: richButton.startContent,
            endContent: richButton.endContent,
            description: richButton.description
          };
          return h("button", __spreadProps(__spreadValues({}, htmlAttrs), { role: isRadio ? "radio" : void 0, type: "button", id: buttonId, class: __spreadValues(__spreadValues({}, buttonClass(b)), isRadio && { "action-sheet-selected": isActiveRadio }), onClick: () => {
            if (isRadio) {
              this.selectRadioButton(b);
            }
            this.buttonClick(b);
          }, disabled: b.disabled, tabIndex }), h("span", { class: "action-sheet-button-inner" }, b.icon && h("ion-icon", { icon: b.icon, "aria-hidden": "true", lazy: false, class: "action-sheet-icon" }), renderOptionLabel(optionLabelOptions, "action-sheet-button-label", true)), mode === "md" && h("ion-ripple-effect", null));
        });
      }
      render() {
        const { header, htmlAttributes, overlayIndex, hasRadioButtons } = this;
        const mode = getIonMode(this);
        const allButtons = this.getButtons();
        const cancelButton = allButtons.find((b) => b.role === "cancel");
        const buttons = allButtons.filter((b) => b.role !== "cancel");
        const headerID = `action-sheet-${overlayIndex}-header`;
        return h(Host, __spreadProps(__spreadValues({ key: "83b47ea6b81d4eec6582c1dcaae6f267c78ba634", role: "dialog", "aria-modal": "true", "aria-labelledby": header !== void 0 ? headerID : null, tabindex: "-1" }, htmlAttributes), { style: {
          zIndex: `${2e4 + this.overlayIndex}`
        }, class: __spreadProps(__spreadValues({
          [mode]: true
        }, getClassMap(this.cssClass)), {
          "overlay-hidden": true,
          "action-sheet-translucent": this.translucent
        }), onIonActionSheetWillDismiss: this.dispatchCancelHandler, onIonBackdropTap: this.onBackdropTap }), h("ion-backdrop", { key: "3652793ec76adcfb87b814eb65d1260ae26f6910", tappable: this.backdropDismiss }), h("div", { key: "7de3a51daf95b50e02734a2cc8eec6f55b1473f3", tabindex: "0", "aria-hidden": "true" }), h("div", { key: "9b76bbf12901b956f7ee6d984f7f71e169bb5939", class: "action-sheet-wrapper ion-overlay-wrapper", ref: (el) => this.wrapperEl = el }, h("div", { key: "cb52c905275a46ff27810fb1b4748ab533a78c45", class: "action-sheet-container" }, h("div", { key: "578c7194cfbcb65c1e41e15c390af41f179a2686", class: "action-sheet-group", ref: (el) => this.groupEl = el, role: hasRadioButtons ? "radiogroup" : void 0 }, header !== void 0 && h("div", { key: "ee961307c25cb1fcb0c6bbf667a8ed76ab717860", id: headerID, class: {
          "action-sheet-title": true,
          "action-sheet-has-sub-title": this.subHeader !== void 0
        } }, header, this.subHeader && h("div", { key: "82d4016010db14d3f3b9911c276cb9a63b960ef4", class: "action-sheet-sub-title" }, this.subHeader)), this.renderActionSheetButtons(buttons)), cancelButton && h("div", { key: "a88fbfab194e13c6642a65f2e19a12299dd4ac23", class: "action-sheet-group action-sheet-group-cancel" }, h("button", __spreadProps(__spreadValues({ key: "a232b8d23f1fc2efb7b37a605102b6994761a2f6" }, cancelButton.htmlAttributes), { type: "button", class: buttonClass(cancelButton), onClick: () => this.buttonClick(cancelButton) }), h("span", { key: "19a7d95d3428d78a56b7dacabdec8fc0b722d8c2", class: "action-sheet-button-inner" }, cancelButton.icon && h("ion-icon", { key: "5f3f3cb996a48e6365a3a09ea72ddc68ac9ccb78", icon: cancelButton.icon, "aria-hidden": "true", lazy: false, class: "action-sheet-icon" }), cancelButton.text), mode === "md" && h("ion-ripple-effect", { key: "6e8fcb5f103ac19aa4b0682f19791cef0a147001" }))))), h("div", { key: "36f63ab77949c88f662e2cf6bb18510cb9de6a9f", tabindex: "0", "aria-hidden": "true" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "buttons": [{
            "buttonsChanged": 0
          }],
          "isOpen": [{
            "onIsOpenChange": 0
          }],
          "trigger": [{
            "triggerChanged": 0
          }]
        };
      }
    };
    buttonClass = (button) => {
      return __spreadValues({
        "action-sheet-button": true,
        "ion-activatable": !button.disabled,
        "ion-focusable": !button.disabled,
        [`action-sheet-${button.role}`]: button.role !== void 0
      }, getClassMap(button.cssClass));
    };
    ActionSheet.style = {
      ios: actionSheetIosCss(),
      md: actionSheetMdCss()
    };
  }
});
init_ion_action_sheet_entry();
export {
  ActionSheet as ion_action_sheet
};
//# debugId=b4bc6ff8-0c35-5b4a-84b9-9ebe0cae6357
//# sourceMappingURL=chunk-D4HKBEHH.js.map
