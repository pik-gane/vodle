import {
  addEventListener,
  inheritAttributes,
  init_helpers_BJqKF1pr,
  raf,
  removeEventListener
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
  forceUpdate,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonError,
  printIonWarning,
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-segment_2.entry.js
var segmentIosCss, segmentMdCss, Segment, segmentButtonIosCss, segmentButtonMdCss, ids, SegmentButton;
var init_ion_segment_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-segment_2.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    segmentIosCss = () => `:host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:grid;grid-auto-columns:1fr;position:relative;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.segment-scrollable){-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:auto;grid-auto-columns:minmax(-webkit-min-content, 1fr);grid-auto-columns:minmax(min-content, 1fr)}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.065);border-radius:8px;overflow:hidden;z-index:0}:host(.ion-color){background:rgba(var(--ion-color-base-rgb), 0.065)}:host(.in-toolbar){-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;width:auto}:host(.in-toolbar:not(.ion-color)){background:var(--ion-toolbar-segment-background, var(--background))}:host(.in-toolbar-color:not(.ion-color)){background:rgba(var(--ion-color-contrast-rgb), 0.11)}`;
    segmentMdCss = () => `:host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:grid;grid-auto-columns:1fr;position:relative;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.segment-scrollable){-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:auto;grid-auto-columns:minmax(-webkit-min-content, 1fr);grid-auto-columns:minmax(min-content, 1fr)}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:transparent;grid-auto-columns:minmax(auto, 360px)}:host(.in-toolbar){min-height:var(--min-height)}:host(.segment-scrollable) ::slotted(ion-segment-button){min-width:auto}`;
    Segment = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionSelect = createEvent(this, "ionSelect", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.segmentViewEl = null;
        this.activated = false;
        this.disabled = false;
        this.scrollable = false;
        this.swipeGesture = true;
        this.selectOnFocus = false;
        this.onClick = (ev) => {
          const current = ev.target;
          const previous = this.checked;
          if (current.tagName === "ION-SEGMENT") {
            return;
          }
          this.value = current.value;
          if (current !== previous) {
            this.emitValueChange();
          }
          if (this.segmentViewEl) {
            this.updateSegmentView();
            if (this.scrollable && previous) {
              this.checkButton(previous, current);
            }
          } else if (this.scrollable || !this.swipeGesture) {
            if (previous) {
              this.checkButton(previous, current);
            } else {
              this.setCheckedClasses();
            }
          }
        };
        this.onSlottedItemsChange = () => {
          this.valueChanged(this.value);
        };
        this.getSegmentButton = (selector) => {
          const buttons = this.getButtons().filter((button) => !button.disabled);
          const currIndex = buttons.findIndex((button) => button === document.activeElement);
          switch (selector) {
            case "first":
              return buttons[0];
            case "last":
              return buttons[buttons.length - 1];
            case "next":
              return buttons[currIndex + 1] ?? buttons[0];
            case "previous":
              return buttons[currIndex - 1] ?? buttons[buttons.length - 1];
            default:
              return null;
          }
        };
      }
      colorChanged(value, oldValue) {
        if (oldValue === void 0 && value !== void 0 || oldValue !== void 0 && value === void 0) {
          this.emitStyle();
        }
      }
      swipeGestureChanged() {
        this.gestureChanged();
      }
      valueChanged(value, oldValue) {
        if (this.segmentViewEl && value === void 0) {
          this.value = this.getButtons()[0].value;
          return;
        }
        if (oldValue !== void 0 && value !== void 0) {
          const buttons = this.getButtons();
          const previous = buttons.find((button) => button.value === oldValue);
          const current = buttons.find((button) => button.value === value);
          if (previous && current) {
            if (!this.segmentViewEl) {
              this.checkButton(previous, current);
            } else if (this.triggerScrollOnValueChange !== false) {
              this.updateSegmentView();
            }
          }
        } else if (value !== void 0 && oldValue === void 0 && this.segmentViewEl) {
          this.updateSegmentView();
        }
        this.ionSelect.emit({ value });
        if (!this.segmentViewEl) {
          this.scrollActiveButtonIntoView();
        }
        this.triggerScrollOnValueChange = void 0;
      }
      disabledChanged() {
        this.gestureChanged();
        if (!this.segmentViewEl) {
          const buttons = this.getButtons();
          for (const button of buttons) {
            button.disabled = this.disabled;
          }
        } else {
          this.segmentViewEl.disabled = this.disabled;
        }
      }
      gestureChanged() {
        if (this.gesture) {
          this.gesture.enable(!this.scrollable && !this.disabled && this.swipeGesture);
        }
      }
      connectedCallback() {
        this.emitStyle();
        this.segmentViewEl = this.getSegmentView();
      }
      disconnectedCallback() {
        this.segmentViewEl = null;
      }
      componentWillLoad() {
        this.emitStyle();
      }
      componentDidLoad() {
        return __async(this, null, function* () {
          this.segmentViewEl = this.getSegmentView();
          this.setCheckedClasses();
          raf(() => {
            this.scrollActiveButtonIntoView(false);
          });
          this.gesture = (yield import("./chunk-YHTSP4B3.js")).createGesture({
            el: this.el,
            gestureName: "segment",
            gesturePriority: 100,
            threshold: 0,
            passive: false,
            onStart: (ev) => this.onStart(ev),
            onMove: (ev) => this.onMove(ev),
            onEnd: (ev) => this.onEnd(ev)
          });
          this.gestureChanged();
          if (this.disabled) {
            this.disabledChanged();
          }
          this.updateSegmentView(false);
        });
      }
      onStart(detail) {
        this.valueBeforeGesture = this.value;
        this.activate(detail);
      }
      onMove(detail) {
        this.setNextIndex(detail);
      }
      onEnd(detail) {
        this.setActivated(false);
        this.setNextIndex(detail, true);
        detail.event.stopImmediatePropagation();
        const value = this.value;
        if (value !== void 0) {
          if (this.valueBeforeGesture !== value) {
            this.emitValueChange();
            this.updateSegmentView();
          }
        }
        this.valueBeforeGesture = void 0;
      }
      /**
       * Emits an `ionChange` event.
       *
       * This API should be called for user committed changes.
       * This API should not be used for external value changes.
       */
      emitValueChange() {
        const { value } = this;
        this.ionChange.emit({ value });
      }
      getButtons() {
        return Array.from(this.el.querySelectorAll("ion-segment-button"));
      }
      get checked() {
        return this.getButtons().find((button) => button.value === this.value);
      }
      /*
       * Activate both the segment and the buttons
       * due to a bug with ::slotted in Safari
       */
      setActivated(activated) {
        const buttons = this.getButtons();
        buttons.forEach((button) => {
          button.classList.toggle("segment-button-activated", activated);
        });
        this.activated = activated;
      }
      activate(detail) {
        const clicked = detail.event.target;
        const buttons = this.getButtons();
        const checked = buttons.find((button) => button.value === this.value);
        if (clicked.tagName !== "ION-SEGMENT-BUTTON") {
          return;
        }
        if (!checked) {
          this.value = clicked.value;
          this.setCheckedClasses();
        }
        if (this.value === clicked.value) {
          this.setActivated(true);
        }
      }
      getIndicator(button) {
        const root = button.shadowRoot || button;
        return root.querySelector(".segment-button-indicator");
      }
      checkButton(previous, current) {
        const previousIndicator = this.getIndicator(previous);
        const currentIndicator = this.getIndicator(current);
        if (previousIndicator === null || currentIndicator === null) {
          return;
        }
        const previousClientRect = previousIndicator.getBoundingClientRect();
        const currentClientRect = currentIndicator.getBoundingClientRect();
        const widthDelta = previousClientRect.width / currentClientRect.width;
        const xPosition = previousClientRect.left - currentClientRect.left;
        const transform = `translate3d(${xPosition}px, 0, 0) scaleX(${widthDelta})`;
        writeTask(() => {
          currentIndicator.classList.remove("segment-button-indicator-animated");
          currentIndicator.style.setProperty("transform", transform);
          currentIndicator.getBoundingClientRect();
          currentIndicator.classList.add("segment-button-indicator-animated");
          currentIndicator.style.setProperty("transform", "");
          this.scrollActiveButtonIntoView(true);
        });
        this.value = current.value;
        this.setCheckedClasses();
      }
      setCheckedClasses() {
        const buttons = this.getButtons();
        const index = buttons.findIndex((button) => button.value === this.value);
        const next = index + 1;
        for (const button of buttons) {
          button.classList.remove("segment-button-after-checked");
        }
        if (next < buttons.length) {
          buttons[next].classList.add("segment-button-after-checked");
        }
      }
      getSegmentView() {
        const buttons = this.getButtons();
        const firstContentId = buttons.find((button) => button.contentId);
        const segmentContent = document.querySelector(`ion-segment-content[id="${firstContentId?.contentId}"]`);
        return segmentContent?.closest("ion-segment-view");
      }
      handleSegmentViewScroll(ev) {
        const { scrollRatio, isManualScroll } = ev.detail;
        if (!isManualScroll) {
          return;
        }
        const dispatchedFrom = ev.target;
        const segmentViewEl = this.segmentViewEl;
        const segmentEl = this.el;
        if (ev.composedPath().includes(segmentViewEl) || dispatchedFrom?.contains(segmentEl)) {
          const buttons = this.getButtons();
          if (!buttons.length)
            return;
          const index = buttons.findIndex((button) => button.value === this.value);
          const current = buttons[index];
          const nextIndex = Math.round(scrollRatio * (buttons.length - 1));
          if (buttons[nextIndex]?.disabled) {
            return;
          }
          if (this.lastNextIndex === void 0 || this.lastNextIndex !== nextIndex) {
            this.lastNextIndex = nextIndex;
            this.triggerScrollOnValueChange = false;
            this.checkButton(current, buttons[nextIndex]);
            this.emitValueChange();
          }
        }
      }
      /**
       * Finds the related segment view and sets its current content
       * based on the selected segment button. This method
       * should be called on initial load of the segment,
       * after the gesture is completed (if dragging between segments)
       * and when a segment button is clicked directly.
       */
      updateSegmentView(smoothScroll = true) {
        const buttons = this.getButtons();
        const button = buttons.find((btn) => btn.value === this.value);
        if (!button?.contentId) {
          return;
        }
        const segmentView = this.segmentViewEl;
        if (segmentView) {
          segmentView.setContent(button.contentId, smoothScroll);
        }
      }
      scrollActiveButtonIntoView(smoothScroll = true) {
        const { scrollable, value, el } = this;
        if (scrollable) {
          const buttons = this.getButtons();
          const activeButton = buttons.find((button) => button.value === value);
          if (activeButton !== void 0) {
            const scrollContainerBox = el.getBoundingClientRect();
            const activeButtonBox = activeButton.getBoundingClientRect();
            const activeButtonLeft = activeButtonBox.x - scrollContainerBox.x;
            const centeredX = activeButtonLeft - scrollContainerBox.width / 2 + activeButtonBox.width / 2;
            const newScrollPosition = el.scrollLeft + centeredX;
            el.scrollTo({
              top: 0,
              left: newScrollPosition,
              behavior: smoothScroll ? "smooth" : "instant"
            });
          }
        }
      }
      setNextIndex(detail, isEnd = false) {
        const rtl = isRTL(this.el);
        const activated = this.activated;
        const buttons = this.getButtons();
        const index = buttons.findIndex((button) => button.value === this.value);
        const previous = buttons[index];
        let current;
        let nextIndex;
        if (index === -1) {
          return;
        }
        const rect = previous.getBoundingClientRect();
        const left = rect.left;
        const width = rect.width;
        const currentX = detail.currentX;
        const previousY = rect.top + rect.height / 2;
        const root = this.el.getRootNode();
        const nextEl = root.elementFromPoint(currentX, previousY);
        const decreaseIndex = rtl ? currentX > left + width : currentX < left;
        const increaseIndex = rtl ? currentX < left : currentX > left + width;
        if (activated && !isEnd) {
          if (decreaseIndex) {
            const newIndex = index - 1;
            if (newIndex >= 0) {
              nextIndex = newIndex;
            }
          } else if (increaseIndex) {
            if (activated && !isEnd) {
              const newIndex = index + 1;
              if (newIndex < buttons.length) {
                nextIndex = newIndex;
              }
            }
          }
          if (nextIndex !== void 0 && !buttons[nextIndex].disabled) {
            current = buttons[nextIndex];
          }
        }
        if (!activated && isEnd) {
          current = nextEl;
        }
        if (current != null) {
          if (current.tagName === "ION-SEGMENT") {
            return false;
          }
          if (previous !== current) {
            this.checkButton(previous, current);
          }
        }
        return true;
      }
      emitStyle() {
        this.ionStyle.emit({
          segment: true
        });
      }
      onKeyDown(ev) {
        const rtl = isRTL(this.el);
        let keyDownSelectsButton = this.selectOnFocus;
        let current;
        switch (ev.key) {
          case "ArrowRight":
            ev.preventDefault();
            current = rtl ? this.getSegmentButton("previous") : this.getSegmentButton("next");
            break;
          case "ArrowLeft":
            ev.preventDefault();
            current = rtl ? this.getSegmentButton("next") : this.getSegmentButton("previous");
            break;
          case "Home":
            ev.preventDefault();
            current = this.getSegmentButton("first");
            break;
          case "End":
            ev.preventDefault();
            current = this.getSegmentButton("last");
            break;
          case " ":
          case "Enter":
            ev.preventDefault();
            current = document.activeElement;
            keyDownSelectsButton = true;
        }
        if (!current) {
          return;
        }
        if (keyDownSelectsButton) {
          const previous = this.checked;
          this.checkButton(previous || current, current);
          if (current !== previous) {
            this.emitValueChange();
          }
        }
        current.setFocus();
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "f74bd72f10f966129528497aa47b2c683a62d59e", role: "tablist", onClick: this.onClick, class: createColorClasses(this.color, {
          [mode]: true,
          "in-toolbar": hostContext("ion-toolbar", this.el),
          "in-toolbar-color": hostContext("ion-toolbar[color]", this.el),
          "segment-activated": this.activated,
          "segment-disabled": this.disabled,
          "segment-scrollable": this.scrollable
        }) }, h("slot", { key: "79b0c6cce9d83d147b190ae5d77df7de29a6b42d", onSlotchange: this.onSlottedItemsChange }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "color": [{
            "colorChanged": 0
          }],
          "swipeGesture": [{
            "swipeGestureChanged": 0
          }],
          "value": [{
            "valueChanged": 0
          }],
          "disabled": [{
            "disabledChanged": 0
          }]
        };
      }
    };
    Segment.style = {
      ios: segmentIosCss(),
      md: segmentMdCss()
    };
    segmentButtonIosCss = () => `:host{--color:initial;--color-hover:var(--color);--color-checked:var(--color);--color-disabled:var(--color);--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:column;flex-direction:column;height:auto;background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;grid-row:1;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;pointer-events:none;overflow:hidden;z-index:2}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:inherit;flex-flow:inherit;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-disabled){cursor:default;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(:focus){outline:none}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.segment-button-checked:hover) .button-native{color:var(--color-checked)}}::slotted(ion-icon){-ms-flex-negative:0;flex-shrink:0;-ms-flex-order:-1;order:-1;pointer-events:none}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;line-height:22px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host(.segment-button-layout-icon-top) .button-native{-ms-flex-direction:column;flex-direction:column}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon){display:none}:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color, var(--color-checked))}.segment-button-indicator{-webkit-transform-origin:left;transform-origin:left;position:absolute;opacity:0;-webkit-box-sizing:border-box;box-sizing:border-box;will-change:transform, opacity;pointer-events:none}.segment-button-indicator-background{width:100%;height:var(--indicator-height);-webkit-transform:var(--indicator-transform);transform:var(--indicator-transform);-webkit-box-shadow:var(--indicator-box-shadow);box-shadow:var(--indicator-box-shadow);pointer-events:none}.segment-button-indicator-animated{-webkit-transition:var(--indicator-transition);transition:var(--indicator-transition)}:host(.segment-button-checked) .segment-button-indicator{opacity:1}@media (prefers-reduced-motion: reduce){.segment-button-indicator-background{-webkit-transform:none;transform:none}.segment-button-indicator-animated{-webkit-transition:none;transition:none}}:host{--background:none;--background-checked:none;--background-hover:none;--background-hover-opacity:0;--background-focused:none;--background-focused-opacity:0;--border-radius:7px;--border-width:1px;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.12);--border-style:solid;--indicator-box-shadow:0 0 5px rgba(0, 0, 0, 0.16);--indicator-color:var(--ion-color-step-350, var(--ion-background-color-step-350, var(--ion-background-color, #fff)));--indicator-height:100%;--indicator-transition:transform 260ms cubic-bezier(0.4, 0, 0.2, 1);--indicator-transform:none;--transition:100ms all linear;--padding-top:0;--padding-end:13px;--padding-bottom:0;--padding-start:13px;margin-top:2px;margin-bottom:2px;position:relative;-ms-flex-direction:row;flex-direction:row;min-width:70px;min-height:28px;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);font-size:13px;font-weight:450;line-height:37px}:host::before{margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px;-webkit-transition:160ms opacity ease-in-out;transition:160ms opacity ease-in-out;-webkit-transition-delay:100ms;transition-delay:100ms;border-left:var(--border-width) var(--border-style) var(--border-color);content:"";opacity:1;will-change:opacity}:host(:first-of-type)::before{border-left-color:transparent}:host(.segment-button-disabled){opacity:0.3}::slotted(ion-icon){font-size:24px}:host(.segment-button-layout-icon-start) ::slotted(ion-label){-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:0;margin-inline-end:0}:host(.segment-button-layout-icon-end) ::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:2px;margin-inline-end:2px}.segment-button-indicator{-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px;left:0;right:0;top:0;bottom:0}.segment-button-indicator-background{border-radius:var(--border-radius);background:var(--indicator-color)}.segment-button-indicator-background{-webkit-transition:var(--indicator-transition);transition:var(--indicator-transition)}:host(.segment-button-checked)::before,:host(.segment-button-after-checked)::before{opacity:0}:host(.segment-button-checked){z-index:-1}:host(.segment-button-activated){--indicator-transform:scale(0.95)}:host(.ion-focused) .button-native{opacity:0.7}@media (any-hover: hover){:host(:hover) .button-native{opacity:0.5}:host(.segment-button-checked:hover) .button-native{opacity:1}}:host(.in-segment-color){background:none;color:var(--ion-text-color, #000)}:host(.in-segment-color) .segment-button-indicator-background{background:var(--ion-color-step-350, var(--ion-background-color-step-350, var(--ion-background-color, #fff)))}@media (any-hover: hover){:host(.in-segment-color:hover) .button-native,:host(.in-segment-color.segment-button-checked:hover) .button-native{color:var(--ion-text-color, #000)}}:host(.in-toolbar:not(.in-segment-color)){--background-checked:var(--ion-toolbar-segment-background-checked, none);--color:var(--ion-toolbar-segment-color, var(--ion-toolbar-color), initial);--color-checked:var(--ion-toolbar-segment-color-checked, var(--ion-toolbar-color), initial);--indicator-color:var(--ion-toolbar-segment-indicator-color, var(--ion-color-step-350, var(--ion-background-color-step-350, var(--ion-background-color, #fff))))}:host(.in-toolbar-color) .segment-button-indicator-background{background:var(--ion-color-contrast)}:host(.in-toolbar-color:not(.in-segment-color)) .button-native{color:var(--ion-color-contrast)}:host(.in-toolbar-color.segment-button-checked:not(.in-segment-color)) .button-native{color:var(--ion-color-base)}@media (any-hover: hover){:host(.in-toolbar-color:not(.in-segment-color):hover) .button-native{color:var(--ion-color-contrast)}:host(.in-toolbar-color.segment-button-checked:not(.in-segment-color):hover) .button-native{color:var(--ion-color-base)}}`;
    segmentButtonMdCss = () => `:host{--color:initial;--color-hover:var(--color);--color-checked:var(--color);--color-disabled:var(--color);--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;border-radius:var(--border-radius);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:column;flex-direction:column;height:auto;background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;grid-row:1;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:0;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;pointer-events:none;overflow:hidden;z-index:2}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:inherit;flex-flow:inherit;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;z-index:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-disabled){cursor:default;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(:focus){outline:none}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.segment-button-checked:hover) .button-native{color:var(--color-checked)}}::slotted(ion-icon){-ms-flex-negative:0;flex-shrink:0;-ms-flex-order:-1;order:-1;pointer-events:none}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;line-height:22px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host(.segment-button-layout-icon-top) .button-native{-ms-flex-direction:column;flex-direction:column}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon){display:none}:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color, var(--color-checked))}.segment-button-indicator{-webkit-transform-origin:left;transform-origin:left;position:absolute;opacity:0;-webkit-box-sizing:border-box;box-sizing:border-box;will-change:transform, opacity;pointer-events:none}.segment-button-indicator-background{width:100%;height:var(--indicator-height);-webkit-transform:var(--indicator-transform);transform:var(--indicator-transform);-webkit-box-shadow:var(--indicator-box-shadow);box-shadow:var(--indicator-box-shadow);pointer-events:none}.segment-button-indicator-animated{-webkit-transition:var(--indicator-transition);transition:var(--indicator-transition)}:host(.segment-button-checked) .segment-button-indicator{opacity:1}@media (prefers-reduced-motion: reduce){.segment-button-indicator-background{-webkit-transform:none;transform:none}.segment-button-indicator-animated{-webkit-transition:none;transition:none}}:host{--background:none;--background-checked:none;--background-hover:var(--color-checked);--background-focused:var(--color-checked);--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04;--color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6);--color-checked:var(--ion-color-primary, #0054e9);--indicator-box-shadow:none;--indicator-color:var(--color-checked);--indicator-height:2px;--indicator-transition:transform 250ms cubic-bezier(0.4, 0, 0.2, 1);--indicator-transform:none;--padding-top:0;--padding-end:16px;--padding-bottom:0;--padding-start:16px;--transition:color 0.15s linear 0s, opacity 0.15s linear 0s;min-width:90px;min-height:48px;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);font-size:14px;font-weight:500;letter-spacing:0.06em;line-height:40px;text-transform:uppercase}:host(.segment-button-disabled){opacity:0.3}:host(.in-segment-color){background:none;color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6)}:host(.in-segment-color) ion-ripple-effect{color:var(--ion-color-base)}:host(.in-segment-color) .segment-button-indicator-background{background:var(--ion-color-base)}:host(.in-segment-color.segment-button-checked) .button-native{color:var(--ion-color-base)}:host(.in-segment-color.ion-focused) .button-native::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.in-segment-color:hover) .button-native{color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6)}:host(.in-segment-color:hover) .button-native::after{background:var(--ion-color-base)}:host(.in-segment-color.segment-button-checked:hover) .button-native{color:var(--ion-color-base)}}:host(.in-toolbar:not(.in-segment-color)){--background:var(--ion-toolbar-segment-background, none);--background-checked:var(--ion-toolbar-segment-background-checked, none);--color:var(--ion-toolbar-segment-color, rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.6));--color-checked:var(--ion-toolbar-segment-color-checked, var(--ion-color-primary, #0054e9));--indicator-color:var(--ion-toolbar-segment-color-checked, var(--color-checked))}:host(.in-toolbar-color:not(.in-segment-color)) .button-native{color:rgba(var(--ion-color-contrast-rgb), 0.6)}:host(.in-toolbar-color.segment-button-checked:not(.in-segment-color)) .button-native{color:var(--ion-color-contrast)}@media (any-hover: hover){:host(.in-toolbar-color:not(.in-segment-color)) .button-native::after{background:var(--ion-color-contrast)}}::slotted(ion-icon){margin-top:12px;margin-bottom:12px;font-size:24px}::slotted(ion-label){margin-top:12px;margin-bottom:12px}:host(.segment-button-layout-icon-top) ::slotted(ion-label),:host(.segment-button-layout-icon-bottom) ::slotted(ion-icon){margin-top:0}:host(.segment-button-layout-icon-top) ::slotted(ion-icon),:host(.segment-button-layout-icon-bottom) ::slotted(ion-label){margin-bottom:0}:host(.segment-button-layout-icon-start) ::slotted(ion-label){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0}:host(.segment-button-layout-icon-end) ::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}:host(.segment-button-has-icon-only) ::slotted(ion-icon){margin-top:12px;margin-bottom:12px}:host(.segment-button-has-label-only) ::slotted(ion-label){margin-top:12px;margin-bottom:12px}.segment-button-indicator{left:0;right:0;bottom:0}.segment-button-indicator-background{background:var(--indicator-color)}:host(.in-toolbar:not(.in-segment-color)) .segment-button-indicator-background{background:var(--ion-toolbar-segment-indicator-color, var(--indicator-color))}:host(.in-toolbar-color:not(.in-segment-color)) .segment-button-indicator-background{background:var(--ion-color-contrast)}`;
    ids = 0;
    SegmentButton = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.segmentEl = null;
        this.inheritedAttributes = {};
        this.checked = false;
        this.disabled = false;
        this.layout = "icon-top";
        this.type = "button";
        this.value = "ion-sb-" + ids++;
        this.updateStyle = () => {
          forceUpdate(this);
        };
        this.updateState = () => {
          const { segmentEl } = this;
          if (segmentEl) {
            this.checked = segmentEl.value === this.value;
            if (segmentEl.disabled) {
              this.disabled = true;
            }
          }
        };
      }
      valueChanged() {
        this.updateState();
      }
      connectedCallback() {
        const segmentEl = this.segmentEl = this.el.closest("ion-segment");
        if (segmentEl) {
          this.updateState();
          addEventListener(segmentEl, "ionSelect", this.updateState);
          addEventListener(segmentEl, "ionStyle", this.updateStyle);
        }
      }
      disconnectedCallback() {
        const segmentEl = this.segmentEl;
        if (segmentEl) {
          removeEventListener(segmentEl, "ionSelect", this.updateState);
          removeEventListener(segmentEl, "ionStyle", this.updateStyle);
          this.segmentEl = null;
        }
      }
      componentWillLoad() {
        this.inheritedAttributes = __spreadValues({}, inheritAttributes(this.el, ["aria-label"]));
        if (!this.contentId)
          return;
        if (this.disabled && this.segmentEl?.disabled !== true) {
          printIonWarning(`[ion-segment-button] - Segment buttons cannot be disabled when associated with an <ion-segment-content>.`);
          this.disabled = false;
        }
        const segmentContent = document.getElementById(this.contentId);
        if (!segmentContent) {
          printIonError(`[ion-segment-button] - Unable to find Segment Content with id="${this.contentId}".`);
          return;
        }
        if (segmentContent.tagName !== "ION-SEGMENT-CONTENT") {
          printIonError(`[ion-segment-button] - Element with id="${this.contentId}" is not an <ion-segment-content> element.`);
          return;
        }
      }
      get hasLabel() {
        return !!this.el.querySelector("ion-label");
      }
      get hasIcon() {
        return !!this.el.querySelector("ion-icon");
      }
      /**
       * @internal
       * Focuses the native <button> element
       * inside of ion-segment-button.
       */
      setFocus() {
        return __async(this, null, function* () {
          const { nativeEl } = this;
          if (nativeEl !== void 0) {
            nativeEl.focus();
          }
        });
      }
      render() {
        const { checked, type, disabled, hasIcon, hasLabel, layout, segmentEl } = this;
        const mode = getIonMode(this);
        const hasSegmentColor = () => segmentEl?.color !== void 0;
        return h(Host, { key: "d8acc71d87e26b32f20b2d0f9a6acc9f0dab0dee", class: {
          [mode]: true,
          "in-toolbar": hostContext("ion-toolbar", this.el),
          "in-toolbar-color": hostContext("ion-toolbar[color]", this.el),
          "in-segment": hostContext("ion-segment", this.el),
          "in-segment-color": hasSegmentColor(),
          "segment-button-has-label": hasLabel,
          "segment-button-has-icon": hasIcon,
          "segment-button-has-label-only": hasLabel && !hasIcon,
          "segment-button-has-icon-only": hasIcon && !hasLabel,
          "segment-button-disabled": disabled,
          "segment-button-checked": checked,
          [`segment-button-layout-${layout}`]: true,
          "ion-activatable": true,
          "ion-activatable-instant": true,
          "ion-focusable": true
        } }, h("button", __spreadValues({ key: "ce65da07b1a012bce353b3c6c24eecfbd4071d54", "aria-selected": checked ? "true" : "false", role: "tab", ref: (el) => this.nativeEl = el, type, class: "button-native", part: "native", disabled }, this.inheritedAttributes), h("span", { key: "6c4b4dcd20e407e5dc31674bea23633d8a09187a", class: "button-inner" }, h("slot", { key: "817145ae77a3c5ada88ab95723d881f1bde96b2a" })), mode === "md" && h("ion-ripple-effect", { key: "054d7e5e2a13013914fac6bbde8efdb28d9b459e" })), h("div", { key: "c48074881a302510ad4752eeb9383222cd3a54cb", part: "indicator", class: "segment-button-indicator segment-button-indicator-animated" }, h("div", { key: "7672a6b10ee18ad026b798fbd8207dc3cd5683f9", part: "indicator-background", class: "segment-button-indicator-background" })));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "value": [{
            "valueChanged": 0
          }]
        };
      }
    };
    SegmentButton.style = {
      ios: segmentButtonIosCss(),
      md: segmentButtonMdCss()
    };
  }
});
init_ion_segment_2_entry();
export {
  Segment as ion_segment,
  SegmentButton as ion_segment_button
};
//# debugId=4871fa2c-505a-53c1-8d14-27e6491f09c9
//# sourceMappingURL=chunk-BWPI3PL2.js.map
