import {
  disableContentScrollY,
  findClosestIonContent,
  init_index_TkLga3ma,
  resetContentScrollY
} from "./chunk-57PV5QBJ.js";
import {
  clamp,
  debounceEvent,
  inheritAriaAttributes,
  init_helpers_BJqKF1pr,
  isSafeNumber,
  renderHiddenInput
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde,
  isRTL
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
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonWarning,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-range.entry.js
function getDecimalPlaces(n) {
  if (!isSafeNumber(n))
    return 0;
  if (n % 1 === 0)
    return 0;
  return n.toString().split(".")[1].length;
}
function roundToMaxDecimalPlaces(n, ...references) {
  if (!isSafeNumber(n))
    return 0;
  const maxPlaces = Math.max(...references.map((r) => getDecimalPlaces(r)));
  return Number(n.toFixed(maxPlaces));
}
var rangeIosCss, rangeMdCss, Range, renderKnob, getKnobPosition, ratioToValue, valueToRatio, rangeIds;
var init_ion_range_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-range.entry.js"() {
    init_index_BpRUsN_W();
    init_index_TkLga3ma();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    rangeIosCss = () => `:host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family, inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{top:calc((var(--height) - var(--knob-handle-size)) / 2);-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-pack:center;justify-content:center;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}.range-knob-handle{inset-inline-start:0}:host-context([dir=rtl]) .range-knob-handle{left:unset}[dir=rtl] .range-knob-handle{left:unset}@supports selector(:dir(rtl)){.range-knob-handle:dir(rtl){left:unset}}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar-container{border-radius:var(--bar-border-radius);top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height)}.range-bar-container{inset-inline-start:0}:host-context([dir=rtl]) .range-bar-container{left:unset}[dir=rtl] .range-bar-container{left:unset}@supports selector(:dir(rtl)){.range-bar-container:dir(rtl){left:unset}}.range-bar{border-radius:var(--bar-border-radius);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}.range-knob{inset-inline-start:calc(50% - var(--knob-size) / 2)}:host-context([dir=rtl]) .range-knob{left:unset}[dir=rtl] .range-knob{left:unset}@supports selector(:dir(rtl)){.range-knob:dir(rtl){left:unset}}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host([slot=start]),:host([slot=end]){width:auto}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}.range-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;height:inherit}::slotted([slot=label]){max-width:200px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center}:host(.range-label-placement-start) .range-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.range-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-end) .range-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.range-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.range-label-placement-stacked) .range-wrapper{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:stretch;align-items:stretch}:host(.range-label-placement-stacked) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top;-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host-context([dir=rtl]):host(.range-label-placement-stacked) .label-text-wrapper,:host-context([dir=rtl]).range-label-placement-stacked .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.range-label-placement-stacked:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.in-item.range-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.range-label-placement-stacked) .native-wrapper{margin-bottom:0px}:host{--knob-border-radius:50%;--knob-background:#ffffff;--knob-box-shadow:0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12);--knob-size:26px;--bar-height:4px;--bar-background:var(--ion-color-step-900, var(--ion-background-color-step-900, #e6e6e6));--bar-background-active:var(--ion-color-primary, #0054e9);--bar-border-radius:2px;--height:42px}:host(.range-item-start-adjustment){-webkit-padding-start:24px;padding-inline-start:24px}:host(.range-item-end-adjustment){-webkit-padding-end:24px;padding-inline-end:24px}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-tick-active{background:var(--ion-color-base)}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-has-pin:not(.range-label-placement-stacked)){padding-top:calc(8px + 0.75rem)}:host(.range-has-pin.range-label-placement-stacked) .label-text-wrapper{margin-bottom:calc(8px + 0.75rem)}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-bar-active.has-ticks{border-radius:0;-webkit-margin-start:-2px;margin-inline-start:-2px;-webkit-margin-end:-2px;margin-inline-end:-2px}.range-tick{-webkit-margin-start:-2px;margin-inline-start:-2px;border-radius:0;position:absolute;top:17px;width:4px;height:8px;background:var(--ion-color-step-900, var(--ion-background-color-step-900, #e6e6e6));pointer-events:none}.range-tick-active{background:var(--bar-background-active)}.range-pin{-webkit-transform:translate3d(0,  100%,  0) scale(0.01);transform:translate3d(0,  100%,  0) scale(0.01);-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;min-width:28px;-webkit-transition:-webkit-transform 120ms ease;transition:-webkit-transform 120ms ease;transition:transform 120ms ease;transition:transform 120ms ease, -webkit-transform 120ms ease;background:transparent;color:var(--ion-text-color, #000);font-size:0.75rem;text-align:center}.range-knob-pressed .range-pin,.range-knob-handle.ion-focused .range-pin{-webkit-transform:translate3d(0, calc(-100% + 11px), 0) scale(1);transform:translate3d(0, calc(-100% + 11px), 0) scale(1)}:host(.range-disabled){opacity:0.3}`;
    rangeMdCss = () => `:host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family, inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{top:calc((var(--height) - var(--knob-handle-size)) / 2);-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-pack:center;justify-content:center;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}.range-knob-handle{inset-inline-start:0}:host-context([dir=rtl]) .range-knob-handle{left:unset}[dir=rtl] .range-knob-handle{left:unset}@supports selector(:dir(rtl)){.range-knob-handle:dir(rtl){left:unset}}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar-container{border-radius:var(--bar-border-radius);top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height)}.range-bar-container{inset-inline-start:0}:host-context([dir=rtl]) .range-bar-container{left:unset}[dir=rtl] .range-bar-container{left:unset}@supports selector(:dir(rtl)){.range-bar-container:dir(rtl){left:unset}}.range-bar{border-radius:var(--bar-border-radius);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}.range-knob{inset-inline-start:calc(50% - var(--knob-size) / 2)}:host-context([dir=rtl]) .range-knob{left:unset}[dir=rtl] .range-knob{left:unset}@supports selector(:dir(rtl)){.range-knob:dir(rtl){left:unset}}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host([slot=start]),:host([slot=end]){width:auto}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}.range-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;height:inherit}::slotted([slot=label]){max-width:200px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.label-text-wrapper-hidden{display:none}.native-wrapper{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center}:host(.range-label-placement-start) .range-wrapper{-ms-flex-direction:row;flex-direction:row}:host(.range-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-end) .range-wrapper{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.range-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.range-label-placement-fixed) .label-text-wrapper{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.range-label-placement-stacked) .range-wrapper{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:stretch;align-items:stretch}:host(.range-label-placement-stacked) .label-text-wrapper{-webkit-transform-origin:left top;transform-origin:left top;-webkit-transform:scale(0.75);transform:scale(0.75);margin-left:0;margin-right:0;margin-bottom:16px;max-width:calc(100% / 0.75)}:host-context([dir=rtl]):host(.range-label-placement-stacked) .label-text-wrapper,:host-context([dir=rtl]).range-label-placement-stacked .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){:host(.range-label-placement-stacked:dir(rtl)) .label-text-wrapper{-webkit-transform-origin:right top;transform-origin:right top}}:host(.in-item.range-label-placement-stacked) .label-text-wrapper{margin-top:10px;margin-bottom:16px}:host(.in-item.range-label-placement-stacked) .native-wrapper{margin-bottom:0px}:host{--knob-border-radius:50%;--knob-background:var(--bar-background-active);--knob-box-shadow:none;--knob-size:18px;--bar-height:2px;--bar-background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.26);--bar-background-active:var(--ion-color-primary, #0054e9);--bar-border-radius:0;--height:42px;--pin-background:var(--ion-color-primary, #0054e9);--pin-color:var(--ion-color-primary-contrast, #fff)}::slotted(:not(ion-icon)[slot=start]),::slotted(:not(ion-icon)[slot=end]),.native-wrapper{font-size:0.75rem}:host(.range-item-start-adjustment){-webkit-padding-start:18px;padding-inline-start:18px}:host(.range-item-end-adjustment){-webkit-padding-end:18px;padding-inline-end:18px}:host(.ion-color) .range-bar{background:rgba(var(--ion-color-base-rgb), 0.26)}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-knob,:host(.ion-color) .range-knob::before,:host(.ion-color) .range-pin,:host(.ion-color) .range-pin::before,:host(.ion-color) .range-tick{background:var(--ion-color-base);color:var(--ion-color-contrast)}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:14px;margin-inline-end:14px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.range-has-pin:not(.range-label-placement-stacked)){padding-top:1.75rem}:host(.range-has-pin.range-label-placement-stacked) .label-text-wrapper{margin-bottom:1.75rem}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-knob{-webkit-transform:scale(0.67);transform:scale(0.67);-webkit-transition-duration:120ms;transition-duration:120ms;-webkit-transition-property:background-color, border, -webkit-transform;transition-property:background-color, border, -webkit-transform;transition-property:transform, background-color, border;transition-property:transform, background-color, border, -webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease;z-index:2}.range-knob::before{border-radius:50%;position:absolute;width:var(--knob-size);height:var(--knob-size);-webkit-transform:scale(1);transform:scale(1);-webkit-transition:0.267s cubic-bezier(0, 0, 0.58, 1);transition:0.267s cubic-bezier(0, 0, 0.58, 1);background:var(--knob-background);content:"";opacity:0.13;pointer-events:none}.range-knob::before{inset-inline-start:0}.range-tick{position:absolute;top:calc((var(--height) - var(--bar-height)) / 2);width:var(--bar-height);height:var(--bar-height);background:var(--bar-background-active);z-index:1;pointer-events:none}.range-tick-active{background:transparent}.range-pin{padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;border-radius:50%;-webkit-transform:translate3d(0,  0,  0) scale(0.01);transform:translate3d(0,  0,  0) scale(0.01);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:1.75rem;height:1.75rem;-webkit-transition:background 120ms ease, -webkit-transform 120ms ease;transition:background 120ms ease, -webkit-transform 120ms ease;transition:transform 120ms ease, background 120ms ease;transition:transform 120ms ease, background 120ms ease, -webkit-transform 120ms ease;background:var(--pin-background);color:var(--pin-color)}.range-pin::before{bottom:-1px;-webkit-margin-start:-13px;margin-inline-start:-13px;border-radius:50% 50% 50% 0;position:absolute;width:26px;height:26px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition:background 120ms ease;transition:background 120ms ease;background:var(--pin-background);content:"";z-index:-1}.range-pin::before{inset-inline-start:50%}:host-context([dir=rtl]) .range-pin::before{left:unset}[dir=rtl] .range-pin::before{left:unset}@supports selector(:dir(rtl)){.range-pin::before:dir(rtl){left:unset}}.range-knob-pressed .range-pin,.range-knob-handle.ion-focused .range-pin{-webkit-transform:translate3d(0, calc(-100% + 4px), 0) scale(1);transform:translate3d(0, calc(-100% + 4px), 0) scale(1)}@media (any-hover: hover){.range-knob-handle:hover .range-knob:before{-webkit-transform:scale(2);transform:scale(2);opacity:0.13}}.range-knob-handle.ion-activated .range-knob:before,.range-knob-handle.ion-focused .range-knob:before,.range-knob-handle.range-knob-pressed .range-knob:before{-webkit-transform:scale(2);transform:scale(2)}.range-knob-handle.ion-focused .range-knob::before{opacity:0.13}.range-knob-handle.ion-activated .range-knob::before,.range-knob-handle.range-knob-pressed .range-knob::before{opacity:0.25}:host(:not(.range-has-pin)) .range-knob-pressed .range-knob,:host(:not(.range-has-pin)) .range-knob-handle.ion-focused .range-knob{-webkit-transform:scale(1);transform:scale(1)}:host(.range-disabled) .range-bar-active,:host(.range-disabled) .range-bar,:host(.range-disabled) .range-tick{background-color:var(--ion-color-step-250, var(--ion-background-color-step-250, #bfbfbf))}:host(.range-disabled) .range-knob{-webkit-transform:scale(0.55);transform:scale(0.55);outline:5px solid #fff;background-color:var(--ion-color-step-250, var(--ion-background-color-step-250, #bfbfbf))}:host(.range-disabled) .label-text-wrapper,:host(.range-disabled) ::slotted([slot=start]),:host(.range-disabled) ::slotted([slot=end]){opacity:0.38}`;
    Range = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionInput = createEvent(this, "ionInput", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionKnobMoveStart = createEvent(this, "ionKnobMoveStart", 7);
        this.ionKnobMoveEnd = createEvent(this, "ionKnobMoveEnd", 7);
        this.rangeId = `ion-r-${rangeIds++}`;
        this.didLoad = false;
        this.noUpdate = false;
        this.hasFocus = false;
        this.inheritedAttributes = {};
        this.contentEl = null;
        this.initialContentScrollY = true;
        this.focusFromPointer = false;
        this.ratioA = 0;
        this.ratioB = 0;
        this.name = this.rangeId;
        this.dualKnobs = false;
        this.min = 0;
        this.max = 100;
        this.pin = false;
        this.pinFormatter = (value) => Math.round(value);
        this.snaps = false;
        this.step = 1;
        this.ticks = true;
        this.disabled = false;
        this.value = 0;
        this.compareValues = (newVal, oldVal) => {
          if (typeof newVal === "object" && typeof oldVal === "object") {
            return newVal.lower !== oldVal.lower || newVal.upper !== oldVal.upper;
          }
          return newVal !== oldVal;
        };
        this.clampBounds = (value) => {
          return clamp(this.min, value, this.max);
        };
        this.ensureValueInBounds = (value) => {
          if (this.dualKnobs) {
            return {
              lower: this.clampBounds(value.lower),
              upper: this.clampBounds(value.upper)
            };
          } else {
            return this.clampBounds(value);
          }
        };
        this.labelPlacement = "start";
        this.setupGesture = () => __async(this, null, function* () {
          const rangeSlider = this.rangeSlider;
          if (rangeSlider) {
            this.gesture = (yield import("./chunk-YHTSP4B3.js")).createGesture({
              el: rangeSlider,
              gestureName: "range",
              gesturePriority: 100,
              /**
               * Provide a threshold since the drag movement
               * might be a user scrolling the view.
               * If this is true, then the range
               * should not move.
               */
              threshold: 10,
              onStart: () => this.onStart(),
              onMove: (ev) => this.onMove(ev),
              onEnd: (ev) => this.onEnd(ev)
            });
            this.gesture.enable(!this.disabled);
          }
        });
        this.setupActivatedObserver = () => {
          const knobHandleA = this.el.shadowRoot.querySelector(".range-knob-handle-a");
          const knobHandleB = this.el.shadowRoot.querySelector(".range-knob-handle-b");
          const syncActivated = () => {
            this.activatedKnob = knobHandleA?.classList.contains("ion-activated") ? "A" : knobHandleB?.classList.contains("ion-activated") ? "B" : void 0;
          };
          if (typeof MutationObserver !== "undefined") {
            this.activatedObserver = new MutationObserver(syncActivated);
            this.activatedObserver.observe(this.el.shadowRoot, {
              attributes: true,
              attributeFilter: ["class"],
              subtree: true
            });
          }
          syncActivated();
        };
        this.handleKeyboard = (knob, isIncrease) => {
          const { ensureValueInBounds } = this;
          let step = this.step;
          step = step > 0 ? step : 1;
          step = step / (this.max - this.min);
          if (!isIncrease) {
            step *= -1;
          }
          if (knob === "A") {
            this.ratioA = clamp(0, this.ratioA + step, 1);
          } else {
            this.ratioB = clamp(0, this.ratioB + step, 1);
          }
          this.ionKnobMoveStart.emit({ value: ensureValueInBounds(this.value) });
          this.updateValue();
          this.emitValueChange();
          this.ionKnobMoveEnd.emit({ value: ensureValueInBounds(this.value) });
        };
        this.onBlur = () => {
          if (this.hasFocus) {
            this.hasFocus = false;
            this.focusedKnob = void 0;
            this.ionBlur.emit();
          }
        };
        this.onFocus = () => {
          if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
          }
        };
        this.onKnobFocus = (knob) => {
          if (!this.focusFromPointer) {
            this.focusedKnob = knob;
          } else {
            this.focusFromPointer = false;
            this.focusedKnob = void 0;
          }
          if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
          }
        };
        this.onKnobBlur = () => {
          setTimeout(() => {
            const activeElement = this.el.shadowRoot?.activeElement;
            const isStillFocusedOnKnob = activeElement && activeElement.classList.contains("range-knob-handle");
            if (!isStillFocusedOnKnob) {
              if (this.hasFocus) {
                this.hasFocus = false;
                this.focusedKnob = void 0;
                this.ionBlur.emit();
              }
            }
          }, 0);
        };
        this.onKnobMouseEnter = (knob) => {
          this.hoveredKnob = knob;
        };
        this.onKnobMouseLeave = () => {
          this.hoveredKnob = void 0;
        };
      }
      debounceChanged() {
        const { ionInput, debounce, originalIonInput } = this;
        this.ionInput = debounce === void 0 ? originalIonInput ?? ionInput : debounceEvent(ionInput, debounce);
      }
      dualKnobsChanged() {
        if (!this.noUpdate) {
          this.updateRatio();
        }
      }
      minChanged(newValue) {
        if (!isSafeNumber(newValue)) {
          this.min = 0;
        }
        if (!this.noUpdate) {
          this.updateRatio();
        }
      }
      maxChanged(newValue) {
        if (!isSafeNumber(newValue)) {
          this.max = 100;
        }
        if (!this.noUpdate) {
          this.updateRatio();
        }
      }
      stepChanged(newValue) {
        if (!isSafeNumber(newValue)) {
          this.step = 1;
        }
      }
      activeBarStartChanged() {
        const { activeBarStart } = this;
        if (activeBarStart !== void 0) {
          if (activeBarStart > this.max) {
            printIonWarning(`[ion-range] - The value of activeBarStart (${activeBarStart}) is greater than the max (${this.max}). Valid values are greater than or equal to the min value and less than or equal to the max value.`, this.el);
            this.activeBarStart = this.max;
          } else if (activeBarStart < this.min) {
            printIonWarning(`[ion-range] - The value of activeBarStart (${activeBarStart}) is less than the min (${this.min}). Valid values are greater than or equal to the min value and less than or equal to the max value.`, this.el);
            this.activeBarStart = this.min;
          }
        }
      }
      disabledChanged() {
        if (this.gesture) {
          this.gesture.enable(!this.disabled);
        }
      }
      valueChanged(newValue, oldValue) {
        const valuesChanged = this.compareValues(newValue, oldValue);
        if (valuesChanged) {
          this.ionInput.emit({ value: this.value });
        }
        if (!this.noUpdate) {
          this.updateRatio();
        }
      }
      componentWillLoad() {
        if (this.el.hasAttribute("id")) {
          this.rangeId = this.el.getAttribute("id");
        }
        this.inheritedAttributes = inheritAriaAttributes(this.el);
        this.min = isSafeNumber(this.min) ? this.min : 0;
        this.max = isSafeNumber(this.max) ? this.max : 100;
        this.step = isSafeNumber(this.step) ? this.step : 1;
      }
      componentDidLoad() {
        this.originalIonInput = this.ionInput;
        this.setupGesture();
        this.updateRatio();
        this.setupActivatedObserver();
        this.didLoad = true;
      }
      connectedCallback() {
        this.updateRatio();
        this.debounceChanged();
        this.disabledChanged();
        this.activeBarStartChanged();
        if (this.didLoad) {
          this.setupGesture();
          this.setupActivatedObserver();
        }
        const ionContent = findClosestIonContent(this.el);
        this.contentEl = ionContent?.querySelector(".ion-content-scroll-host") ?? ionContent;
      }
      disconnectedCallback() {
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
        if (this.activatedObserver) {
          this.activatedObserver.disconnect();
          this.activatedObserver = void 0;
        }
      }
      getValue() {
        const value = this.value ?? 0;
        if (this.dualKnobs) {
          if (typeof value === "object") {
            return value;
          }
          return {
            lower: 0,
            upper: value
          };
        } else {
          if (typeof value === "object") {
            return value.upper;
          }
          return value;
        }
      }
      /**
       * Emits an `ionChange` event.
       *
       * This API should be called for user committed changes.
       * This API should not be used for external value changes.
       */
      emitValueChange() {
        this.value = this.ensureValueInBounds(this.value);
        this.ionChange.emit({ value: this.value });
      }
      /**
       * The value should be updated on touch end or
       * when the component is being dragged.
       * This follows the native behavior of mobile devices.
       *
       * For example: When the user lifts their finger from the
       * screen after tapping the bar or dragging the bar or knob.
       */
      onStart() {
        this.ionKnobMoveStart.emit({ value: this.ensureValueInBounds(this.value) });
      }
      /**
       * The value should be updated while dragging the
       * bar or knob.
       *
       * While the user is dragging, the view
       * should not scroll. This is to prevent the user from
       * feeling disoriented while dragging.
       *
       * The user can scroll on the view if the knob or
       * bar is not being dragged.
       *
       * @param detail The details of the gesture event.
       */
      onMove(detail) {
        const { contentEl, pressedKnob } = this;
        const currentX = detail.currentX;
        if (contentEl && this.pressedKnob === void 0) {
          this.initialContentScrollY = disableContentScrollY(contentEl);
        }
        if (pressedKnob === void 0) {
          this.setPressedKnob(currentX);
        }
        this.update(currentX);
      }
      /**
       * The value should be updated on touch end:
       * - When the user lifts their finger from the screen after
       * tapping the bar.
       *
       * @param detail The details of the gesture or mouse event.
       */
      onEnd(detail) {
        const { contentEl, initialContentScrollY } = this;
        const currentX = detail.currentX ?? detail.clientX;
        if (this.pressedKnob === void 0) {
          this.setPressedKnob(currentX);
        }
        if (contentEl && this.pressedKnob !== void 0) {
          resetContentScrollY(contentEl, initialContentScrollY);
        }
        this.update(currentX);
        this.pressedKnob = void 0;
        this.emitValueChange();
        this.ionKnobMoveEnd.emit({ value: this.ensureValueInBounds(this.value) });
      }
      update(currentX) {
        const rect = this.rect;
        let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        if (isRTL(this.el)) {
          ratio = 1 - ratio;
        }
        if (this.snaps) {
          ratio = valueToRatio(ratioToValue(ratio, this.min, this.max, this.step), this.min, this.max);
        }
        if (this.pressedKnob === "A") {
          this.ratioA = ratio;
        } else {
          this.ratioB = ratio;
        }
        this.updateValue();
      }
      setPressedKnob(currentX) {
        const rect = this.rect = this.rangeSlider.getBoundingClientRect();
        let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        if (isRTL(this.el)) {
          ratio = 1 - ratio;
        }
        this.pressedKnob = !this.dualKnobs || Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio) ? "A" : "B";
      }
      get valA() {
        return ratioToValue(this.ratioA, this.min, this.max, this.step);
      }
      get valB() {
        return ratioToValue(this.ratioB, this.min, this.max, this.step);
      }
      get ratioLower() {
        if (this.dualKnobs) {
          return Math.min(this.ratioA, this.ratioB);
        }
        const { activeBarStart } = this;
        if (activeBarStart == null) {
          return 0;
        }
        return valueToRatio(activeBarStart, this.min, this.max);
      }
      get ratioUpper() {
        if (this.dualKnobs) {
          return Math.max(this.ratioA, this.ratioB);
        }
        return this.ratioA;
      }
      updateRatio() {
        const value = this.getValue();
        const { min, max } = this;
        if (this.dualKnobs) {
          const lowerRatio = valueToRatio(value.lower, min, max);
          const upperRatio = valueToRatio(value.upper, min, max);
          if (Math.abs(this.ratioA - lowerRatio) + Math.abs(this.ratioB - upperRatio) <= Math.abs(this.ratioA - upperRatio) + Math.abs(this.ratioB - lowerRatio)) {
            this.ratioA = lowerRatio;
            this.ratioB = upperRatio;
          } else {
            this.ratioA = upperRatio;
            this.ratioB = lowerRatio;
          }
        } else {
          this.ratioA = valueToRatio(value, min, max);
        }
      }
      updateValue() {
        this.noUpdate = true;
        const { valA, valB } = this;
        this.value = !this.dualKnobs ? valA : {
          lower: Math.min(valA, valB),
          upper: Math.max(valA, valB)
        };
        this.noUpdate = false;
      }
      /**
       * Returns true if content was passed to the "start" slot
       */
      get hasStartSlotContent() {
        return this.el.querySelector('[slot="start"]') !== null;
      }
      /**
       * Returns true if content was passed to the "end" slot
       */
      get hasEndSlotContent() {
        return this.el.querySelector('[slot="end"]') !== null;
      }
      get hasLabel() {
        return this.label !== void 0 || this.el.querySelector('[slot="label"]') !== null;
      }
      renderRangeSlider() {
        const { min, max, step, handleKeyboard, activatedKnob, focusedKnob, hoveredKnob, pressedKnob, disabled, pin, ratioLower, ratioUpper, pinFormatter, inheritedAttributes } = this;
        let barStart = `${ratioLower * 100}%`;
        let barEnd = `${100 - ratioUpper * 100}%`;
        const rtl = isRTL(this.el);
        const start = rtl ? "right" : "left";
        const end = rtl ? "left" : "right";
        const tickStyle = (tick) => {
          return {
            [start]: tick[start]
          };
        };
        if (this.dualKnobs === false) {
          if (this.valA < (this.activeBarStart ?? this.min)) {
            barStart = `${ratioUpper * 100}%`;
            barEnd = `${100 - ratioLower * 100}%`;
          } else {
            barStart = `${ratioLower * 100}%`;
            barEnd = `${100 - ratioUpper * 100}%`;
          }
        }
        const barStyle = {
          [start]: barStart,
          [end]: barEnd
        };
        const ticks = [];
        if (this.snaps && this.ticks) {
          for (let value = min; value <= max; value += step) {
            const ratio = valueToRatio(value, min, max);
            const ratioMin = Math.min(ratioLower, ratioUpper);
            const ratioMax = Math.max(ratioLower, ratioUpper);
            const tick = {
              ratio,
              /**
               * Sets the tick mark as active when the tick is between the min bounds and the knob.
               * When using activeBarStart, the tick mark will be active between the knob and activeBarStart.
               */
              active: ratio >= ratioMin && ratio <= ratioMax
            };
            tick[start] = `${ratio * 100}%`;
            ticks.push(tick);
          }
        }
        return h("div", {
          class: "range-slider",
          ref: (rangeEl) => this.rangeSlider = rangeEl,
          onPointerDown: () => {
            this.focusFromPointer = true;
          },
          /**
           * Since the gesture has a threshold, the value
           * won't change until the user has dragged past
           * the threshold. This is to prevent the range
           * from moving when the user is scrolling.
           *
           * This results in the value not being updated
           * and the event emitters not being triggered
           * if the user taps on the range. This is why
           * we need to listen for the "pointerUp" event.
           */
          onPointerUp: (ev) => {
            this.focusFromPointer = false;
            if (this.pressedKnob === void 0) {
              this.onStart();
              this.onEnd(ev);
            }
          }
        }, ticks.map((tick) => h("div", { style: tickStyle(tick), role: "presentation", class: {
          "range-tick": true,
          "range-tick-active": tick.active
        }, part: tick.active ? "tick-active" : "tick" })), h("div", { class: "range-bar-container" }, h("div", { class: "range-bar", role: "presentation", part: "bar" }), h("div", { class: {
          "range-bar": true,
          "range-bar-active": true,
          "has-ticks": ticks.length > 0
        }, role: "presentation", style: barStyle, part: "bar-active" })), renderKnob(rtl, {
          knob: "A",
          position: getKnobPosition("A", this.ratioA, this.ratioB, this.dualKnobs),
          dualKnobs: this.dualKnobs,
          activated: activatedKnob === "A",
          focused: focusedKnob === "A",
          hovered: hoveredKnob === "A",
          pressed: pressedKnob === "A",
          value: this.valA,
          ratio: this.ratioA,
          pin,
          pinFormatter,
          disabled,
          handleKeyboard,
          min,
          max,
          inheritedAttributes,
          onKnobFocus: this.onKnobFocus,
          onKnobBlur: this.onKnobBlur,
          onKnobMouseEnter: this.onKnobMouseEnter,
          onKnobMouseLeave: this.onKnobMouseLeave
        }), this.dualKnobs && renderKnob(rtl, {
          knob: "B",
          position: getKnobPosition("B", this.ratioA, this.ratioB, this.dualKnobs),
          dualKnobs: this.dualKnobs,
          activated: activatedKnob === "B",
          focused: focusedKnob === "B",
          hovered: hoveredKnob === "B",
          pressed: pressedKnob === "B",
          value: this.valB,
          ratio: this.ratioB,
          pin,
          pinFormatter,
          disabled,
          handleKeyboard,
          min,
          max,
          inheritedAttributes,
          onKnobFocus: this.onKnobFocus,
          onKnobBlur: this.onKnobBlur,
          onKnobMouseEnter: this.onKnobMouseEnter,
          onKnobMouseLeave: this.onKnobMouseLeave
        }));
      }
      render() {
        const { disabled, el, hasLabel, rangeId, pin, pressedKnob, labelPlacement, label, dualKnobs, min, max } = this;
        const inItem = hostContext("ion-item", el);
        const hasStartContent = hasLabel && (labelPlacement === "start" || labelPlacement === "fixed") || this.hasStartSlotContent;
        const needsStartAdjustment = inItem && !hasStartContent;
        const hasEndContent = hasLabel && labelPlacement === "end" || this.hasEndSlotContent;
        const needsEndAdjustment = inItem && !hasEndContent;
        const mode = getIonMode(this);
        const pressedKnobName = dualKnobs ? pressedKnob?.toLowerCase() : void 0;
        const pressedKnobPosition = dualKnobs && pressedKnob ? getKnobPosition(pressedKnob, this.ratioA, this.ratioB, dualKnobs) : void 0;
        const valueAtMin = dualKnobs ? this.valA === min || this.valB === min : this.valA === min;
        const valueAtMax = dualKnobs ? this.valA === max || this.valB === max : this.valA === max;
        renderHiddenInput(true, el, this.name, JSON.stringify(this.getValue()), disabled);
        return h(Host, { key: "72f253ee1514b4c5874a6720c2f954fae7a7c4d4", onFocusin: this.onFocus, onFocusout: this.onBlur, id: rangeId, class: createColorClasses(this.color, {
          [mode]: true,
          "in-item": inItem,
          "range-disabled": disabled,
          "range-dual-knobs": dualKnobs,
          "range-pressed": pressedKnob !== void 0,
          [`range-pressed-${pressedKnobName}`]: pressedKnob !== void 0 && pressedKnobName !== void 0,
          [`range-pressed-${pressedKnobPosition}`]: pressedKnob !== void 0 && pressedKnobPosition !== void 0,
          "range-has-pin": pin,
          [`range-label-placement-${labelPlacement}`]: true,
          "range-item-start-adjustment": needsStartAdjustment,
          "range-item-end-adjustment": needsEndAdjustment,
          "range-value-min": valueAtMin,
          "range-value-max": valueAtMax
        }) }, h("label", { key: "9b96b83a6118ee2a79d8adbb0a58197470308179", class: "range-wrapper", id: "range-label" }, h("div", { key: "c7b31a7c87c20857a26624bd94501df6420fceec", class: {
          "label-text-wrapper": true,
          "label-text-wrapper-hidden": !hasLabel
        }, part: "label" }, label !== void 0 ? h("div", { class: "label-text" }, label) : h("slot", { name: "label" })), h("div", { key: "4ca15b9370097e140550489ff24979f3a959e65b", class: "native-wrapper" }, h("slot", { key: "f110896c68741bad92239f98b6028cbe0ad5122f", name: "start" }), this.renderRangeSlider(), h("slot", { key: "5c4031c4403fa643ee2e11637b2420ddd8cbc4ce", name: "end" }))));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "debounce": [{
            "debounceChanged": 0
          }],
          "dualKnobs": [{
            "dualKnobsChanged": 0
          }],
          "min": [{
            "minChanged": 0
          }],
          "max": [{
            "maxChanged": 0
          }],
          "step": [{
            "stepChanged": 0
          }],
          "activeBarStart": [{
            "activeBarStartChanged": 0
          }],
          "disabled": [{
            "disabledChanged": 0
          }],
          "value": [{
            "valueChanged": 0
          }]
        };
      }
    };
    renderKnob = (rtl, { knob, position, dualKnobs, value, ratio, min, max, disabled, activated, focused, hovered, pressed, pin, handleKeyboard, pinFormatter, inheritedAttributes, onKnobFocus, onKnobBlur, onKnobMouseEnter, onKnobMouseLeave }) => {
      const start = rtl ? "right" : "left";
      const knobStyle = () => {
        const style = {};
        style[start] = `${ratio * 100}%`;
        return style;
      };
      const ariaLabel = inheritedAttributes["aria-label"];
      return h("div", { onKeyDown: (ev) => {
        const key = ev.key;
        if (key === "ArrowLeft" || key === "ArrowDown") {
          handleKeyboard(knob, false);
          ev.preventDefault();
          ev.stopPropagation();
        } else if (key === "ArrowRight" || key === "ArrowUp") {
          handleKeyboard(knob, true);
          ev.preventDefault();
          ev.stopPropagation();
        }
      }, onFocus: () => onKnobFocus(knob), onBlur: onKnobBlur, onMouseEnter: () => onKnobMouseEnter(knob), onMouseLeave: onKnobMouseLeave, class: {
        "range-knob-handle": true,
        "range-knob-handle-a": knob === "A",
        "range-knob-handle-b": knob === "B",
        "range-knob-pressed": pressed,
        "range-knob-min": value === min,
        "range-knob-max": value === max,
        "ion-activatable": true,
        "ion-focusable": true,
        "ion-focused": focused
      }, part: [
        "knob-handle",
        dualKnobs && knob === "A" && "knob-handle-a",
        dualKnobs && knob === "B" && "knob-handle-b",
        dualKnobs && position === "lower" && "knob-handle-lower",
        dualKnobs && position === "upper" && "knob-handle-upper",
        pressed && "pressed",
        focused && "focused",
        hovered && "hover",
        activated && "activated"
      ].filter(Boolean).join(" "), style: knobStyle(), role: "slider", tabindex: disabled ? -1 : 0, "aria-label": ariaLabel !== void 0 ? ariaLabel : null, "aria-labelledby": ariaLabel === void 0 ? "range-label" : null, "aria-valuemin": min, "aria-valuemax": max, "aria-disabled": disabled ? "true" : null, "aria-valuenow": value }, pin && h("div", { class: "range-pin", role: "presentation", part: [
        "pin",
        dualKnobs && knob === "A" && "pin-a",
        dualKnobs && knob === "B" && "pin-b",
        dualKnobs && position === "lower" && "pin-lower",
        dualKnobs && position === "upper" && "pin-upper",
        pressed && "pressed",
        focused && "focused",
        hovered && "hover",
        activated && "activated"
      ].filter(Boolean).join(" ") }, pinFormatter(value)), h("div", { class: "range-knob", role: "presentation", part: [
        "knob",
        dualKnobs && knob === "A" && "knob-a",
        dualKnobs && knob === "B" && "knob-b",
        dualKnobs && position === "lower" && "knob-lower",
        dualKnobs && position === "upper" && "knob-upper",
        pressed && "pressed",
        focused && "focused",
        hovered && "hover",
        activated && "activated"
      ].filter(Boolean).join(" ") }));
    };
    getKnobPosition = (knob, ratioA, ratioB, dualKnobs) => {
      if (!dualKnobs) {
        return "lower";
      }
      if (ratioA === ratioB) {
        return knob === "A" ? "lower" : "upper";
      }
      if (knob === "A") {
        return ratioA < ratioB ? "lower" : "upper";
      }
      return ratioB < ratioA ? "lower" : "upper";
    };
    ratioToValue = (ratio, min, max, step) => {
      let value = (max - min) * ratio;
      if (step > 0) {
        value = Math.round(value / step) * step + min;
      }
      const clampedValue = clamp(min, value, max);
      return roundToMaxDecimalPlaces(clampedValue, min, max, step);
    };
    valueToRatio = (value, min, max) => {
      return clamp(0, (value - min) / (max - min), 1);
    };
    rangeIds = 0;
    Range.style = {
      ios: rangeIosCss(),
      md: rangeMdCss()
    };
  }
});
init_ion_range_entry();
export {
  Range as ion_range
};
//# debugId=04416a8c-58c3-5b60-81ef-1e2c0b0d1c78
//# sourceMappingURL=chunk-GIGNLK6G.js.map
