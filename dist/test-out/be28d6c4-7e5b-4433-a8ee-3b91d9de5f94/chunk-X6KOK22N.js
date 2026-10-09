import {
  createLockController,
  init_lock_controller_B_hirT0v
} from "./chunk-MZW2T2S4.js";
import {
  ENABLE_HTML_CONTENT_DEFAULT,
  init_config_DWCzVL3Y
} from "./chunk-QLB7V5XI.js";
import {
  init_index_CK8uF0iB,
  sanitizeDOMString
} from "./chunk-CPN2CPEA.js";
import {
  createAnimation,
  init_animation_DmtJpz89
} from "./chunk-UYK5QVEZ.js";
import {
  BACKDROP,
  cleanupRootFocusTrapAccessibility,
  createDelegateController,
  createTriggerController,
  dismiss,
  eventMethod,
  init_overlays_DmDY_El7,
  prepareOverlay,
  present,
  restoreRootFocusTrapAccessibility,
  setOverlayId
} from "./chunk-VQMD36Q3.js";
import {
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  init_helpers_BJqKF1pr,
  raf
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  getClassMap,
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

// node_modules/@ionic/core/dist/esm/ion-loading.entry.js
var iosEnterAnimation, iosLeaveAnimation, mdEnterAnimation, mdLeaveAnimation, loadingIosCss, loadingMdCss, Loading;
var init_ion_loading_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-loading.entry.js"() {
    init_index_BpRUsN_W();
    init_config_DWCzVL3Y();
    init_helpers_BJqKF1pr();
    init_lock_controller_B_hirT0v();
    init_overlays_DmDY_El7();
    init_index_CK8uF0iB();
    init_theme_byZM6qHV();
    init_ionic_global_Cep6oYzK();
    init_animation_DmtJpz89();
    init_dir_Dojwmvde();
    init_framework_delegate_CDjM1vRH();
    init_gesture_controller_B_gJaBk0();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    iosEnterAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      wrapperAnimation.addElement(baseEl.querySelector(".loading-wrapper")).keyframes([
        { offset: 0, opacity: 0.01, transform: "scale(1.1)" },
        { offset: 1, opacity: 1, transform: "scale(1)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    iosLeaveAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
      wrapperAnimation.addElement(baseEl.querySelector(".loading-wrapper")).keyframes([
        { offset: 0, opacity: 0.99, transform: "scale(1)" },
        { offset: 1, opacity: 0, transform: "scale(0.9)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    mdEnterAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      wrapperAnimation.addElement(baseEl.querySelector(".loading-wrapper")).keyframes([
        { offset: 0, opacity: 0.01, transform: "scale(1.1)" },
        { offset: 1, opacity: 1, transform: "scale(1)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    mdLeaveAnimation = (baseEl) => {
      const baseAnimation = createAnimation();
      const backdropAnimation = createAnimation();
      const wrapperAnimation = createAnimation();
      backdropAnimation.addElement(baseEl.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
      wrapperAnimation.addElement(baseEl.querySelector(".loading-wrapper")).keyframes([
        { offset: 0, opacity: 0.99, transform: "scale(1)" },
        { offset: 1, opacity: 0, transform: "scale(0.9)" }
      ]);
      return baseAnimation.addElement(baseEl).easing("ease-in-out").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    loadingIosCss = () => `.sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}ion-spinner.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, var(--ion-background-color-step-100, #f9f9f9)));--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));--backdrop-opacity:var(--ion-backdrop-opacity, 0.3);color:var(--ion-text-color, #000);font-size:0.875rem}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px;padding-top:24px;padding-bottom:24px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.loading-translucent.sc-ion-loading-ios-h .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.loading-content.sc-ion-loading-ios{font-weight:bold}.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{-webkit-margin-start:16px;margin-inline-start:16px}`;
    loadingMdCss = () => `.sc-ion-loading-md-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-md-h{display:none}.loading-wrapper.sc-ion-loading-md{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}ion-spinner.sc-ion-loading-md{color:var(--spinner-color)}.sc-ion-loading-md-h{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--max-width:280px;--max-height:90%;--spinner-color:var(--ion-color-primary, #0054e9);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));font-size:0.875rem}.loading-wrapper.sc-ion-loading-md{border-radius:2px;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px;padding-top:24px;padding-bottom:24px;-webkit-box-shadow:0 16px 20px rgba(0, 0, 0, 0.4);box-shadow:0 16px 20px rgba(0, 0, 0, 0.4)}.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{-webkit-margin-start:16px;margin-inline-start:16px}`;
    Loading = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didPresent = createEvent(this, "ionLoadingDidPresent", 7);
        this.willPresent = createEvent(this, "ionLoadingWillPresent", 7);
        this.willDismiss = createEvent(this, "ionLoadingWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionLoadingDidDismiss", 7);
        this.didPresentShorthand = createEvent(this, "didPresent", 7);
        this.willPresentShorthand = createEvent(this, "willPresent", 7);
        this.willDismissShorthand = createEvent(this, "willDismiss", 7);
        this.didDismissShorthand = createEvent(this, "didDismiss", 7);
        this.delegateController = createDelegateController(this);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.customHTMLEnabled = config.get("innerHTMLTemplatesEnabled", ENABLE_HTML_CONTENT_DEFAULT);
        this.presented = false;
        this.hasController = false;
        this.keyboardClose = true;
        this.duration = 0;
        this.backdropDismiss = false;
        this.showBackdrop = true;
        this.translucent = false;
        this.animated = true;
        this.isOpen = false;
        this.onBackdropTap = () => {
          this.dismiss(void 0, BACKDROP);
        };
      }
      onIsOpenChange(newValue, oldValue) {
        if (newValue === true && oldValue === false) {
          this.present();
        } else if (newValue === false && oldValue === true) {
          this.dismiss();
        }
      }
      triggerChanged() {
        const { trigger, el, triggerController } = this;
        if (trigger) {
          triggerController.addClickListener(el, trigger);
        }
      }
      connectedCallback() {
        prepareOverlay(this.el);
        this.triggerChanged();
        if (this.presented) {
          restoreRootFocusTrapAccessibility(this.el);
        }
      }
      componentWillLoad() {
        if (this.spinner === void 0) {
          const mode = getIonMode(this);
          this.spinner = config.get("loadingSpinner", config.get("spinner", mode === "ios" ? "lines" : "crescent"));
        }
        if (!this.htmlAttributes?.id) {
          setOverlayId(this.el);
        }
      }
      componentDidLoad() {
        if (this.isOpen === true) {
          raf(() => this.present());
        }
        this.triggerChanged();
      }
      disconnectedCallback() {
        this.triggerController.removeClickListener();
        if (this.presented) {
          cleanupRootFocusTrapAccessibility();
        }
      }
      /**
       * Present the loading overlay after it has been created.
       */
      present() {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          yield this.delegateController.attachViewToDom();
          yield present(this, "loadingEnter", iosEnterAnimation, mdEnterAnimation);
          if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
          }
          unlock();
        });
      }
      /**
       * Dismiss the loading overlay after it has been presented.
       * This is a no-op if the overlay has not been presented yet. If you want
       * to remove an overlay from the DOM that was never presented, use the
       * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
       *
       * @param data Any data to emit in the dismiss events.
       * @param role The role of the element that is dismissing the loading.
       * This can be useful in a button handler for determining which button was
       * clicked to dismiss the loading. Some examples include:
       * `"cancel"`, `"destructive"`, `"selected"`, and `"backdrop"`.
       */
      dismiss(data, role) {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
          }
          const dismissed = yield dismiss(this, data, role, "loadingLeave", iosLeaveAnimation, mdLeaveAnimation);
          if (dismissed) {
            this.delegateController.removeViewFromDom();
          }
          unlock();
          return dismissed;
        });
      }
      /**
       * Returns a promise that resolves when the loading did dismiss.
       */
      onDidDismiss() {
        return eventMethod(this.el, "ionLoadingDidDismiss");
      }
      /**
       * Returns a promise that resolves when the loading will dismiss.
       */
      onWillDismiss() {
        return eventMethod(this.el, "ionLoadingWillDismiss");
      }
      renderLoadingMessage(msgId) {
        const { customHTMLEnabled, message } = this;
        if (customHTMLEnabled) {
          return h("div", { class: "loading-content", id: msgId, innerHTML: sanitizeDOMString(message) });
        }
        return h("div", { class: "loading-content", id: msgId }, message);
      }
      render() {
        const { message, spinner, htmlAttributes, overlayIndex } = this;
        const mode = getIonMode(this);
        const msgId = `loading-${overlayIndex}-msg`;
        const ariaLabelledBy = message !== void 0 ? msgId : null;
        return h(Host, __spreadProps(__spreadValues({ key: "b4430bc66aedeca19d5645667cba73c169c4bd76", role: "dialog", "aria-modal": "true", "aria-labelledby": ariaLabelledBy, tabindex: "-1" }, htmlAttributes), { style: {
          zIndex: `${4e4 + this.overlayIndex}`
        }, onIonBackdropTap: this.onBackdropTap, class: __spreadProps(__spreadValues({}, getClassMap(this.cssClass)), {
          [mode]: true,
          "overlay-hidden": true,
          "loading-translucent": this.translucent
        }) }), h("ion-backdrop", { key: "dec0df942ae778c99ebd4dbf08d6c2a0a992639d", visible: this.showBackdrop, tappable: this.backdropDismiss }), h("div", { key: "71b2d5fc259666225047fc901648ada1efcd5d4b", tabindex: "0", "aria-hidden": "true" }), h("div", { key: "1d83dc3b57ee70c9e8c0f006c6fa576bd96ecded", class: "loading-wrapper ion-overlay-wrapper" }, spinner && h("div", { key: "d1cd127e044b8831e396b53122322c1db7e89904", class: "loading-spinner" }, h("ion-spinner", { key: "38c2580cf5659da612872f01801a5fbdc2c023ba", name: spinner, "aria-hidden": "true" })), message !== void 0 && this.renderLoadingMessage(msgId)), h("div", { key: "90e5e32ffe0df2c691f364149f43374e676bfaa3", tabindex: "0", "aria-hidden": "true" }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "isOpen": [{
            "onIsOpenChange": 0
          }],
          "trigger": [{
            "triggerChanged": 0
          }]
        };
      }
    };
    Loading.style = {
      ios: loadingIosCss(),
      md: loadingMdCss()
    };
  }
});
init_ion_loading_entry();
export {
  Loading as ion_loading
};
//# debugId=6f3b3f45-bb22-5304-a1b9-6b8777801e1f
//# sourceMappingURL=chunk-X6KOK22N.js.map
