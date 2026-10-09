import {
  close,
  init_index_BvabGprD
} from "./chunk-KPUED4ZZ.js";
import {
  hasShadowDom,
  inheritAriaAttributes,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  createColorClasses,
  hostContext,
  init_theme_byZM6qHV,
  openURL
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

// node_modules/@ionic/core/dist/esm/ion-fab_3.entry.js
var fabCss, Fab, fabButtonIosCss, fabButtonMdCss, FabButton, fabListCss, FabList;
var init_ion_fab_3_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-fab_3.entry.js"() {
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    init_helpers_BJqKF1pr();
    init_theme_byZM6qHV();
    init_index_BvabGprD();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    fabCss = () => `:host{position:absolute;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;z-index:999}:host(.fab-horizontal-center){left:0px;right:0px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}:host(.fab-horizontal-start){left:calc(10px + var(--ion-safe-area-left, 0px));}:host-context([dir=rtl]):host(.fab-horizontal-start),:host-context([dir=rtl]).fab-horizontal-start{right:calc(10px + var(--ion-safe-area-right, 0px));left:unset}@supports selector(:dir(rtl)){:host(.fab-horizontal-start:dir(rtl)){right:calc(10px + var(--ion-safe-area-right, 0px));left:unset}}:host(.fab-horizontal-end){right:calc(10px + var(--ion-safe-area-right, 0px));}:host-context([dir=rtl]):host(.fab-horizontal-end),:host-context([dir=rtl]).fab-horizontal-end{left:calc(10px + var(--ion-safe-area-left, 0px));right:unset}@supports selector(:dir(rtl)){:host(.fab-horizontal-end:dir(rtl)){left:calc(10px + var(--ion-safe-area-left, 0px));right:unset}}:host(.fab-vertical-top){top:10px}:host(.fab-vertical-top.fab-edge){top:0}:host(.fab-vertical-top.fab-edge) ::slotted(ion-fab-button){margin-top:-50%}:host(.fab-vertical-top.fab-edge) ::slotted(ion-fab-button.fab-button-small){margin-top:calc((-100% + 16px) / 2)}:host(.fab-vertical-top.fab-edge) ::slotted(ion-fab-list.fab-list-side-start),:host(.fab-vertical-top.fab-edge) ::slotted(ion-fab-list.fab-list-side-end){margin-top:-50%}:host(.fab-vertical-top.fab-edge) ::slotted(ion-fab-list.fab-list-side-top),:host(.fab-vertical-top.fab-edge) ::slotted(ion-fab-list.fab-list-side-bottom){margin-top:calc(50% + 10px)}:host(.fab-vertical-bottom){bottom:10px}:host(.fab-vertical-bottom.fab-edge){bottom:0}:host(.fab-vertical-bottom.fab-edge) ::slotted(ion-fab-button){margin-bottom:-50%}:host(.fab-vertical-bottom.fab-edge) ::slotted(ion-fab-button.fab-button-small){margin-bottom:calc((-100% + 16px) / 2)}:host(.fab-vertical-bottom.fab-edge) ::slotted(ion-fab-list.fab-list-side-start),:host(.fab-vertical-bottom.fab-edge) ::slotted(ion-fab-list.fab-list-side-end){margin-bottom:-50%}:host(.fab-vertical-bottom.fab-edge) ::slotted(ion-fab-list.fab-list-side-top),:host(.fab-vertical-bottom.fab-edge) ::slotted(ion-fab-list.fab-list-side-bottom){margin-bottom:calc(50% + 10px)}:host(.fab-vertical-center){top:0px;bottom:0px;margin-top:auto;margin-bottom:auto}`;
    Fab = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.edge = false;
        this.activated = false;
      }
      activatedChanged() {
        const activated = this.activated;
        const fab = this.getFab();
        if (fab) {
          fab.activated = activated;
        }
        Array.from(this.el.querySelectorAll("ion-fab-list")).forEach((list) => {
          list.activated = activated;
        });
      }
      componentDidLoad() {
        if (this.activated) {
          this.activatedChanged();
        }
      }
      /**
       * Close an active FAB list container.
       */
      close() {
        return __async(this, null, function* () {
          this.activated = false;
        });
      }
      getFab() {
        return this.el.querySelector("ion-fab-button");
      }
      /**
       * Opens/Closes the FAB list container.
       * @internal
       */
      toggle() {
        return __async(this, null, function* () {
          const hasList = !!this.el.querySelector("ion-fab-list");
          if (hasList) {
            this.activated = !this.activated;
          }
        });
      }
      render() {
        const { horizontal, vertical, edge } = this;
        const mode = getIonMode(this);
        return h(Host, { key: "8a310806d0e748d7ebb0ed3d9a2652038e0f2960", class: {
          [mode]: true,
          [`fab-horizontal-${horizontal}`]: horizontal !== void 0,
          [`fab-vertical-${vertical}`]: vertical !== void 0,
          "fab-edge": edge
        } }, h("slot", { key: "9394ef6d6e5b0410fa6ba212171f687fb178ce2d" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "activated": [{
            "activatedChanged": 0
          }]
        };
      }
    };
    Fab.style = fabCss();
    fabButtonIosCss = () => `:host{--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--background-hover:var(--ion-color-primary-contrast, #fff);--background-hover-opacity:.08;--transition:background-color, opacity 100ms linear;--ripple-color:currentColor;--border-radius:50%;--border-width:0;--border-style:none;--border-color:initial;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:56px;height:56px;font-size:14px;text-align:center;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;-webkit-transform:var(--transform);transform:var(--transform);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);background-clip:padding-box;color:var(--color);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);contain:strict;cursor:pointer;overflow:hidden;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-icon){line-height:1}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{left:0;right:0;top:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-transition:all ease-in-out 300ms;transition:all ease-in-out 300ms;-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:transform, opacity;transition-property:transform, opacity, -webkit-transform;z-index:1}:host(.fab-button-disabled){cursor:default;opacity:0.5;pointer-events:none}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(.ion-activated) .button-native{color:var(--color-activated)}:host(.ion-activated) .button-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}::slotted(ion-icon){line-height:1}:host(.fab-button-small){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:8px;margin-bottom:8px;width:40px;height:40px}.close-icon{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;left:0;right:0;top:0;position:absolute;height:100%;-webkit-transform:scale(0.4) rotateZ(-45deg);transform:scale(0.4) rotateZ(-45deg);-webkit-transition:all ease-in-out 300ms;transition:all ease-in-out 300ms;-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:transform, opacity;transition-property:transform, opacity, -webkit-transform;font-size:var(--close-icon-font-size);opacity:0;z-index:1}:host(.fab-button-close-active) .close-icon{-webkit-transform:scale(1) rotateZ(0deg);transform:scale(1) rotateZ(0deg);opacity:1}:host(.fab-button-close-active) .button-inner{-webkit-transform:scale(0.4) rotateZ(45deg);transform:scale(0.4) rotateZ(45deg);opacity:0}ion-ripple-effect{color:var(--ripple-color)}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.fab-button-translucent) .button-native{-webkit-backdrop-filter:var(--backdrop-filter);backdrop-filter:var(--backdrop-filter)}}:host(.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host{--background:var(--ion-color-primary, #0054e9);--background-activated:var(--ion-color-primary-shade, #004acd);--background-focused:var(--ion-color-primary-shade, #004acd);--background-hover:var(--ion-color-primary-tint, #1a65eb);--background-activated-opacity:1;--background-focused-opacity:1;--background-hover-opacity:1;--color:var(--ion-color-primary-contrast, #fff);--box-shadow:0 4px 16px rgba(0, 0, 0, 0.12);--transition:0.2s transform cubic-bezier(0.25, 1.11, 0.78, 1.59);--close-icon-font-size:28px}:host(.ion-activated){--box-shadow:0 4px 16px rgba(0, 0, 0, 0.12);--transform:scale(1.1);--transition:0.2s transform ease-out}::slotted(ion-icon){font-size:28px}:host(.fab-button-in-list){--background:var(--ion-color-light, #f4f5f8);--background-activated:var(--ion-color-light-shade, #d7d8da);--background-focused:var(--background-activated);--background-hover:var(--ion-color-light-tint, #f5f6f9);--color:var(--ion-color-light-contrast, #000);--color-activated:var(--ion-color-light-contrast, #000);--color-focused:var(--color-activated);--transition:transform 200ms ease 10ms, opacity 200ms ease 10ms}:host(.fab-button-in-list) ::slotted(ion-icon){font-size:18px}:host(.ion-color.ion-focused) .button-native::after{background:var(--ion-color-shade)}:host(.ion-color.ion-focused) .button-native,:host(.ion-color.ion-activated) .button-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-focused) .button-native::after,:host(.ion-color.ion-activated) .button-native::after{background:var(--ion-color-shade)}@media (any-hover: hover){:host(.ion-color:hover) .button-native{color:var(--ion-color-contrast)}:host(.ion-color:hover) .button-native::after{background:var(--ion-color-tint)}}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.fab-button-translucent){--background:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.9);--background-hover:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.8);--background-focused:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.82);--backdrop-filter:saturate(180%) blur(20px)}:host(.fab-button-translucent-in-list){--background:rgba(var(--ion-color-light-rgb, 244, 245, 248), 0.9);--background-hover:rgba(var(--ion-color-light-rgb, 244, 245, 248), 0.8);--background-focused:rgba(var(--ion-color-light-rgb, 244, 245, 248), 0.82)}}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){@media (any-hover: hover){:host(.fab-button-translucent.ion-color:hover) .button-native{background:rgba(var(--ion-color-base-rgb), 0.8)}}:host(.ion-color.fab-button-translucent) .button-native{background:rgba(var(--ion-color-base-rgb), 0.9)}:host(.ion-color.ion-focused.fab-button-translucent) .button-native,:host(.ion-color.ion-activated.fab-button-translucent) .button-native{background:var(--ion-color-base)}}`;
    fabButtonMdCss = () => `:host{--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--background-hover:var(--ion-color-primary-contrast, #fff);--background-hover-opacity:.08;--transition:background-color, opacity 100ms linear;--ripple-color:currentColor;--border-radius:50%;--border-width:0;--border-style:none;--border-color:initial;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:block;width:56px;height:56px;font-size:14px;text-align:center;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;-webkit-transform:var(--transform);transform:var(--transform);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);background-clip:padding-box;color:var(--color);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);contain:strict;cursor:pointer;overflow:hidden;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-icon){line-height:1}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}.button-inner{left:0;right:0;top:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-transition:all ease-in-out 300ms;transition:all ease-in-out 300ms;-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:transform, opacity;transition-property:transform, opacity, -webkit-transform;z-index:1}:host(.fab-button-disabled){cursor:default;opacity:0.5;pointer-events:none}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(.ion-activated) .button-native{color:var(--color-activated)}:host(.ion-activated) .button-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}::slotted(ion-icon){line-height:1}:host(.fab-button-small){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:8px;margin-bottom:8px;width:40px;height:40px}.close-icon{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;left:0;right:0;top:0;position:absolute;height:100%;-webkit-transform:scale(0.4) rotateZ(-45deg);transform:scale(0.4) rotateZ(-45deg);-webkit-transition:all ease-in-out 300ms;transition:all ease-in-out 300ms;-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:transform, opacity;transition-property:transform, opacity, -webkit-transform;font-size:var(--close-icon-font-size);opacity:0;z-index:1}:host(.fab-button-close-active) .close-icon{-webkit-transform:scale(1) rotateZ(0deg);transform:scale(1) rotateZ(0deg);opacity:1}:host(.fab-button-close-active) .button-inner{-webkit-transform:scale(0.4) rotateZ(45deg);transform:scale(0.4) rotateZ(45deg);opacity:0}ion-ripple-effect{color:var(--ripple-color)}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.fab-button-translucent) .button-native{-webkit-backdrop-filter:var(--backdrop-filter);backdrop-filter:var(--backdrop-filter)}}:host(.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host{--background:var(--ion-color-primary, #0054e9);--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--background-activated-opacity:0;--background-focused-opacity:.24;--background-hover-opacity:.08;--color:var(--ion-color-primary-contrast, #fff);--box-shadow:0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);--transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), background-color 280ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;--close-icon-font-size:24px}:host(.ion-activated){--box-shadow:0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12)}::slotted(ion-icon){font-size:24px}:host(.fab-button-in-list){--color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54);--color-activated:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54);--color-focused:var(--color-activated);--background:var(--ion-color-light, #f4f5f8);--background-activated:transparent;--background-focused:var(--ion-color-light-shade, #d7d8da);--background-hover:var(--ion-color-light-tint, #f5f6f9)}:host(.fab-button-in-list) ::slotted(ion-icon){font-size:18px}:host(.ion-color.ion-focused) .button-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-focused) .button-native::after{background:var(--ion-color-contrast)}:host(.ion-color.ion-activated) .button-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-activated) .button-native::after{background:transparent}@media (any-hover: hover){:host(.ion-color:hover) .button-native{color:var(--ion-color-contrast)}:host(.ion-color:hover) .button-native::after{background:var(--ion-color-contrast)}}`;
    FabButton = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.fab = null;
        this.formButtonEl = null;
        this.formEl = null;
        this.inheritedAttributes = {};
        this.activated = false;
        this.disabled = false;
        this.routerDirection = "forward";
        this.show = false;
        this.translucent = false;
        this.type = "button";
        this.closeIcon = close;
        this.onFocus = () => {
          this.ionFocus.emit();
        };
        this.onBlur = () => {
          this.ionBlur.emit();
        };
        this.onClick = (ev) => {
          const { el, fab } = this;
          if (this.type !== "button" && hasShadowDom(el)) {
            this.submitForm(ev);
          }
          if (fab) {
            fab.toggle();
          }
        };
      }
      disabledChanged() {
        const { disabled } = this;
        if (this.formButtonEl) {
          this.formButtonEl.disabled = disabled;
        }
      }
      connectedCallback() {
        this.fab = this.el.closest("ion-fab");
      }
      /**
       * The native button rendered inside `ion-fab-button` is in the Shadow DOM and
       * does not participate in form submission, so a hidden native button is added
       * to the associated form and clicked instead.
       */
      renderHiddenButton() {
        const formEl = this.formEl = this.findForm();
        if (formEl) {
          const { formButtonEl } = this;
          if (formButtonEl !== null && formEl.contains(formButtonEl)) {
            formButtonEl.disabled = this.disabled;
            formButtonEl.type = this.type;
            return;
          }
          const newFormButtonEl = this.formButtonEl = document.createElement("button");
          newFormButtonEl.type = this.type;
          newFormButtonEl.style.display = "none";
          newFormButtonEl.disabled = this.disabled;
          formEl.appendChild(newFormButtonEl);
        }
      }
      // TODO(FW-7663): share the hidden button and form lookup with ion-button
      findForm() {
        const { form } = this;
        if (form instanceof HTMLFormElement) {
          return form;
        }
        if (typeof form === "string") {
          const el = document.getElementById(form);
          if (el) {
            if (el instanceof HTMLFormElement) {
              return el;
            } else {
              printIonWarning(`[ion-fab-button] - Form with selector: "#${form}" could not be found. Verify that the id is attached to a <form> element.`, this.el);
              return null;
            }
          } else {
            printIonWarning(`[ion-fab-button] - Form with selector: "#${form}" could not be found. Verify that the id is correct and the form is rendered in the DOM.`, this.el);
            return null;
          }
        }
        if (form !== void 0) {
          printIonWarning(`[ion-fab-button] - The provided "form" element is invalid. Verify that the form is a HTMLFormElement and rendered in the DOM.`, this.el);
          return null;
        }
        return this.el.closest("form");
      }
      submitForm(ev) {
        if (this.formEl && this.formButtonEl) {
          ev.preventDefault();
          this.formButtonEl.click();
        }
      }
      componentWillLoad() {
        this.inheritedAttributes = inheritAriaAttributes(this.el);
      }
      render() {
        const { el, disabled, color, href, activated, show, translucent, size, inheritedAttributes, type } = this;
        const inList = hostContext("ion-fab-list", el);
        const mode = getIonMode(this);
        const TagType = href === void 0 ? "button" : "a";
        const attrs = TagType === "button" ? { type } : {
          download: this.download,
          href,
          rel: this.rel,
          target: this.target
        };
        if (type !== "button") {
          this.renderHiddenButton();
        }
        return h(Host, { key: "89e8f2564f12f8c1cd8509a40359202347948846", onClick: this.onClick, "aria-disabled": disabled ? "true" : null, class: createColorClasses(color, {
          [mode]: true,
          "fab-button-in-list": inList,
          "fab-button-translucent-in-list": inList && translucent,
          "fab-button-close-active": activated,
          "fab-button-show": show,
          "fab-button-disabled": disabled,
          "fab-button-translucent": translucent,
          "ion-activatable": true,
          "ion-focusable": true,
          [`fab-button-${size}`]: size !== void 0
        }) }, h(TagType, __spreadValues(__spreadProps(__spreadValues({ key: "9e2fd462316e1aec50f53fa1b7ad7f02fd399592" }, attrs), { class: "button-native", part: "native", disabled, onFocus: this.onFocus, onBlur: this.onBlur, onClick: (ev) => type === "button" && openURL(href, ev, this.routerDirection, this.routerAnimation) }), inheritedAttributes), h("ion-icon", { key: "c3bdb8614eb249297afc963810066658dc85efd6", "aria-hidden": "true", icon: this.closeIcon, part: "close-icon", class: "close-icon", lazy: false }), h("span", { key: "a6a505b24d21cc716d2e3351ad4c380b95c768d7", class: "button-inner" }, h("slot", { key: "f44fc1e95533438ee3adc8cc5bdd9e1e85849fd6" })), mode === "md" && h("ion-ripple-effect", { key: "b7c7dc7fceb0bb5613239608225f040010b7b2bd" })));
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
    FabButton.style = {
      ios: fabButtonIosCss(),
      md: fabButtonMdCss()
    };
    fabListCss = () => `:host{margin-left:0;margin-right:0;margin-top:calc(100% + 10px);margin-bottom:calc(100% + 10px);display:none;position:absolute;top:0;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;min-width:56px;min-height:56px}:host(.fab-list-active){display:-ms-flexbox;display:flex}::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:8px;margin-bottom:8px;width:40px;height:40px;-webkit-transform:scale(0);transform:scale(0);opacity:0;visibility:hidden}:host(.fab-list-side-top) ::slotted(.fab-button-in-list),:host(.fab-list-side-bottom) ::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px}:host(.fab-list-side-start) ::slotted(.fab-button-in-list),:host(.fab-list-side-end) ::slotted(.fab-button-in-list){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted(.fab-button-in-list.fab-button-show){-webkit-transform:scale(1);transform:scale(1);opacity:1;visibility:visible}:host(.fab-list-side-top){top:auto;bottom:0;-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.fab-list-side-start){-webkit-margin-start:calc(100% + 10px);margin-inline-start:calc(100% + 10px);-webkit-margin-end:calc(100% + 10px);margin-inline-end:calc(100% + 10px);margin-top:0;margin-bottom:0;-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.fab-list-side-start){inset-inline-end:0}:host(.fab-list-side-end){-webkit-margin-start:calc(100% + 10px);margin-inline-start:calc(100% + 10px);-webkit-margin-end:calc(100% + 10px);margin-inline-end:calc(100% + 10px);margin-top:0;margin-bottom:0;-ms-flex-direction:row;flex-direction:row}:host(.fab-list-side-end){inset-inline-start:0}`;
    FabList = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.activateTimeouts = [];
        this.activated = false;
        this.side = "bottom";
      }
      activatedChanged(activated) {
        this.activateTimeouts.forEach(clearTimeout);
        this.activateTimeouts = [];
        const fabs = Array.from(this.el.querySelectorAll("ion-fab-button"));
        const timeout = activated ? 30 : 0;
        fabs.forEach((fab, i) => {
          this.activateTimeouts.push(setTimeout(() => fab.show = activated, i * timeout));
        });
      }
      disconnectedCallback() {
        this.activateTimeouts.forEach(clearTimeout);
        this.activateTimeouts = [];
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "03a8920c29a93c6df4bab14753a78a8a30722ce8", class: {
          [mode]: true,
          "fab-list-active": this.activated,
          [`fab-list-side-${this.side}`]: true
        } }, h("slot", { key: "d9e1541cb044e209bc2dff14080f3b938a2b84ae" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "activated": [{
            "activatedChanged": 0
          }]
        };
      }
    };
    FabList.style = fabListCss();
  }
});
init_ion_fab_3_entry();
export {
  Fab as ion_fab,
  FabButton as ion_fab_button,
  FabList as ion_fab_list
};
//# debugId=5a5fc376-289c-5f91-bcd1-60b6484a97f0
//# sourceMappingURL=chunk-6EM4AGFG.js.map
