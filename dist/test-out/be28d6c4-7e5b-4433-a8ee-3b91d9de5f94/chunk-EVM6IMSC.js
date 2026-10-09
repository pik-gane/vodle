import {
  createKeyboardController,
  init_keyboard_controller_B2NoF7bV
} from "./chunk-XVMV6EZN.js";
import {
  findIonContent,
  getScrollElement,
  init_index_TkLga3ma,
  printIonContentErrorMsg
} from "./chunk-57PV5QBJ.js";
import {
  init_keyboard_Cmqp5iZD
} from "./chunk-VYSD5BUA.js";
import {
  createLockController,
  init_lock_controller_B_hirT0v
} from "./chunk-MZW2T2S4.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  getTimeGivenProgression,
  init_cubic_bezier_hHmYLOfE
} from "./chunk-HMW3MSDJ.js";
import {
  init_index_BBASprVu,
  transition
} from "./chunk-GMOSWYPY.js";
import {
  getOverlaySizeType,
  init_overlays_DmDY_El7,
  shouldUseCloseWatcher
} from "./chunk-VQMD36Q3.js";
import {
  attachComponent,
  detachComponent,
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  clamp,
  componentOnReady,
  hasLazyBuild,
  inheritAriaAttributes,
  init_helpers_BJqKF1pr,
  shallowEqualStringMap
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
  init_ionic_global_Cep6oYzK,
  isPlatform
} from "./chunk-URXKFSPR.js";
import {
  Host,
  config,
  createEvent,
  forceUpdate,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonError,
  printIonWarning,
  readTask,
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-app_8.entry.js
var appCss, App, needInputShims, buttonsIosCss, buttonsMdCss, Buttons, contentCss, Content, getParentElement, getPageElement, updateScrollDetail, handleFooterFade, footerIosCss, footerMdCss, Footer, TRANSITION, ROLE_NONE, ROLE_BANNER, cloneElement, createHeaderIndex, handleContentScroll, setToolbarBackgroundOpacity, handleToolbarBorderIntersection, handleToolbarIntersection, setHeaderActive, scaleLargeTitles, handleHeaderFade, getRoleType, headerIosCss, headerMdCss, Header, routerOutletCss, RouterOutlet, titleIosCss, titleMdCss, ToolbarTitle, toolbarIosCss, toolbarMdCss, Toolbar;
var init_ion_app_8_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-app_8.entry.js"() {
    init_index_BpRUsN_W();
    init_overlays_DmDY_El7();
    init_ionic_global_Cep6oYzK();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    init_theme_byZM6qHV();
    init_index_TkLga3ma();
    init_keyboard_controller_B2NoF7bV();
    init_cubic_bezier_hHmYLOfE();
    init_framework_delegate_CDjM1vRH();
    init_lock_controller_B_hirT0v();
    init_index_BBASprVu();
    init_gesture_controller_B_gJaBk0();
    init_keyboard_Cmqp5iZD();
    init_capacitor_CHJaJ9aX();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    appCss = () => `html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}html.plt-mobile ion-app [contenteditable]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}`;
    App = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
      }
      componentDidLoad() {
        {
          this.rIC(() => __async(this, null, function* () {
            const isHybrid = isPlatform(window, "hybrid");
            if (!config.getBoolean("_testing")) {
              import("./chunk-ECN6FTFX.js").then((module) => module.startTapClick(config));
            }
            if (config.getBoolean("statusTap", isHybrid)) {
              import("./chunk-KK4OV677.js").then((module) => module.startStatusTap());
            }
            if (config.getBoolean("inputShims", needInputShims())) {
              const platform = isPlatform(window, "ios") ? "ios" : "android";
              import("./chunk-3ZEJ3PW4.js").then((module) => module.startInputShims(config, platform));
            }
            const hardwareBackButtonModule = yield import("./chunk-5TB6NB2W.js").then(function(n) {
              return n.y;
            });
            const supportsHardwareBackButtonEvents = isHybrid || shouldUseCloseWatcher();
            if (config.getBoolean("hardwareBackButton", supportsHardwareBackButtonEvents)) {
              hardwareBackButtonModule.startHardwareBackButton();
            } else {
              if (shouldUseCloseWatcher()) {
                printIonWarning("[ion-app] - experimentalCloseWatcher was set to `true`, but hardwareBackButton was set to `false`. Both config options must be `true` for the Close Watcher API to be used.");
              }
              hardwareBackButtonModule.blockHardwareBackButton();
            }
            if (typeof window !== "undefined") {
              import("./chunk-B2UGIZAU.js").then((module) => module.startKeyboardAssist(window));
            }
            import("./chunk-SU4XGZEL.js").then((module) => this.focusVisible = module.startFocusVisible());
          }));
        }
      }
      disconnectedCallback() {
        if (this.loadTimeout) {
          clearTimeout(this.loadTimeout);
        }
      }
      /**
       * Used to set focus on an element that uses `ion-focusable`.
       * Do not use this if focusing the element as a result of a keyboard
       * event as the focus utility should handle this for us. This method
       * should be used when we want to programmatically focus an element as
       * a result of another user action. (Ex: We focus the first element
       * inside of a popover when the user presents it, but the popover is not always
       * presented as a result of keyboard action.)
       *
       * @param elements An array of HTML elements to set focus on.
       */
      setFocus(elements) {
        return __async(this, null, function* () {
          if (this.focusVisible) {
            this.focusVisible.setFocus(elements);
          }
        });
      }
      rIC(callback) {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(callback);
        } else {
          this.loadTimeout = setTimeout(callback, 32);
        }
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "77a7459d3e42b3715a5a7e1cf468e2ebc99e54bb", class: {
          [mode]: true,
          "ion-page": true,
          "force-statusbar-padding": config.getBoolean("_forceStatusbarPadding")
        } });
      }
      get el() {
        return getElement(this);
      }
    };
    needInputShims = () => {
      const needsShimsIOS = isPlatform(window, "ios") && isPlatform(window, "mobile");
      if (needsShimsIOS) {
        return true;
      }
      const isAndroidMobileWeb = isPlatform(window, "android") && isPlatform(window, "mobileweb");
      if (isAndroidMobileWeb) {
        return true;
      }
      return false;
    };
    App.style = appCss();
    buttonsIosCss = () => `.sc-ion-buttons-ios-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99}.sc-ion-buttons-ios-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-ios-s ion-button{--padding-top:3px;--padding-bottom:3px;--padding-start:5px;--padding-end:5px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;min-height:32px}.sc-ion-buttons-ios-s .button-has-icon-only{--padding-top:0;--padding-bottom:0}.sc-ion-buttons-ios-s ion-button:not(.button-round){--border-radius:4px}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button{--color:initial;--border-color:initial;--background-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-solid,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-solid{--background:var(--ion-color-contrast);--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12;--background-hover:var(--ion-color-base);--background-hover-opacity:0.45;--color:var(--ion-color-base);--color-focused:var(--ion-color-base)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-clear,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-clear{--color-activated:var(--ion-color-contrast);--color-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-outline,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-outline{--color-activated:var(--ion-color-base);--color-focused:var(--ion-color-contrast);--background-activated:var(--ion-color-contrast)}.sc-ion-buttons-ios-s .button-clear,.sc-ion-buttons-ios-s .button-outline{--background-activated:transparent;--background-focused:currentColor;--background-hover:transparent}.sc-ion-buttons-ios-s .button-solid:not(.ion-color){--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12}.sc-ion-buttons-ios-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:1.41em;line-height:0.67}.sc-ion-buttons-ios-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-start:0.4em;margin-inline-start:0.4em;font-size:1.41em;line-height:0.67}.sc-ion-buttons-ios-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.65em;line-height:0.67}`;
    buttonsMdCss = () => `.sc-ion-buttons-md-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-md-s ion-button{--padding-top:3px;--padding-bottom:3px;--padding-start:8px;--padding-end:8px;--box-shadow:none;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;min-height:32px}.sc-ion-buttons-md-s .button-has-icon-only{--padding-top:0;--padding-bottom:0}.sc-ion-buttons-md-s ion-button:not(.button-round){--border-radius:2px}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button{--color:initial;--color-focused:var(--ion-color-contrast);--color-hover:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-contrast);--background-hover:var(--ion-color-contrast)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-solid,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-solid{--background:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-shade);--background-hover:var(--ion-color-base);--color:var(--ion-color-base);--color-focused:var(--ion-color-base);--color-hover:var(--ion-color-base)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-outline,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-outline{--border-color:var(--ion-color-contrast)}.sc-ion-buttons-md-s .button-has-icon-only.button-clear{--padding-top:12px;--padding-end:12px;--padding-bottom:12px;--padding-start:12px;--border-radius:50%;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:3rem;height:3rem}.sc-ion-buttons-md-s .button{--background-hover:currentColor}.sc-ion-buttons-md-s .button-solid{--color:var(--ion-toolbar-background, var(--ion-background-color, #fff));--background:var(--ion-toolbar-color, var(--ion-text-color, #424242));--background-activated:transparent;--background-focused:currentColor}.sc-ion-buttons-md-s .button-outline{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--border-color:currentColor}.sc-ion-buttons-md-s .button-clear{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor}.sc-ion-buttons-md-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-end:0.3em;margin-inline-end:0.3em;font-size:1.4em}.sc-ion-buttons-md-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-margin-start:0.4em;margin-inline-start:0.4em;font-size:1.4em}.sc-ion-buttons-md-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.8em}`;
    Buttons = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.collapse = false;
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "58c1fc5eb867d0731c63549b1ccb3ec3bbbe6e1b", class: {
          [mode]: true,
          ["buttons-collapse"]: this.collapse
        } }, h("slot", { key: "0c8f95b9840c8fa0c4e50be84c5159620a3eb5c8" }));
      }
    };
    Buttons.style = {
      ios: buttonsIosCss(),
      md: buttonsMdCss()
    };
    contentCss = () => `:host{--background:var(--ion-background-color, #fff);--color:var(--ion-text-color, #000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;-ms-flex:1;flex:1;width:100%;height:100%;margin:0 !important;padding:0 !important;font-family:var(--ion-font-family, inherit);contain:size style}:host(.ion-color) .inner-scroll{background:var(--ion-color-base);color:var(--ion-color-contrast)}#background-content{left:0px;right:0px;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);position:absolute;background:var(--background)}.inner-scroll{left:0px;right:0px;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:calc(var(--padding-top) + var(--offset-top));padding-bottom:calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom) + var(--internal-content-safe-area-padding-bottom, 0px));position:absolute;color:var(--color);-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;-ms-touch-action:pan-x pan-y pinch-zoom;touch-action:pan-x pan-y pinch-zoom}.scroll-y,.scroll-x{-webkit-overflow-scrolling:touch;z-index:0;will-change:scroll-position}.scroll-y{overflow-y:var(--overflow);overscroll-behavior-y:contain}.scroll-x{overflow-x:var(--overflow);overscroll-behavior-x:contain}.overscroll::before,.overscroll::after{position:absolute;width:1px;height:1px;content:""}.overscroll::before{bottom:-1px}.overscroll::after{top:-1px}:host(.content-sizing){display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-height:0;contain:none}:host(.content-sizing) .inner-scroll{position:relative;top:0;bottom:0;margin-top:calc(var(--offset-top) * -1);margin-bottom:calc(var(--offset-bottom) * -1)}.transition-effect{display:none;position:absolute;width:100%;height:100vh;opacity:0;pointer-events:none}:host(.content-ltr) .transition-effect{left:-100%;}:host(.content-rtl) .transition-effect{right:-100%;}.transition-cover{position:absolute;right:0;width:100%;height:100%;background:black;opacity:0.1}.transition-shadow{display:block;position:absolute;width:100%;height:100%;-webkit-box-shadow:inset -9px 0 9px 0 rgba(0, 0, 100, 0.03);box-shadow:inset -9px 0 9px 0 rgba(0, 0, 100, 0.03)}:host(.content-ltr) .transition-shadow{right:0;}:host(.content-rtl) .transition-shadow{left:0;-webkit-transform:scaleX(-1);transform:scaleX(-1)}::slotted([slot=fixed]){position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0)}`;
    Content = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionScrollStart = createEvent(this, "ionScrollStart", 7);
        this.ionScroll = createEvent(this, "ionScroll", 7);
        this.ionScrollEnd = createEvent(this, "ionScrollEnd", 7);
        this.watchDog = null;
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        this.cTop = -1;
        this.cBottom = -1;
        this.isMainContent = true;
        this.resizeTimeout = null;
        this.inheritedAttributes = {};
        this.tabsElement = null;
        this.detail = {
          scrollTop: 0,
          scrollLeft: 0,
          type: "scroll",
          event: void 0,
          startX: 0,
          startY: 0,
          startTime: 0,
          currentX: 0,
          currentY: 0,
          velocityX: 0,
          velocityY: 0,
          deltaX: 0,
          deltaY: 0,
          currentTime: 0,
          data: void 0,
          isScrolling: true
        };
        this.sizeToContent = false;
        this.fullscreen = false;
        this.fixedSlotPlacement = "after";
        this.scrollX = false;
        this.scrollY = true;
        this.scrollEvents = false;
      }
      fullscreenChanged() {
        this.setupFullscreenResizeObserver();
      }
      componentWillLoad() {
        this.inheritedAttributes = inheritAriaAttributes(this.el);
        this.sizeToContent = this.readSizeToContent();
      }
      connectedCallback() {
        this.isMainContent = this.el.closest("ion-menu, ion-popover, ion-modal") === null;
        if (hasLazyBuild(this.el)) {
          const closestTabs = this.tabsElement = this.el.closest("ion-tabs");
          if (closestTabs !== null) {
            this.tabsLoadCallback = () => this.resize();
            closestTabs.addEventListener("ionTabBarLoaded", this.tabsLoadCallback);
          }
        }
        this.setupFullscreenResizeObserver();
        this.updateSizeToContent();
      }
      componentDidLoad() {
        this.setupFullscreenResizeObserver();
      }
      disconnectedCallback() {
        this.onScrollEnd();
        if (hasLazyBuild(this.el)) {
          const { tabsElement, tabsLoadCallback } = this;
          if (tabsElement !== null && tabsLoadCallback !== void 0) {
            tabsElement.removeEventListener("ionTabBarLoaded", tabsLoadCallback);
          }
          this.tabsElement = null;
          this.tabsLoadCallback = void 0;
        }
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = null;
        }
        this.destroyFullscreenResizeObserver();
      }
      /**
       * Header and footer sizes can change after load without a window resize
       * firing, so the `resize` listener alone misses those changes.
       *
       * Popover content is excluded because `contain: none` lets its offsets drive
       * the host's own height, which would feed back into the observer.
       */
      setupFullscreenResizeObserver() {
        if (typeof ResizeObserver === "undefined") {
          return;
        }
        if (!this.fullscreen || hostContext("ion-popover", this.el)) {
          this.destroyFullscreenResizeObserver();
          return;
        }
        if (this.fullscreenResizeObserver !== void 0) {
          return;
        }
        this.fullscreenResizeObserver = new ResizeObserver(() => {
          if (this.el.offsetParent === null) {
            return;
          }
          this.resize();
        });
        this.fullscreenResizeObserver.observe(this.el);
      }
      /**
       * Picks up an overlay that is no longer sized the way the last render
       * assumed, re-rendering only when the answer changes. Read in a `readTask`
       * because resolving the custom property forces a style recalculation.
       */
      updateSizeToContent() {
        readTask(() => {
          this.sizeToContent = this.readSizeToContent();
        });
      }
      destroyFullscreenResizeObserver() {
        if (this.fullscreenResizeObserver !== void 0) {
          this.fullscreenResizeObserver.disconnect();
          this.fullscreenResizeObserver = void 0;
        }
      }
      /**
       * Rotating certain devices can update
       * the safe area insets. As a result,
       * the fullscreen feature on ion-content
       * needs to be recalculated.
       *
       * We listen for "resize" because we
       * do not care what the orientation of
       * the device is. Other APIs
       * such as ScreenOrientation or
       * the deviceorientation event must have
       * permission from the user first whereas
       * the "resize" event does not.
       *
       * We also throttle the callback to minimize
       * thrashing when quickly resizing a window.
       */
      onResize() {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = null;
        }
        this.resizeTimeout = setTimeout(() => {
          if (this.el.offsetParent === null) {
            return;
          }
          this.resize();
        }, 100);
      }
      shouldForceOverscroll() {
        const { forceOverscroll } = this;
        const mode = getIonMode(this);
        return forceOverscroll === void 0 ? mode === "ios" && isPlatform("ios") : forceOverscroll;
      }
      /**
       * Reads whether to size the component to its content height. Forces a style
       * recalculation, so it belongs in a read task or before the first render.
       *
       * This applies inside popovers and modals with a content-based `--height`,
       * where the overlay does not provide the content with a definite height
       * to fill.
       *
       * Only `--height` is consulted. Styling the wrapper directly, such as
       * `ion-modal::part(content) { height: fit-content; }`, does not change
       * `--height` and therefore cannot be observed. `--height` is the only
       * supported way to opt into content-based sizing.
       */
      readSizeToContent() {
        if (hostContext("ion-popover", this.el)) {
          return true;
        }
        const modal = this.el.closest("ion-modal");
        if (modal === null) {
          return false;
        }
        const height = getComputedStyle(modal).getPropertyValue("--height");
        return getOverlaySizeType(height) === "content";
      }
      resize() {
        {
          this.updateSizeToContent();
          if (this.fullscreen) {
            readTask(() => this.readDimensions());
          } else if (this.cTop !== 0 || this.cBottom !== 0) {
            this.cTop = this.cBottom = 0;
            forceUpdate(this);
          }
        }
      }
      /**
       * Recalculates the content dimensions and whether it should size itself to
       * its content. Called by overlays when something they own changes, such as
       * a header finishing its render or `--height` being updated.
       *
       * @internal
       */
      recalculateDimensions() {
        return __async(this, null, function* () {
          readTask(() => this.readDimensions());
          this.updateSizeToContent();
        });
      }
      readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;
        if (dirty) {
          this.cTop = top;
          this.cBottom = bottom;
          forceUpdate(this);
        }
      }
      onScroll(ev) {
        const timeStamp = Date.now();
        const shouldStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (shouldStart) {
          this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
          this.queued = true;
          readTask((ts) => {
            this.queued = false;
            this.detail.event = ev;
            updateScrollDetail(this.detail, this.scrollEl, ts, shouldStart);
            this.ionScroll.emit(this.detail);
          });
        }
      }
      /**
       * Get the element where the actual scrolling takes place.
       * This element can be used to subscribe to `scroll` events or manually modify
       * `scrollTop`. However, it's recommended to use the API provided by `ion-content`:
       *
       * i.e. Using `ionScroll`, `ionScrollStart`, `ionScrollEnd` for scrolling events
       * and `scrollToPoint()` to scroll the content into a certain point.
       */
      getScrollElement() {
        return __async(this, null, function* () {
          if (!this.scrollEl) {
            yield new Promise((resolve) => componentOnReady(this.el, resolve));
          }
          return Promise.resolve(this.scrollEl);
        });
      }
      /**
       * Returns the background content element.
       * @internal
       */
      getBackgroundElement() {
        return __async(this, null, function* () {
          if (!this.backgroundContentEl) {
            yield new Promise((resolve) => componentOnReady(this.el, resolve));
          }
          return Promise.resolve(this.backgroundContentEl);
        });
      }
      /**
       * Scroll to the top of the component.
       *
       * @param duration The amount of time to take scrolling to the top. Defaults to `0`.
       */
      scrollToTop(duration = 0) {
        return this.scrollToPoint(void 0, 0, duration);
      }
      /**
       * Scroll to the bottom of the component.
       *
       * @param duration The amount of time to take scrolling to the bottom. Defaults to `0`.
       */
      scrollToBottom(duration = 0) {
        return __async(this, null, function* () {
          const scrollEl = yield this.getScrollElement();
          const y = scrollEl.scrollHeight - scrollEl.clientHeight;
          return this.scrollToPoint(void 0, y, duration);
        });
      }
      /**
       * Scroll by a specified X/Y distance in the component.
       *
       * @param x The amount to scroll by on the horizontal axis.
       * @param y The amount to scroll by on the vertical axis.
       * @param duration The amount of time to take scrolling by that amount.
       */
      scrollByPoint(x, y, duration) {
        return __async(this, null, function* () {
          const scrollEl = yield this.getScrollElement();
          return this.scrollToPoint(x + scrollEl.scrollLeft, y + scrollEl.scrollTop, duration);
        });
      }
      /**
       * Scroll to a specified X/Y location in the component.
       *
       * @param x The point to scroll to on the horizontal axis.
       * @param y The point to scroll to on the vertical axis.
       * @param duration The amount of time to take scrolling to that point. Defaults to `0`.
       */
      scrollToPoint(x, y, duration = 0) {
        return __async(this, null, function* () {
          const el = yield this.getScrollElement();
          if (duration < 32) {
            if (y != null) {
              el.scrollTop = y;
            }
            if (x != null) {
              el.scrollLeft = x;
            }
            return;
          }
          let resolve;
          let startTime = 0;
          const promise = new Promise((r) => resolve = r);
          const fromY = el.scrollTop;
          const fromX = el.scrollLeft;
          const deltaY = y != null ? y - fromY : 0;
          const deltaX = x != null ? x - fromX : 0;
          const step = (timeStamp) => {
            const linearTime = Math.min(1, (timeStamp - startTime) / duration) - 1;
            const easedT = Math.pow(linearTime, 3) + 1;
            if (deltaY !== 0) {
              el.scrollTop = Math.floor(easedT * deltaY + fromY);
            }
            if (deltaX !== 0) {
              el.scrollLeft = Math.floor(easedT * deltaX + fromX);
            }
            if (easedT < 1) {
              requestAnimationFrame(step);
            } else {
              resolve();
            }
          };
          requestAnimationFrame((ts) => {
            startTime = ts;
            step(ts);
          });
          return promise;
        });
      }
      onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
          isScrolling: true
        });
        if (this.watchDog) {
          clearInterval(this.watchDog);
        }
        this.watchDog = setInterval(() => {
          if (this.lastScroll < Date.now() - 120) {
            this.onScrollEnd();
          }
        }, 100);
      }
      onScrollEnd() {
        if (this.watchDog)
          clearInterval(this.watchDog);
        this.watchDog = null;
        if (this.isScrolling) {
          this.isScrolling = false;
          this.ionScrollEnd.emit({
            isScrolling: false
          });
        }
      }
      render() {
        const { fixedSlotPlacement, inheritedAttributes, isMainContent, scrollX, scrollY, el } = this;
        const rtl = isRTL(el) ? "rtl" : "ltr";
        const mode = getIonMode(this);
        const forceOverscroll = this.shouldForceOverscroll();
        const transitionShadow = mode === "ios";
        this.resize();
        return h(Host, __spreadValues({ key: "e1013621096729354ef92915af52dd823e69fdff", role: isMainContent ? "main" : void 0, class: createColorClasses(this.color, {
          [mode]: true,
          "content-fullscreen": this.fullscreen,
          "content-sizing": this.sizeToContent,
          overscroll: forceOverscroll,
          [`content-${rtl}`]: true
        }), style: {
          "--offset-top": `${this.cTop}px`,
          "--offset-bottom": `${this.cBottom}px`
        } }, inheritedAttributes), h("div", { key: "3d8649b164d6324beaa1bc50e1d204ad06c2ec1a", ref: (el2) => this.backgroundContentEl = el2, id: "background-content", part: "background" }), fixedSlotPlacement === "before" ? h("slot", { name: "fixed" }) : null, h("div", { key: "dd2d3bed8690b4f5027a43f5ec60e7e7df18106d", class: {
          "inner-scroll": true,
          "scroll-x": scrollX,
          "scroll-y": scrollY,
          overscroll: (scrollX || scrollY) && forceOverscroll
        }, ref: (scrollEl) => this.scrollEl = scrollEl, onScroll: this.scrollEvents ? (ev) => this.onScroll(ev) : void 0, part: "scroll" }, h("slot", { key: "dc3d4584d9e9afd43699525a619b8e873078fbbf" })), transitionShadow ? h("div", { class: "transition-effect" }, h("div", { class: "transition-cover" }), h("div", { class: "transition-shadow" })) : null, fixedSlotPlacement === "after" ? h("slot", { name: "fixed" }) : null);
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "fullscreen": [{
            "fullscreenChanged": 0
          }]
        };
      }
    };
    getParentElement = (el) => {
      if (el.parentElement) {
        return el.parentElement;
      }
      if (el.parentNode?.host) {
        return el.parentNode.host;
      }
      return null;
    };
    getPageElement = (el) => {
      const tabs = el.closest("ion-tabs");
      if (tabs) {
        return tabs;
      }
      const page = el.closest("ion-app, ion-page, .ion-page, page-inner, .popover-content");
      if (page) {
        return page;
      }
      return getParentElement(el);
    };
    updateScrollDetail = (detail, el, timestamp, shouldStart) => {
      const prevX = detail.currentX;
      const prevY = detail.currentY;
      const prevT = detail.currentTime;
      const currentX = el.scrollLeft;
      const currentY = el.scrollTop;
      const timeDelta = timestamp - prevT;
      if (shouldStart) {
        detail.startTime = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
      }
      detail.currentTime = timestamp;
      detail.currentX = detail.scrollLeft = currentX;
      detail.currentY = detail.scrollTop = currentY;
      detail.deltaX = currentX - detail.startX;
      detail.deltaY = currentY - detail.startY;
      if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
      }
    };
    Content.style = contentCss();
    handleFooterFade = (scrollEl, baseEl) => {
      readTask(() => {
        const scrollTop = scrollEl.scrollTop;
        const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
        const fadeDuration = 10;
        const fadeStart = maxScroll - fadeDuration;
        const distanceToStart = scrollTop - fadeStart;
        const scale = clamp(0, 1 - distanceToStart / fadeDuration, 1);
        writeTask(() => {
          baseEl.style.setProperty("--opacity-scale", scale.toString());
        });
      });
    };
    footerIosCss = () => `ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer.footer-toolbar-padding ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-ios ion-toolbar:first-of-type{--border-width:0.55px 0 0}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.footer-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8}}.footer-ios.ion-no-border ion-toolbar:first-of-type{--border-width:0}.footer-collapse-fade ion-toolbar{--opacity-scale:inherit}`;
    footerMdCss = () => `ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer.footer-toolbar-padding ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-md{-webkit-box-shadow:0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);box-shadow:0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)}.footer-md.ion-no-border{-webkit-box-shadow:none;box-shadow:none}`;
    Footer = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.keyboardCtrl = null;
        this.keyboardCtrlPromise = null;
        this.keyboardVisible = false;
        this.translucent = false;
        this.checkCollapsibleFooter = () => {
          const mode = getIonMode(this);
          if (mode !== "ios") {
            return;
          }
          const { collapse } = this;
          const hasFade = collapse === "fade";
          this.destroyCollapsibleFooter();
          if (hasFade) {
            const pageEl = this.el.closest("ion-app,ion-page,.ion-page,page-inner");
            const contentEl = pageEl ? findIonContent(pageEl) : null;
            if (!contentEl) {
              printIonContentErrorMsg(this.el);
              return;
            }
            this.setupFadeFooter(contentEl);
          }
        };
        this.setupFadeFooter = (contentEl) => __async(this, null, function* () {
          const scrollEl = this.scrollEl = yield getScrollElement(contentEl);
          this.contentScrollCallback = () => {
            handleFooterFade(scrollEl, this.el);
          };
          scrollEl.addEventListener("scroll", this.contentScrollCallback);
          handleFooterFade(scrollEl, this.el);
        });
      }
      componentDidLoad() {
        this.checkCollapsibleFooter();
      }
      componentDidUpdate() {
        this.checkCollapsibleFooter();
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
      destroyCollapsibleFooter() {
        if (this.scrollEl && this.contentScrollCallback) {
          this.scrollEl.removeEventListener("scroll", this.contentScrollCallback);
          this.contentScrollCallback = void 0;
        }
      }
      render() {
        const { translucent, collapse } = this;
        const mode = getIonMode(this);
        const tabs = this.el.closest("ion-tabs");
        const tabBar = tabs?.querySelector(":scope > ion-tab-bar");
        return h(Host, { key: "71939c4bbaef5062532a99ee2e33574102a9abad", role: "contentinfo", class: {
          [mode]: true,
          // Used internally for styling
          [`footer-${mode}`]: true,
          [`footer-translucent`]: translucent,
          [`footer-translucent-${mode}`]: translucent,
          ["footer-toolbar-padding"]: !this.keyboardVisible && (!tabBar || tabBar.slot !== "bottom"),
          [`footer-collapse-${collapse}`]: collapse !== void 0
        } }, mode === "ios" && translucent && h("div", { key: "2fa14f61661c47c661cecd696176728d6eafa74f", class: "footer-background" }), h("slot", { key: "8e63696e7c528d5c38201e546bf08135290d0945" }));
      }
      get el() {
        return getElement(this);
      }
    };
    Footer.style = {
      ios: footerIosCss(),
      md: footerMdCss()
    };
    TRANSITION = "all 0.2s ease-in-out";
    ROLE_NONE = "none";
    ROLE_BANNER = "banner";
    cloneElement = (tagName) => {
      const getCachedEl = document.querySelector(`${tagName}.ion-cloned-element`);
      if (getCachedEl !== null) {
        return getCachedEl;
      }
      const clonedEl = document.createElement(tagName);
      clonedEl.classList.add("ion-cloned-element");
      clonedEl.style.setProperty("display", "none");
      document.body.appendChild(clonedEl);
      return clonedEl;
    };
    createHeaderIndex = (headerEl) => {
      if (!headerEl) {
        return;
      }
      const toolbars = headerEl.querySelectorAll("ion-toolbar");
      return {
        el: headerEl,
        toolbars: Array.from(toolbars).map((toolbar) => {
          const ionTitleEl = toolbar.querySelector("ion-title");
          return {
            el: toolbar,
            background: toolbar.shadowRoot.querySelector(".toolbar-background"),
            ionTitleEl,
            innerTitleEl: ionTitleEl ? ionTitleEl.shadowRoot.querySelector(".toolbar-title") : null,
            ionButtonsEl: Array.from(toolbar.querySelectorAll("ion-buttons"))
          };
        })
      };
    };
    handleContentScroll = (scrollEl, scrollHeaderIndex, contentEl) => {
      readTask(() => {
        const scrollTop = scrollEl.scrollTop;
        const scale = clamp(1, 1 + -scrollTop / 500, 1.1);
        const nativeRefresher = contentEl.querySelector("ion-refresher.refresher-native");
        if (nativeRefresher === null) {
          writeTask(() => {
            scaleLargeTitles(scrollHeaderIndex.toolbars, scale);
          });
        }
      });
    };
    setToolbarBackgroundOpacity = (headerEl, opacity) => {
      if (headerEl.collapse === "fade") {
        return;
      }
      if (opacity === void 0) {
        headerEl.style.removeProperty("--opacity-scale");
      } else {
        headerEl.style.setProperty("--opacity-scale", opacity.toString());
      }
    };
    handleToolbarBorderIntersection = (ev, mainHeaderIndex, scrollTop) => {
      if (!ev[0].isIntersecting) {
        return;
      }
      const scale = ev[0].intersectionRatio > 0.9 || scrollTop <= 0 ? 0 : (1 - ev[0].intersectionRatio) * 100 / 75;
      setToolbarBackgroundOpacity(mainHeaderIndex.el, scale === 1 ? void 0 : scale);
    };
    handleToolbarIntersection = (ev, mainHeaderIndex, scrollHeaderIndex, scrollEl) => {
      writeTask(() => {
        const scrollTop = scrollEl.scrollTop;
        handleToolbarBorderIntersection(ev, mainHeaderIndex, scrollTop);
        const event = ev[0];
        const intersection = event.intersectionRect;
        const intersectionArea = intersection.width * intersection.height;
        const rootArea = event.rootBounds.width * event.rootBounds.height;
        const isPageHidden = intersectionArea === 0 && rootArea === 0;
        const leftDiff = Math.abs(intersection.left - event.boundingClientRect.left);
        const rightDiff = Math.abs(intersection.right - event.boundingClientRect.right);
        const isPageTransitioning = intersectionArea > 0 && (leftDiff >= 5 || rightDiff >= 5);
        if (isPageHidden || isPageTransitioning) {
          return;
        }
        if (event.isIntersecting) {
          setHeaderActive(mainHeaderIndex, false);
          setHeaderActive(scrollHeaderIndex);
        } else {
          const hasValidIntersection = intersection.x === 0 && intersection.y === 0 || intersection.width !== 0 && intersection.height !== 0;
          if (hasValidIntersection && scrollTop > 0) {
            setHeaderActive(mainHeaderIndex);
            setHeaderActive(scrollHeaderIndex, false);
            setToolbarBackgroundOpacity(mainHeaderIndex.el);
          }
        }
      });
    };
    setHeaderActive = (headerIndex, active = true) => {
      const headerEl = headerIndex.el;
      const toolbars = headerIndex.toolbars;
      const ionTitles = toolbars.map((toolbar) => toolbar.ionTitleEl);
      if (active) {
        headerEl.setAttribute("role", ROLE_BANNER);
        headerEl.classList.remove("header-collapse-condense-inactive");
        ionTitles.forEach((ionTitle) => {
          if (ionTitle) {
            ionTitle.removeAttribute("aria-hidden");
          }
        });
      } else {
        headerEl.setAttribute("role", ROLE_NONE);
        headerEl.classList.add("header-collapse-condense-inactive");
        ionTitles.forEach((ionTitle) => {
          if (ionTitle) {
            ionTitle.setAttribute("aria-hidden", "true");
          }
        });
      }
    };
    scaleLargeTitles = (toolbars = [], scale = 1, transition2 = false) => {
      toolbars.forEach((toolbar) => {
        const ionTitle = toolbar.ionTitleEl;
        const titleDiv = toolbar.innerTitleEl;
        if (!ionTitle || ionTitle.size !== "large") {
          return;
        }
        titleDiv.style.transition = transition2 ? TRANSITION : "";
        titleDiv.style.transform = `scale3d(${scale}, ${scale}, 1)`;
      });
    };
    handleHeaderFade = (scrollEl, baseEl, condenseHeader) => {
      readTask(() => {
        const scrollTop = scrollEl.scrollTop;
        const baseElHeight = baseEl.clientHeight;
        const fadeStart = condenseHeader ? condenseHeader.clientHeight : 0;
        if (condenseHeader !== null && scrollTop < fadeStart) {
          baseEl.style.setProperty("--opacity-scale", "0");
          scrollEl.style.setProperty("clip-path", `inset(${baseElHeight}px 0px 0px 0px)`);
          return;
        }
        const distanceToStart = scrollTop - fadeStart;
        const fadeDuration = 10;
        const scale = clamp(0, distanceToStart / fadeDuration, 1);
        writeTask(() => {
          scrollEl.style.removeProperty("clip-path");
          baseEl.style.setProperty("--opacity-scale", scale.toString());
        });
      });
    };
    getRoleType = (isInsideMenu, isCondensed, mode) => {
      if (isInsideMenu) {
        return ROLE_NONE;
      }
      if (isCondensed && mode === "md") {
        return ROLE_NONE;
      }
      return ROLE_BANNER;
    };
    headerIosCss = () => `ion-header{display:block;position:relative;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top, 0)}.header-ios ion-toolbar:last-of-type{--border-width:0 0 0.55px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.header-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.header-translucent-ios ion-toolbar{--opacity:.8}.header-collapse-condense-inactive .header-background{-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}}.header-ios.ion-no-border ion-toolbar:last-of-type{--border-width:0}.header-collapse-fade ion-toolbar{--opacity-scale:inherit}.header-collapse-fade.header-transitioning ion-toolbar{--background:transparent;--border-style:none}.header-collapse-condense{z-index:9}.header-collapse-condense ion-toolbar{position:-webkit-sticky;position:sticky;top:0}.header-collapse-condense ion-toolbar:first-of-type{padding-top:0px;z-index:1}.header-collapse-condense ion-toolbar{z-index:0}.header-collapse-condense ion-toolbar:last-of-type{--border-width:0px}.header-collapse-condense ion-toolbar ion-searchbar{padding-top:0px;padding-bottom:13px}.header-collapse-main{--opacity-scale:1}.header-collapse-main ion-toolbar{--opacity-scale:inherit}.header-collapse-main ion-toolbar.in-toolbar ion-title,.header-collapse-main ion-toolbar.in-toolbar ion-buttons{-webkit-transition:all 0.2s ease-in-out;transition:all 0.2s ease-in-out}.header-collapse-condense ion-toolbar,.header-collapse-condense-inactive.header-transitioning:not(.header-collapse-condense) ion-toolbar{--background:var(--ion-background-color, #fff)}.header-collapse-condense-inactive.header-transitioning:not(.header-collapse-condense) ion-toolbar{--border-style:none;--opacity-scale:1}.header-collapse-condense-inactive:not(.header-collapse-condense) ion-toolbar.in-toolbar ion-title,.header-collapse-condense-inactive:not(.header-collapse-condense) ion-toolbar.in-toolbar ion-buttons.buttons-collapse{opacity:0;pointer-events:none}.header-collapse-condense-inactive.header-collapse-condense ion-toolbar.in-toolbar ion-title,.header-collapse-condense-inactive.header-collapse-condense ion-toolbar.in-toolbar ion-buttons.buttons-collapse{visibility:hidden}ion-header.header-ios:not(.header-collapse-main):has(~ion-content ion-header.header-ios[collapse=condense],~ion-content ion-header.header-ios.header-collapse-condense){opacity:0}`;
    headerMdCss = () => `ion-header{display:block;position:relative;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top, 0)}.header-md{-webkit-box-shadow:0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);box-shadow:0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)}.header-md.header-collapse-condense{display:none}.header-md.ion-no-border{-webkit-box-shadow:none;box-shadow:none}`;
    Header = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inheritedAttributes = {};
        this.translucent = false;
        this.setupFadeHeader = (contentEl, condenseHeader) => __async(this, null, function* () {
          const scrollEl = this.scrollEl = yield getScrollElement(contentEl);
          this.contentScrollCallback = () => {
            handleHeaderFade(this.scrollEl, this.el, condenseHeader);
          };
          scrollEl.addEventListener("scroll", this.contentScrollCallback);
          handleHeaderFade(this.scrollEl, this.el, condenseHeader);
        });
      }
      componentWillLoad() {
        this.inheritedAttributes = inheritAriaAttributes(this.el);
      }
      componentDidLoad() {
        this.checkCollapsibleHeader();
      }
      componentDidUpdate() {
        this.checkCollapsibleHeader();
      }
      disconnectedCallback() {
        this.destroyCollapsibleHeader();
      }
      checkCollapsibleHeader() {
        return __async(this, null, function* () {
          const mode = getIonMode(this);
          if (mode !== "ios") {
            return;
          }
          const { collapse } = this;
          const hasCondense = collapse === "condense";
          const hasFade = collapse === "fade";
          this.destroyCollapsibleHeader();
          if (hasCondense) {
            const pageEl = this.el.closest("ion-app,ion-page,.ion-page,page-inner");
            const contentEl = pageEl ? findIonContent(pageEl) : null;
            writeTask(() => {
              const title = cloneElement("ion-title");
              title.size = "large";
              cloneElement("ion-back-button");
            });
            yield this.setupCondenseHeader(contentEl, pageEl);
          } else if (hasFade) {
            const pageEl = this.el.closest("ion-app,ion-page,.ion-page,page-inner");
            const contentEl = pageEl ? findIonContent(pageEl) : null;
            if (!contentEl) {
              printIonContentErrorMsg(this.el);
              return;
            }
            const condenseHeader = contentEl.querySelector('ion-header[collapse="condense"]');
            yield this.setupFadeHeader(contentEl, condenseHeader);
          }
        });
      }
      destroyCollapsibleHeader() {
        if (this.intersectionObserver) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = void 0;
        }
        if (this.scrollEl && this.contentScrollCallback) {
          this.scrollEl.removeEventListener("scroll", this.contentScrollCallback);
          this.contentScrollCallback = void 0;
        }
        if (this.collapsibleMainHeader) {
          this.collapsibleMainHeader.classList.remove("header-collapse-main");
          this.collapsibleMainHeader = void 0;
        }
      }
      setupCondenseHeader(contentEl, pageEl) {
        return __async(this, null, function* () {
          if (!contentEl || !pageEl) {
            printIonContentErrorMsg(this.el);
            return;
          }
          if (typeof IntersectionObserver === "undefined") {
            return;
          }
          this.scrollEl = yield getScrollElement(contentEl);
          const headers = pageEl.querySelectorAll("ion-header");
          this.collapsibleMainHeader = Array.from(headers).find((header) => header.collapse !== "condense");
          if (!this.collapsibleMainHeader) {
            return;
          }
          const mainHeaderIndex = createHeaderIndex(this.collapsibleMainHeader);
          const scrollHeaderIndex = createHeaderIndex(this.el);
          if (!mainHeaderIndex || !scrollHeaderIndex) {
            return;
          }
          setHeaderActive(mainHeaderIndex, false);
          setToolbarBackgroundOpacity(mainHeaderIndex.el, 0);
          const toolbarIntersection = (ev) => {
            handleToolbarIntersection(ev, mainHeaderIndex, scrollHeaderIndex, this.scrollEl);
          };
          this.intersectionObserver = new IntersectionObserver(toolbarIntersection, {
            root: contentEl,
            threshold: [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
          });
          this.intersectionObserver.observe(scrollHeaderIndex.toolbars[scrollHeaderIndex.toolbars.length - 1].el);
          this.contentScrollCallback = () => {
            handleContentScroll(this.scrollEl, scrollHeaderIndex, contentEl);
          };
          this.scrollEl.addEventListener("scroll", this.contentScrollCallback);
          writeTask(() => {
            if (this.collapsibleMainHeader !== void 0) {
              this.collapsibleMainHeader.classList.add("header-collapse-main");
            }
          });
        });
      }
      render() {
        const { translucent, inheritedAttributes } = this;
        const mode = getIonMode(this);
        const collapse = this.collapse || "none";
        const isCondensed = collapse === "condense";
        const roleType = getRoleType(hostContext("ion-menu", this.el), isCondensed, mode);
        return h(Host, __spreadValues({ key: "863c4568cd7b8c0ec55109f193bbbaed68a1346e", role: roleType, class: {
          [mode]: true,
          // Used internally for styling
          [`header-${mode}`]: true,
          [`header-translucent`]: this.translucent,
          [`header-collapse-${collapse}`]: true,
          [`header-translucent-${mode}`]: this.translucent
        } }, inheritedAttributes), mode === "ios" && translucent && h("div", { key: "25c3bdce328b0b35607d154c8b8374679313d881", class: "header-background" }), h("slot", { key: "b44fab0a9be7920b9650da26117c783e751e1702" }));
      }
      get el() {
        return getElement(this);
      }
    };
    Header.style = {
      ios: headerIosCss(),
      md: headerMdCss()
    };
    routerOutletCss = () => `:host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;z-index:0}`;
    RouterOutlet = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionNavWillLoad = createEvent(this, "ionNavWillLoad", 7);
        this.ionNavWillChange = createEvent(this, "ionNavWillChange", 3);
        this.ionNavDidChange = createEvent(this, "ionNavDidChange", 3);
        this.lockController = createLockController();
        this.gestureOrAnimationInProgress = false;
        this.mode = getIonMode(this);
        this.animated = true;
      }
      swipeGestureChanged() {
        this.updateGestureEnabled();
      }
      swipeHandlerChanged() {
        this.updateGestureEnabled();
      }
      connectedCallback() {
        return __async(this, null, function* () {
          const onStart = () => {
            this.gestureOrAnimationInProgress = true;
            if (this.swipeHandler) {
              this.swipeHandler.onStart();
            }
          };
          this.gesture = (yield import("./chunk-4WNFHUJF.js")).createSwipeBackGesture(this.el, () => !this.gestureOrAnimationInProgress && !!this.swipeHandler && this.swipeHandler.canStart(), () => onStart(), (step) => this.ani?.progressStep(step), (shouldComplete, step, dur) => {
            if (this.ani) {
              this.ani.onFinish(() => {
                this.gestureOrAnimationInProgress = false;
                if (this.swipeHandler) {
                  this.swipeHandler.onEnd(shouldComplete);
                }
              }, { oneTimeCallback: true });
              let newStepValue = shouldComplete ? -1e-3 : 1e-3;
              if (!shouldComplete) {
                this.ani.easing("cubic-bezier(1, 0, 0.68, 0.28)");
                newStepValue += getTimeGivenProgression([0, 0], [1, 0], [0.68, 0.28], [1, 1], step)[0];
              } else {
                newStepValue += getTimeGivenProgression([0, 0], [0.32, 0.72], [0, 1], [1, 1], step)[0];
              }
              this.ani.progressEnd(shouldComplete ? 1 : 0, newStepValue, dur);
            } else {
              this.gestureOrAnimationInProgress = false;
            }
          });
          if (this.swipeGesture === void 0) {
            this.swipeGesture = config.getBoolean("swipeBackEnabled", this.mode === "ios");
          } else {
            this.updateGestureEnabled();
          }
        });
      }
      componentWillLoad() {
        this.ionNavWillLoad.emit();
      }
      updateGestureEnabled() {
        if (this.gesture) {
          this.gesture.enable(this.swipeHandler !== void 0 && this.swipeGesture === true);
        }
      }
      disconnectedCallback() {
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
      }
      /** @internal */
      commit(enteringEl, leavingEl, opts) {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          let changed = false;
          try {
            changed = yield this.transition(enteringEl, leavingEl, opts);
          } catch (e) {
            printIonError("[ion-router-outlet] - Exception in commit:", e);
          }
          unlock();
          return changed;
        });
      }
      /** @internal */
      setRouteId(id, params, direction, animation) {
        return __async(this, null, function* () {
          const changed = yield this.setRoot(id, params, {
            duration: direction === "root" ? 0 : void 0,
            direction: direction === "back" ? "back" : "forward",
            animationBuilder: animation
          });
          return {
            changed,
            element: this.activeEl
          };
        });
      }
      /** @internal */
      getRouteId() {
        return __async(this, null, function* () {
          const active = this.activeEl;
          return active ? {
            id: active.tagName,
            element: active,
            params: this.activeParams
          } : void 0;
        });
      }
      setRoot(component, params, opts) {
        return __async(this, null, function* () {
          if (this.activeComponent === component && shallowEqualStringMap(params, this.activeParams)) {
            return false;
          }
          const leavingEl = this.activeEl;
          const enteringEl = yield attachComponent(this.delegate, this.el, component, ["ion-page", "ion-page-invisible"], params);
          this.activeComponent = component;
          this.activeEl = enteringEl;
          this.activeParams = params;
          yield this.commit(enteringEl, leavingEl, opts);
          yield detachComponent(this.delegate, leavingEl);
          return true;
        });
      }
      transition(_0, _1) {
        return __async(this, arguments, function* (enteringEl, leavingEl, opts = {}) {
          if (leavingEl === enteringEl) {
            return false;
          }
          this.ionNavWillChange.emit();
          const { el, mode } = this;
          const animated = this.animated && config.getBoolean("animated", true);
          const animationBuilder = opts.animationBuilder || this.animation || config.get("navAnimation");
          yield transition(__spreadProps(__spreadValues({
            mode,
            animated,
            enteringEl,
            leavingEl,
            baseEl: el,
            /**
             * We need to wait for all Stencil components
             * to be ready only when using the lazy
             * loaded bundle.
             */
            deepWait: hasLazyBuild(el),
            progressCallback: opts.progressAnimation ? (ani) => {
              if (ani !== void 0 && !this.gestureOrAnimationInProgress) {
                this.gestureOrAnimationInProgress = true;
                ani.onFinish(() => {
                  this.gestureOrAnimationInProgress = false;
                  if (this.swipeHandler) {
                    this.swipeHandler.onEnd(false);
                  }
                }, { oneTimeCallback: true });
                ani.progressEnd(0, 0, 0);
              } else {
                this.ani = ani;
              }
            } : void 0
          }, opts), {
            animationBuilder
          }));
          this.ionNavDidChange.emit();
          return true;
        });
      }
      render() {
        return h("slot", { key: "249e7d8a063c781db52fa535e42d648c7bf2909a" });
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "swipeGesture": [{
            "swipeGestureChanged": 0
          }],
          "swipeHandler": [{
            "swipeHandlerChanged": 0
          }]
        };
      }
    };
    RouterOutlet.style = routerOutletCss();
    titleIosCss = () => `:host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{top:0;-webkit-padding-start:90px;padding-inline-start:90px;-webkit-padding-end:90px;padding-inline-end:90px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0);font-size:min(1.0625rem, 20.4px);font-weight:600;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host{inset-inline-start:0}:host(.title-small){-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px;padding-top:6px;padding-bottom:16px;position:relative;font-size:min(0.8125rem, 23.4px);font-weight:normal}:host(.title-large){-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:2px;padding-bottom:4px;-webkit-transform-origin:left center;transform-origin:left center;position:static;-ms-flex-align:end;align-items:flex-end;min-width:100%;font-size:min(2.125rem, 61.2px);font-weight:700;text-align:start}:host(.title-large.title-rtl){-webkit-transform-origin:right center;transform-origin:right center}:host(.title-large.ion-cloned-element){--color:var(--ion-text-color, #000);font-family:var(--ion-font-family)}:host(.title-large) .toolbar-title{-webkit-transform-origin:inherit;transform-origin:inherit;width:auto}:host-context([dir=rtl]):host(.title-large) .toolbar-title,:host-context([dir=rtl]).title-large .toolbar-title{-webkit-transform-origin:calc(100% - inherit);transform-origin:calc(100% - inherit)}@supports selector(:dir(rtl)){:host(.title-large:dir(rtl)) .toolbar-title{-webkit-transform-origin:calc(100% - inherit);transform-origin:calc(100% - inherit)}}`;
    titleMdCss = () => `:host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px;padding-top:0;padding-bottom:0;font-size:1.25rem;font-weight:500;letter-spacing:0.0125em}:host(.title-small){width:100%;height:100%;font-size:0.9375rem;font-weight:normal}`;
    ToolbarTitle = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionStyle = createEvent(this, "ionStyle", 7);
      }
      sizeChanged() {
        this.emitStyle();
      }
      connectedCallback() {
        this.emitStyle();
      }
      emitStyle() {
        const size = this.getSize();
        this.ionStyle.emit({
          [`title-${size}`]: true
        });
      }
      getSize() {
        return this.size !== void 0 ? this.size : "default";
      }
      render() {
        const mode = getIonMode(this);
        const size = this.getSize();
        return h(Host, { key: "c5f0b913ff0a22d9bf02da48a313a613c2ac8fe7", class: createColorClasses(this.color, {
          [mode]: true,
          [`title-${size}`]: true,
          "title-rtl": document.dir === "rtl"
        }) }, h("div", { key: "5253b9e39fb764bfe1e57370719139f8a83e9904", class: "toolbar-title" }, h("slot", { key: "e38b1eccb0175c36f8cab211aee7ce4d61fc9035" })));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "size": [{
            "sizeChanged": 0
          }]
        };
      }
    };
    ToolbarTitle.style = {
      ios: titleIosCss(),
      md: titleMdCss()
    };
    toolbarIosCss = () => `:host{--border-width:0;--border-style:solid;--opacity:1;--opacity-scale:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;width:100%;padding-right:var(--ion-safe-area-right);padding-left:var(--ion-safe-area-left);color:var(--color);font-family:var(--ion-font-family, inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:calc(var(--opacity) * var(--opacity-scale));z-index:-1;pointer-events:none}::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background, var(--ion-color-step-50, var(--ion-background-color-step-50, #f7f7f7)));--color:var(--ion-toolbar-color, var(--ion-text-color, #000));--border-color:var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.2)))));--padding-top:3px;--padding-bottom:3px;--padding-start:4px;--padding-end:4px;--min-height:44px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:4;order:4;min-width:0}:host(.toolbar-segment) .toolbar-content{display:-ms-inline-flexbox;display:inline-flex}:host(.toolbar-searchbar) .toolbar-container{padding-top:0;padding-bottom:0}:host(.toolbar-searchbar) ::slotted(*){-ms-flex-item-align:start;align-self:start}:host(.toolbar-searchbar) ::slotted(ion-chip){margin-top:3px}::slotted(ion-buttons){min-height:38px}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:3;order:3}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}:host(.toolbar-title-large) .toolbar-container{-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:start;align-items:flex-start}:host(.toolbar-title-large) .toolbar-content ion-title{-ms-flex:1;flex:1;-ms-flex-order:8;order:8;min-width:100%}`;
    toolbarMdCss = () => `:host{--border-width:0;--border-style:solid;--opacity:1;--opacity-scale:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;width:100%;padding-right:var(--ion-safe-area-right);padding-left:var(--ion-safe-area-left);color:var(--color);font-family:var(--ion-font-family, inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:calc(var(--opacity) * var(--opacity-scale));z-index:-1;pointer-events:none}::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background, var(--ion-background-color, #fff));--color:var(--ion-toolbar-color, var(--ion-text-color, #424242));--border-color:var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, #c1c4cd))));--padding-top:0;--padding-bottom:0;--padding-start:0;--padding-end:0;--min-height:56px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:3;order:3;min-width:0;max-width:100%}::slotted(.buttons-first-slot){-webkit-margin-start:4px;margin-inline-start:4px}::slotted(.buttons-last-slot){-webkit-margin-end:4px;margin-inline-end:4px}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:4;order:4}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}`;
    Toolbar = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.childrenStyles = /* @__PURE__ */ new Map();
      }
      componentWillLoad() {
        const buttons = Array.from(this.el.querySelectorAll("ion-buttons"));
        const firstButtons = buttons.find((button) => {
          return button.slot === "start";
        });
        if (firstButtons) {
          firstButtons.classList.add("buttons-first-slot");
        }
        const buttonsReversed = buttons.reverse();
        const lastButtons = buttonsReversed.find((button) => button.slot === "end") || buttonsReversed.find((button) => button.slot === "primary") || buttonsReversed.find((button) => button.slot === "secondary");
        if (lastButtons) {
          lastButtons.classList.add("buttons-last-slot");
        }
      }
      childrenStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.childrenStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach((key) => {
          const childKey = `toolbar-${key}`;
          const newValue = updatedStyles[key];
          if (newValue !== childStyles[childKey]) {
            hasStyleChange = true;
          }
          if (newValue) {
            newStyles[childKey] = true;
          }
        });
        if (hasStyleChange) {
          this.childrenStyles.set(tagName, newStyles);
          forceUpdate(this);
        }
      }
      render() {
        const mode = getIonMode(this);
        const childStyles = {};
        this.childrenStyles.forEach((value) => {
          Object.assign(childStyles, value);
        });
        return h(Host, { key: "c16803dc4eae9972ef19bf43aa74b94feb4fd4c1", class: __spreadValues(__spreadValues({}, childStyles), createColorClasses(this.color, {
          [mode]: true,
          "in-toolbar": hostContext("ion-toolbar", this.el)
        })) }, h("div", { key: "20e3f85844c94b8399c245d2df125e6ab678d681", class: "toolbar-background", part: "background" }), h("div", { key: "12f09e324e8d9130b9d30c493106b500233fb016", class: "toolbar-container", part: "container" }, h("slot", { key: "6da0fe99ee0c4d7c969712e2908a4e7e6be5ed2c", name: "start" }), h("slot", { key: "177c346d6dcabb7857d810cda7d25c6dde32e6e2", name: "secondary" }), h("div", { key: "8c921b415940c71bf4c1a2c5c6887f36ad1afd16", class: "toolbar-content", part: "content" }, h("slot", { key: "1f2976b80d967bd51e86ed1357b363271d655df2" })), h("slot", { key: "0f7618044a7e8b0d9b715a8e208070f7ef2ee4c8", name: "primary" }), h("slot", { key: "125c393197e0660a3c2638dd4628c41ef7e05f19", name: "end" })));
      }
      get el() {
        return getElement(this);
      }
    };
    Toolbar.style = {
      ios: toolbarIosCss(),
      md: toolbarMdCss()
    };
  }
});
init_ion_app_8_entry();
export {
  App as ion_app,
  Buttons as ion_buttons,
  Content as ion_content,
  Footer as ion_footer,
  Header as ion_header,
  RouterOutlet as ion_router_outlet,
  ToolbarTitle as ion_title,
  Toolbar as ion_toolbar
};
//# debugId=bcf1ee1e-7b51-58c5-aa39-089b55bfb3e0
//# sourceMappingURL=chunk-EVM6IMSC.js.map
