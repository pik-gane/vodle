import {
  hapticSelectionChanged,
  hapticSelectionEnd,
  hapticSelectionStart,
  init_haptic_WXfMCob9
} from "./chunk-XHGNMG47.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  doc,
  init_helpers_BJqKF1pr,
  raf
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
  init_ionic_global_Cep6oYzK,
  isPlatform
} from "./chunk-URXKFSPR.js";
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

// node_modules/@ionic/core/dist/esm/ion-picker-column.entry.js
var pickerColumnCss, PickerColumn, PICKER_ITEM_ACTIVE_CLASS, SCROLL_END_DELAY, HALT_TOLERANCE;
var init_ion_picker_column_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-picker-column.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_haptic_WXfMCob9();
    init_ionic_global_Cep6oYzK();
    init_theme_byZM6qHV();
    init_dir_Dojwmvde();
    init_capacitor_CHJaJ9aX();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    pickerColumnCss = () => `:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;max-width:100%;height:200px;font-size:22px;text-align:center}.assistive-focusable{left:0;right:0;top:0;bottom:0;position:absolute;z-index:1;pointer-events:none}.assistive-focusable:focus{outline:none}.picker-opts{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0px;padding-bottom:0px;min-width:26px;max-height:200px;outline:none;text-align:inherit;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none}.picker-item-empty{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.picker-opts::-webkit-scrollbar{display:none}::slotted(ion-picker-column-option){display:block;scroll-snap-align:center}.picker-item-empty,:host(:not([disabled])) ::slotted(ion-picker-column-option.option-disabled){scroll-snap-align:none}::slotted([slot=prefix]),::slotted([slot=suffix]){max-width:200px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}::slotted([slot=prefix]){-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0;padding-bottom:0;-ms-flex-pack:end;justify-content:end}::slotted([slot=suffix]){-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:0;padding-bottom:0;-ms-flex-pack:start;justify-content:start}:host(.picker-column-disabled) .picker-opts{overflow-y:hidden}:host(.picker-column-disabled) ::slotted(ion-picker-column-option){cursor:default;opacity:0.4;pointer-events:none}@media (any-hover: hover){:host(:focus) .picker-opts{outline:none;background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.2)}:host(.ion-color:focus) .picker-opts{background:rgba(var(--ion-color-base-rgb), 0.2)}}`;
    PickerColumn = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.isScrolling = false;
        this.isColumnVisible = false;
        this.canExitInputMode = true;
        this.updateValueTextOnScroll = false;
        this.isUserScroll = false;
        this.enableHaptics = false;
        this.ariaLabel = null;
        this.isActive = false;
        this.disabled = false;
        this.numericInput = false;
        this.centerPickerItemInView = (target, smooth = true, canExitInputMode = true) => {
          const { isColumnVisible, scrollEl } = this;
          if (isColumnVisible && scrollEl) {
            const top = target.offsetTop - 3 * target.clientHeight + target.clientHeight / 2;
            if (scrollEl.scrollTop !== top) {
              this.canExitInputMode = canExitInputMode;
              this.updateValueTextOnScroll = false;
              this.isUserScroll = false;
              this.stopWatchingForOutsidePress();
              scrollEl.scroll({
                top,
                left: 0,
                behavior: smooth ? "smooth" : void 0
              });
            }
          }
        };
        this.setPickerItemActiveState = (item, isActive) => {
          if (isActive) {
            item.classList.add(PICKER_ITEM_ACTIVE_CLASS);
          } else {
            item.classList.remove(PICKER_ITEM_ACTIVE_CLASS);
          }
        };
        this.inputModeChange = (ev) => {
          if (!this.numericInput) {
            return;
          }
          const { useInputMode, inputModeColumn } = ev.detail;
          const isColumnActive = inputModeColumn === void 0 || inputModeColumn === this.el;
          if (!useInputMode || !isColumnActive) {
            this.setInputModeActive(false);
            return;
          }
          this.setInputModeActive(true);
        };
        this.setInputModeActive = (state) => {
          if (this.isScrolling) {
            this.scrollEndCallback = () => {
              this.isActive = state;
            };
            return;
          }
          this.isActive = state;
        };
        this.clearScrollEndTimeout = () => {
          if (this.scrollEndTimeout) {
            clearTimeout(this.scrollEndTimeout);
            this.scrollEndTimeout = void 0;
          }
        };
        this.resetScrollEndTimeout = () => {
          this.clearScrollEndTimeout();
          this.scrollEndTimeout = setTimeout(this.settle, SCROLL_END_DELAY);
        };
        this.watchForOutsidePress = () => {
          doc?.addEventListener("pointerdown", this.onPointerDownOutside, { capture: true });
        };
        this.stopWatchingForOutsidePress = () => {
          doc?.removeEventListener("pointerdown", this.onPointerDownOutside, { capture: true });
        };
        this.discardScroll = () => {
          this.stopWatchingForOutsidePress();
          this.clearScrollEndTimeout();
          this.scrollEndCallback = void 0;
          this.centeredOption = void 0;
          this.haltedAtScrollTop = void 0;
          this.isScrolling = false;
          this.isUserScroll = false;
          this.canExitInputMode = true;
        };
        this.settle = () => {
          const { centeredOption } = this;
          this.clearScrollEndTimeout();
          this.stopWatchingForOutsidePress();
          this.isUserScroll = false;
          this.isScrolling = false;
          this.updateValueTextOnScroll = true;
          this.enableHaptics && hapticSelectionEnd();
          const { scrollEndCallback } = this;
          if (scrollEndCallback) {
            scrollEndCallback();
            this.scrollEndCallback = void 0;
          }
          this.canExitInputMode = true;
          if (centeredOption !== void 0) {
            this.centeredOption = void 0;
            if (centeredOption.isConnected) {
              this.setValue(centeredOption.value);
            }
          }
        };
        this.onPointerDownOutside = (ev) => {
          const { centeredOption, parentEl, scrollEl } = this;
          if (!this.isScrolling) {
            return;
          }
          const path = ev.composedPath();
          if (path.includes(this.el) || parentEl != null && path.includes(parentEl)) {
            return;
          }
          if (centeredOption !== void 0 && centeredOption.isConnected) {
            this.centerPickerItemInView(centeredOption, false, false);
            this.haltedAtScrollTop = scrollEl?.scrollTop;
          }
          this.settle();
        };
        this.initializeScrollListener = () => {
          this.enableHaptics = isPlatform("ios");
          const { el, scrollEl } = this;
          let activeEl = this.activeItem;
          const scrollCallback = () => {
            raf(() => {
              if (!this.el.isConnected || !this.isColumnVisible || !scrollEl)
                return;
              const { haltedAtScrollTop } = this;
              if (haltedAtScrollTop !== void 0) {
                if (Math.abs(scrollEl.scrollTop - haltedAtScrollTop) <= HALT_TOLERANCE)
                  return;
                this.haltedAtScrollTop = void 0;
              }
              this.resetScrollEndTimeout();
              if (!this.isScrolling) {
                this.enableHaptics && hapticSelectionStart();
                this.isScrolling = true;
              }
              if (this.isUserScroll) {
                this.watchForOutsidePress();
              }
              const bbox = scrollEl.getBoundingClientRect();
              const centerX = bbox.x + bbox.width / 2;
              const centerY = bbox.y + bbox.height / 2;
              const rootNode = el.getRootNode();
              const hasParentShadow = rootNode instanceof ShadowRoot;
              const referenceNode = hasParentShadow ? rootNode : doc;
              if (referenceNode === void 0) {
                return;
              }
              const elementsAtPoint = referenceNode.elementsFromPoint(centerX, centerY);
              let newActiveElement = elementsAtPoint.find((el2) => el2.tagName === "ION-PICKER-COLUMN-OPTION");
              if (newActiveElement === void 0) {
                const fallbackActiveElement = referenceNode.elementFromPoint(centerX, centerY);
                if (fallbackActiveElement?.tagName === "ION-PICKER-COLUMN-OPTION") {
                  newActiveElement = fallbackActiveElement;
                }
              }
              if (newActiveElement === void 0 || newActiveElement.disabled) {
                return;
              }
              if (activeEl !== void 0) {
                this.setPickerItemActiveState(activeEl, false);
              }
              if (newActiveElement !== activeEl) {
                this.enableHaptics && hapticSelectionChanged();
                if (this.canExitInputMode) {
                  this.exitInputMode();
                }
              }
              activeEl = newActiveElement;
              this.setPickerItemActiveState(newActiveElement, true);
              if (this.updateValueTextOnScroll) {
                this.assistiveFocusable?.setAttribute("aria-valuetext", this.getOptionValueText(newActiveElement));
              }
              this.centeredOption = newActiveElement;
            });
          };
          const userScrollCallback = () => {
            this.isUserScroll = true;
            this.haltedAtScrollTop = void 0;
          };
          raf(() => {
            if (!scrollEl)
              return;
            scrollEl.addEventListener("scroll", scrollCallback);
            scrollEl.addEventListener("pointerdown", userScrollCallback);
            scrollEl.addEventListener("wheel", userScrollCallback, { passive: true });
            scrollEl.addEventListener("touchmove", userScrollCallback, { passive: true });
            this.destroyScrollListener = () => {
              scrollEl.removeEventListener("scroll", scrollCallback);
              scrollEl.removeEventListener("pointerdown", userScrollCallback);
              scrollEl.removeEventListener("wheel", userScrollCallback);
              scrollEl.removeEventListener("touchmove", userScrollCallback);
            };
          });
        };
        this.exitInputMode = () => {
          const { parentEl } = this;
          if (parentEl == null)
            return;
          parentEl.exitInputMode();
          this.el.classList.remove("picker-column-active");
        };
        this.findNextOption = (stride = 1) => {
          const { activeItem } = this;
          if (!activeItem)
            return null;
          let prevNode = activeItem;
          let node = activeItem.nextElementSibling;
          while (node != null) {
            if (stride > 0) {
              stride--;
            }
            if (node.tagName === "ION-PICKER-COLUMN-OPTION" && !node.disabled && stride === 0) {
              return node;
            }
            prevNode = node;
            node = node.nextElementSibling;
          }
          return prevNode;
        };
        this.findPreviousOption = (stride = 1) => {
          const { activeItem } = this;
          if (!activeItem)
            return null;
          let nextNode = activeItem;
          let node = activeItem.previousElementSibling;
          while (node != null) {
            if (stride > 0) {
              stride--;
            }
            if (node.tagName === "ION-PICKER-COLUMN-OPTION" && !node.disabled && stride === 0) {
              return node;
            }
            nextNode = node;
            node = node.previousElementSibling;
          }
          return nextNode;
        };
        this.onKeyDown = (ev) => {
          const mobile = isPlatform("mobile");
          let newOption = null;
          switch (ev.key) {
            case "ArrowDown":
              newOption = mobile ? this.findPreviousOption() : this.findNextOption();
              break;
            case "ArrowUp":
              newOption = mobile ? this.findNextOption() : this.findPreviousOption();
              break;
            case "PageUp":
              newOption = mobile ? this.findNextOption(5) : this.findPreviousOption(5);
              break;
            case "PageDown":
              newOption = mobile ? this.findPreviousOption(5) : this.findNextOption(5);
              break;
            case "Home":
              newOption = this.el.querySelector("ion-picker-column-option:first-of-type");
              break;
            case "End":
              newOption = this.el.querySelector("ion-picker-column-option:last-of-type");
              break;
          }
          if (newOption !== null) {
            this.setValue(newOption.value);
            ev.preventDefault();
          }
        };
        this.getOptionValueText = (el) => {
          return el ? el.getAttribute("aria-label") ?? el.innerText : "";
        };
      }
      ariaLabelChanged(newValue) {
        this.ariaLabel = newValue;
      }
      valueChange() {
        if (this.isColumnVisible) {
          this.scrollActiveItemIntoView(true);
        }
      }
      /**
       * Only setup scroll listeners
       * when the picker is visible, otherwise
       * the container will have a scroll
       * height of 0px.
       */
      componentWillLoad() {
        const parentEl = this.parentEl = this.el.closest("ion-picker");
        const visibleCallback = (entries) => {
          const ev = entries[entries.length - 1];
          if (ev.isIntersecting) {
            const { activeItem, el } = this;
            this.isColumnVisible = true;
            const oldActive = el.querySelector(`.${PICKER_ITEM_ACTIVE_CLASS}`);
            if (oldActive) {
              this.setPickerItemActiveState(oldActive, false);
            }
            this.scrollActiveItemIntoView();
            if (activeItem) {
              this.setPickerItemActiveState(activeItem, true);
            }
            this.initializeScrollListener();
          } else {
            this.isColumnVisible = false;
            this.stopWatchingForOutsidePress();
            this.centeredOption = void 0;
            this.haltedAtScrollTop = void 0;
            if (this.destroyScrollListener) {
              this.destroyScrollListener();
              this.destroyScrollListener = void 0;
            }
          }
        };
        new IntersectionObserver(visibleCallback, { threshold: 1e-3, root: this.parentEl }).observe(this.el);
        if (parentEl !== null) {
          parentEl.addEventListener("ionInputModeChange", (ev) => this.inputModeChange(ev));
        }
      }
      componentDidRender() {
        const { el, activeItem, isColumnVisible, value } = this;
        if (isColumnVisible && !activeItem) {
          const firstOption = el.querySelector("ion-picker-column-option");
          if (firstOption !== null && firstOption.value !== value) {
            this.setValue(firstOption.value);
          }
        }
      }
      /** @internal  */
      scrollActiveItemIntoView(smooth = false) {
        return __async(this, null, function* () {
          const activeEl = this.activeItem;
          if (activeEl) {
            this.centerPickerItemInView(activeEl, smooth, false);
          }
        });
      }
      /**
       * Sets the value prop and fires the ionChange event.
       * This is used when we need to fire ionChange from
       * user-generated events that cannot be caught with normal
       * input/change event listeners.
       * @internal
       */
      setValue(value) {
        return __async(this, null, function* () {
          if (this.disabled === true || this.value === value) {
            return;
          }
          this.value = value;
          this.ionChange.emit({ value });
        });
      }
      /**
       * Sets focus on the scrollable container within the picker column.
       * Use this method instead of the global `pickerColumn.focus()`.
       */
      setFocus() {
        return __async(this, null, function* () {
          if (this.assistiveFocusable) {
            this.assistiveFocusable.focus();
          }
        });
      }
      connectedCallback() {
        this.ariaLabel = this.el.getAttribute("aria-label") ?? "Select a value";
      }
      disconnectedCallback() {
        this.discardScroll();
      }
      get activeItem() {
        const { value } = this;
        const options = Array.from(this.el.querySelectorAll("ion-picker-column-option"));
        return options.find((option) => {
          if (!this.disabled && option.disabled) {
            return false;
          }
          return option.value === value;
        });
      }
      render() {
        const { color, disabled, isActive, numericInput } = this;
        const mode = getIonMode(this);
        return h(Host, { key: "60a893619d0b01fba53fbccef67a10d533a22657", class: createColorClasses(color, {
          [mode]: true,
          ["picker-column-active"]: isActive,
          ["picker-column-numeric-input"]: numericInput,
          ["picker-column-disabled"]: disabled
        }) }, h("slot", { key: "79f1e047f89c5ec916ed02efaac56ef3f73b8969", name: "prefix" }), h("div", { key: "c45c86e88353a196ff38159f40f390bc27852c9e", class: "picker-opts", ref: (el) => {
          this.scrollEl = el;
        }, role: "slider", tabindex: this.disabled ? void 0 : 0, "aria-label": this.ariaLabel, "aria-valuemin": 0, "aria-valuemax": 0, "aria-valuenow": 0, "aria-valuetext": this.getOptionValueText(this.activeItem), "aria-orientation": "vertical", onKeyDown: (ev) => this.onKeyDown(ev) }, h("div", { key: "e02d76752f5d3dd4cd2846fbc28645f1508a4b49", class: "picker-item-empty", "aria-hidden": "true" }, "\xA0"), h("div", { key: "d577bcbadc530970b2781692b050811633625c5a", class: "picker-item-empty", "aria-hidden": "true" }, "\xA0"), h("div", { key: "c89e78c3a896bc1f55b922d01df16fdbb1259bdd", class: "picker-item-empty", "aria-hidden": "true" }, "\xA0"), h("slot", { key: "6c597ff899692597432ee2aa0b42de53b86deed4" }), h("div", { key: "91686ed94f14c47647836ed4d63e54b5c54ee3b9", class: "picker-item-empty", "aria-hidden": "true" }, "\xA0"), h("div", { key: "2ff058c6d0e8cef4e143c2d848f9a52684579af1", class: "picker-item-empty", "aria-hidden": "true" }, "\xA0"), h("div", { key: "bc7386bec6fced36e44084a7a137b3fe6506c996", class: "picker-item-empty", "aria-hidden": "true" }, "\xA0")), h("slot", { key: "8835fd3f4e025bce964e6f05984c9aaadc20d7fb", name: "suffix" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "aria-label": [{
            "ariaLabelChanged": 0
          }],
          "value": [{
            "valueChange": 0
          }]
        };
      }
    };
    PICKER_ITEM_ACTIVE_CLASS = "option-active";
    SCROLL_END_DELAY = 250;
    HALT_TOLERANCE = 2;
    PickerColumn.style = pickerColumnCss();
  }
});
init_ion_picker_column_entry();
export {
  PickerColumn as ion_picker_column
};
//# debugId=bf948fe8-d57a-5387-98c0-64ac94cd4954
//# sourceMappingURL=chunk-ML4BZFMH.js.map
