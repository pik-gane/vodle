import {
  init_helpers_BJqKF1pr,
  raf
} from "./chunk-LEFG5EZ6.js";
import {
  Build,
  config,
  init_index_BpRUsN_W,
  printIonWarning,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/index-BBASprVu.js
var LIFECYCLE_WILL_ENTER, LIFECYCLE_DID_ENTER, LIFECYCLE_WILL_LEAVE, LIFECYCLE_DID_LEAVE, LIFECYCLE_WILL_UNLOAD, moveFocus, isVisible, createFocusController, LAST_FOCUS, iosTransitionAnimation, mdTransitionAnimation, focusController, transition, beforeTransition, runTransition, afterTransition, getAnimationBuilder, animation, noAnimation, waitForReady, notifyViewReady, playTransition, fireWillEvents, fireDidEvents, lifecycle, waitForMount, deepReady, setPageHidden, setZIndex, setHeaderTransitionClass, getIonPageElement, getIosIonHeader;
var init_index_BBASprVu = __esm({
  "node_modules/@ionic/core/dist/esm/index-BBASprVu.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    LIFECYCLE_WILL_ENTER = "ionViewWillEnter";
    LIFECYCLE_DID_ENTER = "ionViewDidEnter";
    LIFECYCLE_WILL_LEAVE = "ionViewWillLeave";
    LIFECYCLE_DID_LEAVE = "ionViewDidLeave";
    LIFECYCLE_WILL_UNLOAD = "ionViewWillUnload";
    moveFocus = (el) => {
      el.tabIndex = -1;
      el.focus();
    };
    isVisible = (el) => {
      return el.offsetParent !== null;
    };
    createFocusController = () => {
      const saveViewFocus = (referenceEl) => {
        const focusManagerEnabled = config.get("focusManagerPriority", false);
        if (focusManagerEnabled) {
          const activeEl = document.activeElement;
          if (activeEl !== null && referenceEl?.contains(activeEl)) {
            activeEl.setAttribute(LAST_FOCUS, "true");
          }
        }
      };
      const setViewFocus = (referenceEl) => {
        const focusManagerPriorities = config.get("focusManagerPriority", false);
        if (Array.isArray(focusManagerPriorities) && !referenceEl.contains(document.activeElement)) {
          const lastFocus = referenceEl.querySelector(`[${LAST_FOCUS}]`);
          if (lastFocus && isVisible(lastFocus)) {
            moveFocus(lastFocus);
            return;
          }
          for (const priority of focusManagerPriorities) {
            switch (priority) {
              case "content":
                const content = referenceEl.querySelector('main, [role="main"]');
                if (content && isVisible(content)) {
                  moveFocus(content);
                  return;
                }
                break;
              case "heading":
                const headingOne = referenceEl.querySelector('h1, [role="heading"][aria-level="1"]');
                if (headingOne && isVisible(headingOne)) {
                  moveFocus(headingOne);
                  return;
                }
                break;
              case "banner":
                const header = referenceEl.querySelector('header, [role="banner"]');
                if (header && isVisible(header)) {
                  moveFocus(header);
                  return;
                }
                break;
              default:
                printIonWarning(`Unrecognized focus manager priority value ${priority}`);
                break;
            }
          }
          moveFocus(referenceEl);
        }
      };
      return {
        saveViewFocus,
        setViewFocus
      };
    };
    LAST_FOCUS = "ion-last-focus";
    iosTransitionAnimation = () => import("./chunk-B4BR7JB2.js");
    mdTransitionAnimation = () => import("./chunk-L3PGTRYO.js");
    focusController = createFocusController();
    transition = (opts) => {
      return new Promise((resolve, reject) => {
        writeTask(() => {
          const transitioningInactiveHeader = getIosIonHeader(opts);
          beforeTransition(opts, transitioningInactiveHeader);
          runTransition(opts).then((result) => {
            if (result.animation) {
              result.animation.destroy();
            }
            afterTransition(opts);
            resolve(result);
          }, (error) => {
            afterTransition(opts);
            reject(error);
          }).finally(() => {
            setHeaderTransitionClass(transitioningInactiveHeader, false);
          });
        });
      });
    };
    beforeTransition = (opts, transitioningInactiveHeader) => {
      const enteringEl = opts.enteringEl;
      const leavingEl = opts.leavingEl;
      focusController.saveViewFocus(leavingEl);
      setZIndex(enteringEl, leavingEl, opts.direction);
      setHeaderTransitionClass(transitioningInactiveHeader, true);
      if (opts.showGoBack) {
        enteringEl.classList.add("can-go-back");
      } else {
        enteringEl.classList.remove("can-go-back");
      }
      setPageHidden(enteringEl, false);
      enteringEl.style.setProperty("pointer-events", "none");
      if (leavingEl) {
        setPageHidden(leavingEl, false);
        leavingEl.style.setProperty("pointer-events", "none");
      }
    };
    runTransition = (opts) => __async(null, null, function* () {
      const animationBuilder = yield getAnimationBuilder(opts);
      const ani = animationBuilder && Build.isBrowser ? animation(animationBuilder, opts) : noAnimation(opts);
      return ani;
    });
    afterTransition = (opts) => {
      const enteringEl = opts.enteringEl;
      const leavingEl = opts.leavingEl;
      enteringEl.classList.remove("ion-page-invisible");
      enteringEl.style.removeProperty("pointer-events");
      if (leavingEl !== void 0) {
        leavingEl.classList.remove("ion-page-invisible");
        leavingEl.style.removeProperty("pointer-events");
      }
      focusController.setViewFocus(enteringEl);
    };
    getAnimationBuilder = (opts) => __async(null, null, function* () {
      if (!opts.leavingEl || !opts.animated || opts.duration === 0) {
        return void 0;
      }
      if (opts.animationBuilder) {
        return opts.animationBuilder;
      }
      const getAnimation = opts.mode === "ios" ? (yield iosTransitionAnimation()).iosTransitionAnimation : (yield mdTransitionAnimation()).mdTransitionAnimation;
      return getAnimation;
    });
    animation = (animationBuilder, opts) => __async(null, null, function* () {
      yield waitForReady(opts, true);
      const trans = animationBuilder(opts.baseEl, opts);
      fireWillEvents(opts.enteringEl, opts.leavingEl);
      const didComplete = yield playTransition(trans, opts);
      if (opts.progressCallback) {
        opts.progressCallback(void 0);
      }
      if (didComplete) {
        fireDidEvents(opts.enteringEl, opts.leavingEl);
      }
      return {
        hasCompleted: didComplete,
        animation: trans
      };
    });
    noAnimation = (opts) => __async(null, null, function* () {
      const enteringEl = opts.enteringEl;
      const leavingEl = opts.leavingEl;
      const focusManagerEnabled = config.get("focusManagerPriority", false);
      yield waitForReady(opts, focusManagerEnabled);
      fireWillEvents(enteringEl, leavingEl);
      fireDidEvents(enteringEl, leavingEl);
      return {
        hasCompleted: true
      };
    });
    waitForReady = (opts, defaultDeep) => __async(null, null, function* () {
      const deep = opts.deepWait !== void 0 ? opts.deepWait : defaultDeep;
      if (deep) {
        yield Promise.all([deepReady(opts.enteringEl), deepReady(opts.leavingEl)]);
      }
      yield notifyViewReady(opts.viewIsReady, opts.enteringEl);
    });
    notifyViewReady = (viewIsReady, enteringEl) => __async(null, null, function* () {
      if (viewIsReady) {
        yield viewIsReady(enteringEl);
      }
    });
    playTransition = (trans, opts) => {
      const progressCallback = opts.progressCallback;
      const promise = new Promise((resolve) => {
        trans.onFinish((currentStep) => resolve(currentStep === 1));
      });
      if (progressCallback) {
        trans.progressStart(true);
        progressCallback(trans);
      } else {
        trans.play();
      }
      return promise;
    };
    fireWillEvents = (enteringEl, leavingEl) => {
      lifecycle(leavingEl, LIFECYCLE_WILL_LEAVE);
      lifecycle(enteringEl, LIFECYCLE_WILL_ENTER);
    };
    fireDidEvents = (enteringEl, leavingEl) => {
      lifecycle(enteringEl, LIFECYCLE_DID_ENTER);
      lifecycle(leavingEl, LIFECYCLE_DID_LEAVE);
    };
    lifecycle = (el, eventName) => {
      if (el) {
        const ev = new CustomEvent(eventName, {
          bubbles: false,
          cancelable: false
        });
        el.dispatchEvent(ev);
      }
    };
    waitForMount = () => {
      return new Promise((resolve) => raf(() => raf(() => resolve())));
    };
    deepReady = (el) => __async(null, null, function* () {
      const element = el;
      if (element) {
        if (element.componentOnReady != null) {
          const stencilEl = yield element.componentOnReady();
          if (stencilEl != null) {
            return;
          }
        } else if (element.__registerHost != null) {
          const waitForCustomElement = new Promise((resolve) => raf(resolve));
          yield waitForCustomElement;
          return;
        }
        yield Promise.all(Array.from(element.children).map(deepReady));
      }
    });
    setPageHidden = (el, hidden) => {
      if (hidden) {
        el.setAttribute("aria-hidden", "true");
        el.classList.add("ion-page-hidden");
      } else {
        el.hidden = false;
        el.removeAttribute("aria-hidden");
        el.classList.remove("ion-page-hidden");
      }
    };
    setZIndex = (enteringEl, leavingEl, direction) => {
      if (enteringEl !== void 0) {
        enteringEl.style.zIndex = direction === "back" ? "99" : "101";
      }
      if (leavingEl !== void 0) {
        leavingEl.style.zIndex = "100";
      }
    };
    setHeaderTransitionClass = (header, isTransitioning) => {
      if (!header) {
        return;
      }
      const transitionClass = "header-transitioning";
      if (isTransitioning) {
        header.classList.add(transitionClass);
      } else {
        header.classList.remove(transitionClass);
      }
    };
    getIonPageElement = (element) => {
      if (element.classList.contains("ion-page")) {
        return element;
      }
      const ionPage = element.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs");
      if (ionPage) {
        return ionPage;
      }
      return element;
    };
    getIosIonHeader = (opts) => {
      const enteringEl = opts.enteringEl;
      const leavingEl = opts.leavingEl;
      const direction = opts.direction;
      const mode = opts.mode;
      if (mode !== "ios") {
        return null;
      }
      const element = direction === "back" ? leavingEl : enteringEl;
      if (!element) {
        return null;
      }
      return element.querySelector("ion-header");
    };
  }
});

export {
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_UNLOAD,
  transition,
  lifecycle,
  waitForMount,
  deepReady,
  setPageHidden,
  getIonPageElement,
  init_index_BBASprVu
};
//# debugId=ef1f4d18-3fb1-575d-ab8b-dd504dd7692e
//# sourceMappingURL=chunk-GMOSWYPY.js.map
