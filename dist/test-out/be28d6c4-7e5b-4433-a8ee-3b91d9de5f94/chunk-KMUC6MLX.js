import {
  arrowBackSharp,
  closeCircle,
  closeSharp,
  init_index_BvabGprD,
  searchOutline,
  searchSharp
} from "./chunk-KPUED4ZZ.js";
import {
  componentOnReady,
  debounceEvent,
  inheritAttributes,
  init_helpers_BJqKF1pr,
  raf
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde,
  isRTL
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
  config,
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

// node_modules/@ionic/core/dist/esm/ion-searchbar.entry.js
var searchbarIosCss, searchbarMdCss, Searchbar, searchbarIds;
var init_ion_searchbar_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-searchbar.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    init_theme_byZM6qHV();
    init_index_BvabGprD();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    searchbarIosCss = () => `.sc-ion-searchbar-ios-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;width:100%;color:var(--color);font-family:var(--ion-font-family, inherit);-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-searchbar-ios-h{color:var(--ion-color-contrast)}.ion-color.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{background:var(--ion-color-base)}.ion-color.sc-ion-searchbar-ios-h .searchbar-clear-button.sc-ion-searchbar-ios,.ion-color.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios,.ion-color.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{color:inherit}.searchbar-search-icon.sc-ion-searchbar-ios{color:var(--icon-color);pointer-events:none}.searchbar-input-container.sc-ion-searchbar-ios{display:block;position:relative;-ms-flex-negative:1;flex-shrink:1;width:100%}.searchbar-input.sc-ion-searchbar-ios{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;border-radius:var(--border-radius);display:block;width:100%;min-height:inherit;border:0;outline:none;background:var(--background);font-family:inherit;-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-input.sc-ion-searchbar-ios::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::-webkit-search-cancel-button,.searchbar-input.sc-ion-searchbar-ios::-ms-clear{display:none}.searchbar-cancel-button.sc-ion-searchbar-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:none;height:100%;border:0;outline:none;color:var(--cancel-button-color);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-cancel-button.sc-ion-searchbar-ios>div.sc-ion-searchbar-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.searchbar-clear-button.sc-ion-searchbar-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:none;min-height:0;outline:none;color:var(--clear-button-color);-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-clear-button.sc-ion-searchbar-ios:focus{opacity:0.5}.searchbar-has-value.searchbar-should-show-clear.sc-ion-searchbar-ios-h .searchbar-clear-button.sc-ion-searchbar-ios{display:block}.searchbar-disabled.sc-ion-searchbar-ios-h{cursor:default;opacity:0.4;pointer-events:none}.sc-ion-searchbar-ios-h{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.07);--border-radius:10px;--box-shadow:none;--cancel-button-color:var(--ion-color-primary, #0054e9);--clear-button-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));--color:var(--ion-text-color, #000);--icon-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:12px;padding-bottom:12px;min-height:60px;contain:content}.searchbar-input-container.sc-ion-searchbar-ios{min-height:36px}.searchbar-search-icon.sc-ion-searchbar-ios{-webkit-margin-start:calc(50% - 60px);margin-inline-start:calc(50% - 60px);top:0;position:absolute;width:1.375rem;height:100%;contain:strict}.searchbar-search-icon.sc-ion-searchbar-ios{inset-inline-start:5px}.searchbar-input.sc-ion-searchbar-ios{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-end:0px;padding-inline-end:0px;padding-top:6px;padding-bottom:6px;height:100%;font-size:1.0625rem;font-weight:400;contain:strict}.searchbar-has-value.searchbar-should-show-clear.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{-webkit-padding-start:1.75rem;padding-inline-start:1.75rem;-webkit-padding-end:1.75rem;padding-inline-end:1.75rem}.searchbar-clear-button.sc-ion-searchbar-ios{top:0;background-position:center;position:absolute;width:1.875rem;height:100%;border:0;background-color:transparent}.searchbar-clear-button.sc-ion-searchbar-ios{inset-inline-end:0}.searchbar-clear-icon.sc-ion-searchbar-ios{width:1.125rem;height:100%}.searchbar-cancel-button.sc-ion-searchbar-ios{-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:0;padding-inline-end:0;padding-top:0;padding-bottom:0;-ms-flex-negative:0;flex-shrink:0;background-color:transparent;font-size:17px}.searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{-webkit-margin-start:0;margin-inline-start:0}.searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{-webkit-padding-start:1.875rem;padding-inline-start:1.875rem}.searchbar-has-focus.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios,.searchbar-should-show-cancel.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios,.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{display:block}.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios,.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{-webkit-transition:all 300ms ease;transition:all 300ms ease}.searchbar-animated.searchbar-has-focus.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios,.searchbar-animated.searchbar-should-show-cancel.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{opacity:1;pointer-events:auto}.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{-webkit-margin-end:-100%;margin-inline-end:-100%;-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0);-webkit-transition:all 300ms ease;transition:all 300ms ease;opacity:0;pointer-events:none}.searchbar-no-animate.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios,.searchbar-no-animate.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios,.searchbar-no-animate.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{-webkit-transition-duration:0ms;transition-duration:0ms}.ion-color.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{color:var(--ion-color-base)}@media (any-hover: hover){.ion-color.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios:hover{color:var(--ion-color-tint)}}ion-toolbar.sc-ion-searchbar-ios-h,ion-toolbar .sc-ion-searchbar-ios-h{padding-top:1px;padding-bottom:15px;min-height:52px}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color),ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color){color:inherit}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-cancel-button.sc-ion-searchbar-ios,ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-cancel-button.sc-ion-searchbar-ios{color:currentColor}ion-toolbar.ion-color.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios,ion-toolbar.ion-color .sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{color:currentColor;opacity:0.5}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-input.sc-ion-searchbar-ios,ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-input.sc-ion-searchbar-ios{background:rgba(var(--ion-color-contrast-rgb), 0.07);color:currentColor}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-clear-button.sc-ion-searchbar-ios,ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-clear-button.sc-ion-searchbar-ios{color:currentColor;opacity:0.5}`;
    searchbarMdCss = () => `.sc-ion-searchbar-md-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:var(--ion-placeholder-opacity, 0.6);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;width:100%;color:var(--color);font-family:var(--ion-font-family, inherit);-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-searchbar-md-h{color:var(--ion-color-contrast)}.ion-color.sc-ion-searchbar-md-h .searchbar-input.sc-ion-searchbar-md{background:var(--ion-color-base)}.ion-color.sc-ion-searchbar-md-h .searchbar-clear-button.sc-ion-searchbar-md,.ion-color.sc-ion-searchbar-md-h .searchbar-cancel-button.sc-ion-searchbar-md,.ion-color.sc-ion-searchbar-md-h .searchbar-search-icon.sc-ion-searchbar-md{color:inherit}.searchbar-search-icon.sc-ion-searchbar-md{color:var(--icon-color);pointer-events:none}.searchbar-input-container.sc-ion-searchbar-md{display:block;position:relative;-ms-flex-negative:1;flex-shrink:1;width:100%}.searchbar-input.sc-ion-searchbar-md{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;border-radius:var(--border-radius);display:block;width:100%;min-height:inherit;border:0;outline:none;background:var(--background);font-family:inherit;-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-input.sc-ion-searchbar-md::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-md::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-md:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-md::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-md::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-md::-webkit-search-cancel-button,.searchbar-input.sc-ion-searchbar-md::-ms-clear{display:none}.searchbar-cancel-button.sc-ion-searchbar-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:none;height:100%;border:0;outline:none;color:var(--cancel-button-color);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-cancel-button.sc-ion-searchbar-md>div.sc-ion-searchbar-md{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.searchbar-clear-button.sc-ion-searchbar-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:none;min-height:0;outline:none;color:var(--clear-button-color);-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-clear-button.sc-ion-searchbar-md:focus{opacity:0.5}.searchbar-has-value.searchbar-should-show-clear.sc-ion-searchbar-md-h .searchbar-clear-button.sc-ion-searchbar-md{display:block}.searchbar-disabled.sc-ion-searchbar-md-h{cursor:default;opacity:0.4;pointer-events:none}.sc-ion-searchbar-md-h{--background:var(--ion-background-color, #fff);--border-radius:2px;--box-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);--cancel-button-color:var(--ion-color-step-900, var(--ion-text-color-step-100, #1a1a1a));--clear-button-color:initial;--color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));--icon-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;background:inherit}.searchbar-search-icon.sc-ion-searchbar-md{top:11px;width:1.3125rem;height:1.3125rem}.searchbar-search-icon.sc-ion-searchbar-md{inset-inline-start:16px}.searchbar-cancel-button.sc-ion-searchbar-md{top:0;background-color:transparent;font-size:1.5em}.searchbar-cancel-button.sc-ion-searchbar-md{inset-inline-start:9px}.searchbar-search-icon.sc-ion-searchbar-md,.searchbar-cancel-button.sc-ion-searchbar-md{position:absolute}.searchbar-search-icon.ion-activated.sc-ion-searchbar-md,.searchbar-cancel-button.ion-activated.sc-ion-searchbar-md{background-color:transparent}.searchbar-input.sc-ion-searchbar-md{-webkit-padding-start:3.4375rem;padding-inline-start:3.4375rem;-webkit-padding-end:3.4375rem;padding-inline-end:3.4375rem;padding-top:0.375rem;padding-bottom:0.375rem;background-position:left 8px center;height:auto;font-size:1rem;font-weight:400;line-height:30px}[dir=rtl].sc-ion-searchbar-md-h .searchbar-input.sc-ion-searchbar-md,[dir=rtl] .sc-ion-searchbar-md-h .searchbar-input.sc-ion-searchbar-md{background-position:right 8px center}[dir=rtl].sc-ion-searchbar-md .searchbar-input.sc-ion-searchbar-md{background-position:right 8px center}@supports selector(:dir(rtl)){.searchbar-input.sc-ion-searchbar-md:dir(rtl){background-position:right 8px center}}.searchbar-clear-button.sc-ion-searchbar-md{top:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;position:absolute;height:100%;border:0;background-color:transparent}.searchbar-clear-button.sc-ion-searchbar-md{inset-inline-end:13px}.searchbar-clear-button.ion-activated.sc-ion-searchbar-md{background-color:transparent}.searchbar-clear-icon.sc-ion-searchbar-md{width:1.375rem;height:100%}.searchbar-has-focus.sc-ion-searchbar-md-h .searchbar-search-icon.sc-ion-searchbar-md{display:block}.searchbar-has-focus.sc-ion-searchbar-md-h .searchbar-cancel-button.sc-ion-searchbar-md,.searchbar-should-show-cancel.sc-ion-searchbar-md-h .searchbar-cancel-button.sc-ion-searchbar-md{display:block}.searchbar-has-focus.sc-ion-searchbar-md-h .searchbar-cancel-button.sc-ion-searchbar-md+.searchbar-search-icon.sc-ion-searchbar-md,.searchbar-should-show-cancel.sc-ion-searchbar-md-h .searchbar-cancel-button.sc-ion-searchbar-md+.searchbar-search-icon.sc-ion-searchbar-md{display:none}ion-toolbar.sc-ion-searchbar-md-h,ion-toolbar .sc-ion-searchbar-md-h{-webkit-padding-start:7px;padding-inline-start:7px;-webkit-padding-end:7px;padding-inline-end:7px;padding-top:3px;padding-bottom:3px}`;
    Searchbar = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionInput = createEvent(this, "ionInput", 7);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionCancel = createEvent(this, "ionCancel", 7);
        this.ionClear = createEvent(this, "ionClear", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.isCancelVisible = false;
        this.shouldAlignLeft = true;
        this.inputId = `ion-searchbar-${searchbarIds++}`;
        this.inheritedAttributes = {};
        this.focused = false;
        this.noAnimate = true;
        this.animated = false;
        this.autocapitalize = "off";
        this.autocomplete = "off";
        this.autocorrect = false;
        this.cancelButtonIcon = config.get("backButtonIcon", arrowBackSharp);
        this.cancelButtonText = "Cancel";
        this.disabled = false;
        this.name = this.inputId;
        this.placeholder = "Search";
        this.showCancelButton = "never";
        this.showClearButton = "always";
        this.spellcheck = false;
        this.type = "search";
        this.value = "";
        this.onClearInput = (shouldFocus) => __async(this, null, function* () {
          if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
          }
          this.ionClear.emit();
          return new Promise((resolve) => {
            this.clearTimeout = setTimeout(() => {
              const value = this.getValue();
              if (value !== "") {
                this.value = "";
                this.emitInputChange();
                if (shouldFocus && !this.focused) {
                  this.setFocus();
                  this.focusedValue = value;
                }
              }
              resolve();
            }, 16 * 4);
          });
        });
        this.onCancelSearchbar = (ev) => __async(this, null, function* () {
          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          this.ionCancel.emit();
          const value = this.getValue();
          const focused = this.focused;
          yield this.onClearInput();
          if (value && !focused) {
            this.emitValueChange(ev);
          }
          if (this.nativeInput) {
            this.nativeInput.blur();
          }
        });
        this.onInput = (ev) => {
          const input = ev.target;
          if (input) {
            this.value = input.value;
          }
          this.emitInputChange(ev);
        };
        this.onChange = (ev) => {
          this.emitValueChange(ev);
        };
        this.onBlur = (ev) => {
          this.focused = false;
          this.ionBlur.emit();
          this.positionElements();
          if (this.focusedValue !== this.value) {
            this.emitValueChange(ev);
          }
          this.focusedValue = void 0;
        };
        this.onFocus = () => {
          this.focused = true;
          this.focusedValue = this.value;
          this.ionFocus.emit();
          this.positionElements();
        };
      }
      /**
       * lang and dir are globally enumerated attributes.
       * As a result, creating these as properties
       * can have unintended side effects. Instead, we
       * listen for attribute changes and inherit them
       * to the inner `<input>` element.
       */
      onLangChanged(newValue) {
        this.inheritedAttributes = __spreadProps(__spreadValues({}, this.inheritedAttributes), {
          lang: newValue
        });
        forceUpdate(this);
      }
      onDirChanged(newValue) {
        this.inheritedAttributes = __spreadProps(__spreadValues({}, this.inheritedAttributes), {
          dir: newValue
        });
        forceUpdate(this);
      }
      debounceChanged() {
        const { ionInput, debounce, originalIonInput } = this;
        this.ionInput = debounce === void 0 ? originalIonInput ?? ionInput : debounceEvent(ionInput, debounce);
      }
      valueChanged() {
        const inputEl = this.nativeInput;
        const value = this.getValue();
        if (inputEl && inputEl.value !== value) {
          inputEl.value = value;
        }
      }
      showCancelButtonChanged() {
        requestAnimationFrame(() => {
          this.positionElements();
          forceUpdate(this);
        });
      }
      connectedCallback() {
        this.emitStyle();
      }
      componentWillLoad() {
        this.inheritedAttributes = __spreadValues({}, inheritAttributes(this.el, ["lang", "dir"]));
      }
      componentDidLoad() {
        this.originalIonInput = this.ionInput;
        this.positionElements();
        this.debounceChanged();
        this.loadTimeout = setTimeout(() => {
          this.noAnimate = false;
        }, 300);
      }
      disconnectedCallback() {
        if (this.loadTimeout) {
          clearTimeout(this.loadTimeout);
        }
        if (this.clearTimeout) {
          clearTimeout(this.clearTimeout);
        }
        this.searchIconResizeObserver?.disconnect();
      }
      emitStyle() {
        this.ionStyle.emit({
          searchbar: true
        });
      }
      /**
       * Sets focus on the native `input` in `ion-searchbar`. Use this method instead of the global
       * `input.focus()`.
       * Developers who wish to focus an input when a page enters
       * should call `setFocus()` in the `ionViewDidEnter()` lifecycle method.
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
        this.ionInput.emit({ value, event });
      }
      /**
       * Positions the input search icon, placeholder, and the cancel button
       * based on the input value and if it is focused. (ios only)
       */
      positionElements() {
        const value = this.getValue();
        const prevAlignLeft = this.shouldAlignLeft;
        const mode = getIonMode(this);
        const shouldAlignLeft = !this.animated || value.trim() !== "" || !!this.focused;
        this.shouldAlignLeft = shouldAlignLeft;
        if (mode !== "ios") {
          return;
        }
        if (prevAlignLeft !== shouldAlignLeft) {
          this.positionPlaceholder();
        }
        if (this.animated) {
          this.positionCancelButton();
        }
      }
      /**
       * Positions the input placeholder
       */
      positionPlaceholder() {
        const inputEl = this.nativeInput;
        if (!inputEl) {
          return;
        }
        const rtl = isRTL(this.el);
        const iconEl = (this.el.shadowRoot || this.el).querySelector(".searchbar-search-icon");
        if (this.shouldAlignLeft) {
          inputEl.removeAttribute("style");
          iconEl.removeAttribute("style");
        } else {
          const doc = document;
          const tempSpan = doc.createElement("span");
          tempSpan.innerText = this.placeholder || "";
          doc.body.appendChild(tempSpan);
          raf(() => {
            const textWidth = tempSpan.offsetWidth;
            tempSpan.remove();
            const inputLeft = "calc(50% - " + textWidth / 2 + "px)";
            const iconWidth = iconEl.clientWidth;
            if (iconWidth === 0) {
              this.searchIconResizeObserver?.disconnect();
              this.searchIconResizeObserver = new ResizeObserver((entries) => {
                if (entries[0].contentRect.width > 0) {
                  this.searchIconResizeObserver?.disconnect();
                  this.positionPlaceholder();
                }
              });
              this.searchIconResizeObserver?.observe(iconEl);
              return;
            }
            const iconLeft = "calc(50% - " + (textWidth / 2 + iconWidth + 8) + "px)";
            if (rtl) {
              inputEl.style.paddingRight = inputLeft;
              iconEl.style.marginRight = iconLeft;
            } else {
              inputEl.style.paddingLeft = inputLeft;
              iconEl.style.marginLeft = iconLeft;
            }
          });
        }
      }
      /**
       * Show the iOS Cancel button on focus, hide it offscreen otherwise
       */
      positionCancelButton() {
        const rtl = isRTL(this.el);
        const cancelButton = (this.el.shadowRoot || this.el).querySelector(".searchbar-cancel-button");
        const shouldShowCancel = this.shouldShowCancelButton();
        if (cancelButton !== null && shouldShowCancel !== this.isCancelVisible) {
          const cancelStyle = cancelButton.style;
          this.isCancelVisible = shouldShowCancel;
          if (shouldShowCancel) {
            if (rtl) {
              cancelStyle.marginLeft = "0";
            } else {
              cancelStyle.marginRight = "0";
            }
          } else {
            const offset = cancelButton.offsetWidth;
            if (offset > 0) {
              if (rtl) {
                cancelStyle.marginLeft = -offset + "px";
              } else {
                cancelStyle.marginRight = -offset + "px";
              }
            }
          }
        }
      }
      getValue() {
        return this.value || "";
      }
      hasValue() {
        return this.getValue() !== "";
      }
      /**
       * Determines whether or not the cancel button should be visible onscreen.
       * Cancel button should be shown if one of two conditions applies:
       * 1. `showCancelButton` is set to `always`.
       * 2. `showCancelButton` is set to `focus`, and the searchbar has been focused.
       */
      shouldShowCancelButton() {
        if (this.showCancelButton === "never" || this.showCancelButton === "focus" && !this.focused) {
          return false;
        }
        return true;
      }
      /**
       * Determines whether or not the clear button should be visible onscreen.
       * Clear button should be shown if one of two conditions applies:
       * 1. `showClearButton` is set to `always`.
       * 2. `showClearButton` is set to `focus`, and the searchbar has been focused.
       */
      shouldShowClearButton() {
        if (this.showClearButton === "never" || this.showClearButton === "focus" && !this.focused) {
          return false;
        }
        return true;
      }
      render() {
        const { cancelButtonText, autocapitalize } = this;
        const animated = this.animated && config.getBoolean("animated", true);
        const mode = getIonMode(this);
        const clearIcon = this.clearIcon || (mode === "ios" ? closeCircle : closeSharp);
        const searchIcon = this.searchIcon || (mode === "ios" ? searchOutline : searchSharp);
        const shouldShowCancelButton = this.shouldShowCancelButton();
        const cancelButton = this.showCancelButton !== "never" && h("button", { key: "47ee586db12684db8b2d16a790976bd247cbbc62", "aria-label": cancelButtonText, "aria-hidden": shouldShowCancelButton ? void 0 : "true", type: "button", tabIndex: mode === "ios" && !shouldShowCancelButton ? -1 : void 0, onMouseDown: this.onCancelSearchbar, onTouchStart: this.onCancelSearchbar, class: "searchbar-cancel-button" }, h("div", { key: "55e6b556a46e7bba14c2cfe1b58542499d2334ab", "aria-hidden": "true" }, mode === "md" ? h("ion-icon", { "aria-hidden": "true", mode, icon: this.cancelButtonIcon, lazy: false }) : cancelButtonText));
        return h(Host, { key: "468d524b52a0d29d840e2c3cdafba46152716b15", role: "search", "aria-disabled": this.disabled ? "true" : null, class: createColorClasses(this.color, {
          [mode]: true,
          "searchbar-animated": animated,
          "searchbar-disabled": this.disabled,
          "searchbar-no-animate": animated && this.noAnimate,
          "searchbar-has-value": this.hasValue(),
          "searchbar-left-aligned": this.shouldAlignLeft,
          "searchbar-has-focus": this.focused,
          "searchbar-should-show-clear": this.shouldShowClearButton(),
          "searchbar-should-show-cancel": this.shouldShowCancelButton()
        }) }, h("div", { key: "94378bdfdf883c28941ef770d64347705d6f8345", class: "searchbar-input-container" }, h("input", __spreadValues({ key: "deea2190823bf8652703148d308aa21473605930", "aria-label": "search text", disabled: this.disabled, ref: (el) => this.nativeInput = el, class: "searchbar-input", inputMode: this.inputmode, enterKeyHint: this.enterkeyhint, name: this.name, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, minLength: this.minlength, maxLength: this.maxlength, placeholder: this.placeholder, type: this.type, value: this.getValue(), autoCapitalize: autocapitalize === "default" ? void 0 : autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect ? "on" : "off", spellcheck: this.spellcheck }, this.inheritedAttributes)), mode === "md" && cancelButton, h("ion-icon", { key: "0ecc28496ab545f2064b71b994b4cbf0968c2108", "aria-hidden": "true", mode, icon: searchIcon, lazy: false, class: "searchbar-search-icon" }), h("button", { key: "1bcc77d70eaa08f2ae7fc6173642f114fe387fb7", "aria-label": "reset", type: "button", "no-blur": true, class: "searchbar-clear-button", onPointerDown: (ev) => {
          ev.preventDefault();
        }, onClick: () => this.onClearInput(true) }, h("ion-icon", { key: "bbf8d05eb1070a0d34a22236dfaaf11d8dcc06af", "aria-hidden": "true", mode, icon: clearIcon, lazy: false, class: "searchbar-clear-icon" }))), mode === "ios" && cancelButton);
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "lang": [{
            "onLangChanged": 0
          }],
          "dir": [{
            "onDirChanged": 0
          }],
          "debounce": [{
            "debounceChanged": 0
          }],
          "value": [{
            "valueChanged": 0
          }],
          "showCancelButton": [{
            "showCancelButtonChanged": 0
          }]
        };
      }
    };
    searchbarIds = 0;
    Searchbar.style = {
      ios: searchbarIosCss(),
      md: searchbarMdCss()
    };
  }
});
init_ion_searchbar_entry();
export {
  Searchbar as ion_searchbar
};
//# debugId=14b87a91-e49d-5eb4-845f-27112efe57ab
//# sourceMappingURL=chunk-KMUC6MLX.js.map
