import {
  getHourCycle,
  getLocalizedDateTime,
  getLocalizedTime,
  init_format_Ck1cw5z7,
  parseDate
} from "./chunk-F3PJBULH.js";
import {
  addEventListener,
  componentOnReady,
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
  printIonError,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-datetime-button.entry.js
var datetimeButtonIosCss, datetimeButtonMdCss, DatetimeButton;
var init_ion_datetime_button_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-datetime-button.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_format_Ck1cw5z7();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    datetimeButtonIosCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}:host button{border-radius:8px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:0px;margin-bottom:0px;position:relative;-webkit-transition:150ms color ease-in-out;transition:150ms color ease-in-out;border:none;background:var(--ion-color-step-300, var(--ion-background-color-step-300, #edeef0));color:var(--ion-text-color, #000);font-family:inherit;font-size:1rem;cursor:pointer;overflow:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host(.time-active) #time-button,:host(.date-active) #date-button{color:var(--ion-color-primary, #0054e9)}:host(.ion-color.time-active) #time-button,:host(.ion-color.date-active) #date-button{color:var(--ion-color-base)}:host(.datetime-button-disabled){pointer-events:none}:host(.datetime-button-disabled) button{opacity:0.4}:host button{-webkit-padding-start:13px;padding-inline-start:13px;-webkit-padding-end:13px;padding-inline-end:13px;padding-top:7px;padding-bottom:7px}:host button.ion-activated{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}`;
    datetimeButtonMdCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}:host button{border-radius:8px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:0px;margin-bottom:0px;position:relative;-webkit-transition:150ms color ease-in-out;transition:150ms color ease-in-out;border:none;background:var(--ion-color-step-300, var(--ion-background-color-step-300, #edeef0));color:var(--ion-text-color, #000);font-family:inherit;font-size:1rem;cursor:pointer;overflow:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host(.time-active) #time-button,:host(.date-active) #date-button{color:var(--ion-color-primary, #0054e9)}:host(.ion-color.time-active) #time-button,:host(.ion-color.date-active) #date-button{color:var(--ion-color-base)}:host(.datetime-button-disabled){pointer-events:none}:host(.datetime-button-disabled) button{opacity:0.4}:host button{-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px}`;
    DatetimeButton = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.datetimeEl = null;
        this.overlayEl = null;
        this.datetimePresentation = "date-time";
        this.datetimeActive = false;
        this.disabled = false;
        this.getParsedDateValues = (value) => {
          if (value === void 0 || value === null) {
            return [];
          }
          if (Array.isArray(value)) {
            return value;
          }
          return [value];
        };
        this.setDateTimeText = () => __async(this, null, function* () {
          const { datetimeEl, datetimePresentation } = this;
          if (!datetimeEl) {
            return;
          }
          const { value, locale, formatOptions, hourCycle, preferWheel, multiple, titleSelectedDatesFormatter } = datetimeEl;
          const parsedValues = this.getParsedDateValues(value);
          const parsedDatetimes = parsedValues.length > 0 ? parseDate(parsedValues) : [yield datetimeEl.getDefaultPart()];
          if (!parsedDatetimes) {
            return;
          }
          const firstParsedDatetime = parsedDatetimes[0];
          const computedHourCycle = getHourCycle(locale, hourCycle);
          this.dateText = this.timeText = void 0;
          switch (datetimePresentation) {
            case "date-time":
            case "time-date":
              const dateText = getLocalizedDateTime(locale, firstParsedDatetime, formatOptions?.date ?? { month: "short", day: "numeric", year: "numeric" });
              const timeText = getLocalizedTime(locale, firstParsedDatetime, computedHourCycle, formatOptions?.time);
              if (preferWheel) {
                this.dateText = `${dateText} ${timeText}`;
              } else {
                this.dateText = dateText;
                this.timeText = timeText;
              }
              break;
            case "date":
              if (multiple && parsedValues.length !== 1) {
                let headerText = `${parsedValues.length} days`;
                if (titleSelectedDatesFormatter !== void 0) {
                  try {
                    headerText = titleSelectedDatesFormatter(parsedValues);
                  } catch (e) {
                    printIonError("[ion-datetime-button] - Exception in provided `titleSelectedDatesFormatter`:", e);
                  }
                }
                this.dateText = headerText;
              } else {
                this.dateText = getLocalizedDateTime(locale, firstParsedDatetime, formatOptions?.date ?? { month: "short", day: "numeric", year: "numeric" });
              }
              break;
            case "time":
              this.timeText = getLocalizedTime(locale, firstParsedDatetime, computedHourCycle, formatOptions?.time);
              break;
            case "month-year":
              this.dateText = getLocalizedDateTime(locale, firstParsedDatetime, formatOptions?.date ?? { month: "long", year: "numeric" });
              break;
            case "month":
              this.dateText = getLocalizedDateTime(locale, firstParsedDatetime, formatOptions?.time ?? { month: "long" });
              break;
            case "year":
              this.dateText = getLocalizedDateTime(locale, firstParsedDatetime, formatOptions?.time ?? { year: "numeric" });
              break;
          }
        });
        this.waitForDatetimeChanges = () => __async(this, null, function* () {
          const { datetimeEl } = this;
          if (!datetimeEl) {
            return Promise.resolve();
          }
          return new Promise((resolve) => {
            addEventListener(datetimeEl, "ionRender", resolve, { once: true });
          });
        });
        this.handleDateClick = (ev) => __async(this, null, function* () {
          const { datetimeEl, datetimePresentation } = this;
          if (!datetimeEl) {
            return;
          }
          let needsPresentationChange = false;
          switch (datetimePresentation) {
            case "date-time":
            case "time-date":
              const needsChange = datetimeEl.presentation !== "date";
              if (!datetimeEl.preferWheel && needsChange) {
                datetimeEl.presentation = "date";
                needsPresentationChange = true;
              }
              break;
          }
          this.selectedButton = "date";
          this.presentOverlay(ev, needsPresentationChange, this.dateTargetEl);
        });
        this.handleTimeClick = (ev) => {
          const { datetimeEl, datetimePresentation } = this;
          if (!datetimeEl) {
            return;
          }
          let needsPresentationChange = false;
          switch (datetimePresentation) {
            case "date-time":
            case "time-date":
              const needsChange = datetimeEl.presentation !== "time";
              if (needsChange) {
                datetimeEl.presentation = "time";
                needsPresentationChange = true;
              }
              break;
          }
          this.selectedButton = "time";
          this.presentOverlay(ev, needsPresentationChange, this.timeTargetEl);
        };
        this.presentOverlay = (ev, needsPresentationChange, triggerEl) => __async(this, null, function* () {
          const { overlayEl } = this;
          if (!overlayEl) {
            return;
          }
          if (overlayEl.tagName === "ION-POPOVER") {
            if (needsPresentationChange) {
              yield this.waitForDatetimeChanges();
            }
            overlayEl.present(__spreadProps(__spreadValues({}, ev), {
              detail: {
                ionShadowTarget: triggerEl
              }
            }));
          } else {
            overlayEl.present();
          }
        });
      }
      componentWillLoad() {
        return __async(this, null, function* () {
          const { datetime } = this;
          if (!datetime) {
            printIonError("[ion-datetime-button] - An ID associated with an ion-datetime instance is required to function properly.", this.el);
            return;
          }
          const datetimeEl = this.datetimeEl = document.getElementById(datetime);
          if (!datetimeEl) {
            printIonError(`[ion-datetime-button] - No ion-datetime instance found for ID '${datetime}'.`, this.el);
            return;
          }
          if (datetimeEl.tagName !== "ION-DATETIME") {
            printIonError(`[ion-datetime-button] - Expected an ion-datetime instance for ID '${datetime}' but received '${datetimeEl.tagName.toLowerCase()}' instead.`, datetimeEl);
            return;
          }
          const io = new IntersectionObserver((entries) => {
            const ev = entries[0];
            this.datetimeActive = ev.isIntersecting;
          }, {
            threshold: 0.01
          });
          io.observe(datetimeEl);
          const overlayEl = this.overlayEl = datetimeEl.closest("ion-modal, ion-popover");
          if (overlayEl) {
            overlayEl.classList.add("ion-datetime-button-overlay");
          }
          componentOnReady(datetimeEl, () => {
            const datetimePresentation = this.datetimePresentation = datetimeEl.presentation || "date-time";
            this.setDateTimeText();
            addEventListener(datetimeEl, "ionValueChange", this.setDateTimeText);
            switch (datetimePresentation) {
              case "date-time":
              case "date":
              case "month-year":
              case "month":
              case "year":
                this.selectedButton = "date";
                break;
              case "time-date":
              case "time":
                this.selectedButton = "time";
                break;
            }
          });
        });
      }
      render() {
        const { color, dateText, timeText, selectedButton, datetimeActive, disabled } = this;
        const mode = getIonMode(this);
        return h(Host, { key: "2aaa284fe9b53b6347fcb5a1d325fbab1a6f38bd", class: createColorClasses(color, {
          [mode]: true,
          [`${selectedButton}-active`]: datetimeActive,
          ["datetime-button-disabled"]: disabled
        }) }, dateText && h("button", { key: "d9698471fa5d5c834ca73db57f9ed98dfc705b4c", class: "ion-activatable", id: "date-button", "aria-expanded": datetimeActive ? "true" : "false", onClick: this.handleDateClick, disabled, part: "native", ref: (el) => this.dateTargetEl = el }, h("slot", { key: "c8761a7f25ae5b93c953b3486dd6335f5ad4fd53", name: "date-target" }, dateText), mode === "md" && h("ion-ripple-effect", { key: "3dd5e97af8d35a2b008de4ab01f690b3c2223135" })), timeText && h("button", { key: "1107ca2382940b642b551f885f7ca763012c236c", class: "ion-activatable", id: "time-button", "aria-expanded": datetimeActive ? "true" : "false", onClick: this.handleTimeClick, disabled, part: "native", ref: (el) => this.timeTargetEl = el }, h("slot", { key: "5cff53e486923b03715b9ab4dc0947e26f4ea1d9", name: "time-target" }, timeText), mode === "md" && h("ion-ripple-effect", { key: "5aac1facb6fc7457307c4f59a241e3a5b31facc8" })));
      }
      get el() {
        return getElement(this);
      }
    };
    DatetimeButton.style = {
      ios: datetimeButtonIosCss(),
      md: datetimeButtonMdCss()
    };
  }
});
init_ion_datetime_button_entry();
export {
  DatetimeButton as ion_datetime_button
};
//# debugId=300a6ee9-7947-5a92-a210-984b3b9ff3c5
//# sourceMappingURL=chunk-VRK5YVI3.js.map
