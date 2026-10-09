import {
  getElementRoot,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-picker.entry.js
var pickerIosCss, pickerMdCss, Picker;
var init_ion_picker_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-picker.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    pickerIosCss = () => `:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{top:0;height:83px}:host .picker-before{inset-inline-start:0}:host .picker-after{top:116px;height:84px}:host .picker-after{inset-inline-start:0}:host .picker-highlight{border-radius:var(--highlight-border-radius, 8px);left:0;right:0;top:50%;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;-webkit-transform:translateY(-50%);transform:translateY(-50%);background:var(--highlight-background);z-index:-1}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column:first-of-type){text-align:start}:host ::slotted(ion-picker-column:last-of-type){text-align:end}:host ::slotted(ion-picker-column:only-child){text-align:center}:host .picker-before{background:-webkit-gradient(linear, left top, left bottom, color-stop(20%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1)), to(rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0.8)));background:linear-gradient(to bottom, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1) 20%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0.8) 100%)}:host .picker-after{background:-webkit-gradient(linear, left bottom, left top, color-stop(20%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1)), to(rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0.8)));background:linear-gradient(to top, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1) 20%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0.8) 100%)}:host .picker-highlight{background:var(--highlight-background, var(--ion-color-step-150, var(--ion-background-color-step-150, #eeeeef)))}`;
    pickerMdCss = () => `:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:1;pointer-events:none}:host .picker-before{top:0;height:83px}:host .picker-before{inset-inline-start:0}:host .picker-after{top:116px;height:84px}:host .picker-after{inset-inline-start:0}:host .picker-highlight{border-radius:var(--highlight-border-radius, 8px);left:0;right:0;top:50%;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;-webkit-transform:translateY(-50%);transform:translateY(-50%);background:var(--highlight-background);z-index:-1}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column:first-of-type){text-align:start}:host ::slotted(ion-picker-column:last-of-type){text-align:end}:host ::slotted(ion-picker-column:only-child){text-align:center}:host .picker-before{background:-webkit-gradient(linear, left top, left bottom, color-stop(20%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1)), color-stop(90%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0)));background:linear-gradient(to bottom, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1) 20%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0) 90%)}:host .picker-after{background:-webkit-gradient(linear, left bottom, left top, color-stop(30%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1)), color-stop(90%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0)));background:linear-gradient(to top, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 1) 30%, rgba(var(--fade-background-rgb, var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255))), 0) 90%)}`;
    Picker = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionInputModeChange = createEvent(this, "ionInputModeChange", 7);
        this.useInputMode = false;
        this.isInHighlightBounds = (ev) => {
          const { highlightEl } = this;
          if (!highlightEl) {
            return false;
          }
          const bbox = highlightEl.getBoundingClientRect();
          const outsideX = ev.clientX < bbox.left || ev.clientX > bbox.right;
          const outsideY = ev.clientY < bbox.top || ev.clientY > bbox.bottom;
          if (outsideX || outsideY) {
            return false;
          }
          return true;
        };
        this.onFocusOut = (ev) => {
          const { relatedTarget } = ev;
          if (!relatedTarget || relatedTarget.tagName !== "ION-PICKER-COLUMN" && relatedTarget !== this.inputEl) {
            this.exitInputMode();
          }
        };
        this.onFocusIn = (ev) => {
          const { target } = ev;
          if (target.tagName !== "ION-PICKER-COLUMN") {
            return;
          }
          if (!this.actionOnClick) {
            const columnEl = target;
            const allowInput = columnEl.numericInput;
            if (allowInput) {
              this.enterInputMode(columnEl, false);
            } else {
              this.exitInputMode();
            }
          }
        };
        this.onClick = () => {
          const { actionOnClick } = this;
          if (actionOnClick) {
            actionOnClick();
            this.actionOnClick = void 0;
          }
        };
        this.onPointerDown = (ev) => {
          const { useInputMode, inputModeColumn, el } = this;
          if (this.isInHighlightBounds(ev)) {
            if (useInputMode) {
              if (ev.target.tagName === "ION-PICKER-COLUMN") {
                if (inputModeColumn && inputModeColumn === ev.target) {
                  this.actionOnClick = () => {
                    this.enterInputMode();
                  };
                } else {
                  this.actionOnClick = () => {
                    this.enterInputMode(ev.target);
                  };
                }
              } else {
                this.actionOnClick = () => {
                  this.exitInputMode();
                };
              }
            } else {
              const columns = el.querySelectorAll("ion-picker-column.picker-column-numeric-input");
              const columnEl = columns.length === 1 ? ev.target : void 0;
              this.actionOnClick = () => {
                this.enterInputMode(columnEl);
              };
            }
            return;
          }
          this.actionOnClick = () => {
            this.exitInputMode();
          };
        };
        this.enterInputMode = (columnEl, focusInput = true) => {
          const { inputEl, el } = this;
          if (!inputEl) {
            return;
          }
          const hasInputColumn = el.querySelector("ion-picker-column.picker-column-numeric-input");
          if (!hasInputColumn) {
            return;
          }
          this.useInputMode = true;
          this.inputModeColumn = columnEl;
          if (focusInput) {
            if (this.destroyKeypressListener) {
              this.destroyKeypressListener();
              this.destroyKeypressListener = void 0;
            }
            inputEl.focus();
          } else {
            el.addEventListener("keypress", this.onKeyPress);
            this.destroyKeypressListener = () => {
              el.removeEventListener("keypress", this.onKeyPress);
            };
          }
          this.emitInputModeChange();
        };
        this.onKeyPress = (ev) => {
          const { inputEl } = this;
          if (!inputEl) {
            return;
          }
          const parsedValue = parseInt(ev.key, 10);
          if (!Number.isNaN(parsedValue)) {
            inputEl.value += ev.key;
            this.onInputChange();
          }
        };
        this.selectSingleColumn = () => {
          const { inputEl, inputModeColumn, singleColumnSearchTimeout } = this;
          if (!inputEl || !inputModeColumn) {
            return;
          }
          const options = Array.from(inputModeColumn.querySelectorAll("ion-picker-column-option")).filter((el) => el.disabled !== true);
          if (singleColumnSearchTimeout) {
            clearTimeout(singleColumnSearchTimeout);
          }
          this.singleColumnSearchTimeout = setTimeout(() => {
            inputEl.value = "";
            this.singleColumnSearchTimeout = void 0;
          }, 1e3);
          if (inputEl.value.length >= 3) {
            const startIndex = inputEl.value.length - 2;
            const newString = inputEl.value.substring(startIndex);
            inputEl.value = newString;
            this.selectSingleColumn();
            return;
          }
          const findItemFromCompleteValue = options.find(({ textContent }) => {
            const parsedText = textContent.replace(/^0+(?=[1-9])|0+(?=0$)/, "");
            return parsedText === inputEl.value;
          });
          if (findItemFromCompleteValue) {
            inputModeColumn.setValue(findItemFromCompleteValue.value);
            return;
          }
          if (inputEl.value.length === 2) {
            const changedCharacter = inputEl.value.substring(inputEl.value.length - 1);
            inputEl.value = changedCharacter;
            this.selectSingleColumn();
          }
        };
        this.searchColumn = (colEl, value, zeroBehavior = "start") => {
          if (!value) {
            return false;
          }
          const behavior = zeroBehavior === "start" ? /^0+/ : /0$/;
          value = value.replace(behavior, "");
          const option = Array.from(colEl.querySelectorAll("ion-picker-column-option")).find((el) => {
            return el.disabled !== true && el.textContent.replace(behavior, "") === value;
          });
          if (option) {
            colEl.setValue(option.value);
          }
          return !!option;
        };
        this.multiColumnSearch = (firstColumn, secondColumn, input) => {
          if (input.length === 0) {
            return;
          }
          const inputArray = input.split("");
          const hourValue = inputArray.slice(0, 2).join("");
          const foundHour = this.searchColumn(firstColumn, hourValue);
          if (inputArray.length > 2 && foundHour) {
            const minuteValue = inputArray.slice(2, 4).join("");
            this.searchColumn(secondColumn, minuteValue);
          } else if (!foundHour && inputArray.length >= 1) {
            let singleDigitHour = inputArray[0];
            let singleDigitFound = this.searchColumn(firstColumn, singleDigitHour);
            if (!singleDigitFound) {
              inputArray.shift();
              singleDigitHour = inputArray[0];
              singleDigitFound = this.searchColumn(firstColumn, singleDigitHour);
            }
            if (singleDigitFound && inputArray.length > 1) {
              const remainingDigits = inputArray.slice(1, 3).join("");
              this.searchColumn(secondColumn, remainingDigits);
            }
          }
        };
        this.selectMultiColumn = () => {
          const { inputEl, el } = this;
          if (!inputEl) {
            return;
          }
          const numericPickers = Array.from(el.querySelectorAll("ion-picker-column")).filter((col) => col.numericInput);
          const firstColumn = numericPickers[0];
          const lastColumn = numericPickers[1];
          let value = inputEl.value;
          if (value.length > 4) {
            const startIndex = inputEl.value.length - 4;
            const newString = inputEl.value.substring(startIndex);
            inputEl.value = newString;
            value = newString;
          }
          this.multiColumnSearch(firstColumn, lastColumn, value);
        };
        this.onInputChange = () => {
          const { useInputMode, inputEl, inputModeColumn } = this;
          if (!useInputMode || !inputEl) {
            return;
          }
          if (inputModeColumn) {
            this.selectSingleColumn();
          } else {
            this.selectMultiColumn();
          }
        };
        this.emitInputModeChange = () => {
          const { useInputMode, inputModeColumn } = this;
          this.ionInputModeChange.emit({
            useInputMode,
            inputModeColumn
          });
        };
      }
      /**
       * When the picker is interacted with
       * we need to prevent touchstart so other
       * gestures do not fire. For example,
       * scrolling on the wheel picker
       * in ion-datetime should not cause
       * a card modal to swipe to close.
       */
      preventTouchStartPropagation(ev) {
        ev.stopPropagation();
      }
      componentWillLoad() {
        getElementRoot(this.el).addEventListener("focusin", this.onFocusIn);
        getElementRoot(this.el).addEventListener("focusout", this.onFocusOut);
      }
      /**
       * @internal
       * Exits text entry mode for the picker
       * This method blurs the hidden input
       * and cause the keyboard to dismiss.
       */
      exitInputMode() {
        return __async(this, null, function* () {
          const { inputEl, useInputMode } = this;
          if (!useInputMode || !inputEl) {
            return;
          }
          this.useInputMode = false;
          this.inputModeColumn = void 0;
          inputEl.blur();
          inputEl.value = "";
          if (this.destroyKeypressListener) {
            this.destroyKeypressListener();
            this.destroyKeypressListener = void 0;
          }
          this.emitInputModeChange();
        });
      }
      render() {
        return h(Host, { key: "28f81e4ed44a633178561757c5199c2c98f94b74", onPointerDown: (ev) => this.onPointerDown(ev), onClick: () => this.onClick() }, h("input", { key: "abb3d1ad25ef63856af7804111175a4d50008bc0", "aria-hidden": "true", tabindex: -1, inputmode: "numeric", type: "number", onKeyDown: (ev) => {
          if (ev.key === "Enter") {
            this.inputEl?.blur();
          }
        }, ref: (el) => this.inputEl = el, onInput: () => this.onInputChange(), onBlur: () => this.exitInputMode() }), h("div", { key: "334a5abdc02e6b127c57177f626d7e4ff5526183", class: "picker-before" }), h("div", { key: "ffd6271931129e88fc7c820e919d684899e420c5", class: "picker-after" }), h("div", { key: "78d1d95fd09e04f154ea59f24a1cece72c47ed7b", class: "picker-highlight", ref: (el) => this.highlightEl = el }), h("slot", { key: "0bd5b9f875d3c71f6cbbde2054baeb1b0a2e8cd5" }));
      }
      get el() {
        return getElement(this);
      }
    };
    Picker.style = {
      ios: pickerIosCss(),
      md: pickerMdCss()
    };
  }
});
init_ion_picker_entry();
export {
  Picker as ion_picker
};
//# debugId=a7ddf190-223a-52ae-a3ce-7b51cccc8696
//# sourceMappingURL=chunk-E4AOGZSF.js.map
