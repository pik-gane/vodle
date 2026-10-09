import {
  init_watch_options_Dtdm8lKC,
  watchForOptions
} from "./chunk-TAKGTFOB.js";
import {
  disableContentScrollY,
  findClosestIonContent,
  init_index_TkLga3ma,
  resetContentScrollY
} from "./chunk-57PV5QBJ.js";
import {
  componentOnReady,
  init_helpers_BJqKF1pr,
  isEndSide
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
  createEvent,
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

// node_modules/@ionic/core/dist/esm/ion-item-option_3.entry.js
var itemOptionIosCss, itemOptionMdCss, ItemOption, itemOptionsIosCss, itemOptionsMdCss, ItemOptions, itemSlidingCss, SWIPE_MARGIN, ELASTIC_FACTOR, openSlidingItem, ItemSliding, swipeShouldReset;
var init_ion_item_option_3_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-item-option_3.entry.js"() {
    init_index_BpRUsN_W();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_helpers_BJqKF1pr();
    init_index_TkLga3ma();
    init_watch_options_Dtdm8lKC();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    itemOptionIosCss = () => `:host{--background:var(--ion-color-primary, #0054e9);--color:var(--ion-color-primary-contrast, #fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-padding-start:0.7em;padding-inline-start:0.7em;-webkit-padding-end:0.7em;padding-inline-end:0.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}.button-inner{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.horizontal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%}::slotted(*){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:0;margin-bottom:0;min-width:0.9em;font-size:1.8em}:host(.item-option-expandable){-ms-flex-negative:0;flex-shrink:0;-webkit-transition-duration:0;transition-duration:0;-webkit-transition-property:none;transition-property:none;-webkit-transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1);transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:0.5;pointer-events:none}:host{font-size:clamp(16px, 1rem, 35.2px)}:host(.ion-activated){background:var(--ion-color-primary-shade, #004acd)}:host(.ion-color.ion-activated){background:var(--ion-color-shade)}`;
    itemOptionMdCss = () => `:host{--background:var(--ion-color-primary, #0054e9);--color:var(--ion-color-primary-contrast, #fff);background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit)}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-padding-start:0.7em;padding-inline-start:0.7em;-webkit-padding-end:0.7em;padding-inline-end:0.7em;padding-top:0;padding-bottom:0;display:inline-block;position:relative;width:100%;height:100%;border:0;outline:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}.button-inner{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.horizontal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%}::slotted(*){-ms-flex-negative:0;flex-shrink:0}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted([slot=end]){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}::slotted([slot=icon-only]){padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px;margin-top:0;margin-bottom:0;min-width:0.9em;font-size:1.8em}:host(.item-option-expandable){-ms-flex-negative:0;flex-shrink:0;-webkit-transition-duration:0;transition-duration:0;-webkit-transition-property:none;transition-property:none;-webkit-transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1);transition-timing-function:cubic-bezier(0.65, 0.05, 0.36, 1)}:host(.item-option-disabled){pointer-events:none}:host(.item-option-disabled) .button-native{cursor:default;opacity:0.5;pointer-events:none}:host{font-size:0.875rem;font-weight:500;text-transform:uppercase}`;
    ItemOption = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.disabled = false;
        this.expandable = false;
        this.type = "button";
        this.onClick = (ev) => {
          const el = ev.target.closest("ion-item-option");
          if (el) {
            ev.preventDefault();
          }
        };
      }
      render() {
        const { disabled, expandable, href } = this;
        const TagType = href === void 0 ? "button" : "a";
        const mode = getIonMode(this);
        const attrs = TagType === "button" ? { type: this.type } : {
          download: this.download,
          href: this.href,
          target: this.target
        };
        return h(Host, { key: "a10d36e60d61865141c57c03a114e4845b400a55", onClick: this.onClick, class: createColorClasses(this.color, {
          [mode]: true,
          "item-option-disabled": disabled,
          "item-option-expandable": expandable,
          "ion-activatable": true
        }) }, h(TagType, __spreadProps(__spreadValues({ key: "5cc49ef73318213f6202d1d0f460f629ea65f17f" }, attrs), { class: "button-native", part: "native", disabled }), h("span", { key: "0643b16660b4ca00b0f3b4dbe2739e9ce076abea", class: "button-inner", part: "inner" }, h("slot", { key: "8778d6d09aa9e0db278ce00c5456a1acfe82c15f", name: "top" }), h("div", { key: "4fc849494c8cb2380015161e096b5c61cf517d90", class: "horizontal-wrapper", part: "container" }, h("slot", { key: "9d0c0a5a63d8ec636df9c85d48bbdb39fb63af5e", name: "start" }), h("slot", { key: "a40561497c7e7d73173edd24ed335230e6eebb2b", name: "icon-only" }), h("slot", { key: "b94f2a4aa5bf4a1104497ced1920d6ee43d33659" }), h("slot", { key: "91713dbb3e6a617c00f950857f2ed5e5ffceaa9a", name: "end" })), h("slot", { key: "f5af33c3bfb50fc629a06e1120bba55da07b2afb", name: "bottom" })), mode === "md" && h("ion-ripple-effect", { key: "fc56e1644ef9c5b2e1e66683465a7fd09c05215c" })));
      }
      get el() {
        return getElement(this);
      }
    };
    ItemOption.style = {
      ios: itemOptionIosCss(),
      md: itemOptionMdCss()
    };
    itemOptionsIosCss = () => `ion-item-options{top:0;right:0;-ms-flex-pack:end;justify-content:flex-end;display:none;position:absolute;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] ion-item-options{-ms-flex-pack:start;justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){ion-item-options:dir(rtl){-ms-flex-pack:start;justify-content:flex-start}ion-item-options:dir(rtl):not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}}.item-options-start{right:auto;left:0;-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] .item-options-start{-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){.item-options-start:dir(rtl){-ms-flex-pack:end;justify-content:flex-end}}[dir=ltr] .item-options-start ion-item-option:first-child,[dir=rtl] .item-options-start ion-item-option:last-child{padding-left:var(--ion-safe-area-left)}[dir=ltr] .item-options-end ion-item-option:last-child,[dir=rtl] .item-options-end ion-item-option:first-child{padding-right:var(--ion-safe-area-right)}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}@supports selector(:dir(rtl)){.item-sliding-active-slide:dir(rtl).item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}}.item-sliding-active-slide ion-item-options{display:-ms-flexbox;display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-ios{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))))}.item-options-ios.item-options-end{border-bottom-width:0.55px}.list-ios-lines-none .item-options-ios{border-bottom-width:0}.list-ios-lines-full .item-options-ios,.list-ios-lines-inset .item-options-ios.item-options-end{border-bottom-width:0.55px}`;
    itemOptionsMdCss = () => `ion-item-options{top:0;right:0;-ms-flex-pack:end;justify-content:flex-end;display:none;position:absolute;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1}:host-context([dir=rtl]) ion-item-options{-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] ion-item-options{-ms-flex-pack:start;justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){ion-item-options:dir(rtl){-ms-flex-pack:start;justify-content:flex-start}ion-item-options:dir(rtl):not(.item-options-end){right:auto;left:0;-ms-flex-pack:end;justify-content:flex-end}}.item-options-start{right:auto;left:0;-ms-flex-pack:start;justify-content:flex-start}:host-context([dir=rtl]) .item-options-start{-ms-flex-pack:end;justify-content:flex-end}[dir=rtl] .item-options-start{-ms-flex-pack:end;justify-content:flex-end}@supports selector(:dir(rtl)){.item-options-start:dir(rtl){-ms-flex-pack:end;justify-content:flex-end}}[dir=ltr] .item-options-start ion-item-option:first-child,[dir=rtl] .item-options-start ion-item-option:last-child{padding-left:var(--ion-safe-area-left)}[dir=ltr] .item-options-end ion-item-option:last-child,[dir=rtl] .item-options-end ion-item-option:first-child{padding-right:var(--ion-safe-area-right)}:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}@supports selector(:dir(rtl)){.item-sliding-active-slide:dir(rtl).item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}}.item-sliding-active-slide ion-item-options{display:-ms-flexbox;display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-md{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))))}.list-md-lines-none .item-options-md{border-bottom-width:0}.list-md-lines-full .item-options-md,.list-md-lines-inset .item-options-md.item-options-end{border-bottom-width:1px}`;
    ItemOptions = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionSwipe = createEvent(this, "ionSwipe", 7);
        this.side = "end";
      }
      /** @internal */
      fireSwipeEvent() {
        return __async(this, null, function* () {
          this.ionSwipe.emit({
            side: this.side
          });
        });
      }
      render() {
        const mode = getIonMode(this);
        const isEnd = isEndSide(this.side);
        return h(Host, { key: "6e60ff004d48bf7701711e518ec0b21264496ae8", class: {
          [mode]: true,
          // Used internally for styling
          [`item-options-${mode}`]: true,
          /**
           * Note: The "start" and "end" terms refer to the
           * direction ion-item-option instances within ion-item-options flow.
           * They do not refer to how ion-item-options flows within ion-item-sliding.
           * As a result, "item-options-start" means the ion-item-options container
           * always appears on the left, and "item-options-end" means the ion-item-options
           * container always appears on the right.
           */
          "item-options-start": !isEnd,
          "item-options-end": isEnd
        } });
      }
      get el() {
        return getElement(this);
      }
    };
    ItemOptions.style = {
      ios: itemOptionsIosCss(),
      md: itemOptionsMdCss()
    };
    itemSlidingCss = () => `ion-item-sliding{display:block;position:relative;width:100%;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-item-sliding .item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.item-sliding-active-slide .item{position:relative;-webkit-transition:-webkit-transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);transition:-webkit-transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);transition:transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);transition:transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1), -webkit-transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1);opacity:1;z-index:2;pointer-events:none;will-change:transform}.item-sliding-closing ion-item-options{pointer-events:none}.item-sliding-active-swipe-end .item-options-end .item-option-expandable{padding-left:100%;-ms-flex-order:1;order:1;-webkit-transition-duration:0.6s;transition-duration:0.6s;-webkit-transition-property:padding-left;transition-property:padding-left}:host-context([dir=rtl]) .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}[dir=rtl] .item-sliding-active-swipe-end .item-options-end .item-option-expandable{-ms-flex-order:-1;order:-1}@supports selector(:dir(rtl)){.item-sliding-active-swipe-end .item-options-end .item-option-expandable:dir(rtl){-ms-flex-order:-1;order:-1}}.item-sliding-active-swipe-start .item-options-start .item-option-expandable{padding-right:100%;-ms-flex-order:-1;order:-1;-webkit-transition-duration:0.6s;transition-duration:0.6s;-webkit-transition-property:padding-right;transition-property:padding-right}:host-context([dir=rtl]) .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}[dir=rtl] .item-sliding-active-swipe-start .item-options-start .item-option-expandable{-ms-flex-order:1;order:1}@supports selector(:dir(rtl)){.item-sliding-active-swipe-start .item-options-start .item-option-expandable:dir(rtl){-ms-flex-order:1;order:1}}`;
    SWIPE_MARGIN = 30;
    ELASTIC_FACTOR = 0.55;
    ItemSliding = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionDrag = createEvent(this, "ionDrag", 7);
        this.item = null;
        this.openAmount = 0;
        this.initialOpenAmount = 0;
        this.optsWidthRightSide = 0;
        this.optsWidthLeftSide = 0;
        this.sides = 0;
        this.optsDirty = true;
        this.contentEl = null;
        this.initialContentScrollY = true;
        this.state = 2;
        this.disabled = false;
      }
      disabledChanged() {
        if (this.gesture) {
          this.gesture.enable(!this.disabled);
        }
      }
      connectedCallback() {
        return __async(this, null, function* () {
          const { el } = this;
          this.item = el.querySelector("ion-item");
          this.contentEl = findClosestIonContent(el);
          this.mutationObserver = watchForOptions(el, "ion-item-option", () => __async(this, null, function* () {
            yield this.updateOptions();
          }));
          yield this.updateOptions();
          this.gesture = (yield import("./chunk-YHTSP4B3.js")).createGesture({
            el,
            gestureName: "item-swipe",
            gesturePriority: 100,
            threshold: 5,
            canStart: (ev) => this.canStart(ev),
            onStart: () => this.onStart(),
            onMove: (ev) => this.onMove(ev),
            onEnd: (ev) => this.onEnd(ev)
          });
          this.disabledChanged();
        });
      }
      disconnectedCallback() {
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
        this.item = null;
        this.leftOptions = this.rightOptions = void 0;
        if (openSlidingItem === this.el) {
          openSlidingItem = void 0;
        }
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
          this.mutationObserver = void 0;
        }
      }
      /**
       * Get the amount the item is open in pixels.
       */
      getOpenAmount() {
        return Promise.resolve(this.openAmount);
      }
      /**
       * Get the ratio of the open amount of the item compared to the width of the options.
       * If the number returned is positive, then the options on the right side are open.
       * If the number returned is negative, then the options on the left side are open.
       * If the absolute value of the number is greater than 1, the item is open more than
       * the width of the options.
       */
      getSlidingRatio() {
        return Promise.resolve(this.getSlidingRatioSync());
      }
      /**
       * Open the sliding item.
       *
       * @param side The side of the options to open. If a side is not provided, it will open the first set of options it finds within the item.
       */
      open(side) {
        return __async(this, null, function* () {
          const item = this.item = this.item ?? this.el.querySelector("ion-item");
          if (item === null) {
            return;
          }
          const optionsToOpen = this.getOptions(side);
          if (!optionsToOpen) {
            return;
          }
          if (side === void 0) {
            side = optionsToOpen === this.leftOptions ? "start" : "end";
          }
          side = isEndSide(side) ? "end" : "start";
          const isStartOpen = this.openAmount < 0;
          const isEndOpen = this.openAmount > 0;
          if (isStartOpen && optionsToOpen === this.leftOptions) {
            return;
          }
          if (isEndOpen && optionsToOpen === this.rightOptions) {
            return;
          }
          this.closeOpened();
          this.state = 4;
          requestAnimationFrame(() => {
            this.calculateOptsWidth();
            const width = side === "end" ? this.optsWidthRightSide : -this.optsWidthLeftSide;
            openSlidingItem = this.el;
            this.setOpenAmount(width, false);
            this.state = side === "end" ? 8 : 16;
          });
        });
      }
      /**
       * Close the sliding item. Items can also be closed from the [List](./list).
       */
      close() {
        return __async(this, null, function* () {
          this.setOpenAmount(0, true);
        });
      }
      /**
       * Close all of the sliding items in the list. Items can also be closed from the [List](./list).
       */
      closeOpened() {
        return __async(this, null, function* () {
          if (openSlidingItem !== void 0) {
            openSlidingItem.close();
            openSlidingItem = void 0;
            return true;
          }
          return false;
        });
      }
      /**
       * Given an optional side, return the ion-item-options element.
       *
       * @param side This side of the options to get. If a side is not provided it will
       * return the first one available.
       */
      getOptions(side) {
        if (side === void 0) {
          return this.leftOptions || this.rightOptions;
        } else if (side === "start") {
          return this.leftOptions;
        } else {
          return this.rightOptions;
        }
      }
      updateOptions() {
        return __async(this, null, function* () {
          const options = Array.from(this.el.querySelectorAll("ion-item-options"));
          yield Promise.all(options.map((option) => new Promise((resolve) => componentOnReady(option, resolve))));
          let sides = 0;
          this.leftOptions = this.rightOptions = void 0;
          for (const option of options) {
            const side = isEndSide(option.side ?? option.getAttribute("side")) ? "end" : "start";
            if (side === "start") {
              this.leftOptions = option;
              sides |= 1;
            } else {
              this.rightOptions = option;
              sides |= 2;
            }
          }
          this.optsDirty = true;
          this.sides = sides;
        });
      }
      canStart(gesture) {
        const rtl = document.dir === "rtl";
        const atEdge = rtl ? window.innerWidth - gesture.startX < 15 : gesture.startX < 15;
        if (atEdge) {
          return false;
        }
        const selected = openSlidingItem;
        if (selected && selected !== this.el) {
          this.closeOpened();
        }
        return !!(this.rightOptions || this.leftOptions);
      }
      onStart() {
        this.item = this.el.querySelector("ion-item");
        const { contentEl } = this;
        if (contentEl) {
          this.initialContentScrollY = disableContentScrollY(contentEl);
        }
        openSlidingItem = this.el;
        if (this.tmr !== void 0) {
          clearTimeout(this.tmr);
          this.tmr = void 0;
        }
        if (this.openAmount === 0) {
          this.optsDirty = true;
          this.state = 4;
        }
        this.initialOpenAmount = this.openAmount;
        if (this.item) {
          this.item.style.transition = "none";
        }
      }
      onMove(gesture) {
        if (this.optsDirty) {
          this.calculateOptsWidth();
        }
        let openAmount = this.initialOpenAmount - gesture.deltaX;
        switch (this.sides) {
          case 2:
            openAmount = Math.max(0, openAmount);
            break;
          case 1:
            openAmount = Math.min(0, openAmount);
            break;
          case 3:
            break;
          case 0:
            return;
          default:
            printIonWarning("[ion-item-sliding] - invalid ItemSideFlags value", this.sides);
            break;
        }
        let optsWidth;
        if (openAmount > this.optsWidthRightSide) {
          optsWidth = this.optsWidthRightSide;
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        } else if (openAmount < -this.optsWidthLeftSide) {
          optsWidth = -this.optsWidthLeftSide;
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        this.setOpenAmount(openAmount, false);
      }
      onEnd(gesture) {
        const { contentEl, initialContentScrollY } = this;
        if (contentEl) {
          resetContentScrollY(contentEl, initialContentScrollY);
        }
        const velocity = gesture.velocityX;
        let restingPoint = this.openAmount > 0 ? this.optsWidthRightSide : -this.optsWidthLeftSide;
        const isResetDirection = this.openAmount > 0 === !(velocity < 0);
        const isMovingFast = Math.abs(velocity) > 0.3;
        const isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2);
        if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
          restingPoint = 0;
        }
        const state = this.state;
        this.setOpenAmount(restingPoint, true);
        if ((state & 32) !== 0 && this.rightOptions) {
          this.rightOptions.fireSwipeEvent();
        } else if ((state & 64) !== 0 && this.leftOptions) {
          this.leftOptions.fireSwipeEvent();
        }
      }
      calculateOptsWidth() {
        this.optsWidthRightSide = 0;
        if (this.rightOptions) {
          this.rightOptions.style.display = "flex";
          this.optsWidthRightSide = this.rightOptions.offsetWidth;
          this.rightOptions.style.display = "";
        }
        this.optsWidthLeftSide = 0;
        if (this.leftOptions) {
          this.leftOptions.style.display = "flex";
          this.optsWidthLeftSide = this.leftOptions.offsetWidth;
          this.leftOptions.style.display = "";
        }
        this.optsDirty = false;
      }
      setOpenAmount(openAmount, isFinal) {
        if (this.tmr !== void 0) {
          clearTimeout(this.tmr);
          this.tmr = void 0;
        }
        if (!this.item) {
          return;
        }
        const { el } = this;
        const style = this.item.style;
        this.openAmount = openAmount;
        if (isFinal) {
          style.transition = "";
        }
        if (openAmount > 0) {
          this.state = openAmount >= this.optsWidthRightSide + SWIPE_MARGIN ? 8 | 32 : 8;
        } else if (openAmount < 0) {
          this.state = openAmount <= -this.optsWidthLeftSide - SWIPE_MARGIN ? 16 | 64 : 16;
        } else {
          el.classList.add("item-sliding-closing");
          if (this.gesture) {
            this.gesture.enable(false);
          }
          this.tmr = setTimeout(() => {
            this.state = 2;
            this.tmr = void 0;
            if (this.gesture) {
              this.gesture.enable(!this.disabled);
            }
            el.classList.remove("item-sliding-closing");
          }, 600);
          openSlidingItem = void 0;
          style.transform = "";
          return;
        }
        style.transform = `translate3d(${-openAmount}px,0,0)`;
        this.ionDrag.emit({
          amount: openAmount,
          ratio: this.getSlidingRatioSync()
        });
      }
      getSlidingRatioSync() {
        if (this.openAmount > 0) {
          return this.openAmount / this.optsWidthRightSide;
        } else if (this.openAmount < 0) {
          return this.openAmount / this.optsWidthLeftSide;
        } else {
          return 0;
        }
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "02174ca963753d3a51a4249068f3d436f8acb03d", class: {
          [mode]: true,
          "item-sliding-active-slide": this.state !== 2,
          "item-sliding-active-options-end": (this.state & 8) !== 0,
          "item-sliding-active-options-start": (this.state & 16) !== 0,
          "item-sliding-active-swipe-end": (this.state & 32) !== 0,
          "item-sliding-active-swipe-start": (this.state & 64) !== 0
        } });
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "disabled": [{
            "disabledChanged": 0
          }]
        };
      }
    };
    swipeShouldReset = (isResetDirection, isMovingFast, isOnResetZone) => {
      return !isMovingFast && isOnResetZone || isResetDirection && isMovingFast;
    };
    ItemSliding.style = itemSlidingCss();
  }
});
init_ion_item_option_3_entry();
export {
  ItemOption as ion_item_option,
  ItemOptions as ion_item_options,
  ItemSliding as ion_item_sliding
};
//# debugId=09ccd72c-4bb6-5aef-b0f2-a6772a543e56
//# sourceMappingURL=chunk-TX3M5GFA.js.map
