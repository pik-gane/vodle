import {
  init_watch_options_Dtdm8lKC,
  watchForOptions
} from "./chunk-TAKGTFOB.js";
import {
  compareOptions,
  init_compare_with_utils_sObYyvOy,
  isOptionSelected
} from "./chunk-TYMJ667S.js";
import {
  createClickController,
  createNotchController,
  createSlotMutationController,
  createStartContainerController,
  getSlottedClickContent,
  init_slot_mutation_controller_hAS2uJ7c
} from "./chunk-TGPXV6HN.js";
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
  caretDownSharp,
  chevronExpand,
  init_index_BvabGprD
} from "./chunk-KPUED4ZZ.js";
import {
  checkInvalidState,
  init_validity_DJztqcrH
} from "./chunk-MXARAUZW.js";
import {
  ENABLE_HTML_CONTENT_DEFAULT,
  init_config_DWCzVL3Y
} from "./chunk-QLB7V5XI.js";
import {
  blockedTags,
  init_index_CK8uF0iB,
  reflectPropertiesToAttributes,
  sanitizeDOMTree
} from "./chunk-CPN2CPEA.js";
import {
  actionSheetController,
  alertController,
  init_overlays_DmDY_El7,
  modalController,
  popoverController,
  safeCall
} from "./chunk-VQMD36Q3.js";
import {
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  focusVisibleElement,
  inheritAttributes,
  init_helpers_BJqKF1pr,
  renderHiddenInput
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde,
  isRTL
} from "./chunk-Z6RQ22J2.js";
import {
  createColorClasses,
  getClassMap,
  hostContext,
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

// node_modules/@ionic/core/dist/esm/ion-select_3.entry.js
var selectIosCss, selectMdCss, Select, getOptionValue, parseValue, generateText, textForValue, trimTextNodes, getOptionContent, getOptionDefaultSlot, getRenderedTextContent, getDefaultSlotPlainText, extractOptionContent, selectIds, OPTION_CLASS, INTERACTIVE_SLOTTED_CONTENT, selectOptionCss, SelectOption, selectOptionIds, selectPopoverIosCss, selectPopoverMdCss, SelectPopover;
var init_ion_select_3_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-select_3.entry.js"() {
    init_index_BpRUsN_W();
    init_config_DWCzVL3Y();
    init_slot_mutation_controller_hAS2uJ7c();
    init_compare_with_utils_sObYyvOy();
    init_validity_DJztqcrH();
    init_helpers_BJqKF1pr();
    init_overlays_DmDY_El7();
    init_dir_Dojwmvde();
    init_index_CK8uF0iB();
    init_theme_byZM6qHV();
    init_watch_options_Dtdm8lKC();
    init_index_BvabGprD();
    init_ionic_global_Cep6oYzK();
    init_overlay_control_label_BSQPZ79H();
    init_select_option_render_BSDT9oSA();
    init_framework_delegate_CDjM1vRH();
    init_gesture_controller_B_gJaBk0();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    selectIosCss = () => `:host{--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--placeholder-color:currentColor;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);--background:transparent;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #0054e9);--highlight-color-valid:var(--ion-color-success, #2dd55b);--highlight-color-invalid:var(--ion-color-danger, #c5000f);--select-text-media-height:1.5em;--select-text-media-width:1.5em;--select-text-gap:12px;--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;min-height:44px;font-family:var(--ion-font-family, inherit);white-space:nowrap;cursor:pointer;z-index:2}:host(.select-label-placement-floating),:host(.select-label-placement-stacked){min-height:56px}:host(.ion-color){--highlight-color-focused:var(--ion-color-base)}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0}:host(.select-disabled){pointer-events:none}:host(.has-focus) button{border:2px solid #5e9ed6}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}.select-placeholder{color:var(--placeholder-color);opacity:var(--placeholder-opacity)}button{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.select-icon{-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0;position:relative;-ms-flex-negative:0;flex-shrink:0}:host(.in-item-color) .select-icon{color:inherit}.select-text{-ms-flex:1;flex:1;min-width:2ch;font-size:inherit;text-overflow:ellipsis;white-space:inherit;overflow:hidden}.select-text>*+*{-webkit-margin-start:var(--select-text-gap);margin-inline-start:var(--select-text-gap)}.select-text img,.select-text ion-img,.select-text ion-icon,.select-text ion-thumbnail,.select-text ion-avatar{border-radius:var(--select-text-media-border-radius);width:var(--select-text-media-width);height:var(--select-text-media-height);border-width:var(--select-text-media-border-width);border-style:var(--select-text-media-border-style);border-color:var(--select-text-media-border-color)}.select-wrapper{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:justify;justify-content:space-between;height:inherit;min-height:inherit;-webkit-transition:background-color 15ms linear;transition:background-color 15ms linear;background:var(--background);line-height:normal;cursor:inherit;-webkit-box-sizing:border-box;box-sizing:border-box}.select-wrapper .select-placeholder{-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.select-control{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:center;align-items:center;-ms-flex-pack:inherit;justify-content:inherit;min-width:0}:host(.ion-touched.ion-invalid){--highlight-color:var(--highlight-color-invalid)}:host(.ion-valid){--highlight-color:var(--highlight-color-valid)}.select-bottom{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:0.75rem;white-space:normal}:host(.has-focus.ion-valid),:host(.select-expanded.ion-valid),:host(.ion-touched.ion-invalid),:host(.select-expanded.ion-touched.ion-invalid){--border-color:var(--highlight-color)}.select-bottom .error-text{display:none;color:var(--highlight-color-invalid)}.select-bottom .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}:host(.ion-touched.ion-invalid) .select-bottom .error-text{display:block}:host(.ion-touched.ion-invalid) .select-bottom .helper-text{display:none}.label-text-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0;max-width:200px;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}:host(.skip-label-transition) .label-text-wrapper{-webkit-transition:none;transition:none}.label-text,::slotted([slot=label]){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden,.select-outline-notch-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-negative:100000;flex-shrink:100000;-ms-flex-align:center;align-items:center;-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);overflow:hidden}:host(.select-justify-space-between) .select-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.select-justify-start) .select-wrapper{-ms-flex-pack:start;justify-content:start}:host(.select-justify-end) .select-wrapper{-ms-flex-pack:end;justify-content:end}:host(.select-label-placement-start) .select-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.select-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-end) .select-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.select-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.select-label-placement-stacked) .select-control,:host(.select-label-placement-floating) .select-control{-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:start;align-items:start}:host(.select-label-placement-stacked) .label-text-wrapper,:host(.select-label-placement-floating) .label-text-wrapper{max-width:100%}:host(.select-ltr.select-label-placement-stacked) .label-text-wrapper,:host(.select-ltr.select-label-placement-floating) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host(.select-rtl.select-label-placement-stacked) .label-text-wrapper,:host(.select-rtl.select-label-placement-floating) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}:host(.select-label-placement-stacked) .native-wrapper,:host(.select-label-placement-floating) .native-wrapper{-ms-flex-positive:1;flex-grow:1;width:100%}:host(.select-label-placement-floating) .label-text-wrapper{-webkit-transform:translateY(100%) scale(1);transform:translateY(100%) scale(1)}:host(.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:0}:host(.label-floating.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:var(--placeholder-opacity)}:host(.label-floating) .label-text-wrapper{-webkit-transform:translateY(50%) scale(0.75);transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.select-start,.select-end{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center}::slotted([slot=start]),::slotted([slot=end]){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]:last-of-type){-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-start:0;margin-inline-start:0}::slotted([slot=end]:first-of-type){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host{--border-width:0.55px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))));--highlight-height:0px}.select-icon{width:1.125rem;height:1.125rem;color:var(--ion-color-step-650, var(--ion-text-color-step-350, #595959))}:host(.select-disabled){opacity:0.3}::slotted(ion-button[slot=start].button-has-icon-only),::slotted(ion-button[slot=end].button-has-icon-only){--border-radius:50%;--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;aspect-ratio:1}`;
    selectMdCss = () => `:host{--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--placeholder-color:currentColor;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);--background:transparent;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #0054e9);--highlight-color-valid:var(--ion-color-success, #2dd55b);--highlight-color-invalid:var(--ion-color-danger, #c5000f);--select-text-media-height:1.5em;--select-text-media-width:1.5em;--select-text-gap:12px;--highlight-color:var(--highlight-color-focused);display:block;position:relative;width:100%;min-height:44px;font-family:var(--ion-font-family, inherit);white-space:nowrap;cursor:pointer;z-index:2}:host(.select-label-placement-floating),:host(.select-label-placement-stacked){min-height:56px}:host(.ion-color){--highlight-color-focused:var(--ion-color-base)}:host(.in-item){-ms-flex:1 1 0px;flex:1 1 0}:host(.select-disabled){pointer-events:none}:host(.has-focus) button{border:2px solid #5e9ed6}:host([slot=start]),:host([slot=end]){-ms-flex:initial;flex:initial;width:auto}.select-placeholder{color:var(--placeholder-color);opacity:var(--placeholder-opacity)}button{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.select-icon{-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0;position:relative;-ms-flex-negative:0;flex-shrink:0}:host(.in-item-color) .select-icon{color:inherit}.select-text{-ms-flex:1;flex:1;min-width:2ch;font-size:inherit;text-overflow:ellipsis;white-space:inherit;overflow:hidden}.select-text>*+*{-webkit-margin-start:var(--select-text-gap);margin-inline-start:var(--select-text-gap)}.select-text img,.select-text ion-img,.select-text ion-icon,.select-text ion-thumbnail,.select-text ion-avatar{border-radius:var(--select-text-media-border-radius);width:var(--select-text-media-width);height:var(--select-text-media-height);border-width:var(--select-text-media-border-width);border-style:var(--select-text-media-border-style);border-color:var(--select-text-media-border-color)}.select-wrapper{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:justify;justify-content:space-between;height:inherit;min-height:inherit;-webkit-transition:background-color 15ms linear;transition:background-color 15ms linear;background:var(--background);line-height:normal;cursor:inherit;-webkit-box-sizing:border-box;box-sizing:border-box}.select-wrapper .select-placeholder{-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.select-control{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:center;align-items:center;-ms-flex-pack:inherit;justify-content:inherit;min-width:0}:host(.ion-touched.ion-invalid){--highlight-color:var(--highlight-color-invalid)}:host(.ion-valid){--highlight-color:var(--highlight-color-valid)}.select-bottom{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:5px;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;border-top:var(--border-width) var(--border-style) var(--border-color);font-size:0.75rem;white-space:normal}:host(.has-focus.ion-valid),:host(.select-expanded.ion-valid),:host(.ion-touched.ion-invalid),:host(.select-expanded.ion-touched.ion-invalid){--border-color:var(--highlight-color)}.select-bottom .error-text{display:none;color:var(--highlight-color-invalid)}.select-bottom .helper-text{display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d))}:host(.ion-touched.ion-invalid) .select-bottom .error-text{display:block}:host(.ion-touched.ion-invalid) .select-bottom .helper-text{display:none}.label-text-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0;max-width:200px;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}:host(.skip-label-transition) .label-text-wrapper{-webkit-transition:none;transition:none}.label-text,::slotted([slot=label]){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden,.select-outline-notch-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-negative:100000;flex-shrink:100000;-ms-flex-align:center;align-items:center;-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);overflow:hidden}:host(.select-justify-space-between) .select-wrapper{-ms-flex-pack:justify;justify-content:space-between}:host(.select-justify-start) .select-wrapper{-ms-flex-pack:start;justify-content:start}:host(.select-justify-end) .select-wrapper{-ms-flex-pack:end;justify-content:end}:host(.select-label-placement-start) .select-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.select-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-end) .select-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.select-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.select-label-placement-stacked) .select-control,:host(.select-label-placement-floating) .select-control{-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:start;align-items:start}:host(.select-label-placement-stacked) .label-text-wrapper,:host(.select-label-placement-floating) .label-text-wrapper{max-width:100%}:host(.select-ltr.select-label-placement-stacked) .label-text-wrapper,:host(.select-ltr.select-label-placement-floating) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host(.select-rtl.select-label-placement-stacked) .label-text-wrapper,:host(.select-rtl.select-label-placement-floating) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}:host(.select-label-placement-stacked) .native-wrapper,:host(.select-label-placement-floating) .native-wrapper{-ms-flex-positive:1;flex-grow:1;width:100%}:host(.select-label-placement-floating) .label-text-wrapper{-webkit-transform:translateY(100%) scale(1);transform:translateY(100%) scale(1)}:host(.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:0}:host(.label-floating.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:var(--placeholder-opacity)}:host(.label-floating) .label-text-wrapper{-webkit-transform:translateY(50%) scale(0.75);transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}.select-start,.select-end{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center}::slotted([slot=start]),::slotted([slot=end]){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]:last-of-type){-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-start:0;margin-inline-start:0}::slotted([slot=end]:first-of-type){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}:host(.select-fill-solid){--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--border-color:var(--ion-color-step-500, var(--ion-background-color-step-500, gray));--border-radius:4px;--padding-start:16px;--padding-end:16px;min-height:56px}:host(.select-fill-solid) .select-wrapper{border-bottom:var(--border-width) var(--border-style) var(--border-color)}:host(.select-expanded.select-fill-solid.ion-valid),:host(.has-focus.select-fill-solid.ion-valid),:host(.select-fill-solid.ion-touched.ion-invalid){--border-color:var(--highlight-color)}:host(.select-fill-solid) .select-bottom{border-top:none}@media (any-hover: hover){:host(.select-fill-solid:hover){--background:var(--ion-color-step-100, var(--ion-background-color-step-100, #e6e6e6));--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}}:host(.select-fill-solid.select-expanded),:host(.select-fill-solid.has-focus){--background:var(--ion-color-step-150, var(--ion-background-color-step-150, #d9d9d9));--border-color:var(--highlight-color)}:host(.select-fill-solid) .select-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0px;border-end-start-radius:0px}:host(.label-floating.select-fill-solid) .label-text-wrapper{max-width:calc(100% / 0.75)}:host(.in-item.select-expanded.select-fill-solid) .select-wrapper .select-icon,:host(.in-item.has-focus.select-fill-solid) .select-wrapper .select-icon,:host(.in-item.has-focus.ion-valid.select-fill-solid) .select-wrapper .select-icon,:host(.in-item.ion-touched.ion-invalid.select-fill-solid) .select-wrapper .select-icon{color:var(--highlight-color)}:host(.select-fill-outline){--border-color:var(--ion-color-step-300, var(--ion-background-color-step-300, #b3b3b3));--border-radius:4px;--padding-start:16px;--padding-end:16px;--internal-start-container-adjustment:0px;min-height:56px}:host(.select-fill-outline.select-shape-round){--border-radius:28px;--padding-start:32px;--padding-end:32px}:host(.has-focus.select-fill-outline.ion-valid),:host(.select-fill-outline.ion-touched.ion-invalid){--border-color:var(--highlight-color)}@media (any-hover: hover){:host(.select-fill-outline:hover){--border-color:var(--ion-color-step-750, var(--ion-background-color-step-750, #404040))}}:host(.select-fill-outline.select-expanded),:host(.select-fill-outline.has-focus){--border-width:var(--highlight-height);--border-color:var(--highlight-color)}:host(.select-fill-outline) .select-bottom{border-top:none}:host(.select-fill-outline) .select-wrapper{border-bottom:none}:host(.select-ltr.select-fill-outline.select-label-placement-stacked) .label-text-wrapper,:host(.select-ltr.select-fill-outline.select-label-placement-floating) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top}:host(.select-rtl.select-fill-outline.select-label-placement-stacked) .label-text-wrapper,:host(.select-rtl.select-fill-outline.select-label-placement-floating) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}:host(.select-fill-outline.select-label-placement-stacked) .label-text-wrapper,:host(.select-fill-outline.select-label-placement-floating) .label-text-wrapper{position:absolute;max-width:100%}:host(.select-fill-outline) .label-text-wrapper{position:relative;z-index:1}:host(.select-fill-outline:not(.label-floating)) .select-control{position:relative}:host(.label-floating.select-fill-outline) .label-text-wrapper{-webkit-transform:translate(var(--internal-start-container-adjustment, 0px), -32%) scale(0.75);transform:translate(var(--internal-start-container-adjustment, 0px), -32%) scale(0.75);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;max-width:calc((100% - var(--padding-start) - var(--padding-end) - 8px) / 0.75)}:host(.select-fill-outline.select-label-placement-stacked) select,:host(.select-fill-outline.select-label-placement-floating) select{margin-left:0;margin-right:0;margin-top:6px;margin-bottom:6px}:host(.select-fill-outline) .select-outline-container{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;width:100%;height:100%}:host(.select-fill-outline) .select-outline-start,:host(.select-fill-outline) .select-outline-end{pointer-events:none}:host(.select-fill-outline) .select-outline-start,:host(.select-fill-outline) .select-outline-notch,:host(.select-fill-outline) .select-outline-end{border-top:var(--border-width) var(--border-style) var(--border-color);border-bottom:var(--border-width) var(--border-style) var(--border-color);-webkit-box-sizing:border-box;box-sizing:border-box}:host(.select-fill-outline) .select-outline-notch{max-width:calc(100% - var(--padding-start) - var(--padding-end))}:host(.select-fill-outline) .notch-spacer{-webkit-padding-end:8px;padding-inline-end:8px;font-size:calc(1em * 0.75);opacity:0;pointer-events:none}:host(.select-fill-outline) .select-outline-start{-webkit-border-start:var(--border-width) var(--border-style) var(--border-color);border-inline-start:var(--border-width) var(--border-style) var(--border-color);border-start-start-radius:var(--border-radius);border-start-end-radius:0px;border-end-end-radius:0px;border-end-start-radius:var(--border-radius);width:calc(var(--padding-start) - 4px)}:host(.select-fill-outline) .select-outline-end{-webkit-border-end:var(--border-width) var(--border-style) var(--border-color);border-inline-end:var(--border-width) var(--border-style) var(--border-color);border-start-start-radius:0px;border-start-end-radius:var(--border-radius);border-end-end-radius:var(--border-radius);border-end-start-radius:0px;-ms-flex-positive:1;flex-grow:1}:host(.label-floating.select-fill-outline) .select-outline-notch{border-top:none}:host(.in-item.select-expanded.select-fill-outline) .select-wrapper .select-icon,:host(.in-item.has-focus.select-fill-outline) .select-wrapper .select-icon,:host(.in-item.has-focus.ion-valid.select-fill-outline) .select-wrapper .select-icon,:host(.in-item.ion-touched.ion-invalid.select-fill-outline) .select-wrapper .select-icon{color:var(--highlight-color)}:host{--border-width:1px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))));--highlight-height:2px}:host(.select-label-placement-floating.select-expanded) .label-text-wrapper,:host(.select-label-placement-floating.has-focus) .label-text-wrapper,:host(.select-label-placement-stacked.select-expanded) .label-text-wrapper,:host(.select-label-placement-stacked.has-focus) .label-text-wrapper{color:var(--highlight-color)}:host(.has-focus.select-label-placement-floating.ion-valid) .label-text-wrapper,:host(.select-label-placement-floating.ion-touched.ion-invalid) .label-text-wrapper,:host(.has-focus.select-label-placement-stacked.ion-valid) .label-text-wrapper,:host(.select-label-placement-stacked.ion-touched.ion-invalid) .label-text-wrapper{color:var(--highlight-color)}.select-highlight{bottom:-1px;position:absolute;width:100%;height:var(--highlight-height);-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform 200ms;transition:-webkit-transform 200ms;transition:transform 200ms;transition:transform 200ms, -webkit-transform 200ms;background:var(--highlight-color)}.select-highlight{inset-inline-start:0}:host(.select-expanded) .select-highlight,:host(.has-focus) .select-highlight{-webkit-transform:scale(1);transform:scale(1)}:host(.in-item) .select-highlight{bottom:0}:host(.in-item) .select-highlight{inset-inline-start:0}.select-icon{width:0.8125rem;-webkit-transition:-webkit-transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);transition:transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);transition:transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);color:var(--ion-color-step-500, var(--ion-text-color-step-500, gray))}:host(.select-expanded:not(.has-expanded-icon)) .select-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(.in-item.select-expanded) .select-wrapper .select-icon,:host(.in-item.has-focus) .select-wrapper .select-icon,:host(.in-item.has-focus.ion-valid) .select-wrapper .select-icon,:host(.in-item.ion-touched.ion-invalid) .select-wrapper .select-icon{color:var(--ion-color-step-500, var(--ion-text-color-step-500, gray))}:host(.select-expanded) .select-wrapper .select-icon,:host(.has-focus.ion-valid) .select-wrapper .select-icon,:host(.ion-touched.ion-invalid) .select-wrapper .select-icon,:host(.has-focus) .select-wrapper .select-icon{color:var(--highlight-color)}:host(.select-shape-round){--border-radius:16px}:host(.select-disabled){opacity:0.38}::slotted(ion-button[slot=start].button-has-icon-only),::slotted(ion-button[slot=end].button-has-icon-only){--border-radius:50%;--padding-start:8px;--padding-end:8px;--padding-top:8px;--padding-bottom:8px;aspect-ratio:1;min-height:40px}`;
    Select = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionCancel = createEvent(this, "ionCancel", 7);
        this.ionDismiss = createEvent(this, "ionDismiss", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.inputId = `ion-sel-${selectIds++}`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.inheritedAttributes = {};
        this.customHTMLEnabled = config.get("innerHTMLTemplatesEnabled", ENABLE_HTML_CONTENT_DEFAULT);
        this.isExpanded = false;
        this.hasFocus = false;
        this.isInvalid = false;
        this.cancelText = "Cancel";
        this.disabled = false;
        this.interface = "alert";
        this.interfaceOptions = {};
        this.labelPlacement = "start";
        this.multiple = false;
        this.name = this.inputId;
        this.okText = "OK";
        this.required = false;
        this.onClick = (ev) => {
          const slotted = getSlottedClickContent(ev, this.el);
          if (slotted !== null) {
            const interactive = ev.target.closest(INTERACTIVE_SLOTTED_CONTENT);
            if (interactive !== null && slotted.contains(interactive)) {
              return;
            }
          }
          this.setFocus();
          this.open(ev);
        };
        this.onFocus = () => {
          this.hasFocus = true;
          this.ionFocus.emit();
        };
        this.onBlur = () => {
          this.hasFocus = false;
          this.ionBlur.emit();
        };
        this.onLabelClick = (ev) => {
          if (ev.target === this.focusEl && this.isExpanded) {
            ev.stopPropagation();
          }
        };
      }
      styleChanged() {
        this.emitStyle();
      }
      setValue(value) {
        if (this.isValueEqual(this.value, value)) {
          return;
        }
        this.value = value;
        this.ionChange.emit({ value });
      }
      isValueEqual(currentValue, newValue) {
        if (this.multiple) {
          const currentArr = Array.isArray(currentValue) ? currentValue : [];
          const newArr = Array.isArray(newValue) ? newValue : [];
          if (currentArr.length !== newArr.length) {
            return false;
          }
          const remaining = currentArr.slice();
          return newArr.every((val) => {
            const idx = remaining.findIndex((c) => compareOptions(c, val, this.compareWith));
            if (idx === -1) {
              return false;
            }
            remaining.splice(idx, 1);
            return true;
          });
        }
        if (currentValue == null && newValue == null) {
          return true;
        }
        if (currentValue == null || newValue == null) {
          return false;
        }
        return compareOptions(currentValue, newValue, this.compareWith);
      }
      connectedCallback() {
        return __async(this, null, function* () {
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
          this.clickController = createClickController(el);
          this.updateOverlayOptions();
          this.emitStyle();
          this.mutationO = watchForOptions(this.el, "ion-select-option", () => __async(this, null, function* () {
            this.updateOverlayOptions();
            forceUpdate(this);
          }));
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
            this.validationObserver.observe(el, {
              attributes: true,
              attributeFilter: ["class"]
            });
          }
          this.isInvalid = checkInvalidState(this.el);
        });
      }
      componentWillLoad() {
        this.inheritedAttributes = inheritAttributes(this.el, ["aria-label"]);
        this.hintTextId = this.getHintTextId();
      }
      componentDidLoad() {
        this.emitStyle();
      }
      disconnectedCallback() {
        if (this.mutationO) {
          this.mutationO.disconnect();
          this.mutationO = void 0;
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
       * Open the select overlay. The overlay is either an alert, action sheet, or popover,
       * depending on the `interface` property on the `ion-select`.
       *
       * @param event The user interface event that called the open.
       */
      open(event) {
        return __async(this, null, function* () {
          if (this.disabled || this.isExpanded) {
            return void 0;
          }
          this.isExpanded = true;
          const overlay = this.overlay = yield this.createOverlay(event);
          const scrollSelectedIntoView = () => {
            const indexOfSelected = this.childOpts.findIndex((o) => o.value === this.value);
            if (indexOfSelected > -1) {
              const selectedItem = overlay.querySelector(`.select-interface-option:nth-of-type(${indexOfSelected + 1})`);
              if (selectedItem) {
                const interactiveEl = selectedItem.querySelector("ion-radio, ion-checkbox");
                if (interactiveEl) {
                  selectedItem.scrollIntoView({ block: "nearest" });
                  interactiveEl.setFocus();
                }
                focusVisibleElement(selectedItem);
              }
            } else {
              const firstEnabledOption = overlay.querySelector("ion-radio:not(.radio-disabled), ion-checkbox:not(.checkbox-disabled)");
              if (firstEnabledOption) {
                firstEnabledOption.setFocus();
                focusVisibleElement(firstEnabledOption.closest("ion-item"));
              }
            }
          };
          if (this.interface === "modal") {
            overlay.addEventListener("ionModalWillPresent", scrollSelectedIntoView, { once: true });
          } else if (this.interface === "popover") {
            overlay.addEventListener("ionPopoverWillPresent", scrollSelectedIntoView, { once: true });
          } else {
            const scrollAfterRender = () => {
              requestAnimationFrame(() => {
                scrollSelectedIntoView();
              });
            };
            if (this.interface === "alert") {
              overlay.addEventListener("ionAlertWillPresent", scrollAfterRender, { once: true });
            } else if (this.interface === "action-sheet") {
              overlay.addEventListener("ionActionSheetWillPresent", scrollAfterRender, { once: true });
            }
          }
          overlay.onDidDismiss().then(() => {
            this.overlay = void 0;
            this.isExpanded = false;
            this.ionDismiss.emit();
            this.setFocus();
          });
          yield overlay.present();
          return overlay;
        });
      }
      createOverlay(ev) {
        let selectInterface = this.interface;
        if (selectInterface === "action-sheet" && this.multiple) {
          printIonWarning(`[ion-select] - Interface cannot be "${selectInterface}" with a multi-value select. Using the "alert" interface instead.`);
          selectInterface = "alert";
        }
        if (selectInterface === "popover" && !ev) {
          printIonWarning(`[ion-select] - Interface cannot be a "${selectInterface}" without passing an event. Using the "alert" interface instead.`);
          selectInterface = "alert";
        }
        if (selectInterface === "action-sheet") {
          return this.openActionSheet();
        }
        if (selectInterface === "popover") {
          return this.openPopover(ev);
        }
        if (selectInterface === "modal") {
          return this.openModal();
        }
        return this.openAlert();
      }
      updateOverlayOptions() {
        const overlay = this.overlay;
        if (!overlay) {
          return;
        }
        const childOpts = this.childOpts;
        const value = this.value;
        switch (this.interface) {
          case "action-sheet":
            overlay.buttons = this.createActionSheetButtons(childOpts, value);
            break;
          case "popover":
            const popover = overlay.querySelector("ion-select-popover");
            if (popover) {
              popover.options = this.createOverlaySelectOptions(childOpts, value);
            }
            break;
          case "modal":
            const modal = overlay.querySelector("ion-select-modal");
            if (modal) {
              modal.options = this.createOverlaySelectOptions(childOpts, value);
            }
            break;
          case "alert":
            const inputType = this.multiple ? "checkbox" : "radio";
            overlay.inputs = this.createAlertInputs(childOpts, inputType, value);
            break;
        }
      }
      createActionSheetButtons(data, selectValue) {
        const actionSheetButtons = data.map((option) => {
          const value = getOptionValue(option);
          const copyClasses = Array.from(option.classList).filter((cls) => cls !== "hydrated").join(" ");
          const optClass = `${OPTION_CLASS} ${copyClasses}`;
          const isSelected = isOptionSelected(selectValue, value, this.compareWith);
          const { content, startContent, endContent } = extractOptionContent(option, this.customHTMLEnabled);
          return {
            text: content ?? "",
            cssClass: optClass,
            disabled: option.disabled,
            handler: () => {
              this.setValue(value);
            },
            htmlAttributes: {
              "aria-checked": isSelected ? "true" : "false",
              role: "radio"
            },
            startContent,
            endContent,
            description: option.description
          };
        });
        actionSheetButtons.push({
          text: this.cancelText,
          role: "cancel",
          handler: () => {
            this.ionCancel.emit();
          }
        });
        return actionSheetButtons;
      }
      createAlertInputs(data, inputType, selectValue) {
        const alertInputs = data.map((option) => {
          const value = getOptionValue(option);
          const copyClasses = Array.from(option.classList).filter((cls) => cls !== "hydrated").join(" ");
          const optClass = `${OPTION_CLASS} ${copyClasses}`;
          const { content, startContent, endContent } = extractOptionContent(option, this.customHTMLEnabled);
          return {
            type: inputType,
            cssClass: optClass,
            label: content ?? "",
            value,
            checked: isOptionSelected(selectValue, value, this.compareWith),
            disabled: option.disabled,
            startContent,
            endContent,
            description: option.description,
            labelPlacement: option.labelPlacement,
            justify: option.justify
          };
        });
        return alertInputs;
      }
      createOverlaySelectOptions(data, selectValue) {
        const popoverOptions = data.map((option) => {
          const value = getOptionValue(option);
          const copyClasses = Array.from(option.classList).filter((cls) => cls !== "hydrated").join(" ");
          const optClass = `${OPTION_CLASS} ${copyClasses}`;
          const { content, startContent, endContent } = extractOptionContent(option, this.customHTMLEnabled);
          return {
            text: content ?? "",
            cssClass: optClass,
            value,
            checked: isOptionSelected(selectValue, value, this.compareWith),
            disabled: option.disabled,
            handler: (selected) => {
              this.setValue(selected);
              if (!this.multiple) {
                this.close();
              }
            },
            startContent,
            endContent,
            description: option.description,
            labelPlacement: option.labelPlacement,
            justify: option.justify
          };
        });
        return popoverOptions;
      }
      openPopover(ev) {
        return __async(this, null, function* () {
          const { fill, labelPlacement } = this;
          const interfaceOptions = this.interfaceOptions;
          const mode = getIonMode(this);
          const showBackdrop = mode === "md" ? false : true;
          const multiple = this.multiple;
          const value = this.value;
          let event = ev;
          let size = "auto";
          const hasFloatingOrStackedLabel = labelPlacement === "floating" || labelPlacement === "stacked";
          if (hasFloatingOrStackedLabel || mode === "md" && fill !== void 0) {
            size = "cover";
          } else {
            event = __spreadProps(__spreadValues({}, ev), {
              detail: {
                ionShadowTarget: this.nativeWrapperEl
              }
            });
          }
          const options = this.createOverlaySelectOptions(this.childOpts, value);
          const hasRichContent = options.some((opt) => Boolean(opt.startContent) || Boolean(opt.endContent) || Boolean(opt.description));
          const popoverOpts = __spreadProps(__spreadValues({
            mode,
            event,
            alignment: "center",
            size,
            showBackdrop
          }, interfaceOptions), {
            component: "ion-select-popover",
            cssClass: [
              "select-popover",
              hasRichContent ? "select-popover-rich-content" : void 0,
              interfaceOptions.cssClass
            ],
            componentProps: {
              header: interfaceOptions.header,
              subHeader: interfaceOptions.subHeader,
              message: interfaceOptions.message,
              multiple,
              value,
              options
            }
          });
          return popoverController.create(popoverOpts);
        });
      }
      openActionSheet() {
        return __async(this, null, function* () {
          const mode = getIonMode(this);
          const interfaceOptions = this.interfaceOptions;
          const actionSheetOpts = __spreadProps(__spreadValues({
            mode
          }, interfaceOptions), {
            buttons: this.createActionSheetButtons(this.childOpts, this.value),
            cssClass: ["select-action-sheet", interfaceOptions.cssClass]
          });
          return actionSheetController.create(actionSheetOpts);
        });
      }
      openAlert() {
        return __async(this, null, function* () {
          const interfaceOptions = this.interfaceOptions;
          const inputType = this.multiple ? "checkbox" : "radio";
          const mode = getIonMode(this);
          const alertOpts = __spreadProps(__spreadValues({
            mode
          }, interfaceOptions), {
            header: interfaceOptions.header ? interfaceOptions.header : this.labelText,
            inputs: this.createAlertInputs(this.childOpts, inputType, this.value),
            buttons: [
              {
                text: this.cancelText,
                role: "cancel",
                handler: () => {
                  this.ionCancel.emit();
                }
              },
              {
                text: this.okText,
                handler: (selectedValues) => {
                  this.setValue(selectedValues);
                }
              }
            ],
            cssClass: [
              "select-alert",
              interfaceOptions.cssClass,
              this.multiple ? "multiple-select-alert" : "single-select-alert"
            ]
          });
          return alertController.create(alertOpts);
        });
      }
      openModal() {
        const { multiple, value, interfaceOptions } = this;
        const mode = getIonMode(this);
        const modalOpts = __spreadProps(__spreadValues({}, interfaceOptions), {
          mode,
          cssClass: ["select-modal", interfaceOptions.cssClass],
          component: "ion-select-modal",
          componentProps: {
            header: interfaceOptions.header,
            cancelText: this.cancelText,
            multiple,
            value,
            options: this.createOverlaySelectOptions(this.childOpts, value)
          }
        });
        return modalController.create(modalOpts);
      }
      /**
       * Close the select interface.
       */
      close() {
        if (!this.overlay) {
          return Promise.resolve(false);
        }
        return this.overlay.dismiss();
      }
      hasValue() {
        return this.getText() !== "";
      }
      get childOpts() {
        return Array.from(this.el.querySelectorAll("ion-select-option"));
      }
      /**
       * Returns any plaintext associated with
       * the label (either prop or slot).
       * Note: This will not return any custom
       * HTML. Use the `hasLabel` getter if you
       * want to know if any slotted label content
       * was passed.
       */
      get labelText() {
        const { label } = this;
        if (label !== void 0) {
          return label;
        }
        const { labelSlot } = this;
        if (labelSlot !== null) {
          return labelSlot.textContent;
        }
        return;
      }
      /**
       * Returns the text to display in the select based on the selected value.
       *
       * @param useHTML If `true`, the returned text will include any custom HTML content from the selected option. If `false`, the returned text will be plain text without any HTML. Defaults to `false`.
       * @returns The text to display in the select, either with or without HTML based on the `useHTML` parameter.
       */
      getText(useHTML = false) {
        const selectedText = this.selectedText;
        if (selectedText != null && selectedText !== "") {
          return selectedText;
        }
        return generateText(this.childOpts, this.value, this.compareWith, useHTML);
      }
      setFocus() {
        if (this.focusEl) {
          this.focusEl.focus();
        }
      }
      emitStyle() {
        const { disabled } = this;
        const style = {
          "interactive-disabled": disabled
        };
        this.ionStyle.emit(style);
      }
      /**
       * The label wrapping the slots has no `for` attribute, so the browser
       * forwards a click on slotted content to the label's first labelable
       * descendant, the internal button. That forwarded click bubbles back out of
       * the shadow root targeting the host, where it would be emitted a second
       * time and open the select. The controller swallows it during the capture
       * phase, leaving the click on the slotted content itself alone so slotted
       * links, checkboxes and buttons keep their default behavior.
       */
      onClickCapture(ev) {
        this.clickController?.handleClickCapture(ev);
      }
      renderLabel() {
        const { label } = this;
        return h("div", { class: {
          "label-text-wrapper": true,
          "label-text-wrapper-hidden": !this.hasLabel
        }, part: "label" }, label === void 0 ? h("slot", { name: "label" }) : h("div", { class: "label-text" }, label));
      }
      componentDidRender() {
        this.notchController?.calculateNotchWidth();
        this.startContainerController?.calculateStartContainerWidth();
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
        return h("div", { class: "select-outline-container" }, h("div", { class: "select-outline-start" }), h("div", { class: {
          "select-outline-notch": true,
          "select-outline-notch-hidden": !this.hasLabel
        } }, h("div", { class: "notch-spacer", "aria-hidden": "true", ref: (el) => this.notchSpacerEl = el }, this.label)), h("div", { class: "select-outline-end" }));
      }
      /**
       * Wraps text nodes in the select text with span elements
       * so spacing can be added between elements without
       * changing the display to prevent losing the ellipses
       * behavior.
       *
       * Only wraps when the string contains HTML elements
       * alongside text.
       */
      wrapSelectTextNodes(html) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        const hasElements = Array.from(temp.childNodes).some((n) => n.nodeType === Node.ELEMENT_NODE);
        if (!hasElements) {
          return html;
        }
        Array.from(temp.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const text = node.textContent;
            const commaMatch = text.match(/^(,\s*)(.*)/);
            if (commaMatch) {
              const commaNode = document.createTextNode(commaMatch[1]);
              const wrapper2 = document.createElement("span");
              wrapper2.textContent = commaMatch[2];
              node.parentNode?.replaceChild(wrapper2, node);
              wrapper2.parentNode?.insertBefore(commaNode, wrapper2);
              return;
            }
            const wrapper = document.createElement("span");
            node.parentNode?.replaceChild(wrapper, node);
            wrapper.appendChild(node);
          }
        });
        return temp.innerHTML;
      }
      /**
       * Renders either the placeholder
       * or the selected values based on
       * the state of the select.
       */
      renderSelectText() {
        const { placeholder } = this;
        const displayValue = this.getText(true);
        let addPlaceholderClass = false;
        let selectText = displayValue;
        if (selectText === "" && placeholder !== void 0) {
          selectText = placeholder;
          addPlaceholderClass = true;
        }
        const selectTextClasses = {
          "select-text": true,
          "select-placeholder": addPlaceholderClass
        };
        const textPart = addPlaceholderClass ? "placeholder" : "text";
        if (this.customHTMLEnabled) {
          const wrapped = this.wrapSelectTextNodes(selectText);
          return h("div", { "aria-hidden": "true", class: selectTextClasses, part: textPart, innerHTML: wrapped });
        }
        return h("div", { "aria-hidden": "true", class: selectTextClasses, part: textPart }, selectText);
      }
      /**
       * Renders the chevron icon
       * next to the select text.
       */
      renderSelectIcon() {
        const mode = getIonMode(this);
        const { isExpanded, toggleIcon, expandedIcon } = this;
        let icon;
        if (isExpanded && expandedIcon !== void 0) {
          icon = expandedIcon;
        } else {
          const defaultIcon = mode === "ios" ? chevronExpand : caretDownSharp;
          icon = toggleIcon ?? defaultIcon;
        }
        return h("ion-icon", { class: "select-icon", part: "icon", "aria-hidden": "true", icon });
      }
      get ariaLabel() {
        const { placeholder, inheritedAttributes } = this;
        const displayValue = this.getText();
        const definedLabel = inheritedAttributes["aria-label"] ?? this.labelText;
        let renderedLabel = displayValue;
        if (renderedLabel === "" && placeholder !== void 0) {
          renderedLabel = placeholder;
        }
        if (definedLabel !== void 0) {
          renderedLabel = renderedLabel === "" ? definedLabel : `${definedLabel}, ${renderedLabel}`;
        }
        return renderedLabel;
      }
      renderListbox() {
        const { disabled, inputId, isExpanded, required } = this;
        return h("button", { disabled, id: inputId, "aria-label": this.ariaLabel, "aria-haspopup": "dialog", "aria-expanded": `${isExpanded}`, "aria-describedby": this.hintTextId, "aria-invalid": this.isInvalid ? "true" : void 0, "aria-required": `${required}`, onFocus: this.onFocus, onBlur: this.onBlur, ref: (focusEl) => this.focusEl = focusEl });
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
       * Renders the helper text or error text values
       */
      renderHintText() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        return [
          h("div", { id: helperTextId, class: "helper-text", part: "supporting-text helper-text", "aria-live": "polite" }, !isInvalid ? helperText : null),
          h("div", { id: errorTextId, class: "error-text", part: "supporting-text error-text", role: "alert" }, isInvalid ? errorText : null)
        ];
      }
      /**
       * Responsible for rendering helper text, and error text. This element
       * should only be rendered if hint text is set.
       */
      renderBottomContent() {
        const { helperText, errorText } = this;
        const hasHintText = !!helperText || !!errorText;
        if (!hasHintText) {
          return;
        }
        return h("div", { class: "select-bottom", part: "bottom" }, this.renderHintText());
      }
      render() {
        const { disabled, el, isExpanded, expandedIcon, labelPlacement, justify, placeholder, fill, shape, name, value, hasFocus } = this;
        const mode = getIonMode(this);
        const hasFloatingOrStackedLabel = labelPlacement === "floating" || labelPlacement === "stacked";
        const justifyEnabled = !hasFloatingOrStackedLabel && justify !== void 0;
        const rtl = isRTL(el) ? "rtl" : "ltr";
        const inItem = hostContext("ion-item", this.el);
        const shouldRenderHighlight = mode === "md" && fill !== "outline" && !inItem;
        const hasValue = this.hasValue();
        const hasOutlineFill = mode === "md" && fill === "outline";
        renderHiddenInput(true, el, name, parseValue(value), disabled);
        const labelShouldFloat = labelPlacement === "stacked" || labelPlacement === "floating" && (hasValue || hasFocus || isExpanded);
        return h(Host, { key: "31585557ac49c439939b5a084867f5039dc2f1ce", onClick: this.onClick, class: createColorClasses(this.color, {
          [mode]: true,
          "in-item": inItem,
          "in-item-color": hostContext("ion-item.ion-color", el),
          "select-disabled": disabled,
          "select-expanded": isExpanded,
          "has-expanded-icon": expandedIcon !== void 0,
          "has-value": hasValue,
          "label-floating": labelShouldFloat,
          "has-placeholder": placeholder !== void 0,
          "has-focus": hasFocus,
          // TODO(FW-6451): Remove `ion-focusable` class in favor of `has-focus`.
          "ion-focusable": true,
          [`select-${rtl}`]: true,
          [`select-fill-${fill}`]: fill !== void 0,
          [`select-justify-${justify}`]: justifyEnabled,
          [`select-shape-${shape}`]: shape !== void 0,
          [`select-label-placement-${labelPlacement}`]: true
        }) }, h("label", { key: "368f5f0c77550be6a743752dd1acbfe9915f0a3d", class: "select-wrapper", id: "select-label", onClick: this.onLabelClick, part: "wrapper" }, hasOutlineFill && this.renderOutlineContainer(), h("div", { key: "2e9039eaa15f398ebe54808ff659db89d3621681", class: "select-start", part: "start", ref: (el2) => this.startContainerEl = el2 }, h("slot", { key: "b83e362f89bd8cbc564ad7122778e3a0f08be66d", name: "start" })), h("div", { key: "f55ac9fc3bbd9a4a3819a101a3780fc02ae8a8e0", class: "select-control", part: "control" }, this.renderLabel(), h("div", { key: "e32984e57cda5cf341af8e354a2aef5a114827c0", class: "native-wrapper", ref: (el2) => this.nativeWrapperEl = el2, part: "container" }, this.renderSelectText(), this.renderListbox(), !hasFloatingOrStackedLabel && this.renderSelectIcon())), h("div", { key: "fc4cb7c392c46129afe709d9557ad9a10d72b564", class: "select-end", part: "end" }, hasFloatingOrStackedLabel && this.renderSelectIcon(), h("slot", { key: "6d65c92cdafe985a769fb3b41a58625077803eef", name: "end" })), shouldRenderHighlight && h("div", { key: "9a912c64d7cd77f074a069d126cd0bada1b71eed", class: "select-highlight" })), this.renderBottomContent());
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "disabled": [{
            "styleChanged": 0
          }],
          "isExpanded": [{
            "styleChanged": 0
          }],
          "placeholder": [{
            "styleChanged": 0
          }],
          "value": [{
            "styleChanged": 0
          }]
        };
      }
    };
    getOptionValue = (el) => {
      const value = el.value;
      return value === void 0 ? el.textContent || "" : value;
    };
    parseValue = (value) => {
      if (value == null) {
        return void 0;
      }
      if (Array.isArray(value)) {
        return value.join(",");
      }
      return value.toString();
    };
    generateText = (opts, value, compareWith, useHTML = false) => {
      if (value === void 0) {
        return "";
      }
      if (Array.isArray(value)) {
        return value.map((v) => textForValue(opts, v, compareWith, useHTML)).filter((opt) => opt !== null).join(", ");
      } else {
        return textForValue(opts, value, compareWith, useHTML) || "";
      }
    };
    textForValue = (opts, value, compareWith, useHTML = false) => {
      const selectOpt = opts.find((opt) => {
        return compareOptions(value, getOptionValue(opt), compareWith);
      });
      const customHTMLEnabled = config.get("innerHTMLTemplatesEnabled", ENABLE_HTML_CONTENT_DEFAULT);
      if (!selectOpt) {
        return null;
      }
      if (customHTMLEnabled && useHTML) {
        return getOptionContent(selectOpt, void 0, true);
      }
      return getDefaultSlotPlainText(selectOpt) || null;
    };
    trimTextNodes = (node) => {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent = child.textContent?.trim() || "";
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          trimTextNodes(child);
        }
      });
    };
    getOptionContent = (option, slotName, useHTML = false) => {
      let nodes;
      if (slotName) {
        nodes = Array.from(option.children).filter((el) => el.getAttribute("slot") === slotName);
      } else {
        const defaultSlot = getOptionDefaultSlot(option) || [];
        nodes = defaultSlot.filter((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent?.trim().length !== 0;
          }
          return true;
        });
      }
      if (nodes.length === 0) {
        return null;
      }
      if (!slotName && nodes.every((n) => n.nodeType === Node.TEXT_NODE)) {
        return getDefaultSlotPlainText(option) || null;
      }
      nodes.forEach((n) => {
        if (n.nodeType === Node.ELEMENT_NODE) {
          reflectPropertiesToAttributes(n);
        }
      });
      const container = document.createElement("div");
      nodes.forEach((n) => {
        const clone = n.cloneNode(true);
        if (clone.nodeType === Node.TEXT_NODE) {
          clone.textContent = clone.textContent?.trim() || "";
        } else {
          trimTextNodes(clone);
        }
        container.appendChild(clone);
      });
      sanitizeDOMTree(container);
      if (useHTML) {
        return container.innerHTML.trim() || null;
      }
      return container;
    };
    getOptionDefaultSlot = (option) => {
      const defaultSlotNodes = Array.from(option.childNodes).filter((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          return !node.hasAttribute("slot");
        }
        return node.nodeType === Node.TEXT_NODE;
      });
      if (defaultSlotNodes.length === 0) {
        return null;
      }
      return defaultSlotNodes;
    };
    getRenderedTextContent = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent ?? "";
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return "";
      }
      if (blockedTags.includes(node.tagName.toLowerCase())) {
        return "";
      }
      return Array.from(node.childNodes).map((child) => getRenderedTextContent(child)).join("");
    };
    getDefaultSlotPlainText = (option) => {
      const text = (getOptionDefaultSlot(option) ?? []).map((node) => getRenderedTextContent(node)).join("");
      return text.replace(/[ \t\n\r\f]+/g, " ").replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
    };
    extractOptionContent = (option, customHTMLEnabled) => {
      if (!customHTMLEnabled) {
        return {
          content: getDefaultSlotPlainText(option),
          startContent: void 0,
          endContent: void 0
        };
      }
      return {
        content: getOptionContent(option),
        startContent: getOptionContent(option, "start") ?? void 0,
        endContent: getOptionContent(option, "end") ?? void 0
      };
    };
    selectIds = 0;
    OPTION_CLASS = "select-interface-option";
    INTERACTIVE_SLOTTED_CONTENT = [
      "a[href]",
      "button",
      'input[type="checkbox"]',
      'input[type="radio"]',
      "ion-button",
      "ion-checkbox",
      "ion-radio",
      "ion-toggle",
      '[tabindex]:not([tabindex^="-"])',
      /**
       * Covers the remaining Ionic controls. The tags above are still listed
       * because ion-checkbox and ion-radio only carry this class when they are
       * outside an item, so a select inside an item would lose the match.
       */
      ".ion-focusable"
    ].join(", ");
    Select.style = {
      ios: selectIosCss(),
      md: selectMdCss()
    };
    selectOptionCss = () => `:host{display:none}`;
    SelectOption = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = `ion-selopt-${selectOptionIds++}`;
        this.disabled = false;
      }
      render() {
        return h(Host, { key: "01275b5a613c4b065b24e0d939f611f6ed1fc9ee", role: "option", id: this.inputId, class: getIonMode(this) });
      }
      get el() {
        return getElement(this);
      }
    };
    selectOptionIds = 0;
    SelectOption.style = selectOptionCss();
    selectPopoverIosCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-select-popover-ios,.alert-radio-label-has-rich-content.sc-ion-select-popover-ios,.alert-checkbox-label-has-rich-content.sc-ion-select-popover-ios,.select-option-label-has-rich-content.sc-ion-select-popover-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-select-popover-ios,.alert-radio-label-has-rich-content.sc-ion-select-popover-ios,.alert-checkbox-label-has-rich-content.sc-ion-select-popover-ios,.select-option-content.sc-ion-select-popover-ios{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-select-popover-ios,.alert-checkbox-label-text.sc-ion-select-popover-ios,.alert-radio-label-text.sc-ion-select-popover-ios,.select-option-label-text.sc-ion-select-popover-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-select-popover-ios{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-select-popover-ios:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-select-popover-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-select-popover-ios::part(label),ion-radio.select-option-has-rich-content.sc-ion-select-popover-ios [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-select-popover-ios::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-select-popover-ios [part~="label"],.select-option-content.sc-ion-select-popover-ios{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-select-popover-ios>ion-avatar.sc-ion-select-popover-ios,.select-option-start.sc-ion-select-popover-ios>ion-img.sc-ion-select-popover-ios,.select-option-start.sc-ion-select-popover-ios>ion-thumbnail.sc-ion-select-popover-ios,.select-option-start.sc-ion-select-popover-ios>img.sc-ion-select-popover-ios,.select-option-start.sc-ion-select-popover-ios>svg.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios>ion-avatar.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios>ion-img.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios>ion-thumbnail.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios>img.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios>svg.sc-ion-select-popover-ios{width:44px;height:44px}.select-option-start.sc-ion-select-popover-ios>ion-icon.sc-ion-select-popover-ios,.select-option-end.sc-ion-select-popover-ios>ion-icon.sc-ion-select-popover-ios{font-size:28px}.action-sheet-button-label-text.sc-ion-select-popover-ios{-ms-flex-pack:center;justify-content:center}.select-option-has-rich-content.sc-ion-select-popover-ios{-webkit-padding-end:16px;padding-inline-end:16px}.sc-ion-select-popover-ios-h ion-list.sc-ion-select-popover-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-list-header.sc-ion-select-popover-ios,ion-label.sc-ion-select-popover-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-select-popover-ios-h{overflow-y:auto}`;
    selectPopoverMdCss = () => `.action-sheet-button-label-has-rich-content.sc-ion-select-popover-md,.alert-radio-label-has-rich-content.sc-ion-select-popover-md,.alert-checkbox-label-has-rich-content.sc-ion-select-popover-md,.select-option-label-has-rich-content.sc-ion-select-popover-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:16px}.action-sheet-button-label-has-rich-content.sc-ion-select-popover-md,.alert-radio-label-has-rich-content.sc-ion-select-popover-md,.alert-checkbox-label-has-rich-content.sc-ion-select-popover-md,.select-option-content.sc-ion-select-popover-md{-ms-flex:1;flex:1}.action-sheet-button-label-text.sc-ion-select-popover-md,.alert-checkbox-label-text.sc-ion-select-popover-md,.alert-radio-label-text.sc-ion-select-popover-md,.select-option-label-text.sc-ion-select-popover-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px}.select-option-start.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.select-option-description.sc-ion-select-popover-md{padding-left:0;padding-right:0;padding-top:5px;padding-bottom:0;display:block;color:var(--ion-color-step-700, var(--ion-text-color-step-300, #4d4d4d));font-size:0.75rem}.select-option-label.sc-ion-select-popover-md:not(.select-option-label-has-rich-content){text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-option-label-has-rich-content.sc-ion-select-popover-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}ion-radio.select-option-has-rich-content.sc-ion-select-popover-md::part(label),ion-radio.select-option-has-rich-content.sc-ion-select-popover-md [part~="label"],ion-checkbox.select-option-has-rich-content.sc-ion-select-popover-md::part(label),ion-checkbox.select-option-has-rich-content.sc-ion-select-popover-md [part~="label"],.select-option-content.sc-ion-select-popover-md{-ms-flex:1;flex:1;white-space:normal}.select-option-start.sc-ion-select-popover-md>ion-avatar.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>ion-avatar.sc-ion-select-popover-md{width:40px;height:40px}.select-option-start.sc-ion-select-popover-md>ion-icon.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>ion-icon.sc-ion-select-popover-md{font-size:24px}.select-option-start.sc-ion-select-popover-md>ion-img.sc-ion-select-popover-md,.select-option-start.sc-ion-select-popover-md>img.sc-ion-select-popover-md,.select-option-start.sc-ion-select-popover-md>svg.sc-ion-select-popover-md,.select-option-start.sc-ion-select-popover-md>ion-thumbnail.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>ion-img.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>img.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>svg.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>ion-thumbnail.sc-ion-select-popover-md{width:56px;height:56px}.select-option-start.sc-ion-select-popover-md>video.sc-ion-select-popover-md,.select-option-end.sc-ion-select-popover-md>video.sc-ion-select-popover-md{width:114px;height:56px}.sc-ion-select-popover-md-h ion-list.sc-ion-select-popover-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-list-header.sc-ion-select-popover-md,ion-label.sc-ion-select-popover-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-select-popover-md-h{overflow-y:auto}ion-list.sc-ion-select-popover-md ion-radio.sc-ion-select-popover-md::part(container),ion-list.sc-ion-select-popover-md ion-radio.sc-ion-select-popover-md [part~="container"]{display:none}ion-list.sc-ion-select-popover-md ion-radio.sc-ion-select-popover-md::part(label),ion-list.sc-ion-select-popover-md ion-radio.sc-ion-select-popover-md [part~="label"]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-item.sc-ion-select-popover-md{--inner-border-width:0}.item-radio-checked.sc-ion-select-popover-md{--background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.08);--background-focused:var(--ion-color-primary, #0054e9);--background-focused-opacity:0.2;--background-hover:var(--ion-color-primary, #0054e9);--background-hover-opacity:0.12}.item-checkbox-checked.sc-ion-select-popover-md{--background-activated:var(--ion-item-color, var(--ion-text-color, #000));--background-focused:var(--ion-item-color, var(--ion-text-color, #000));--background-hover:var(--ion-item-color, var(--ion-text-color, #000));--color:var(--ion-color-primary, #0054e9)}`;
    SelectPopover = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.pendingEnterTarget = null;
        this.options = [];
      }
      findOptionFromEvent(ev) {
        const { options } = this;
        return options.find((o) => o.value === ev.target.value);
      }
      /**
       * When an option is selected we need to get the value(s)
       * of the selected option(s) and return it in the option
       * handler
       */
      callOptionHandler(ev) {
        const option = this.findOptionFromEvent(ev);
        const values = this.getValues(ev);
        if (option?.handler) {
          safeCall(option.handler, values);
        }
      }
      /**
       * Dismisses the host popover that the `ion-select-popover`
       * is rendered within.
       */
      dismissParentPopover() {
        const popover = this.el.closest("ion-popover");
        if (popover) {
          popover.dismiss();
        }
      }
      setChecked(ev) {
        const { multiple } = this;
        const option = this.findOptionFromEvent(ev);
        if (multiple && option) {
          option.checked = ev.detail.checked;
        }
      }
      getValues(ev) {
        const { multiple, options } = this;
        if (multiple) {
          return options.filter((o) => o.checked).map((o) => o.value);
        }
        const option = this.findOptionFromEvent(ev);
        return option ? option.value : void 0;
      }
      renderOptions(options) {
        const { multiple } = this;
        switch (multiple) {
          case true:
            return this.renderCheckboxOptions(options);
          default:
            return this.renderRadioOptions(options);
        }
      }
      renderCheckboxOptions(options) {
        const mode = getIonMode(this);
        return options.map((option, index) => {
          const richOption = option;
          const hasRichContent = !!richOption.startContent || !!richOption.endContent || !!richOption.description;
          const optionLabelOptions = {
            id: `popover-option-${index}`,
            label: richOption.text,
            startContent: richOption.startContent,
            endContent: richOption.endContent,
            description: richOption.description
          };
          const defaultLabelPlacement = getOverlayLabelPlacement(mode, "checkbox");
          const defaultJustify = getOverlayLabelJustify(mode, "checkbox");
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
      renderRadioOptions(options) {
        const mode = getIonMode(this);
        const checked = options.filter((o) => o.checked).map((o) => o.value)[0];
        return h("ion-radio-group", { value: checked, onIonChange: (ev) => this.callOptionHandler(ev) }, options.map((option, index) => {
          const richOption = option;
          const hasRichContent = !!richOption.startContent || !!richOption.endContent || !!richOption.description;
          const optionLabelOptions = {
            id: `popover-option-${index}`,
            label: richOption.text,
            startContent: richOption.startContent,
            endContent: richOption.endContent,
            description: richOption.description
          };
          return h("ion-item", {
            // TODO FW-4784
            disabled: option.disabled,
            class: __spreadValues({
              // TODO FW-4784
              "item-radio-checked": option.value === checked
            }, getClassMap(option.cssClass))
          }, h("ion-radio", { class: {
            "select-option-has-rich-content": hasRichContent
          }, value: option.value, disabled: option.disabled, justify: richOption.justify ?? getOverlayLabelJustify(mode, "radio"), labelPlacement: richOption.labelPlacement ?? getOverlayLabelPlacement(mode, "radio"), onClick: () => this.dismissParentPopover(), onKeyDown: (ev) => {
            if (ev.key === "Enter" && !ev.repeat) {
              this.pendingEnterTarget = ev.currentTarget;
            }
          }, onKeyUp: (ev) => {
            if (ev.key === " ") {
              this.dismissParentPopover();
            } else if (ev.key === "Enter") {
              const shouldDismiss = this.pendingEnterTarget === ev.currentTarget;
              this.pendingEnterTarget = null;
              if (shouldDismiss) {
                this.dismissParentPopover();
              }
            }
          } }, renderOptionLabel(optionLabelOptions, "select-option-label")));
        }));
      }
      render() {
        const { header, message, options, subHeader } = this;
        const hasSubHeaderOrMessage = subHeader !== void 0 || message !== void 0;
        return h(Host, { key: "4b4ac4a4b6523147e7c1f5e29dd8043867f2baea", class: getIonMode(this) }, h("ion-list", { key: "f700d3dc3ce68c20a4d981164b29262564097fb4" }, header !== void 0 && h("ion-list-header", { key: "196bcd7963f13ef8bc46231545eee4cb8d526f5e" }, header), hasSubHeaderOrMessage && h("ion-item", { key: "bb108e0aa2409997df35f52cb67e58e55e0fd630" }, h("ion-label", { key: "59e8d9196ff976f3835766662654c0f085e58ec3", class: "ion-text-wrap" }, subHeader !== void 0 && h("h3", { key: "532f75d7c129ffadca4e6cbb619a4427aaede65c" }, subHeader), message !== void 0 && h("p", { key: "fc42c91594b9001e983cb5e4176fc4c9bff0f708" }, message))), this.renderOptions(options)));
      }
      get el() {
        return getElement(this);
      }
    };
    SelectPopover.style = {
      ios: selectPopoverIosCss(),
      md: selectPopoverMdCss()
    };
  }
});
init_ion_select_3_entry();
export {
  Select as ion_select,
  SelectOption as ion_select_option,
  SelectPopover as ion_select_popover
};
//# debugId=da33e6ce-c805-5b62-b960-fb8da20fbd5b
//# sourceMappingURL=chunk-LCVRISJM.js.map
