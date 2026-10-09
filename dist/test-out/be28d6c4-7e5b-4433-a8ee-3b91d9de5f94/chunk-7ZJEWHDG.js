import {
  disableContentScrollY,
  findClosestIonContent,
  findIonContent,
  findRefresherInContent,
  init_index_TkLga3ma,
  isIonContent,
  printIonContentErrorMsg,
  resetContentScrollY
} from "./chunk-57PV5QBJ.js";
import {
  KEYBOARD_DID_OPEN,
  init_keyboard_B4Y_Gph8
} from "./chunk-RXRG5RQJ.js";
import {
  init_keyboard_Cmqp5iZD
} from "./chunk-VYSD5BUA.js";
import {
  createLockController,
  init_lock_controller_B_hirT0v
} from "./chunk-MZW2T2S4.js";
import {
  getCapacitor,
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  getTimeGivenProgression,
  init_cubic_bezier_hHmYLOfE
} from "./chunk-HMW3MSDJ.js";
import {
  deepReady,
  init_index_BBASprVu,
  waitForMount
} from "./chunk-GMOSWYPY.js";
import {
  createAnimation,
  init_animation_DmtJpz89
} from "./chunk-UYK5QVEZ.js";
import {
  createGesture,
  init_index_BmLuEdV7
} from "./chunk-OTRSMIBG.js";
import {
  BACKDROP,
  FOCUS_TRAP_DISABLE_CLASS,
  GESTURE,
  OVERLAY_GESTURE_PRIORITY,
  cleanupRootFocusTrapAccessibility,
  createTriggerController,
  dismiss,
  eventMethod,
  getOverlaySizeType,
  init_overlays_DmDY_El7,
  prepareOverlay,
  present,
  restoreRootFocusTrapAccessibility,
  setOverlayId
} from "./chunk-VQMD36Q3.js";
import {
  CoreDelegate,
  attachComponent,
  detachComponent,
  init_framework_delegate_CDjM1vRH
} from "./chunk-62ARMAPG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  clamp,
  getElementRoot,
  hasLazyBuild,
  inheritAttributes,
  init_helpers_BJqKF1pr,
  onCustomPropertyChange,
  raf,
  win
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
  printIonWarning,
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm,
  __spreadProps,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-modal.entry.js
var Style, StatusBar, getBackdropValueForSheet, setCardStatusBarDark, setCardStatusBarDefault, onModalHeightChange, canSwipeOnContent, handleCanDismiss, calculateSpringStep, SwipeToCloseDefaults, createSwipeToCloseGesture, computeDuration, calculateProgress, createSheetEnterAnimation, createSheetLeaveAnimation, createEnterAnimation$1, iosEnterAnimation, createLeaveAnimation$1, iosLeaveAnimation, portraitToLandscapeTransition, landscapeToPortraitTransition, createEnterAnimation, mdEnterAnimation, createLeaveAnimation, mdLeaveAnimation, createSheetGesture, EDGE_THRESHOLD, cachedRootSafeAreaTop, cacheInvalidationScheduled, getRootSafeAreaTop, onRootSafeAreaTopChange, getModalCoveredAxes, measureCoveredAxes, getInitialSafeAreaConfig, getPositionBasedSafeAreaConfig, applySafeAreaOverrides, clearSafeAreaOverrides, modalIosCss, modalMdCss, Modal, LIFECYCLE_MAP;
var init_ion_modal_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-modal.entry.js"() {
    init_index_BpRUsN_W();
    init_index_TkLga3ma();
    init_framework_delegate_CDjM1vRH();
    init_helpers_BJqKF1pr();
    init_lock_controller_B_hirT0v();
    init_capacitor_CHJaJ9aX();
    init_overlays_DmDY_El7();
    init_theme_byZM6qHV();
    init_index_BBASprVu();
    init_ionic_global_Cep6oYzK();
    init_keyboard_B4Y_Gph8();
    init_animation_DmtJpz89();
    init_cubic_bezier_hHmYLOfE();
    init_index_BmLuEdV7();
    init_dir_Dojwmvde();
    init_gesture_controller_B_gJaBk0();
    init_keyboard_Cmqp5iZD();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    (function(Style2) {
      Style2["Dark"] = "DARK";
      Style2["Light"] = "LIGHT";
      Style2["Default"] = "DEFAULT";
    })(Style || (Style = {}));
    StatusBar = {
      getEngine() {
        const capacitor = getCapacitor();
        if (capacitor?.isPluginAvailable("StatusBar")) {
          return capacitor.Plugins.StatusBar;
        }
        return void 0;
      },
      setStyle(options) {
        const engine = this.getEngine();
        if (!engine) {
          return;
        }
        engine.setStyle(options);
      },
      getStyle: function() {
        return __async(this, null, function* () {
          const engine = this.getEngine();
          if (!engine) {
            return Style.Default;
          }
          const { style } = yield engine.getInfo();
          return style;
        });
      }
    };
    getBackdropValueForSheet = (x, backdropBreakpoint) => {
      if (backdropBreakpoint === 1) {
        return 0;
      }
      const slope = 1 / (1 - backdropBreakpoint);
      const b = -(backdropBreakpoint * slope);
      return x * slope + b;
    };
    setCardStatusBarDark = () => {
      if (!win || win.innerWidth >= 768) {
        return;
      }
      StatusBar.setStyle({ style: Style.Dark });
    };
    setCardStatusBarDefault = (defaultStyle = Style.Default) => {
      if (!win || win.innerWidth >= 768) {
        return;
      }
      StatusBar.setStyle({ style: defaultStyle });
    };
    onModalHeightChange = (hostEl, callback) => {
      return onCustomPropertyChange(hostEl, "--height", () => callback());
    };
    canSwipeOnContent = (contentEl) => {
      const scrollEl = isIonContent(contentEl) ? getElementRoot(contentEl).querySelector(".inner-scroll") : contentEl;
      const hasRefresherInContent = !!findRefresherInContent(contentEl);
      return !hasRefresherInContent && scrollEl.scrollTop === 0;
    };
    handleCanDismiss = (el, animation) => __async(null, null, function* () {
      if (typeof el.canDismiss !== "function") {
        return;
      }
      const shouldDismiss = yield el.canDismiss(void 0, GESTURE);
      if (!shouldDismiss) {
        return;
      }
      if (animation.isRunning()) {
        animation.onFinish(() => {
          el.dismiss(void 0, "handler");
        }, { oneTimeCallback: true });
      } else {
        el.dismiss(void 0, "handler");
      }
    });
    calculateSpringStep = (t) => {
      return 255275e-8 * 2.71828 ** (-14.9619 * t) - 1.00255 * 2.71828 ** (-0.0380968 * t) + 1;
    };
    SwipeToCloseDefaults = {
      MIN_PRESENTING_SCALE: 0.915
    };
    createSwipeToCloseGesture = (el, animation, statusBarStyle, onDismiss, onDragStart, onDragMove, onDragEnd) => {
      const DISMISS_THRESHOLD = 0.5;
      const height = el.offsetHeight;
      let isOpen = false;
      let canDismissBlocksGesture = false;
      let contentEl = null;
      const canDismissMaxStep = 0.2;
      let initialScrollY = true;
      let lastStep = 0;
      const getScrollY = () => {
        if (contentEl && isIonContent(contentEl)) {
          return contentEl.scrollY;
        } else {
          return true;
        }
      };
      const canStart = (detail) => {
        const target = detail.event.target;
        if (target === null || !target.closest) {
          return true;
        }
        contentEl = findClosestIonContent(target);
        if (contentEl) {
          return canSwipeOnContent(contentEl);
        }
        const footer = target.closest("ion-footer");
        if (footer === null) {
          return true;
        }
        return false;
      };
      const onStart = (detail) => {
        const { deltaY } = detail;
        window.getSelection()?.removeAllRanges();
        initialScrollY = getScrollY();
        canDismissBlocksGesture = el.canDismiss !== void 0 && el.canDismiss !== true;
        if (deltaY > 0 && contentEl) {
          disableContentScrollY(contentEl);
        }
        animation.progressStart(true, isOpen ? 1 : 0);
        onDragStart();
      };
      const onMove = (detail) => {
        const { deltaY } = detail;
        if (deltaY > 0 && contentEl) {
          disableContentScrollY(contentEl);
        }
        const step = detail.deltaY / height;
        const isAttemptingDismissWithCanDismiss = step >= 0 && canDismissBlocksGesture;
        const maxStep = isAttemptingDismissWithCanDismiss ? canDismissMaxStep : 0.9999;
        const processedStep = isAttemptingDismissWithCanDismiss ? calculateSpringStep(step / maxStep) : step;
        const clampedStep = clamp(1e-4, processedStep, maxStep);
        animation.progressStep(clampedStep);
        if (clampedStep >= DISMISS_THRESHOLD && lastStep < DISMISS_THRESHOLD) {
          setCardStatusBarDefault(statusBarStyle);
        } else if (clampedStep < DISMISS_THRESHOLD && lastStep >= DISMISS_THRESHOLD) {
          setCardStatusBarDark();
        }
        lastStep = clampedStep;
        const eventDetail = {
          currentY: detail.currentY,
          deltaY: detail.deltaY,
          velocityY: detail.velocityY,
          progress: calculateProgress(el, detail.deltaY)
        };
        onDragMove(eventDetail);
      };
      const onEnd = (detail) => {
        const velocity = detail.velocityY;
        const step = detail.deltaY / height;
        const isAttemptingDismissWithCanDismiss = step >= 0 && canDismissBlocksGesture;
        const maxStep = isAttemptingDismissWithCanDismiss ? canDismissMaxStep : 0.9999;
        const processedStep = isAttemptingDismissWithCanDismiss ? calculateSpringStep(step / maxStep) : step;
        const clampedStep = clamp(1e-4, processedStep, maxStep);
        const threshold = (detail.deltaY + velocity * 1e3) / height;
        const shouldComplete = !isAttemptingDismissWithCanDismiss && threshold >= DISMISS_THRESHOLD;
        let newStepValue = shouldComplete ? -1e-3 : 1e-3;
        if (!shouldComplete) {
          animation.easing("cubic-bezier(1, 0, 0.68, 0.28)");
          newStepValue += getTimeGivenProgression([0, 0], [1, 0], [0.68, 0.28], [1, 1], clampedStep)[0];
        } else {
          animation.easing("cubic-bezier(0.32, 0.72, 0, 1)");
          newStepValue += getTimeGivenProgression([0, 0], [0.32, 0.72], [0, 1], [1, 1], clampedStep)[0];
        }
        const duration = shouldComplete ? computeDuration(step * height, velocity) : computeDuration((1 - clampedStep) * height, velocity);
        isOpen = shouldComplete;
        gesture.enable(false);
        if (contentEl) {
          resetContentScrollY(contentEl, initialScrollY);
        }
        animation.onFinish(() => {
          if (!shouldComplete) {
            gesture.enable(true);
          }
        }).progressEnd(shouldComplete ? 1 : 0, newStepValue, duration);
        const isAttemptingCanDismiss = isAttemptingDismissWithCanDismiss && clampedStep > maxStep / 4;
        if (isAttemptingCanDismiss) {
          handleCanDismiss(el, animation);
        } else if (shouldComplete) {
          onDismiss();
        }
        const isDismissing = isAttemptingDismissWithCanDismiss ? isAttemptingCanDismiss && typeof el.canDismiss === "function" : shouldComplete;
        const eventDetail = {
          currentY: detail.currentY,
          deltaY: detail.deltaY,
          velocityY: detail.velocityY,
          progress: calculateProgress(el, detail.deltaY),
          isDismissing
        };
        onDragEnd(eventDetail);
      };
      const gesture = createGesture({
        el,
        gestureName: "modalSwipeToClose",
        gesturePriority: OVERLAY_GESTURE_PRIORITY,
        direction: "y",
        threshold: 10,
        canStart,
        onStart,
        onMove,
        onEnd
      });
      return gesture;
    };
    computeDuration = (remaining, velocity) => {
      return clamp(400, remaining / Math.abs(velocity * 1.1), 500);
    };
    calculateProgress = (el, deltaY) => {
      const windowHeight = window.innerHeight;
      const modalTop = el.getBoundingClientRect().top;
      const totalDistance = windowHeight - modalTop;
      const pullPercentage = deltaY / totalDistance;
      const progress = 1 - pullPercentage;
      const roundedProgress = Math.round(progress * 1e3) / 1e3;
      return Math.max(0, Math.min(1, roundedProgress));
    };
    createSheetEnterAnimation = (opts) => {
      const { currentBreakpoint, backdropBreakpoint, expandToScroll } = opts;
      const shouldShowBackdrop = backdropBreakpoint === void 0 || backdropBreakpoint < currentBreakpoint;
      const initialBackdrop = shouldShowBackdrop ? `calc(var(--backdrop-opacity) * ${currentBreakpoint})` : "0";
      const backdropAnimation = createAnimation("backdropAnimation").fromTo("opacity", 0, initialBackdrop);
      if (shouldShowBackdrop) {
        backdropAnimation.beforeStyles({
          "pointer-events": "none"
        }).afterClearStyles(["pointer-events"]);
      }
      const wrapperAnimation = createAnimation("wrapperAnimation").keyframes([
        { offset: 0, opacity: 1, transform: "translateY(100%)" },
        { offset: 1, opacity: 1, transform: `translateY(${100 - currentBreakpoint * 100}%)` }
      ]);
      const contentAnimation = !expandToScroll ? createAnimation("contentAnimation").keyframes([
        { offset: 0, opacity: 1, maxHeight: `${(1 - currentBreakpoint) * 100}%` },
        { offset: 1, opacity: 1, maxHeight: `${currentBreakpoint * 100}%` }
      ]) : void 0;
      return { wrapperAnimation, backdropAnimation, contentAnimation };
    };
    createSheetLeaveAnimation = (opts) => {
      const { currentBreakpoint, backdropBreakpoint } = opts;
      const backdropValue = `calc(var(--backdrop-opacity) * ${getBackdropValueForSheet(currentBreakpoint, backdropBreakpoint)})`;
      const defaultBackdrop = [
        { offset: 0, opacity: backdropValue },
        { offset: 1, opacity: 0 }
      ];
      const customBackdrop = [
        { offset: 0, opacity: backdropValue },
        { offset: backdropBreakpoint, opacity: 0 },
        { offset: 1, opacity: 0 }
      ];
      const backdropAnimation = createAnimation("backdropAnimation").keyframes(backdropBreakpoint !== 0 ? customBackdrop : defaultBackdrop);
      const wrapperAnimation = createAnimation("wrapperAnimation").keyframes([
        { offset: 0, opacity: 1, transform: `translateY(${100 - currentBreakpoint * 100}%)` },
        { offset: 1, opacity: 1, transform: `translateY(100%)` }
      ]);
      return { wrapperAnimation, backdropAnimation };
    };
    createEnterAnimation$1 = () => {
      const backdropAnimation = createAnimation().fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      const wrapperAnimation = createAnimation().fromTo("transform", "translateY(100vh)", "translateY(0vh)");
      return { backdropAnimation, wrapperAnimation, contentAnimation: void 0 };
    };
    iosEnterAnimation = (baseEl, opts) => {
      const { presentingEl, currentBreakpoint, expandToScroll } = opts;
      const root = getElementRoot(baseEl);
      const { wrapperAnimation, backdropAnimation, contentAnimation } = currentBreakpoint !== void 0 ? createSheetEnterAnimation(opts) : createEnterAnimation$1();
      backdropAnimation.addElement(root.querySelector("ion-backdrop"));
      wrapperAnimation.addElement(root.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({ opacity: 1 });
      !expandToScroll && contentAnimation?.addElement(baseEl.querySelector(".ion-page"));
      const baseAnimation = createAnimation("entering-base").addElement(baseEl).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation([wrapperAnimation]);
      if (contentAnimation) {
        baseAnimation.addAnimation(contentAnimation);
      }
      if (presentingEl) {
        const isPortrait = window.innerWidth < 768;
        const hasCardModal = presentingEl.tagName === "ION-MODAL" && presentingEl.presentingElement !== void 0;
        const presentingElRoot = getElementRoot(presentingEl);
        const presentingAnimation = createAnimation().beforeStyles({
          transform: "translateY(0)",
          "transform-origin": "top center",
          overflow: "hidden"
        });
        const bodyEl = document.body;
        if (isPortrait) {
          const transformOffset = !CSS.supports("width", "max(0px, 1px)") ? "30px" : "max(30px, var(--ion-safe-area-top))";
          const modalTransform = hasCardModal ? "-10px" : transformOffset;
          const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
          const finalTransform = `translateY(${modalTransform}) scale(${toPresentingScale})`;
          presentingAnimation.afterStyles({
            transform: finalTransform
          }).beforeAddWrite(() => bodyEl.style.setProperty("background-color", "black")).addElement(presentingEl).keyframes([
            { offset: 0, filter: "contrast(1)", transform: "translateY(0px) scale(1)", borderRadius: "0px" },
            { offset: 1, filter: "contrast(0.85)", transform: finalTransform, borderRadius: "10px 10px 0 0" }
          ]);
          baseAnimation.addAnimation(presentingAnimation);
        } else {
          baseAnimation.addAnimation(backdropAnimation);
          if (!hasCardModal) {
            wrapperAnimation.fromTo("opacity", "0", "1");
          } else {
            const toPresentingScale = hasCardModal ? SwipeToCloseDefaults.MIN_PRESENTING_SCALE : 1;
            const finalTransform = `translateY(-10px) scale(${toPresentingScale})`;
            presentingAnimation.afterStyles({
              transform: finalTransform
            }).addElement(presentingElRoot.querySelector(".modal-wrapper")).keyframes([
              { offset: 0, filter: "contrast(1)", transform: "translateY(0) scale(1)" },
              { offset: 1, filter: "contrast(0.85)", transform: finalTransform }
            ]);
            const shadowAnimation = createAnimation().afterStyles({
              transform: finalTransform
            }).addElement(presentingElRoot.querySelector(".modal-shadow")).keyframes([
              { offset: 0, opacity: "1", transform: "translateY(0) scale(1)" },
              { offset: 1, opacity: "0", transform: finalTransform }
            ]);
            baseAnimation.addAnimation([presentingAnimation, shadowAnimation]);
          }
        }
      } else {
        baseAnimation.addAnimation(backdropAnimation);
      }
      return baseAnimation;
    };
    createLeaveAnimation$1 = () => {
      const backdropAnimation = createAnimation().fromTo("opacity", "var(--backdrop-opacity)", 0);
      const wrapperAnimation = createAnimation().fromTo("transform", "translateY(0vh)", "translateY(100vh)");
      return { backdropAnimation, wrapperAnimation };
    };
    iosLeaveAnimation = (baseEl, opts, duration = 500) => {
      const { presentingEl, currentBreakpoint } = opts;
      const root = getElementRoot(baseEl);
      const { wrapperAnimation, backdropAnimation } = currentBreakpoint !== void 0 ? createSheetLeaveAnimation(opts) : createLeaveAnimation$1();
      backdropAnimation.addElement(root.querySelector("ion-backdrop"));
      wrapperAnimation.addElement(root.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({ opacity: 1 });
      const baseAnimation = createAnimation("leaving-base").addElement(baseEl).easing("cubic-bezier(0.32,0.72,0,1)").duration(duration).addAnimation(wrapperAnimation);
      if (presentingEl) {
        const isPortrait = window.innerWidth < 768;
        const hasCardModal = presentingEl.tagName === "ION-MODAL" && presentingEl.presentingElement !== void 0;
        const presentingElRoot = getElementRoot(presentingEl);
        const presentingAnimation = createAnimation().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish((currentStep) => {
          if (currentStep !== 1) {
            return;
          }
          presentingEl.style.setProperty("overflow", "");
          const numModals = Array.from(bodyEl.querySelectorAll("ion-modal:not(.overlay-hidden)")).filter((m) => m.presentingElement !== void 0).length;
          if (numModals <= 1) {
            bodyEl.style.setProperty("background-color", "");
          }
        });
        const bodyEl = document.body;
        if (isPortrait) {
          const transformOffset = !CSS.supports("width", "max(0px, 1px)") ? "30px" : "max(30px, var(--ion-safe-area-top))";
          const modalTransform = hasCardModal ? "-10px" : transformOffset;
          const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
          const finalTransform = `translateY(${modalTransform}) scale(${toPresentingScale})`;
          presentingAnimation.addElement(presentingEl).keyframes([
            { offset: 0, filter: "contrast(0.85)", transform: finalTransform, borderRadius: "10px 10px 0 0" },
            { offset: 1, filter: "contrast(1)", transform: "translateY(0px) scale(1)", borderRadius: "0px" }
          ]);
          baseAnimation.addAnimation(presentingAnimation);
        } else {
          baseAnimation.addAnimation(backdropAnimation);
          if (!hasCardModal) {
            wrapperAnimation.fromTo("opacity", "1", "0");
          } else {
            const toPresentingScale = hasCardModal ? SwipeToCloseDefaults.MIN_PRESENTING_SCALE : 1;
            const finalTransform = `translateY(-10px) scale(${toPresentingScale})`;
            presentingAnimation.addElement(presentingElRoot.querySelector(".modal-wrapper")).afterStyles({
              transform: "translate3d(0, 0, 0)"
            }).keyframes([
              { offset: 0, filter: "contrast(0.85)", transform: finalTransform },
              { offset: 1, filter: "contrast(1)", transform: "translateY(0) scale(1)" }
            ]);
            const shadowAnimation = createAnimation().addElement(presentingElRoot.querySelector(".modal-shadow")).afterStyles({
              transform: "translateY(0) scale(1)"
            }).keyframes([
              { offset: 0, opacity: "0", transform: finalTransform },
              { offset: 1, opacity: "1", transform: "translateY(0) scale(1)" }
            ]);
            baseAnimation.addAnimation([presentingAnimation, shadowAnimation]);
          }
        }
      } else {
        baseAnimation.addAnimation(backdropAnimation);
      }
      return baseAnimation;
    };
    portraitToLandscapeTransition = (baseEl, opts, duration = 300) => {
      const { presentingEl } = opts;
      if (!presentingEl) {
        return createAnimation("portrait-to-landscape-transition");
      }
      const presentingElIsCardModal = presentingEl.tagName === "ION-MODAL" && presentingEl.presentingElement !== void 0;
      const presentingElRoot = getElementRoot(presentingEl);
      const bodyEl = document.body;
      const baseAnimation = createAnimation("portrait-to-landscape-transition").addElement(baseEl).easing("cubic-bezier(0.32,0.72,0,1)").duration(duration);
      const presentingAnimation = createAnimation().beforeStyles({
        transform: "translateY(0)",
        "transform-origin": "top center",
        overflow: "hidden"
      });
      if (!presentingElIsCardModal) {
        const root = getElementRoot(baseEl);
        const wrapperAnimation = createAnimation().addElement(root.querySelectorAll(".modal-wrapper, .modal-shadow")).fromTo("opacity", "1", "1");
        const backdropAnimation = createAnimation().addElement(root.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", "var(--backdrop-opacity)");
        const transformOffset = !CSS.supports("width", "max(0px, 1px)") ? "30px" : "max(30px, var(--ion-safe-area-top))";
        const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
        const fromTransform = `translateY(${transformOffset}) scale(${toPresentingScale})`;
        presentingAnimation.addElement(presentingEl).afterStyles({
          transform: "translateY(0px) scale(1)",
          "border-radius": "0px"
        }).beforeAddWrite(() => bodyEl.style.setProperty("background-color", "")).fromTo("transform", fromTransform, "translateY(0px) scale(1)").fromTo("filter", "contrast(0.85)", "contrast(1)").fromTo("border-radius", "10px 10px 0 0", "0px");
        baseAnimation.addAnimation([presentingAnimation, wrapperAnimation, backdropAnimation]);
      } else {
        const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
        const fromTransform = `translateY(-10px) scale(${toPresentingScale})`;
        const toTransform = `translateY(0px) scale(1)`;
        presentingAnimation.addElement(presentingEl).afterStyles({
          transform: toTransform
        }).fromTo("transform", fromTransform, toTransform).fromTo("filter", "contrast(0.85)", "contrast(1)");
        const shadowAnimation = createAnimation().addElement(presentingElRoot.querySelector(".modal-shadow")).afterStyles({
          transform: toTransform,
          opacity: "0"
        }).fromTo("transform", fromTransform, toTransform);
        baseAnimation.addAnimation([presentingAnimation, shadowAnimation]);
      }
      return baseAnimation;
    };
    landscapeToPortraitTransition = (baseEl, opts, duration = 300) => {
      const { presentingEl } = opts;
      if (!presentingEl) {
        return createAnimation("landscape-to-portrait-transition");
      }
      const presentingElIsCardModal = presentingEl.tagName === "ION-MODAL" && presentingEl.presentingElement !== void 0;
      const presentingElRoot = getElementRoot(presentingEl);
      const bodyEl = document.body;
      const baseAnimation = createAnimation("landscape-to-portrait-transition").addElement(baseEl).easing("cubic-bezier(0.32,0.72,0,1)").duration(duration);
      const presentingAnimation = createAnimation().beforeStyles({
        transform: "translateY(0)",
        "transform-origin": "top center",
        overflow: "hidden"
      });
      if (!presentingElIsCardModal) {
        const root = getElementRoot(baseEl);
        const wrapperAnimation = createAnimation().addElement(root.querySelectorAll(".modal-wrapper, .modal-shadow")).fromTo("opacity", "1", "1");
        const backdropAnimation = createAnimation().addElement(root.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", "var(--backdrop-opacity)");
        const transformOffset = !CSS.supports("width", "max(0px, 1px)") ? "30px" : "max(30px, var(--ion-safe-area-top))";
        const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
        const toTransform = `translateY(${transformOffset}) scale(${toPresentingScale})`;
        presentingAnimation.addElement(presentingEl).afterStyles({
          transform: toTransform
        }).beforeAddWrite(() => bodyEl.style.setProperty("background-color", "black")).keyframes([
          { offset: 0, transform: "translateY(0px) scale(1)", filter: "contrast(1)", borderRadius: "0px" },
          { offset: 0.2, transform: "translateY(0px) scale(1)", filter: "contrast(1)", borderRadius: "10px 10px 0 0" },
          { offset: 1, transform: toTransform, filter: "contrast(0.85)", borderRadius: "10px 10px 0 0" }
        ]);
        baseAnimation.addAnimation([presentingAnimation, wrapperAnimation, backdropAnimation]);
      } else {
        const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
        const fromTransform = `translateY(-10px) scale(${toPresentingScale})`;
        const toTransform = `translateY(0) scale(1)`;
        presentingAnimation.addElement(presentingEl).afterStyles({
          transform: toTransform
        }).fromTo("transform", fromTransform, toTransform);
        const shadowAnimation = createAnimation().addElement(presentingElRoot.querySelector(".modal-shadow")).afterStyles({
          transform: toTransform,
          opacity: "0"
        }).fromTo("transform", fromTransform, toTransform);
        baseAnimation.addAnimation([presentingAnimation, shadowAnimation]);
      }
      return baseAnimation;
    };
    createEnterAnimation = () => {
      const backdropAnimation = createAnimation().fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
        "pointer-events": "none"
      }).afterClearStyles(["pointer-events"]);
      const wrapperAnimation = createAnimation().keyframes([
        { offset: 0, opacity: 0.01, transform: "translateY(40px)" },
        { offset: 1, opacity: 1, transform: `translateY(0px)` }
      ]);
      return { backdropAnimation, wrapperAnimation, contentAnimation: void 0 };
    };
    mdEnterAnimation = (baseEl, opts) => {
      const { currentBreakpoint, expandToScroll } = opts;
      const root = getElementRoot(baseEl);
      const { wrapperAnimation, backdropAnimation, contentAnimation } = currentBreakpoint !== void 0 ? createSheetEnterAnimation(opts) : createEnterAnimation();
      backdropAnimation.addElement(root.querySelector("ion-backdrop"));
      wrapperAnimation.addElement(root.querySelector(".modal-wrapper"));
      !expandToScroll && contentAnimation?.addElement(baseEl.querySelector(".ion-page"));
      const baseAnimation = createAnimation().addElement(baseEl).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([backdropAnimation, wrapperAnimation]);
      if (contentAnimation) {
        baseAnimation.addAnimation(contentAnimation);
      }
      return baseAnimation;
    };
    createLeaveAnimation = () => {
      const backdropAnimation = createAnimation().fromTo("opacity", "var(--backdrop-opacity)", 0);
      const wrapperAnimation = createAnimation().keyframes([
        { offset: 0, opacity: 0.99, transform: `translateY(0px)` },
        { offset: 1, opacity: 0, transform: "translateY(40px)" }
      ]);
      return { backdropAnimation, wrapperAnimation };
    };
    mdLeaveAnimation = (baseEl, opts) => {
      const { currentBreakpoint } = opts;
      const root = getElementRoot(baseEl);
      const { wrapperAnimation, backdropAnimation } = currentBreakpoint !== void 0 ? createSheetLeaveAnimation(opts) : createLeaveAnimation();
      backdropAnimation.addElement(root.querySelector("ion-backdrop"));
      wrapperAnimation.addElement(root.querySelector(".modal-wrapper"));
      const baseAnimation = createAnimation().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([backdropAnimation, wrapperAnimation]);
      return baseAnimation;
    };
    createSheetGesture = (baseEl, backdropEl, wrapperEl, initialBreakpoint, backdropBreakpoint, animation, breakpoints = [], expandToScroll, getCurrentBreakpoint, onDismiss, onBreakpointChange, onDragStart, onDragMove, onDragEnd) => {
      const defaultBackdrop = [
        { offset: 0, opacity: "var(--backdrop-opacity)" },
        { offset: 1, opacity: 0.01 }
      ];
      const customBackdrop = [
        { offset: 0, opacity: "var(--backdrop-opacity)" },
        { offset: 1 - backdropBreakpoint, opacity: 0 },
        { offset: 1, opacity: 0 }
      ];
      const SheetDefaults = {
        WRAPPER_KEYFRAMES: [
          { offset: 0, transform: "translateY(0%)" },
          { offset: 1, transform: "translateY(100%)" }
        ],
        BACKDROP_KEYFRAMES: backdropBreakpoint !== 0 ? customBackdrop : defaultBackdrop,
        CONTENT_KEYFRAMES: [
          { offset: 0, maxHeight: "100%" },
          { offset: 1, maxHeight: "0%" }
        ]
      };
      const contentEl = baseEl.querySelector("ion-content");
      const initialContentScrollY = contentEl?.scrollY ?? true;
      const height = wrapperEl.clientHeight;
      let currentBreakpoint = initialBreakpoint;
      let offset = 0;
      let canDismissBlocksGesture = false;
      let cachedScrollEl = null;
      let cachedFooterEls = null;
      let cachedFooterYPosition = null;
      let currentFooterState = null;
      const canDismissMaxStep = 0.95;
      const maxBreakpoint = breakpoints[breakpoints.length - 1];
      const minBreakpoint = breakpoints[0];
      const wrapperAnimation = animation.childAnimations.find((ani) => ani.id === "wrapperAnimation");
      const backdropAnimation = animation.childAnimations.find((ani) => ani.id === "backdropAnimation");
      const contentAnimation = animation.childAnimations.find((ani) => ani.id === "contentAnimation");
      const enableBackdrop = () => {
        const el = baseEl;
        if (el.focusTrap === false || el.showBackdrop === false) {
          return;
        }
        baseEl.style.setProperty("pointer-events", "auto");
        backdropEl.style.setProperty("pointer-events", "auto");
        baseEl.classList.remove(FOCUS_TRAP_DISABLE_CLASS);
      };
      const disableBackdrop = () => {
        baseEl.style.setProperty("pointer-events", "none");
        backdropEl.style.setProperty("pointer-events", "none");
        baseEl.classList.add(FOCUS_TRAP_DISABLE_CLASS);
      };
      const swapFooterPosition = (newPosition) => {
        if (!cachedFooterEls) {
          cachedFooterEls = Array.from(baseEl.querySelectorAll("ion-footer"));
          if (!cachedFooterEls.length) {
            return;
          }
        }
        const page = baseEl.querySelector(".ion-page");
        currentFooterState = newPosition;
        if (newPosition === "stationary") {
          cachedFooterEls.forEach((cachedFooterEl) => {
            cachedFooterEl.classList.remove("modal-footer-moving");
            cachedFooterEl.style.removeProperty("position");
            cachedFooterEl.style.removeProperty("width");
            cachedFooterEl.style.removeProperty("height");
            cachedFooterEl.style.removeProperty("top");
            cachedFooterEl.style.removeProperty("left");
            page?.style.removeProperty("padding-bottom");
            page?.appendChild(cachedFooterEl);
          });
        } else {
          let footerHeights = 0;
          cachedFooterEls.forEach((cachedFooterEl, index) => {
            const cachedFooterElRect = cachedFooterEl.getBoundingClientRect();
            const bodyRect = document.body.getBoundingClientRect();
            footerHeights += cachedFooterEl.clientHeight;
            const absoluteTop = cachedFooterElRect.top - bodyRect.top;
            const absoluteLeft = cachedFooterElRect.left - bodyRect.left;
            cachedFooterEl.style.setProperty("--pinned-width", `${cachedFooterEl.clientWidth}px`);
            cachedFooterEl.style.setProperty("--pinned-height", `${cachedFooterEl.clientHeight}px`);
            cachedFooterEl.style.setProperty("--pinned-top", `${absoluteTop}px`);
            cachedFooterEl.style.setProperty("--pinned-left", `${absoluteLeft}px`);
            if (index === 0) {
              cachedFooterYPosition = absoluteTop;
              const header = baseEl.querySelector("ion-header");
              if (header) {
                cachedFooterYPosition -= header.clientHeight;
              }
            }
          });
          cachedFooterEls.forEach((cachedFooterEl) => {
            page?.style.setProperty("padding-bottom", `${footerHeights}px`);
            cachedFooterEl.classList.add("modal-footer-moving");
            cachedFooterEl.style.setProperty("position", "absolute");
            cachedFooterEl.style.setProperty("width", "var(--pinned-width)");
            cachedFooterEl.style.setProperty("height", "var(--pinned-height)");
            cachedFooterEl.style.setProperty("top", "var(--pinned-top)");
            cachedFooterEl.style.setProperty("left", "var(--pinned-left)");
            document.body.appendChild(cachedFooterEl);
          });
        }
      };
      if (wrapperAnimation && backdropAnimation) {
        wrapperAnimation.keyframes([...SheetDefaults.WRAPPER_KEYFRAMES]);
        backdropAnimation.keyframes([...SheetDefaults.BACKDROP_KEYFRAMES]);
        contentAnimation?.keyframes([...SheetDefaults.CONTENT_KEYFRAMES]);
        animation.progressStart(true, 1 - currentBreakpoint);
        const shouldEnableBackdrop = currentBreakpoint > backdropBreakpoint && baseEl.focusTrap !== false && baseEl.showBackdrop !== false;
        if (shouldEnableBackdrop) {
          enableBackdrop();
        } else {
          disableBackdrop();
        }
      }
      if (contentEl && currentBreakpoint !== maxBreakpoint && expandToScroll) {
        contentEl.scrollY = false;
      }
      const canStart = (detail) => {
        const contentEl2 = findClosestIonContent(detail.event.target);
        currentBreakpoint = getCurrentBreakpoint();
        if (contentEl2 && (!expandToScroll || currentBreakpoint === 1)) {
          return canSwipeOnContent(contentEl2);
        }
        return true;
      };
      const onStart = (detail) => {
        window.getSelection()?.removeAllRanges();
        canDismissBlocksGesture = baseEl.canDismiss !== void 0 && baseEl.canDismiss !== true && minBreakpoint === 0;
        if (!expandToScroll) {
          const targetEl = findClosestIonContent(detail.event.target);
          cachedScrollEl = targetEl && isIonContent(targetEl) ? getElementRoot(targetEl).querySelector(".inner-scroll") : targetEl;
        }
        if (!expandToScroll) {
          swapFooterPosition("moving");
        }
        if (detail.deltaY > 0 && contentEl) {
          contentEl.scrollY = false;
        }
        raf(() => {
          baseEl.focus();
        });
        animation.progressStart(true, 1 - currentBreakpoint);
        onDragStart();
      };
      const onMove = (detail) => {
        if (!expandToScroll && cachedFooterYPosition !== null && currentFooterState !== null) {
          if (detail.currentY >= cachedFooterYPosition && currentFooterState === "moving") {
            swapFooterPosition("stationary");
          } else if (detail.currentY < cachedFooterYPosition && currentFooterState === "stationary") {
            swapFooterPosition("moving");
          }
        }
        if (!expandToScroll && detail.deltaY <= 0 && cachedScrollEl) {
          return;
        }
        if (detail.deltaY > 0 && contentEl) {
          contentEl.scrollY = false;
        }
        const initialStep = 1 - currentBreakpoint;
        const secondToLastBreakpoint = breakpoints.length > 1 ? 1 - breakpoints[1] : void 0;
        const step = initialStep + detail.deltaY / height;
        const isAttemptingDismissWithCanDismiss = secondToLastBreakpoint !== void 0 && step >= secondToLastBreakpoint && canDismissBlocksGesture;
        const maxStep = isAttemptingDismissWithCanDismiss ? canDismissMaxStep : 0.9999;
        const processedStep = isAttemptingDismissWithCanDismiss && secondToLastBreakpoint !== void 0 ? secondToLastBreakpoint + calculateSpringStep((step - secondToLastBreakpoint) / (maxStep - secondToLastBreakpoint)) : step;
        offset = clamp(1e-4, processedStep, maxStep);
        animation.progressStep(offset);
        const snapBreakpoint = calculateSnapBreakpoint(detail.deltaY);
        const eventDetail = {
          currentY: detail.currentY,
          deltaY: detail.deltaY,
          velocityY: detail.velocityY,
          progress: calculateProgress2(detail.currentY),
          snapBreakpoint
        };
        onDragMove(eventDetail);
      };
      const onEnd = (detail) => {
        const snapBreakpoint = calculateSnapBreakpoint(detail.deltaY);
        const shouldPreventDismiss = canDismissBlocksGesture && snapBreakpoint === 0;
        const isDismissing = shouldPreventDismiss ? typeof baseEl.canDismiss === "function" : snapBreakpoint === 0;
        const eventDetail = {
          currentY: detail.currentY,
          deltaY: detail.deltaY,
          velocityY: detail.velocityY,
          progress: calculateProgress2(detail.currentY),
          snapBreakpoint,
          isDismissing
        };
        if (!expandToScroll && detail.deltaY <= 0 && cachedScrollEl && cachedScrollEl.scrollTop > 0) {
          swapFooterPosition("stationary");
          onDragEnd(__spreadProps(__spreadValues({}, eventDetail), { isDismissing: false }));
          return;
        }
        moveSheetToBreakpoint({
          breakpoint: snapBreakpoint,
          breakpointOffset: offset,
          canDismiss: canDismissBlocksGesture,
          /**
           * The swipe is user-driven, so we should
           * always animate when the gesture ends.
           */
          animated: true
        });
        onDragEnd(eventDetail);
      };
      const moveSheetToBreakpoint = (options) => {
        const { breakpoint, canDismiss, breakpointOffset, animated } = options;
        const shouldPreventDismiss = canDismiss && breakpoint === 0;
        const snapToBreakpoint = shouldPreventDismiss ? currentBreakpoint : breakpoint;
        const shouldRemainOpen = snapToBreakpoint !== 0;
        currentBreakpoint = 0;
        if (wrapperAnimation && backdropAnimation) {
          wrapperAnimation.keyframes([
            { offset: 0, transform: `translateY(${breakpointOffset * 100}%)` },
            { offset: 1, transform: `translateY(${(1 - snapToBreakpoint) * 100}%)` }
          ]);
          backdropAnimation.keyframes([
            {
              offset: 0,
              opacity: `calc(var(--backdrop-opacity) * ${getBackdropValueForSheet(1 - breakpointOffset, backdropBreakpoint)})`
            },
            {
              offset: 1,
              opacity: `calc(var(--backdrop-opacity) * ${getBackdropValueForSheet(snapToBreakpoint, backdropBreakpoint)})`
            }
          ]);
          if (contentAnimation) {
            contentAnimation.keyframes([
              { offset: 0, maxHeight: `${(1 - breakpointOffset) * 100}%` },
              { offset: 1, maxHeight: `${snapToBreakpoint * 100}%` }
            ]);
          }
          animation.progressStep(0);
        }
        gesture.enable(false);
        if (shouldPreventDismiss) {
          handleCanDismiss(baseEl, animation);
        } else if (!shouldRemainOpen) {
          onDismiss();
        }
        if (contentEl && (snapToBreakpoint === breakpoints[breakpoints.length - 1] || !expandToScroll)) {
          contentEl.scrollY = initialContentScrollY;
        }
        if (!expandToScroll && snapToBreakpoint === 0) {
          swapFooterPosition("stationary");
        }
        return new Promise((resolve) => {
          animation.onFinish(() => {
            if (shouldRemainOpen) {
              if (!expandToScroll) {
                swapFooterPosition("stationary");
              }
              if (wrapperAnimation && backdropAnimation) {
                raf(() => {
                  wrapperAnimation.keyframes([...SheetDefaults.WRAPPER_KEYFRAMES]);
                  backdropAnimation.keyframes([...SheetDefaults.BACKDROP_KEYFRAMES]);
                  contentAnimation?.keyframes([...SheetDefaults.CONTENT_KEYFRAMES]);
                  animation.progressStart(true, 1 - snapToBreakpoint);
                  currentBreakpoint = snapToBreakpoint;
                  onBreakpointChange(currentBreakpoint);
                  const shouldEnableBackdrop = currentBreakpoint > backdropBreakpoint && baseEl.focusTrap !== false && baseEl.showBackdrop !== false;
                  if (shouldEnableBackdrop) {
                    enableBackdrop();
                  } else {
                    disableBackdrop();
                  }
                  gesture.enable(true);
                  resolve();
                });
              } else {
                gesture.enable(true);
                resolve();
              }
            } else {
              resolve();
            }
          }, { oneTimeCallback: true }).progressEnd(1, 0, animated ? 500 : 0);
        });
      };
      const calculateSnapBreakpoint = (deltaY) => {
        const currentY = wrapperEl.getBoundingClientRect().top + deltaY;
        const currentProgress = calculateProgress2(currentY);
        const snapBreakpoint = breakpoints.reduce((a, b) => {
          return Math.abs(b - currentProgress) < Math.abs(a - currentProgress) ? b : a;
        });
        return snapBreakpoint;
      };
      const calculateProgress2 = (currentY) => {
        const minBreakpoint2 = breakpoints[0];
        const maxBreakpoint2 = breakpoints[breakpoints.length - 1];
        const maxY = convertBreakpointToY(minBreakpoint2);
        const minY = convertBreakpointToY(maxBreakpoint2);
        const totalDistance = maxY - minY;
        const distanceFromBottom = maxY - currentY;
        const progress = distanceFromBottom / totalDistance;
        const roundedProgress = Math.round(progress * 1e3) / 1e3;
        return Math.max(0, Math.min(1, roundedProgress));
      };
      const convertBreakpointToY = (breakpoint) => {
        const rect = baseEl.getBoundingClientRect();
        const modalHeight = rect.height;
        const viewportBottom = window.innerHeight;
        const activeHeight = modalHeight * breakpoint;
        return viewportBottom - activeHeight;
      };
      const gesture = createGesture({
        el: wrapperEl,
        gestureName: "modalSheet",
        gesturePriority: 40,
        direction: "y",
        threshold: 10,
        canStart,
        onStart,
        onMove,
        onEnd
      });
      const resetContentScroll = () => {
        if (contentEl) {
          contentEl.scrollY = initialContentScrollY;
        }
      };
      return {
        gesture,
        moveSheetToBreakpoint,
        resetContentScroll
      };
    };
    EDGE_THRESHOLD = 5;
    cachedRootSafeAreaTop = null;
    cacheInvalidationScheduled = false;
    getRootSafeAreaTop = () => {
      if (cachedRootSafeAreaTop !== null) {
        return cachedRootSafeAreaTop;
      }
      const doc = win?.document;
      if (!doc?.body) {
        return 0;
      }
      const el = doc.createElement("div");
      el.style.cssText = "position:fixed;visibility:hidden;pointer-events:none;top:0;left:0;padding-top:var(--ion-safe-area-top,0px);";
      doc.body.appendChild(el);
      const value = parseFloat(getComputedStyle(el).paddingTop) || 0;
      el.remove();
      cachedRootSafeAreaTop = value;
      if (!cacheInvalidationScheduled) {
        cacheInvalidationScheduled = true;
        raf(() => {
          cachedRootSafeAreaTop = null;
          cacheInvalidationScheduled = false;
        });
      }
      return value;
    };
    onRootSafeAreaTopChange = (callback) => {
      return onCustomPropertyChange(win?.document?.body, "--ion-safe-area-top", callback, getRootSafeAreaTop());
    };
    getModalCoveredAxes = (hostEl) => {
      const styles = getComputedStyle(hostEl);
      const width = getOverlaySizeType(styles.getPropertyValue("--width"));
      const height = getOverlaySizeType(styles.getPropertyValue("--height"));
      if (width === "fullscreen" && height === "fullscreen") {
        return { vertical: true, horizontal: true };
      }
      return measureCoveredAxes(hostEl);
    };
    measureCoveredAxes = (hostEl) => {
      const wrapperEl = hostEl.shadowRoot?.querySelector(".modal-wrapper");
      if (wrapperEl == null || win === void 0) {
        return { vertical: false, horizontal: false };
      }
      const wasHidden = hostEl.classList.contains("overlay-hidden");
      if (wasHidden) {
        hostEl.classList.remove("overlay-hidden");
      }
      const { width, height } = wrapperEl.getBoundingClientRect();
      if (wasHidden) {
        hostEl.classList.add("overlay-hidden");
      }
      return {
        vertical: height >= win.innerHeight - EDGE_THRESHOLD,
        horizontal: width >= win.innerWidth - EDGE_THRESHOLD
      };
    };
    getInitialSafeAreaConfig = (context) => {
      const { isSheetModal, isCardModal } = context;
      if (isSheetModal) {
        return {
          top: "0px",
          bottom: "inherit",
          left: "0px",
          right: "0px"
        };
      }
      if (isCardModal) {
        return {
          top: "inherit",
          bottom: "inherit",
          left: "0px",
          right: "0px"
        };
      }
      const { vertical, horizontal } = context.coveredAxes ?? { vertical: true, horizontal: true };
      return {
        top: vertical ? "inherit" : "0px",
        bottom: vertical ? "inherit" : "0px",
        left: horizontal ? "inherit" : "0px",
        right: horizontal ? "inherit" : "0px"
      };
    };
    getPositionBasedSafeAreaConfig = (wrapperEl) => {
      const rect = wrapperEl.getBoundingClientRect();
      const vh = win?.innerHeight ?? 0;
      const vw = win?.innerWidth ?? 0;
      return {
        top: rect.top <= EDGE_THRESHOLD ? "inherit" : "0px",
        bottom: rect.bottom >= vh - EDGE_THRESHOLD ? "inherit" : "0px",
        left: rect.left <= EDGE_THRESHOLD ? "inherit" : "0px",
        right: rect.right >= vw - EDGE_THRESHOLD ? "inherit" : "0px"
      };
    };
    applySafeAreaOverrides = (hostEl, config2) => {
      hostEl.style.setProperty("--ion-safe-area-top", config2.top);
      hostEl.style.setProperty("--ion-safe-area-bottom", config2.bottom);
      hostEl.style.setProperty("--ion-safe-area-left", config2.left);
      hostEl.style.setProperty("--ion-safe-area-right", config2.right);
    };
    clearSafeAreaOverrides = (hostEl) => {
      hostEl.style.removeProperty("--ion-safe-area-top");
      hostEl.style.removeProperty("--ion-safe-area-bottom");
      hostEl.style.removeProperty("--ion-safe-area-left");
      hostEl.style.removeProperty("--ion-safe-area-right");
    };
    modalIosCss = () => `:host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:100%;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;outline:none}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);border:0;background:var(--ion-color-step-350, var(--ion-background-color-step-350, #c0c0be));cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-modal-offset-top, 0px) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host(.modal-sheet.modal-no-expand-scroll) ion-footer{position:absolute;bottom:0;width:var(--width)}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}:host(.modal-card),:host(.modal-sheet){--border-radius:10px}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0;border-end-start-radius:0}:host(.modal-card){--backdrop-opacity:0;--width:100%;-ms-flex-align:end;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out}:host(.modal-card) .modal-wrapper{-webkit-box-shadow:none;box-shadow:none}:host(.modal-card) .modal-shadow{-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0;border-end-start-radius:0}`;
    modalMdCss = () => `:host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:100%;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;outline:none}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);border:0;background:var(--ion-color-step-350, var(--ion-background-color-step-350, #c0c0be));cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-modal-offset-top, 0px) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host(.modal-sheet.modal-no-expand-scroll) ion-footer{position:absolute;bottom:0;width:var(--width)}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px;--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{-webkit-transform:translate3d(0,  40px,  0);transform:translate3d(0,  40px,  0);opacity:0.01}`;
    Modal = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didPresent = createEvent(this, "ionModalDidPresent", 7);
        this.willPresent = createEvent(this, "ionModalWillPresent", 7);
        this.willDismiss = createEvent(this, "ionModalWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionModalDidDismiss", 7);
        this.ionBreakpointDidChange = createEvent(this, "ionBreakpointDidChange", 7);
        this.didPresentShorthand = createEvent(this, "didPresent", 7);
        this.willPresentShorthand = createEvent(this, "willPresent", 7);
        this.willDismissShorthand = createEvent(this, "willDismiss", 7);
        this.didDismissShorthand = createEvent(this, "didDismiss", 7);
        this.ionMount = createEvent(this, "ionMount", 7);
        this.ionDragStart = createEvent(this, "ionDragStart", 7);
        this.ionDragMove = createEvent(this, "ionDragMove", 7);
        this.ionDragEnd = createEvent(this, "ionDragEnd", 7);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.coreDelegate = CoreDelegate();
        this.isSheetModal = false;
        this.inheritedAttributes = {};
        this.inline = false;
        this.gestureAnimationDismissing = false;
        this.isPresenting = false;
        this.presented = false;
        this.hasController = false;
        this.keyboardClose = true;
        this.expandToScroll = true;
        this.backdropBreakpoint = 0;
        this.handleBehavior = "cycle";
        this.backdropDismiss = true;
        this.showBackdrop = true;
        this.animated = true;
        this.isOpen = false;
        this.keepContentsMounted = false;
        this.focusTrap = true;
        this.canDismiss = true;
        this.onHandleClick = () => {
          const { sheetTransition, handleBehavior } = this;
          if (handleBehavior !== "cycle" || sheetTransition !== void 0) {
            return;
          }
          this.moveToNextBreakpoint();
        };
        this.onBackdropTap = () => {
          const { sheetTransition } = this;
          if (sheetTransition !== void 0) {
            return;
          }
          this.dismiss(void 0, BACKDROP);
        };
        this.onLifecycle = (modalEvent) => {
          const el = this.usersElement;
          const name = LIFECYCLE_MAP[modalEvent.type];
          if (el && name) {
            const ev = new CustomEvent(name, {
              bubbles: false,
              cancelable: false,
              detail: modalEvent.detail
            });
            el.dispatchEvent(ev);
          }
        };
        this.onModalFocus = (ev) => {
          const { dragHandleEl, el } = this;
          if (ev.target === el && el.shadowRoot?.activeElement == null && dragHandleEl && dragHandleEl.tabIndex !== -1) {
            dragHandleEl.focus();
          }
        };
        this.onSlotChange = ({ target }) => {
          const slot = target;
          slot.assignedElements().forEach((el) => {
            el.querySelectorAll("ion-modal").forEach((childModal) => {
              if (childModal.getAttribute("data-parent-ion-modal") === null) {
                childModal.setAttribute("data-parent-ion-modal", this.el.id);
              }
            });
          });
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
      onWindowResize() {
        if (!this.presented)
          return;
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          const context = this.getSafeAreaContext();
          if (context.isCardModal && !this.enterAnimation && !this.leaveAnimation) {
            this.handleViewTransition();
          }
          if (context.isSheetModal) {
            this.updateSheetOffsetTop();
          }
          if (!context.isSheetModal && !context.isCardModal) {
            this.updateSafeAreaOverrides();
            const { contentEl, hasFooter } = this.findContentAndFooter();
            this.clearContentSafeAreaPadding(contentEl);
            this.applyFullscreenSafeAreaTo(contentEl, hasFooter);
          }
        }, 50);
      }
      breakpointsChanged(breakpoints) {
        if (breakpoints !== void 0) {
          this.sortedBreakpoints = breakpoints.sort((a, b) => a - b);
        }
      }
      connectedCallback() {
        const { el } = this;
        prepareOverlay(el);
        this.triggerChanged();
        if (this.presented || this.isPresenting) {
          this.restoreSafeAreaOverrides();
        }
        if (this.presented) {
          restoreRootFocusTrapAccessibility(el);
          this.initParentRemovalObserver();
        }
      }
      disconnectedCallback() {
        this.triggerController.removeClickListener();
        this.cleanupViewTransitionListener();
        this.cleanupParentRemovalObserver();
        this.cleanupSafeAreaOverrides();
        if (this.presented) {
          cleanupRootFocusTrapAccessibility();
        }
      }
      componentWillLoad() {
        const { breakpoints, initialBreakpoint, el, htmlAttributes } = this;
        const isSheetModal = this.isSheetModal = breakpoints !== void 0 && initialBreakpoint !== void 0;
        const attributesToInherit = ["aria-label", "role"];
        this.inheritedAttributes = inheritAttributes(el, attributesToInherit);
        if (el.parentNode) {
          this.cachedOriginalParent = el.parentNode;
        }
        if (htmlAttributes !== void 0) {
          attributesToInherit.forEach((attribute) => {
            const attributeValue = htmlAttributes[attribute];
            if (attributeValue) {
              this.inheritedAttributes = __spreadProps(__spreadValues({}, this.inheritedAttributes), {
                [attribute]: htmlAttributes[attribute]
              });
              delete htmlAttributes[attribute];
            }
          });
        }
        if (isSheetModal) {
          this.currentBreakpoint = this.initialBreakpoint;
        }
        if (breakpoints !== void 0 && initialBreakpoint !== void 0 && !breakpoints.includes(initialBreakpoint)) {
          printIonWarning("[ion-modal] - Your breakpoints array must include the initialBreakpoint value.");
        }
        if (!this.htmlAttributes?.id) {
          setOverlayId(this.el);
        }
      }
      componentDidLoad() {
        if (this.isOpen === true) {
          raf(() => this.present());
        }
        this.breakpointsChanged(this.breakpoints);
        this.triggerChanged();
      }
      /**
       * Determines whether or not an overlay
       * is being used inline or via a controller/JS
       * and returns the correct delegate.
       * By default, subsequent calls to getDelegate
       * will use a cached version of the delegate.
       * This is useful for calling dismiss after
       * present so that the correct delegate is given.
       */
      getDelegate(force = false) {
        if (this.workingDelegate && !force) {
          return {
            delegate: this.workingDelegate,
            inline: this.inline
          };
        }
        const parentEl = this.el.parentNode;
        const inline = this.inline = parentEl !== null && !this.hasController;
        const delegate = this.workingDelegate = inline ? this.delegate || this.coreDelegate : this.delegate;
        return { inline, delegate };
      }
      /**
       * Determines whether or not the
       * modal is allowed to dismiss based
       * on the state of the canDismiss prop.
       */
      checkCanDismiss(data, role) {
        return __async(this, null, function* () {
          const { canDismiss } = this;
          if (typeof canDismiss === "function") {
            return canDismiss(data, role);
          }
          return canDismiss;
        });
      }
      /**
       * Present the modal overlay after it has been created.
       */
      present() {
        return __async(this, null, function* () {
          const unlock = yield this.lockController.lock();
          if (this.presented) {
            unlock();
            return;
          }
          const { presentingElement, el } = this;
          this.currentBreakpoint = this.initialBreakpoint;
          const { inline, delegate } = this.getDelegate(true);
          this.ionMount.emit();
          this.usersElement = yield attachComponent(delegate, el, this.component, ["ion-page"], this.componentProps, inline);
          if (hasLazyBuild(el)) {
            yield deepReady(this.usersElement);
          } else if (!this.keepContentsMounted) {
            yield waitForMount();
          }
          writeTask(() => this.el.classList.add("show-modal"));
          this.isSheetModal = this.breakpoints !== void 0 && this.initialBreakpoint !== void 0;
          this.isPresenting = true;
          const hasCardModal = presentingElement !== void 0;
          try {
            this.setInitialSafeAreaOverrides();
            if (hasCardModal && getIonMode(this) === "ios") {
              this.statusBarStyle = yield StatusBar.getStyle();
              setCardStatusBarDark();
            }
            yield present(this, "modalEnter", iosEnterAnimation, mdEnterAnimation, {
              presentingEl: presentingElement,
              currentBreakpoint: this.initialBreakpoint,
              backdropBreakpoint: this.backdropBreakpoint,
              expandToScroll: this.expandToScroll
            });
          } finally {
            this.isPresenting = false;
          }
          this.updateSafeAreaOverrides();
          this.applyFullscreenSafeArea();
          if (typeof window !== "undefined") {
            this.keyboardOpenCallback = () => {
              if (this.gesture) {
                this.gesture.enable(false);
                raf(() => {
                  if (this.gesture) {
                    this.gesture.enable(true);
                  }
                });
              }
            };
            window.addEventListener(KEYBOARD_DID_OPEN, this.keyboardOpenCallback);
          }
          if (this.isSheetModal) {
            this.initSheetGesture();
          } else if (hasCardModal) {
            this.initSwipeToClose();
          }
          this.initViewTransitionListener();
          this.initParentRemovalObserver();
          unlock();
        });
      }
      initSwipeToClose() {
        if (getIonMode(this) !== "ios") {
          return;
        }
        const { el } = this;
        const animationBuilder = this.leaveAnimation || config.get("modalLeave", iosLeaveAnimation);
        const ani = this.animation = animationBuilder(el, {
          presentingEl: this.presentingElement,
          expandToScroll: this.expandToScroll
        });
        const contentEl = findIonContent(el);
        if (!contentEl) {
          printIonContentErrorMsg(el);
          return;
        }
        const statusBarStyle = this.statusBarStyle ?? Style.Default;
        this.gesture = createSwipeToCloseGesture(el, ani, statusBarStyle, () => this.cardOnDismiss(), () => this.onDragStart(), (detail) => this.onDragMove(detail), (detail) => this.onDragEnd(detail));
        this.gesture.enable(true);
      }
      initSheetGesture() {
        const { wrapperEl, initialBreakpoint, backdropBreakpoint } = this;
        if (!wrapperEl || initialBreakpoint === void 0) {
          return;
        }
        const animationBuilder = this.enterAnimation || config.get("modalEnter", iosEnterAnimation);
        const ani = this.animation = animationBuilder(this.el, {
          presentingEl: this.presentingElement,
          currentBreakpoint: initialBreakpoint,
          backdropBreakpoint,
          expandToScroll: this.expandToScroll
        });
        ani.progressStart(true, 1);
        const { gesture, moveSheetToBreakpoint, resetContentScroll } = createSheetGesture(this.el, this.backdropEl, wrapperEl, initialBreakpoint, backdropBreakpoint, ani, this.sortedBreakpoints, this.expandToScroll, () => this.currentBreakpoint ?? 0, () => this.sheetOnDismiss(), (breakpoint) => {
          if (this.currentBreakpoint !== breakpoint) {
            this.currentBreakpoint = breakpoint;
            this.ionBreakpointDidChange.emit({ breakpoint });
          }
        }, () => this.onDragStart(), (detail) => this.onDragMove(detail), (detail) => this.onDragEnd(detail));
        this.gesture = gesture;
        this.moveSheetToBreakpoint = moveSheetToBreakpoint;
        this.resetSheetContentScroll = resetContentScroll;
        this.gesture.enable(true);
        const backdropNotBlocking = this.showBackdrop === false || this.focusTrap === false || backdropBreakpoint > 0;
        if (backdropNotBlocking) {
          this.setupChildRoutePassthrough();
        }
      }
      /**
       * For sheet modals that allow background interaction, sets up pointer-events
       * passthrough on child route page wrappers and nested router outlets.
       */
      setupChildRoutePassthrough() {
        this.cachedPageParent = this.getOriginalPageParent();
        const pageParent = this.cachedPageParent;
        if (!pageParent || pageParent.tagName === "ION-APP") {
          return;
        }
        const hasVisibleContent = Array.from(pageParent.children).some((child) => child !== this.el && !(child instanceof HTMLElement && window.getComputedStyle(child).display === "none") && child.tagName !== "TEMPLATE" && child.tagName !== "SLOT" && !(child.nodeType === Node.TEXT_NODE && !child.textContent?.trim()));
        if (hasVisibleContent) {
          return;
        }
        pageParent.classList.add("ion-page-overlay-passthrough");
        const routerOutlet = pageParent.parentElement;
        if (routerOutlet?.tagName === "ION-ROUTER-OUTLET" && routerOutlet.parentElement?.tagName !== "ION-APP") {
          routerOutlet.style.setProperty("pointer-events", "none");
          routerOutlet.setAttribute("data-overlay-passthrough", "true");
        }
      }
      /**
       * Finds the ion-page ancestor of the modal's original parent location.
       */
      getOriginalPageParent() {
        if (!this.cachedOriginalParent) {
          return null;
        }
        let pageParent = this.cachedOriginalParent;
        while (pageParent && !pageParent.classList.contains("ion-page")) {
          pageParent = pageParent.parentElement;
        }
        return pageParent;
      }
      /**
       * Removes passthrough styles added by setupChildRoutePassthrough.
       */
      cleanupChildRoutePassthrough() {
        const pageParent = this.cachedPageParent;
        if (!pageParent) {
          return;
        }
        pageParent.classList.remove("ion-page-overlay-passthrough");
        const routerOutlet = pageParent.parentElement;
        if (routerOutlet?.hasAttribute("data-overlay-passthrough")) {
          routerOutlet.style.removeProperty("pointer-events");
          routerOutlet.removeAttribute("data-overlay-passthrough");
        }
        this.cachedPageParent = void 0;
      }
      sheetOnDismiss() {
        this.gestureAnimationDismissing = true;
        this.animation.onFinish(() => __async(this, null, function* () {
          this.currentBreakpoint = 0;
          this.ionBreakpointDidChange.emit({ breakpoint: this.currentBreakpoint });
          yield this.dismiss(void 0, GESTURE);
          this.gestureAnimationDismissing = false;
        }));
      }
      cardOnDismiss() {
        this.gestureAnimationDismissing = true;
        setCardStatusBarDefault(this.statusBarStyle);
        this.animation.onFinish(() => __async(this, null, function* () {
          yield this.dismiss(void 0, GESTURE);
          this.gestureAnimationDismissing = false;
        }));
      }
      /**
       * Dismiss the modal overlay after it has been presented.
       * This is a no-op if the overlay has not been presented yet. If you want
       * to remove an overlay from the DOM that was never presented, use the
       * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
       *
       * @param data Any data to emit in the dismiss events.
       * @param role The role of the element that is dismissing the modal.
       * For example, `cancel` or `backdrop`.
       */
      dismiss(data, role) {
        return __async(this, null, function* () {
          if (this.gestureAnimationDismissing && role !== GESTURE) {
            return false;
          }
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = void 0;
          const unlock = yield this.lockController.lock();
          yield this.dismissNestedModals();
          if (role !== "handler" && !(yield this.checkCanDismiss(data, role))) {
            unlock();
            return false;
          }
          const { presentingElement } = this;
          const hasCardModal = presentingElement !== void 0;
          if (hasCardModal && getIonMode(this) === "ios") {
            setCardStatusBarDefault(this.statusBarStyle);
          }
          if (typeof window !== "undefined" && this.keyboardOpenCallback) {
            window.removeEventListener(KEYBOARD_DID_OPEN, this.keyboardOpenCallback);
            this.keyboardOpenCallback = void 0;
          }
          const dismissed = yield dismiss(this, data, role, "modalLeave", iosLeaveAnimation, mdLeaveAnimation, {
            presentingEl: presentingElement,
            currentBreakpoint: this.currentBreakpoint ?? this.initialBreakpoint,
            backdropBreakpoint: this.backdropBreakpoint,
            expandToScroll: this.expandToScroll
          });
          if (dismissed) {
            const { delegate } = this.getDelegate();
            yield detachComponent(delegate, this.usersElement);
            writeTask(() => this.el.classList.remove("show-modal"));
            if (this.animation) {
              this.animation.destroy();
            }
            if (this.gesture) {
              this.gesture.destroy();
            }
            this.resetSheetContentScroll?.();
            this.resetSheetContentScroll = void 0;
            this.cleanupViewTransitionListener();
            this.cleanupParentRemovalObserver();
            this.cleanupSafeAreaOverrides();
            this.cleanupChildRoutePassthrough();
          }
          this.currentBreakpoint = void 0;
          this.animation = void 0;
          unlock();
          return dismissed;
        });
      }
      /**
       * Returns a promise that resolves when the modal did dismiss.
       */
      onDidDismiss() {
        return eventMethod(this.el, "ionModalDidDismiss");
      }
      /**
       * Returns a promise that resolves when the modal will dismiss.
       */
      onWillDismiss() {
        return eventMethod(this.el, "ionModalWillDismiss");
      }
      /**
       * Move a sheet style modal to a specific breakpoint.
       *
       * @param breakpoint The breakpoint value to move the sheet modal to.
       * Must be a value defined in your `breakpoints` array.
       */
      setCurrentBreakpoint(breakpoint) {
        return __async(this, null, function* () {
          if (!this.isSheetModal) {
            printIonWarning("[ion-modal] - setCurrentBreakpoint is only supported on sheet modals.");
            return;
          }
          if (!this.breakpoints.includes(breakpoint)) {
            printIonWarning(`[ion-modal] - Attempted to set invalid breakpoint value ${breakpoint}. Please double check that the breakpoint value is part of your defined breakpoints.`);
            return;
          }
          const { currentBreakpoint, moveSheetToBreakpoint, canDismiss, breakpoints, animated } = this;
          if (currentBreakpoint === breakpoint) {
            return;
          }
          if (moveSheetToBreakpoint) {
            this.sheetTransition = moveSheetToBreakpoint({
              breakpoint,
              breakpointOffset: 1 - currentBreakpoint,
              canDismiss: canDismiss !== void 0 && canDismiss !== true && breakpoints[0] === 0,
              animated
            });
            yield this.sheetTransition;
            this.sheetTransition = void 0;
          }
        });
      }
      /**
       * Returns the current breakpoint of a sheet style modal
       */
      getCurrentBreakpoint() {
        return __async(this, null, function* () {
          return this.currentBreakpoint;
        });
      }
      moveToNextBreakpoint() {
        return __async(this, null, function* () {
          const { breakpoints, currentBreakpoint } = this;
          if (!breakpoints || currentBreakpoint == null) {
            return false;
          }
          const allowedBreakpoints = breakpoints.filter((b) => b !== 0);
          const currentBreakpointIndex = allowedBreakpoints.indexOf(currentBreakpoint);
          const nextBreakpointIndex = (currentBreakpointIndex + 1) % allowedBreakpoints.length;
          const nextBreakpoint = allowedBreakpoints[nextBreakpointIndex];
          yield this.setCurrentBreakpoint(nextBreakpoint);
          return true;
        });
      }
      initViewTransitionListener() {
        if (getIonMode(this) !== "ios" || !this.presentingElement || this.enterAnimation || this.leaveAnimation) {
          return;
        }
        this.currentViewIsPortrait = window.innerWidth < 768;
      }
      handleViewTransition() {
        if (!this.presented) {
          return;
        }
        const isPortrait = window.innerWidth < 768;
        if (this.currentViewIsPortrait === isPortrait) {
          return;
        }
        if (this.viewTransitionAnimation) {
          this.viewTransitionAnimation.destroy();
          this.viewTransitionAnimation = void 0;
        }
        const { presentingElement } = this;
        if (!presentingElement) {
          return;
        }
        let transitionAnimation;
        if (this.currentViewIsPortrait && !isPortrait) {
          transitionAnimation = portraitToLandscapeTransition(this.el, {
            presentingEl: presentingElement
          });
        } else {
          transitionAnimation = landscapeToPortraitTransition(this.el, {
            presentingEl: presentingElement
          });
        }
        this.currentViewIsPortrait = isPortrait;
        this.viewTransitionAnimation = transitionAnimation;
        transitionAnimation.play().then(() => {
          this.viewTransitionAnimation = void 0;
          raf(() => this.updateSafeAreaOverrides());
          this.reinitSwipeToClose();
        });
      }
      cleanupViewTransitionListener() {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = void 0;
        }
        if (this.viewTransitionAnimation) {
          this.viewTransitionAnimation.destroy();
          this.viewTransitionAnimation = void 0;
        }
      }
      reinitSwipeToClose() {
        if (getIonMode(this) !== "ios" || !this.presentingElement) {
          return;
        }
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
        if (this.animation) {
          this.animation.progressEnd(0, 0, 0);
          this.animation.destroy();
          this.animation = void 0;
        }
        raf(() => {
          this.ensureCorrectModalPosition();
          this.initSwipeToClose();
        });
      }
      ensureCorrectModalPosition() {
        const { el, presentingElement } = this;
        const root = getElementRoot(el);
        const wrapperEl = root.querySelector(".modal-wrapper");
        if (wrapperEl) {
          wrapperEl.style.transform = "translateY(0vh)";
          wrapperEl.style.opacity = "1";
        }
        if (presentingElement?.tagName === "ION-MODAL") {
          const isPortrait = window.innerWidth < 768;
          if (isPortrait) {
            const transformOffset = !CSS.supports("width", "max(0px, 1px)") ? "30px" : "max(30px, var(--ion-safe-area-top))";
            const scale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
            presentingElement.style.transform = `translateY(${transformOffset}) scale(${scale})`;
          } else {
            presentingElement.style.transform = "translateY(0px) scale(1)";
          }
        }
      }
      dismissNestedModals() {
        return __async(this, null, function* () {
          const nestedModals = document.querySelectorAll(`ion-modal[data-parent-ion-modal="${this.el.id}"]`);
          nestedModals?.forEach((modal) => __async(this, null, function* () {
            yield modal.dismiss(void 0, "parent-dismissed");
          }));
        });
      }
      initParentRemovalObserver() {
        if (typeof MutationObserver === "undefined") {
          return;
        }
        if (typeof window === "undefined" || !this.cachedOriginalParent) {
          return;
        }
        if (this.cachedOriginalParent.nodeType === Node.DOCUMENT_NODE || this.cachedOriginalParent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          return;
        }
        if (this.hasController || this.cachedOriginalParent === document.body || this.cachedOriginalParent.tagName === "ION-APP") {
          return;
        }
        this.cleanupParentRemovalObserver();
        this.parentRemovalObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
              const cachedParentWasRemoved = Array.from(mutation.removedNodes).some((node) => {
                const isDirectMatch = node === this.cachedOriginalParent;
                const isContainedMatch = this.cachedOriginalParent ? node.contains?.(this.cachedOriginalParent) : false;
                return isDirectMatch || isContainedMatch;
              });
              const cachedParentDisconnected = this.cachedOriginalParent && !this.cachedOriginalParent.isConnected;
              if (cachedParentWasRemoved || cachedParentDisconnected) {
                this.dismiss(void 0, "parent-removed");
                this.cachedOriginalParent = void 0;
              }
            }
          });
        });
        this.parentRemovalObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
      cleanupParentRemovalObserver() {
        this.parentRemovalObserver?.disconnect();
        this.parentRemovalObserver = void 0;
      }
      onDragStart() {
        this.ionDragStart.emit();
      }
      onDragMove(detail) {
        this.ionDragMove.emit(detail);
      }
      onDragEnd(detail) {
        this.ionDragEnd.emit(detail);
      }
      /**
       * Creates the context object for safe-area utilities.
       *
       * `coveredAxes` is only set by `setInitialSafeAreaOverrides()`
       * because it is only read by `getInitialSafeAreaConfig()`. Other callers
       * (resize handler, post-animation update, fullscreen-padding apply) would
       * pay a `getComputedStyle()` cost for a value they never consult.
       */
      getSafeAreaContext() {
        return {
          isSheetModal: this.isSheetModal,
          isCardModal: this.presentingElement !== void 0 && getIonMode(this) === "ios",
          presentingElement: this.presentingElement,
          breakpoints: this.breakpoints,
          currentBreakpoint: this.currentBreakpoint
        };
      }
      /**
       * Keeps the content's sizing in sync with `--height`. The content reads the
       * property to determine whether it should size itself to its content, and
       * changes to `--height` on an ancestor or the root can change that behavior
       * without changing the modal itself.
       */
      watchHeightForContent() {
        if (this.isSheetModal) {
          return;
        }
        this.unsubscribeHeightChange?.();
        this.unsubscribeHeightChange = onModalHeightChange(this.el, () => {
          this.el.querySelectorAll("ion-content").forEach((contentEl) => contentEl.recalculateDimensions());
        });
      }
      /**
       * Sets initial safe-area overrides before modal animation.
       * Called in present() before animation starts.
       *
       * For sheet modals, the SCSS --height formula uses --ion-modal-offset-top
       * (an internal property) instead of --ion-safe-area-top. We resolve the
       * root safe-area-top to pixels and set --ion-modal-offset-top, decoupling
       * the height calculation from --ion-safe-area-top (which is zeroed for
       * sheets to prevent header content from getting double-offset padding).
       */
      setInitialSafeAreaOverrides() {
        const context = __spreadProps(__spreadValues({}, this.getSafeAreaContext()), {
          coveredAxes: getModalCoveredAxes(this.el)
        });
        const safeAreaConfig = getInitialSafeAreaConfig(context);
        applySafeAreaOverrides(this.el, safeAreaConfig);
        this.watchHeightForContent();
        if (context.isSheetModal) {
          this.updateSheetOffsetTop();
          this.unsubscribeRootSafeAreaTop?.();
          this.unsubscribeRootSafeAreaTop = onRootSafeAreaTopChange((safeAreaTop) => this.updateSheetOffsetTop(safeAreaTop));
        }
      }
      /**
       * Sets the internal --ion-modal-offset-top property on the host element,
       * resolving the current root --ion-safe-area-top when no value is given.
       * Called on present, on resize (e.g., device rotation changes safe-area),
       * and whenever the root safe-area value itself changes.
       */
      updateSheetOffsetTop(safeAreaTop) {
        const value = safeAreaTop ?? getRootSafeAreaTop();
        this.el.style.setProperty("--ion-modal-offset-top", `${value}px`);
      }
      /**
       * Updates safe-area overrides during dynamic state changes.
       * Called after animations, during gestures, and on orientation changes.
       */
      updateSafeAreaOverrides() {
        const { wrapperEl, el } = this;
        const context = this.getSafeAreaContext();
        if (context.isSheetModal)
          return;
        if (context.isCardModal)
          return;
        if (!wrapperEl)
          return;
        const safeAreaConfig = getPositionBasedSafeAreaConfig(wrapperEl);
        applySafeAreaOverrides(el, safeAreaConfig);
      }
      /**
       * Applies safe-area-bottom scroll padding to ion-content inside
       * fullscreen modals that have no ion-footer. This prevents content
       * from being hidden behind the system navigation bar while keeping
       * the modal background edge-to-edge (no visible gap).
       */
      applyFullscreenSafeArea() {
        const context = this.getSafeAreaContext();
        if (context.isSheetModal || context.isCardModal)
          return;
        const { contentEl, hasFooter } = this.findContentAndFooter();
        this.applyFullscreenSafeAreaTo(contentEl, hasFooter);
      }
      /**
       * Sets --internal-content-safe-area-padding-bottom on the given ion-content
       * when no footer is present, so ion-content's .inner-scroll includes
       * safe-area-bottom in its scroll padding. This keeps the modal background
       * edge-to-edge while ensuring content scrolls clear of the system nav bar.
       *
       * --internal-content-safe-area-padding-bottom is an internal CSS property used
       * only by this code path. It is not part of ion-content's public API and
       * should not be set by consumers. The default of 0px makes it a no-op
       * when unset, which is the expected state for ion-content used outside of
       * a fullscreen modal without a footer.
       */
      applyFullscreenSafeAreaTo(contentEl, hasFooter) {
        if (!contentEl || hasFooter)
          return;
        contentEl.style.setProperty("--internal-content-safe-area-padding-bottom", "var(--ion-safe-area-bottom, 0px)");
      }
      /**
       * Removes the internal --internal-content-safe-area-padding-bottom property
       * from an already-located ion-content. Callers do their own
       * findContentAndFooter() so they can also read hasFooter if needed.
       */
      clearContentSafeAreaPadding(contentEl) {
        if (!contentEl)
          return;
        contentEl.style.removeProperty("--internal-content-safe-area-padding-bottom");
      }
      /**
       * Finds ion-content and ion-footer among direct children and one level of
       * grandchildren (for wrapped components like <app-footer><ion-footer>).
       *
       * Intentionally does NOT use findIonContent() or querySelector() because
       * those search the full subtree and would match ion-content inside nested
       * routes/pages. We only want direct slot children (+ one wrapper level).
       *
       * Uses a manual loop instead of querySelector(':scope > ...') because
       * Stencil's mock-doc (used in spec tests) does not support :scope.
       */
      findContentAndFooter() {
        let contentEl = null;
        let hasFooter = false;
        for (const child of Array.from(this.el.children)) {
          if (child.tagName === "ION-CONTENT")
            contentEl = child;
          if (child.tagName === "ION-FOOTER")
            hasFooter = true;
          for (const grandchild of Array.from(child.children)) {
            if (grandchild.tagName === "ION-CONTENT" && !contentEl)
              contentEl = grandchild;
            if (grandchild.tagName === "ION-FOOTER")
              hasFooter = true;
          }
        }
        return { contentEl, hasFooter };
      }
      /**
       * Clears all safe-area overrides and padding.
       */
      cleanupSafeAreaOverrides() {
        clearSafeAreaOverrides(this.el);
        this.unsubscribeRootSafeAreaTop?.();
        this.unsubscribeRootSafeAreaTop = void 0;
        this.unsubscribeHeightChange?.();
        this.unsubscribeHeightChange = void 0;
        this.el.style.removeProperty("--ion-modal-offset-top");
        const { contentEl } = this.findContentAndFooter();
        this.clearContentSafeAreaPadding(contentEl);
      }
      /**
       * Re-applies what `cleanupSafeAreaOverrides()` removed for a modal moved
       * while presented. Anything needing no measurement goes on synchronously so
       * the modal is never painted without safe-area. The position-based
       * correction waits a frame for the layout pass it reads.
       */
      restoreSafeAreaOverrides() {
        this.setInitialSafeAreaOverrides();
        this.applyFullscreenSafeArea();
        raf(() => {
          if (!this.presented || !this.el.isConnected || this.isPresenting) {
            return;
          }
          const { width, height } = this.el.getBoundingClientRect();
          if (width === 0 && height === 0) {
            return;
          }
          this.updateSafeAreaOverrides();
        });
      }
      render() {
        const { handle, isSheetModal, presentingElement, htmlAttributes, handleBehavior, inheritedAttributes, focusTrap, expandToScroll } = this;
        const showHandle = handle !== false && isSheetModal;
        const mode = getIonMode(this);
        const isCardModal = presentingElement !== void 0 && mode === "ios";
        const isHandleCycle = handleBehavior === "cycle";
        const isSheetModalWithHandle = isSheetModal && showHandle;
        return h(Host, __spreadProps(__spreadValues({
          key: "17a95bd7722bac2344bea041aff97db17f55c0cf",
          "no-router": true,
          // Allow the modal to be navigable when the handle is focusable
          tabIndex: isHandleCycle && isSheetModalWithHandle ? 0 : -1
        }, htmlAttributes), {
          style: {
            zIndex: `${2e4 + this.overlayIndex}`
          },
          class: __spreadValues({
            [mode]: true,
            ["modal-default"]: !isCardModal && !isSheetModal,
            [`modal-card`]: isCardModal,
            [`modal-sheet`]: isSheetModal,
            [`modal-no-expand-scroll`]: isSheetModal && !expandToScroll,
            "overlay-hidden": true,
            [FOCUS_TRAP_DISABLE_CLASS]: focusTrap === false
          }, getClassMap(this.cssClass)),
          onIonBackdropTap: this.onBackdropTap,
          onIonModalDidPresent: this.onLifecycle,
          onIonModalWillPresent: this.onLifecycle,
          onIonModalWillDismiss: this.onLifecycle,
          onIonModalDidDismiss: this.onLifecycle,
          onFocus: this.onModalFocus
        }), h("ion-backdrop", { key: "9dab1ef4771c0d847ba2be8672afbaa2748517f3", ref: (el) => this.backdropEl = el, visible: this.showBackdrop, tappable: this.backdropDismiss, part: "backdrop" }), mode === "ios" && h("div", { key: "64af7ed1c5f552b61fc4b9387b926acc76c8a99a", class: "modal-shadow" }), h("div", __spreadProps(__spreadValues({
          key: "7e76d77d5b2e8f0467bb793facf5aa86f8d01bbe",
          /*
                      role and aria-modal must be used on the
                      same element. They must also be set inside the
                      shadow DOM otherwise ion-button will not be highlighted
                      when using VoiceOver: https://bugs.webkit.org/show_bug.cgi?id=247134
          
                      tabIndex={-1} is required so present() can move focus to this
                      element (which carries the dialog role) instead of the role-less
                      host. role="dialog" alone does not make an element focusable, so
                      without the tabindex focus() would be a no-op and screen readers
                      may not properly announce the dialog and its content when it opens.
                    */
          role: "dialog"
        }, inheritedAttributes), {
          "aria-modal": "true",
          tabIndex: -1,
          class: "modal-wrapper ion-overlay-wrapper",
          part: "content",
          ref: (el) => this.wrapperEl = el
        }), showHandle && h("button", {
          key: "5efc0bb0a59adcc594ac48da9fd90e57908a7ffb",
          class: "modal-handle",
          // Prevents the handle from receiving keyboard focus when it does not cycle
          tabIndex: !isHandleCycle ? -1 : 0,
          "aria-label": "Activate to adjust the size of the dialog overlaying the screen",
          onClick: isHandleCycle ? this.onHandleClick : void 0,
          part: "handle",
          ref: (el) => this.dragHandleEl = el
        }), h("slot", { key: "6175fcd0b39c086b4e9eb9e96c4d631c2a86774b", onSlotchange: this.onSlotChange })));
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
          }],
          "breakpoints": [{
            "breakpointsChanged": 0
          }]
        };
      }
    };
    LIFECYCLE_MAP = {
      ionModalDidPresent: "ionViewDidEnter",
      ionModalWillPresent: "ionViewWillEnter",
      ionModalWillDismiss: "ionViewWillLeave",
      ionModalDidDismiss: "ionViewDidLeave"
    };
    Modal.style = {
      ios: modalIosCss(),
      md: modalMdCss()
    };
  }
});
init_ion_modal_entry();
export {
  Modal as ion_modal
};
//# debugId=06fe4f0c-8f20-5131-9b18-32f8e7a1da69
//# sourceMappingURL=chunk-7ZJEWHDG.js.map
