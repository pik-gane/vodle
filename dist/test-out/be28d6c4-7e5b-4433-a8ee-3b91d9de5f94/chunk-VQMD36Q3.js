import {
  CoreDelegate,
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  BACKDROP_NO_SCROLL,
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  addEventListener,
  componentOnReady,
  doc,
  focusVisibleElement,
  getElementRoot,
  init_helpers_BJqKF1pr,
  removeEventListener,
  win
} from "./chunk-LEFG5EZ6.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  config,
  init_index_BpRUsN_W,
  printIonError,
  printIonWarning
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/overlays-DmDY-El7.js
var shouldUseCloseWatcher, blockHardwareBackButton, closeWatcherConditions, syncCloseWatcher, addCloseWatcherCondition, updateCloseWatcher, startHardwareBackButton, OVERLAY_BACK_BUTTON_PRIORITY, MENU_BACK_BUTTON_PRIORITY, hardwareBackButton, focusableQueryString, focusFirstDescendant, focusLastDescendant, focusElementInContext, lastOverlayIndex, lastId, NON_TOAST_OVERLAYS, activeAnimations, isBackdropAlwaysBlocking, locksAppRoot, createController, alertController, actionSheetController, loadingController, modalController, popoverController, toastController, prepareOverlay, setOverlayId, createOverlay, isOverlayHidden, focusElementInOverlay, trapKeyboardFocus, connectListeners, dismissOverlay, getOverlays, getPresentedOverlays, getPresentedOverlay, getViewContainer, setRootAriaHidden, cleanupRootFocusTrapAccessibility, applyRootLock, restoreRootFocusTrapAccessibility, present, restoreElementFocus, dismiss, getAppRoot, overlayAnimation, eventMethod, onceEvent, isCancel, defaultGate, safeCall, FULLSCREEN_SIZES, CONTENT_SIZES, getOverlaySizeType, BACKDROP, GESTURE, OVERLAY_GESTURE_PRIORITY, createDelegateController, createTriggerController, FOCUS_TRAP_DISABLE_CLASS;
var init_overlays_DmDY_El7 = __esm({
  "node_modules/@ionic/core/dist/esm/overlays-DmDY-El7.js"() {
    init_helpers_BJqKF1pr();
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    init_framework_delegate_CDjM1vRH();
    init_gesture_controller_B_gJaBk0();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    shouldUseCloseWatcher = () => config.get("experimentalCloseWatcher", false) && win !== void 0 && "CloseWatcher" in win;
    blockHardwareBackButton = () => {
      document.addEventListener("backbutton", () => {
      });
    };
    closeWatcherConditions = [];
    addCloseWatcherCondition = (condition) => {
      closeWatcherConditions.push(condition);
    };
    updateCloseWatcher = () => {
      syncCloseWatcher?.();
    };
    startHardwareBackButton = () => {
      const doc2 = document;
      let busy = false;
      const backButtonCallback = () => {
        if (busy) {
          return;
        }
        let index = 0;
        let handlers = [];
        const ev = new CustomEvent("ionBackButton", {
          bubbles: false,
          detail: {
            register(priority, handler) {
              handlers.push({ priority, handler, id: index++ });
            }
          }
        });
        doc2.dispatchEvent(ev);
        const executeAction = (handlerRegister) => __async(null, null, function* () {
          try {
            if (handlerRegister?.handler) {
              const result = handlerRegister.handler(processHandlers);
              if (result != null) {
                yield result;
              }
            }
          } catch (e) {
            printIonError("[ion-app] - Exception in startHardwareBackButton:", e);
          }
        });
        const processHandlers = () => {
          if (handlers.length > 0) {
            let selectedHandler = {
              priority: Number.MIN_SAFE_INTEGER,
              handler: () => void 0,
              id: -1
            };
            handlers.forEach((handler) => {
              if (handler.priority >= selectedHandler.priority) {
                selectedHandler = handler;
              }
            });
            busy = true;
            handlers = handlers.filter((handler) => handler.id !== selectedHandler.id);
            executeAction(selectedHandler).then(() => busy = false);
          }
        };
        processHandlers();
      };
      doc2.addEventListener("backbutton", backButtonCallback);
      if (shouldUseCloseWatcher()) {
        let watcher;
        syncCloseWatcher = () => {
          const canClose = closeWatcherConditions.some((condition) => condition());
          if (!canClose) {
            watcher?.destroy();
            watcher = void 0;
            return;
          }
          if (watcher !== void 0) {
            return;
          }
          watcher = new win.CloseWatcher();
          watcher.onclose = () => {
            watcher = void 0;
            backButtonCallback();
            syncCloseWatcher?.();
          };
        };
        syncCloseWatcher();
      }
    };
    OVERLAY_BACK_BUTTON_PRIORITY = 100;
    MENU_BACK_BUTTON_PRIORITY = 99;
    hardwareBackButton = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      MENU_BACK_BUTTON_PRIORITY,
      OVERLAY_BACK_BUTTON_PRIORITY,
      addCloseWatcherCondition,
      blockHardwareBackButton,
      shouldUseCloseWatcher,
      startHardwareBackButton,
      updateCloseWatcher
    });
    focusableQueryString = '[tabindex]:not([tabindex^="-"]):not([hidden]):not([disabled]), input:not([type=hidden]):not([tabindex^="-"]):not([hidden]):not([disabled]), textarea:not([tabindex^="-"]):not([hidden]):not([disabled]), button:not([tabindex^="-"]):not([hidden]):not([disabled]), select:not([tabindex^="-"]):not([hidden]):not([disabled]), ion-checkbox:not([tabindex^="-"]):not([hidden]):not([disabled]), ion-radio:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable[disabled="false"]:not([tabindex^="-"]):not([hidden])';
    focusFirstDescendant = (ref, fallbackElement) => {
      const firstInput = ref.querySelector(focusableQueryString);
      focusElementInContext(firstInput, fallbackElement ?? ref);
    };
    focusLastDescendant = (ref, fallbackElement) => {
      const inputs = Array.from(ref.querySelectorAll(focusableQueryString));
      const lastInput = inputs.length > 0 ? inputs[inputs.length - 1] : null;
      focusElementInContext(lastInput, fallbackElement ?? ref);
    };
    focusElementInContext = (hostToFocus, fallbackElement) => {
      let elementToFocus = hostToFocus;
      const shadowRoot = hostToFocus?.shadowRoot;
      if (shadowRoot) {
        elementToFocus = shadowRoot.querySelector(focusableQueryString) || hostToFocus;
      }
      if (elementToFocus) {
        const radioGroup = elementToFocus.closest("ion-radio-group");
        if (radioGroup) {
          radioGroup.setFocus();
        } else {
          focusVisibleElement(elementToFocus);
        }
      } else {
        fallbackElement.focus();
      }
    };
    lastOverlayIndex = 0;
    lastId = 0;
    NON_TOAST_OVERLAYS = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-popover";
    activeAnimations = /* @__PURE__ */ new WeakMap();
    isBackdropAlwaysBlocking = (el) => {
      return el.showBackdrop !== false && !((el.backdropBreakpoint ?? 0) > 0);
    };
    locksAppRoot = (el) => {
      return el.tagName !== "ION-TOAST" && el.focusTrap !== false && isBackdropAlwaysBlocking(el);
    };
    createController = (tagName) => {
      return {
        create(options) {
          return createOverlay(tagName, options);
        },
        dismiss(data, role, id) {
          return dismissOverlay(document, data, role, tagName, id);
        },
        getTop() {
          return __async(this, null, function* () {
            return getPresentedOverlay(document, tagName);
          });
        }
      };
    };
    alertController = /* @__PURE__ */ createController("ion-alert");
    actionSheetController = /* @__PURE__ */ createController("ion-action-sheet");
    loadingController = /* @__PURE__ */ createController("ion-loading");
    modalController = /* @__PURE__ */ createController("ion-modal");
    popoverController = /* @__PURE__ */ createController("ion-popover");
    toastController = /* @__PURE__ */ createController("ion-toast");
    prepareOverlay = (el) => {
      if (typeof document !== "undefined") {
        connectListeners(document);
      }
      const overlayIndex = lastOverlayIndex++;
      el.overlayIndex = overlayIndex;
    };
    setOverlayId = (el) => {
      if (!el.hasAttribute("id")) {
        el.id = `ion-overlay-${++lastId}`;
      }
      return el.id;
    };
    createOverlay = (tagName, opts) => {
      if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
        return window.customElements.whenDefined(tagName).then(() => {
          const element = document.createElement(tagName);
          element.classList.add("overlay-hidden");
          Object.assign(element, __spreadProps(__spreadValues({}, opts), { hasController: true }));
          getAppRoot(document).appendChild(element);
          return new Promise((resolve) => componentOnReady(element, resolve));
        });
      }
      return Promise.resolve();
    };
    isOverlayHidden = (overlay) => overlay.classList.contains("overlay-hidden");
    focusElementInOverlay = (hostToFocus, overlay) => {
      let elementToFocus = hostToFocus;
      const shadowRoot = hostToFocus?.shadowRoot;
      if (shadowRoot) {
        elementToFocus = shadowRoot.querySelector(focusableQueryString) || hostToFocus;
      }
      if (elementToFocus) {
        focusVisibleElement(elementToFocus);
      } else {
        overlay.focus();
      }
    };
    trapKeyboardFocus = (ev, doc2) => {
      const lastOverlay = getPresentedOverlay(doc2, NON_TOAST_OVERLAYS);
      const target = ev.target;
      if (!lastOverlay || !target) {
        return;
      }
      if (lastOverlay.classList.contains(FOCUS_TRAP_DISABLE_CLASS)) {
        return;
      }
      const trapScopedFocus = () => {
        if (lastOverlay === target) {
          lastOverlay.lastFocus = void 0;
        } else if (target.tagName === "ION-TOAST") {
          focusElementInOverlay(lastOverlay.lastFocus, lastOverlay);
        } else {
          const overlayRoot = getElementRoot(lastOverlay);
          if (!overlayRoot.contains(target)) {
            return;
          }
          const overlayWrapper = overlayRoot.querySelector(".ion-overlay-wrapper");
          if (!overlayWrapper) {
            return;
          }
          if (overlayWrapper.contains(target) || target === overlayRoot.querySelector("ion-backdrop")) {
            lastOverlay.lastFocus = target;
          } else {
            const lastFocus = lastOverlay.lastFocus;
            focusFirstDescendant(overlayWrapper, lastOverlay);
            if (lastFocus === doc2.activeElement) {
              focusLastDescendant(overlayWrapper, lastOverlay);
            }
            lastOverlay.lastFocus = doc2.activeElement;
          }
        }
      };
      const trapShadowFocus = () => {
        if (lastOverlay.contains(target)) {
          lastOverlay.lastFocus = target;
        } else if (target.tagName === "ION-TOAST") {
          focusElementInOverlay(lastOverlay.lastFocus, lastOverlay);
        } else {
          const lastFocus = lastOverlay.lastFocus;
          focusFirstDescendant(lastOverlay);
          if (lastFocus === doc2.activeElement) {
            focusLastDescendant(lastOverlay);
          }
          lastOverlay.lastFocus = doc2.activeElement;
        }
      };
      if (lastOverlay.shadowRoot) {
        trapShadowFocus();
      } else {
        trapScopedFocus();
      }
    };
    connectListeners = (doc2) => {
      if (lastOverlayIndex === 0) {
        lastOverlayIndex = 1;
        doc2.addEventListener("focus", (ev) => {
          trapKeyboardFocus(ev, doc2);
        }, true);
        addCloseWatcherCondition(() => getPresentedOverlay(doc2, NON_TOAST_OVERLAYS) !== void 0);
        doc2.addEventListener("ionBackButton", (ev) => {
          const lastOverlay = getPresentedOverlay(doc2);
          if (lastOverlay?.backdropDismiss) {
            ev.detail.register(OVERLAY_BACK_BUTTON_PRIORITY, () => {
              lastOverlay.dismiss(void 0, BACKDROP);
            });
          }
        });
        if (!shouldUseCloseWatcher()) {
          doc2.addEventListener("keydown", (ev) => {
            if (ev.key === "Escape") {
              const lastOverlay = getPresentedOverlay(doc2);
              if (lastOverlay?.backdropDismiss) {
                lastOverlay.dismiss(void 0, BACKDROP);
              }
            }
          });
        }
      }
    };
    dismissOverlay = (doc2, data, role, overlayTag, id) => {
      const overlay = getPresentedOverlay(doc2, overlayTag, id);
      if (!overlay) {
        return Promise.reject("overlay does not exist");
      }
      return overlay.dismiss(data, role);
    };
    getOverlays = (doc2, selector) => {
      if (selector === void 0) {
        selector = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-popover,ion-toast";
      }
      return Array.from(doc2.querySelectorAll(selector)).filter((c) => c.overlayIndex > 0);
    };
    getPresentedOverlays = (doc2, overlayTag) => {
      return getOverlays(doc2, overlayTag).filter((o) => !isOverlayHidden(o));
    };
    getPresentedOverlay = (doc2, overlayTag, id) => {
      const overlays = getPresentedOverlays(doc2, overlayTag);
      return (id === void 0 ? overlays : overlays.filter((o) => o.id === id)).slice(-1)[0];
    };
    getViewContainer = () => {
      return getAppRoot(document).querySelector("ion-router-outlet, #ion-view-container-root");
    };
    setRootAriaHidden = (hidden = false) => {
      const viewContainer = getViewContainer();
      if (!viewContainer) {
        return;
      }
      if (hidden) {
        viewContainer.setAttribute("aria-hidden", "true");
      } else {
        viewContainer.removeAttribute("aria-hidden");
      }
    };
    cleanupRootFocusTrapAccessibility = () => {
      if (typeof document === "undefined") {
        return;
      }
      updateCloseWatcher();
      const remainingOverlays = getPresentedOverlays(document);
      const hasRemainingLocking = remainingOverlays.some((o) => locksAppRoot(o));
      if (!hasRemainingLocking) {
        setRootAriaHidden(false);
        document.body.classList.remove(BACKDROP_NO_SCROLL);
      }
    };
    applyRootLock = (el) => {
      if (!getViewContainer()?.contains(el)) {
        setRootAriaHidden(true);
      }
      document.body.classList.add(BACKDROP_NO_SCROLL);
    };
    restoreRootFocusTrapAccessibility = (overlayEl) => {
      if (typeof document === "undefined") {
        return;
      }
      updateCloseWatcher();
      const el = overlayEl;
      if (!locksAppRoot(el)) {
        return;
      }
      applyRootLock(el);
    };
    present = (overlay, name, iosEnterAnimation, mdEnterAnimation, opts) => __async(null, null, function* () {
      if (overlay.presented) {
        return;
      }
      if (overlay.el.tagName !== "ION-TOAST") {
        restoreElementFocus(overlay.el);
      }
      const overlayEl = overlay.el;
      const shouldLockRoot = locksAppRoot(overlayEl);
      overlay.presented = true;
      overlay.willPresent.emit();
      if (shouldLockRoot) {
        applyRootLock(overlayEl);
      }
      overlay.willPresentShorthand?.emit();
      const mode = getIonMode(overlay);
      const animationBuilder = overlay.enterAnimation ? overlay.enterAnimation : config.get(name, mode === "ios" ? iosEnterAnimation : mdEnterAnimation);
      const completed = yield overlayAnimation(overlay, animationBuilder, overlay.el, opts);
      if (completed) {
        overlay.didPresent.emit();
        overlay.didPresentShorthand?.emit();
      }
      if (overlay.keyboardClose && (document.activeElement === null || !overlay.el.contains(document.activeElement))) {
        const overlayWrapper = getElementRoot(overlay.el).querySelector('[role="dialog"][tabindex]');
        const focusTarget = overlayWrapper ?? overlay.el;
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (e) {
          focusTarget.focus();
        }
      }
      overlay.el.removeAttribute("aria-hidden");
      overlay.el.removeAttribute("inert");
    });
    restoreElementFocus = (overlayEl) => __async(null, null, function* () {
      let previousElement = document.activeElement;
      if (!previousElement) {
        return;
      }
      previousElement.blur();
      const shadowRoot = previousElement?.shadowRoot;
      if (shadowRoot) {
        previousElement = shadowRoot.querySelector(focusableQueryString) || previousElement;
      }
      yield overlayEl.onDidDismiss();
      if (document.activeElement === null || document.activeElement === document.body) {
        previousElement.focus();
      }
    });
    dismiss = (overlay, data, role, name, iosLeaveAnimation, mdLeaveAnimation, opts) => __async(null, null, function* () {
      if (!overlay.presented) {
        return false;
      }
      const presentedOverlays = doc !== void 0 ? getPresentedOverlays(doc) : [];
      const overlaysLockingRoot = presentedOverlays.filter((o) => locksAppRoot(o));
      const overlayEl = overlay.el;
      const locksRoot = locksAppRoot(overlayEl);
      const lastOverlayTrappingFocus = locksRoot && overlaysLockingRoot.length === 1 && overlaysLockingRoot[0].id === overlayEl.id;
      if (lastOverlayTrappingFocus) {
        setRootAriaHidden(false);
        document.body.classList.remove(BACKDROP_NO_SCROLL);
      }
      overlay.presented = false;
      try {
        overlay.el.style.setProperty("pointer-events", "none");
        overlay.willDismiss.emit({ data, role });
        overlay.willDismissShorthand?.emit({ data, role });
        const mode = getIonMode(overlay);
        const animationBuilder = overlay.leaveAnimation ? overlay.leaveAnimation : config.get(name, mode === "ios" ? iosLeaveAnimation : mdLeaveAnimation);
        if (role !== GESTURE) {
          yield overlayAnimation(overlay, animationBuilder, overlay.el, opts);
        }
        overlay.didDismiss.emit({ data, role });
        overlay.didDismissShorthand?.emit({ data, role });
        const animations = activeAnimations.get(overlay) || [];
        animations.forEach((ani) => ani.destroy());
        activeAnimations.delete(overlay);
        overlay.el.classList.add("overlay-hidden");
        overlay.el.style.removeProperty("pointer-events");
        if (overlay.el.lastFocus !== void 0) {
          overlay.el.lastFocus = void 0;
        }
      } catch (err) {
        printIonError(`[${overlay.el.tagName.toLowerCase()}] - `, err);
      }
      overlay.el.remove();
      updateCloseWatcher();
      return true;
    });
    getAppRoot = (doc2) => {
      return doc2.querySelector("ion-app") || doc2.body;
    };
    overlayAnimation = (overlay, animationBuilder, baseEl, opts) => __async(null, null, function* () {
      baseEl.classList.remove("overlay-hidden");
      updateCloseWatcher();
      const aniRoot = overlay.el;
      const animation = animationBuilder(aniRoot, opts);
      if (!overlay.animated || !config.getBoolean("animated", true)) {
        animation.duration(0);
      }
      if (overlay.keyboardClose) {
        animation.beforeAddWrite(() => {
          const activeElement = baseEl.ownerDocument.activeElement;
          if (activeElement?.matches("input,ion-input, ion-textarea")) {
            activeElement.blur();
          }
        });
      }
      const activeAni = activeAnimations.get(overlay) || [];
      activeAnimations.set(overlay, [...activeAni, animation]);
      yield animation.play();
      return true;
    });
    eventMethod = (element, eventName) => {
      let resolve;
      const promise = new Promise((r) => resolve = r);
      onceEvent(element, eventName, (event) => {
        resolve(event.detail);
      });
      return promise;
    };
    onceEvent = (element, eventName, callback) => {
      const handler = (ev) => {
        removeEventListener(element, eventName, handler);
        callback(ev);
      };
      addEventListener(element, eventName, handler);
    };
    isCancel = (role) => {
      return role === "cancel" || role === BACKDROP;
    };
    defaultGate = (h) => h();
    safeCall = (handler, arg) => {
      if (typeof handler === "function") {
        const jmp = config.get("_zoneGate", defaultGate);
        return jmp(() => {
          try {
            return handler(arg);
          } catch (e) {
            throw e;
          }
        });
      }
      return void 0;
    };
    FULLSCREEN_SIZES = ["", "100%", "100vw", "100vh", "100dvw", "100dvh", "100svw", "100svh"];
    CONTENT_SIZES = ["auto", "fit-content", "min-content", "max-content"];
    getOverlaySizeType = (size) => {
      const value = size.trim().toLowerCase();
      if (FULLSCREEN_SIZES.includes(value)) {
        return "fullscreen";
      }
      if (CONTENT_SIZES.some((keyword) => value.endsWith(keyword))) {
        return "content";
      }
      return "definite";
    };
    BACKDROP = "backdrop";
    GESTURE = "gesture";
    OVERLAY_GESTURE_PRIORITY = 39;
    createDelegateController = (ref) => {
      let inline = false;
      let workingDelegate;
      const coreDelegate = CoreDelegate();
      const getDelegate = (force = false) => {
        if (workingDelegate && !force) {
          return {
            delegate: workingDelegate,
            inline
          };
        }
        const { el, hasController, delegate } = ref;
        const parentEl = el.parentNode;
        inline = parentEl !== null && !hasController;
        workingDelegate = inline ? delegate || coreDelegate : delegate;
        return { inline, delegate: workingDelegate };
      };
      const attachViewToDom = (component) => __async(null, null, function* () {
        const { delegate } = getDelegate(true);
        if (delegate) {
          return yield delegate.attachViewToDom(ref.el, component);
        }
        const { hasController } = ref;
        if (hasController && component !== void 0) {
          throw new Error("framework delegate is missing");
        }
        return null;
      });
      const removeViewFromDom = () => {
        const { delegate } = getDelegate();
        if (delegate && ref.el !== void 0) {
          delegate.removeViewFromDom(ref.el.parentElement, ref.el);
        }
      };
      return {
        attachViewToDom,
        removeViewFromDom
      };
    };
    createTriggerController = () => {
      let destroyTriggerInteraction;
      const removeClickListener = () => {
        if (destroyTriggerInteraction) {
          destroyTriggerInteraction();
          destroyTriggerInteraction = void 0;
        }
      };
      const addClickListener = (el, trigger) => {
        removeClickListener();
        const triggerEl = trigger !== void 0 ? document.getElementById(trigger) : null;
        if (!triggerEl) {
          printIonWarning(`[${el.tagName.toLowerCase()}] - A trigger element with the ID "${trigger}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on an overlay component.`, el);
          return;
        }
        const configureTriggerInteraction = (targetEl, overlayEl) => {
          const openOverlay = () => {
            overlayEl.present();
          };
          targetEl.addEventListener("click", openOverlay);
          return () => {
            targetEl.removeEventListener("click", openOverlay);
          };
        };
        destroyTriggerInteraction = configureTriggerInteraction(triggerEl, el);
      };
      return {
        addClickListener,
        removeClickListener
      };
    };
    FOCUS_TRAP_DISABLE_CLASS = "ion-disable-focus-trap";
  }
});

export {
  shouldUseCloseWatcher,
  addCloseWatcherCondition,
  updateCloseWatcher,
  MENU_BACK_BUTTON_PRIORITY,
  hardwareBackButton,
  focusFirstDescendant,
  focusLastDescendant,
  alertController,
  actionSheetController,
  loadingController,
  modalController,
  popoverController,
  toastController,
  prepareOverlay,
  setOverlayId,
  getPresentedOverlay,
  cleanupRootFocusTrapAccessibility,
  restoreRootFocusTrapAccessibility,
  present,
  dismiss,
  eventMethod,
  isCancel,
  safeCall,
  getOverlaySizeType,
  BACKDROP,
  GESTURE,
  OVERLAY_GESTURE_PRIORITY,
  createDelegateController,
  createTriggerController,
  FOCUS_TRAP_DISABLE_CLASS,
  init_overlays_DmDY_El7
};
//# debugId=d20ae1c5-782d-58fd-8747-98abec206f38
//# sourceMappingURL=chunk-VQMD36Q3.js.map
