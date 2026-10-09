import {
  createKeyboardController,
  init_keyboard_controller_B2NoF7bV
} from "./chunk-XVMV6EZN.js";
import {
  init_keyboard_Cmqp5iZD
} from "./chunk-VYSD5BUA.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  inheritAttributes,
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
  config,
  createEvent,
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

// node_modules/@ionic/core/dist/esm/ion-tab-bar_2.entry.js
var tabBarIosCss, tabBarMdCss, TabBar, tabButtonIosCss, tabButtonMdCss, TabButton;
var init_ion_tab_bar_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-tab-bar_2.entry.js"() {
    init_index_BpRUsN_W();
    init_keyboard_controller_B2NoF7bV();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_helpers_BJqKF1pr();
    init_keyboard_Cmqp5iZD();
    init_capacitor_CHJaJ9aX();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    tabBarIosCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-right:var(--ion-safe-area-right);padding-bottom:var(--ion-safe-area-bottom, 0);padding-left:var(--ion-safe-area-left);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box !important;box-sizing:content-box !important}:host(.ion-color) ::slotted(ion-tab-button){--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}:host(.ion-color) ::slotted(.tab-selected){color:var(--ion-color-contrast)}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){color:rgba(var(--ion-color-contrast-rgb), 0.7)}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){background:var(--ion-color-base)}:host(.ion-color) ::slotted(ion-tab-button.ion-focused),:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:var(--background-focused)}:host(.tab-bar-translucent) ::slotted(ion-tab-button){background:transparent}:host([slot=top]){padding-top:var(--ion-safe-area-top, 0);padding-bottom:0;border-top:0;border-bottom:var(--border)}:host(.tab-bar-hidden){display:none !important}:host{--background:var(--ion-tab-bar-background, var(--ion-color-step-50, var(--ion-background-color-step-50, #f7f7f7)));--background-focused:var(--ion-tab-bar-background-focused, #e0e0e0);--border:0.55px solid var(--ion-tab-bar-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.2)))));--color:var(--ion-tab-bar-color, var(--ion-color-step-600, var(--ion-text-color-step-400, #666666)));--color-selected:var(--ion-tab-bar-color-selected, var(--ion-color-primary, #0054e9));height:50px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.tab-bar-translucent){--background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}:host(.ion-color.tab-bar-translucent){background:rgba(var(--ion-color-base-rgb), 0.8)}:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.6)}}`;
    tabBarMdCss = () => `:host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-right:var(--ion-safe-area-right);padding-bottom:var(--ion-safe-area-bottom, 0);padding-left:var(--ion-safe-area-left);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box !important;box-sizing:content-box !important}:host(.ion-color) ::slotted(ion-tab-button){--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}:host(.ion-color) ::slotted(.tab-selected){color:var(--ion-color-contrast)}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){color:rgba(var(--ion-color-contrast-rgb), 0.7)}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){background:var(--ion-color-base)}:host(.ion-color) ::slotted(ion-tab-button.ion-focused),:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:var(--background-focused)}:host(.tab-bar-translucent) ::slotted(ion-tab-button){background:transparent}:host([slot=top]){padding-top:var(--ion-safe-area-top, 0);padding-bottom:0;border-top:0;border-bottom:var(--border)}:host(.tab-bar-hidden){display:none !important}:host{--background:var(--ion-tab-bar-background, var(--ion-background-color, #fff));--background-focused:var(--ion-tab-bar-background-focused, #e0e0e0);--border:1px solid var(--ion-tab-bar-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.07)))));--color:var(--ion-tab-bar-color, var(--ion-color-step-650, var(--ion-text-color-step-350, #595959)));--color-selected:var(--ion-tab-bar-color-selected, var(--ion-color-primary, #0054e9));height:56px}`;
    TabBar = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionTabBarChanged = createEvent(this, "ionTabBarChanged", 7);
        this.ionTabBarLoaded = createEvent(this, "ionTabBarLoaded", 7);
        this.keyboardCtrl = null;
        this.keyboardCtrlPromise = null;
        this.didLoad = false;
        this.keyboardVisible = false;
        this.translucent = false;
      }
      selectedTabChanged() {
        if (!this.didLoad) {
          return;
        }
        if (this.selectedTab !== void 0) {
          this.ionTabBarChanged.emit({
            tab: this.selectedTab
          });
        }
      }
      componentDidLoad() {
        this.ionTabBarLoaded.emit();
        this.didLoad = true;
        if (this.selectedTab !== void 0) {
          this.ionTabBarChanged.emit({
            tab: this.selectedTab
          });
        }
      }
      connectedCallback() {
        return __async(this, null, function* () {
          const promise = createKeyboardController((keyboardOpen, waitForResize) => __async(this, null, function* () {
            if (keyboardOpen === false && waitForResize !== void 0) {
              yield waitForResize;
            }
            this.keyboardVisible = keyboardOpen;
          }));
          this.keyboardCtrlPromise = promise;
          const keyboardCtrl = yield promise;
          if (this.keyboardCtrlPromise === promise) {
            this.keyboardCtrl = keyboardCtrl;
            this.keyboardCtrlPromise = null;
          } else {
            keyboardCtrl.destroy();
          }
        });
      }
      disconnectedCallback() {
        if (this.keyboardCtrlPromise) {
          this.keyboardCtrlPromise.then((ctrl) => ctrl.destroy());
          this.keyboardCtrlPromise = null;
        }
        if (this.keyboardCtrl) {
          this.keyboardCtrl.destroy();
          this.keyboardCtrl = null;
        }
      }
      render() {
        const { color, translucent, keyboardVisible } = this;
        const mode = getIonMode(this);
        const shouldHide = keyboardVisible && this.el.getAttribute("slot") !== "top";
        return h(Host, { key: "5c56cffd380df7720f3309af7cfca71500817678", role: "tablist", "aria-hidden": shouldHide ? "true" : null, class: createColorClasses(color, {
          [mode]: true,
          "tab-bar-translucent": translucent,
          "tab-bar-hidden": shouldHide
        }) }, h("slot", { key: "a98d3298320f864578e30e0fb79a2cc0cccb46d9" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "selectedTab": [{
            "selectedTabChanged": 0
          }]
        };
      }
    };
    TabBar.style = {
      ios: tabBarIosCss(),
      md: tabBarMdCss()
    };
    tabButtonIosCss = () => `:host{--ripple-color:var(--color-selected);--background-focused-opacity:1;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;outline:none;background:var(--background);color:var(--color)}.button-native{border-radius:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;height:100%;border:0;outline:none;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:inherit;flex-flow:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;height:100%;z-index:1}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}@media (any-hover: hover){a:hover{color:var(--color-selected)}}:host(.tab-selected){color:var(--color-selected)}:host(.tab-hidden){display:none !important}:host(.tab-disabled){pointer-events:none;opacity:0.4}::slotted(ion-label),::slotted(ion-icon){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-label){-ms-flex-order:0;order:0}::slotted(ion-icon){-ms-flex-order:-1;order:-1;height:1em}:host(.tab-has-label-only) ::slotted(ion-label){white-space:normal}::slotted(ion-badge){-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}:host(.tab-layout-icon-start){-ms-flex-direction:row;flex-direction:row}:host(.tab-layout-icon-end){-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.tab-layout-icon-bottom){-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.tab-layout-icon-hide) ::slotted(ion-icon){display:none}:host(.tab-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color)}:host{--padding-top:0;--padding-end:2px;--padding-bottom:0;--padding-start:2px;max-width:240px;font-size:10px}::slotted(ion-badge){-webkit-padding-start:6px;padding-inline-start:6px;-webkit-padding-end:6px;padding-inline-end:6px;padding-top:1px;padding-bottom:1px;top:4px;height:auto;font-size:12px;line-height:16px}::slotted(ion-badge){inset-inline-start:calc(50% + 6px)}::slotted(ion-icon){margin-top:2px;margin-bottom:2px;font-size:24px}::slotted(ion-icon::before){vertical-align:top}::slotted(ion-label){margin-top:0;margin-bottom:1px;min-height:11px;font-weight:500}:host(.tab-has-label-only) ::slotted(ion-label){margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:12px;font-size:14px;line-height:1.1}:host(.tab-layout-icon-end) ::slotted(ion-label),:host(.tab-layout-icon-start) ::slotted(ion-label),:host(.tab-layout-icon-hide) ::slotted(ion-label){margin-top:2px;margin-bottom:2px;font-size:14px;line-height:1.1}:host(.tab-layout-icon-end) ::slotted(ion-icon),:host(.tab-layout-icon-start) ::slotted(ion-icon){min-width:24px;height:26px;margin-top:2px;margin-bottom:1px;font-size:24px}:host(.tab-layout-icon-bottom) ::slotted(ion-badge){inset-inline-start:calc(50% + 12px)}:host(.tab-layout-icon-bottom) ::slotted(ion-icon){margin-top:0;margin-bottom:1px}:host(.tab-layout-icon-bottom) ::slotted(ion-label){margin-top:4px}:host(.tab-layout-icon-start) ::slotted(ion-badge),:host(.tab-layout-icon-end) ::slotted(ion-badge){top:10px}:host(.tab-layout-icon-start) ::slotted(ion-badge),:host(.tab-layout-icon-end) ::slotted(ion-badge){inset-inline-start:calc(50% + 35px)}:host(.tab-layout-icon-hide) ::slotted(ion-badge),:host(.tab-has-label-only) ::slotted(ion-badge){top:10px}:host(.tab-layout-icon-hide) ::slotted(ion-badge),:host(.tab-has-label-only) ::slotted(ion-badge){inset-inline-start:calc(50% + 30px)}:host(.tab-layout-label-hide) ::slotted(ion-badge),:host(.tab-has-icon-only) ::slotted(ion-badge){top:10px}:host(.tab-layout-label-hide) ::slotted(ion-icon){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}:host(.tab-layout-label-hide) ::slotted(ion-icon),:host(.tab-has-icon-only) ::slotted(ion-icon){font-size:30px}`;
    tabButtonMdCss = () => `:host{--ripple-color:var(--color-selected);--background-focused-opacity:1;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;outline:none;background:var(--background);color:var(--color)}.button-native{border-radius:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;height:100%;border:0;outline:none;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:inherit;flex-flow:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;height:100%;z-index:1}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}@media (any-hover: hover){a:hover{color:var(--color-selected)}}:host(.tab-selected){color:var(--color-selected)}:host(.tab-hidden){display:none !important}:host(.tab-disabled){pointer-events:none;opacity:0.4}::slotted(ion-label),::slotted(ion-icon){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-label){-ms-flex-order:0;order:0}::slotted(ion-icon){-ms-flex-order:-1;order:-1;height:1em}:host(.tab-has-label-only) ::slotted(ion-label){white-space:normal}::slotted(ion-badge){-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}:host(.tab-layout-icon-start){-ms-flex-direction:row;flex-direction:row}:host(.tab-layout-icon-end){-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.tab-layout-icon-bottom){-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.tab-layout-icon-hide) ::slotted(ion-icon){display:none}:host(.tab-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color)}:host{--padding-top:0;--padding-end:12px;--padding-bottom:0;--padding-start:12px;max-width:168px;font-size:12px;font-weight:normal;letter-spacing:0.03em}::slotted(ion-label){margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;text-transform:none}::slotted(ion-icon){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;-webkit-transform-origin:center center;transform-origin:center center;font-size:22px}:host-context([dir=rtl]) ::slotted(ion-icon){-webkit-transform-origin:calc(100% - center) center;transform-origin:calc(100% - center) center}[dir=rtl] ::slotted(ion-icon){-webkit-transform-origin:calc(100% - center) center;transform-origin:calc(100% - center) center}@supports selector(:dir(rtl)){::slotted(ion-icon):dir(rtl){-webkit-transform-origin:calc(100% - center) center;transform-origin:calc(100% - center) center}}::slotted(ion-badge){border-radius:8px;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px;padding-top:3px;padding-bottom:2px;top:8px;min-width:12px;font-size:8px;font-weight:normal}::slotted(ion-badge){inset-inline-start:calc(50% + 6px)}::slotted(ion-badge:empty){display:block;min-width:8px;height:8px}:host(.tab-layout-icon-top) ::slotted(ion-icon){margin-top:6px;margin-bottom:2px}:host(.tab-layout-icon-top) ::slotted(ion-label){margin-top:0;margin-bottom:6px}:host(.tab-layout-icon-bottom) ::slotted(ion-badge){top:8px}:host(.tab-layout-icon-bottom) ::slotted(ion-badge){inset-inline-start:70%}:host(.tab-layout-icon-bottom) ::slotted(ion-icon){margin-top:0;margin-bottom:6px}:host(.tab-layout-icon-bottom) ::slotted(ion-label){margin-top:6px;margin-bottom:0}:host(.tab-layout-icon-start) ::slotted(ion-badge),:host(.tab-layout-icon-end) ::slotted(ion-badge){top:16px}:host(.tab-layout-icon-start) ::slotted(ion-badge),:host(.tab-layout-icon-end) ::slotted(ion-badge){inset-inline-start:80%}:host(.tab-layout-icon-start) ::slotted(ion-icon){-webkit-margin-end:6px;margin-inline-end:6px}:host(.tab-layout-icon-end) ::slotted(ion-icon){-webkit-margin-start:6px;margin-inline-start:6px}:host(.tab-layout-icon-hide) ::slotted(ion-badge),:host(.tab-has-label-only) ::slotted(ion-badge){top:16px}:host(.tab-layout-icon-hide) ::slotted(ion-badge),:host(.tab-has-label-only) ::slotted(ion-badge){inset-inline-start:70%}:host(.tab-layout-icon-hide) ::slotted(ion-label),:host(.tab-has-label-only) ::slotted(ion-label){margin-top:0;margin-bottom:0}:host(.tab-layout-label-hide) ::slotted(ion-badge),:host(.tab-has-icon-only) ::slotted(ion-badge){top:16px}:host(.tab-layout-label-hide) ::slotted(ion-icon),:host(.tab-has-icon-only) ::slotted(ion-icon){margin-top:0;margin-bottom:0;font-size:24px}`;
    TabButton = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionTabButtonClick = createEvent(this, "ionTabButtonClick", 7);
        this.inheritedAttributes = {};
        this.disabled = false;
        this.selected = false;
        this.onKeyUp = (ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            this.selectTab(ev);
          }
        };
        this.onClick = (ev) => {
          this.selectTab(ev);
        };
      }
      onTabBarChanged(ev) {
        const dispatchedFrom = ev.target;
        const parent = this.el.parentElement;
        if (ev.composedPath().includes(parent) || dispatchedFrom?.contains(this.el)) {
          this.selected = this.tab === ev.detail.tab;
        }
      }
      componentWillLoad() {
        this.inheritedAttributes = __spreadValues({}, inheritAttributes(this.el, ["aria-label"]));
        if (this.layout === void 0) {
          this.layout = config.get("tabButtonLayout", "icon-top");
        }
      }
      selectTab(ev) {
        if (this.tab !== void 0) {
          if (!this.disabled) {
            this.ionTabButtonClick.emit({
              tab: this.tab,
              href: this.href,
              selected: this.selected
            });
          }
          ev.preventDefault();
        }
      }
      get hasLabel() {
        return !!this.el.querySelector("ion-label");
      }
      get hasIcon() {
        return !!this.el.querySelector("ion-icon");
      }
      render() {
        const { disabled, hasIcon, hasLabel, href, rel, target, layout, selected, tab, inheritedAttributes } = this;
        const mode = getIonMode(this);
        const attrs = {
          download: this.download,
          href,
          rel,
          target
        };
        return h(Host, { key: "45bb7ffa6d8764202adc2c5c393748d4003e86fe", onClick: this.onClick, onKeyup: this.onKeyUp, id: tab !== void 0 ? `tab-button-${tab}` : null, class: {
          [mode]: true,
          "tab-selected": selected,
          "tab-disabled": disabled,
          "tab-has-label": hasLabel,
          "tab-has-icon": hasIcon,
          "tab-has-label-only": hasLabel && !hasIcon,
          "tab-has-icon-only": hasIcon && !hasLabel,
          [`tab-layout-${layout}`]: true,
          "ion-activatable": true,
          "ion-selectable": true,
          "ion-focusable": true
        } }, h("a", __spreadValues(__spreadProps(__spreadValues({ key: "78c416609a2b86a6e7c5f217ffd2a6b9f80a5103" }, attrs), { class: "button-native", part: "native", role: "tab", "aria-selected": selected ? "true" : null, "aria-disabled": disabled ? "true" : null, tabindex: disabled ? "-1" : void 0 }), inheritedAttributes), h("span", { key: "62934156439ffd0ab86674b9cf89d9cfa0d3589c", class: "button-inner" }, h("slot", { key: "293ba8f5ef50373c4e6e492dcaa55b3d2aae8d2f" })), mode === "md" && h("ion-ripple-effect", { key: "360b010afedcf17fc1f3ab6d192f0f8c7b1cf112", type: "unbounded" })));
      }
      get el() {
        return getElement(this);
      }
    };
    TabButton.style = {
      ios: tabButtonIosCss(),
      md: tabButtonMdCss()
    };
  }
});
init_ion_tab_bar_2_entry();
export {
  TabBar as ion_tab_bar,
  TabButton as ion_tab_button
};
//# debugId=58378f86-090c-59c1-aa2f-7b6cd9e3471f
//# sourceMappingURL=chunk-4CXTPALB.js.map
