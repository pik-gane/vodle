import {
  ION_CONTENT_CLASS_SELECTOR,
  ION_CONTENT_ELEMENT_SELECTOR,
  findRefresherScrollHost,
  getScrollElement,
  init_index_TkLga3ma,
  printIonContentErrorMsg
} from "./chunk-57PV5QBJ.js";
import {
  SPINNERS,
  init_spinner_configs_D4RIp70E
} from "./chunk-6UJNMHIQ.js";
import {
  ImpactStyle,
  hapticImpact,
  init_haptic_WXfMCob9
} from "./chunk-XHGNMG47.js";
import {
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  arrowDown,
  caretBackSharp,
  init_index_BvabGprD
} from "./chunk-KPUED4ZZ.js";
import {
  getTimeGivenProgression,
  init_cubic_bezier_hHmYLOfE
} from "./chunk-HMW3MSDJ.js";
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
  clamp,
  componentOnReady,
  getElementRoot,
  init_helpers_BJqKF1pr,
  raf,
  transitionEndAsync
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
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
  printIonError,
  readTask,
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-refresher_2.entry.js
var getRefresherAnimationType, createPullingAnimation, createBaseAnimation, createScaleAnimation, createTranslateAnimation, createSnapBackAnimation, setSpinnerOpacity, handleScrollWhilePulling, handleScrollWhileRefreshing, translateElement, supportsRubberBandScrolling, shouldUseNativeRefresher, refresherIosCss, refresherMdCss, Refresher, RefresherContent;
var init_ion_refresher_2_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-refresher_2.entry.js"() {
    init_index_BpRUsN_W();
    init_cubic_bezier_hHmYLOfE();
    init_index_TkLga3ma();
    init_helpers_BJqKF1pr();
    init_haptic_WXfMCob9();
    init_ionic_global_Cep6oYzK();
    init_animation_DmtJpz89();
    init_config_DWCzVL3Y();
    init_index_CK8uF0iB();
    init_index_BvabGprD();
    init_spinner_configs_D4RIp70E();
    init_dir_Dojwmvde();
    init_capacitor_CHJaJ9aX();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getRefresherAnimationType = (contentEl) => {
      const previousSibling = contentEl.previousElementSibling;
      const hasHeader = previousSibling !== null && previousSibling.tagName === "ION-HEADER";
      return hasHeader ? "translate" : "scale";
    };
    createPullingAnimation = (type, pullingSpinner, refresherEl) => {
      return type === "scale" ? createScaleAnimation(pullingSpinner, refresherEl) : createTranslateAnimation(pullingSpinner, refresherEl);
    };
    createBaseAnimation = (pullingRefresherIcon) => {
      const spinner = pullingRefresherIcon.querySelector("ion-spinner");
      const circle = spinner.shadowRoot.querySelector("circle");
      const spinnerArrowContainer = pullingRefresherIcon.querySelector(".spinner-arrow-container");
      const arrowContainer = pullingRefresherIcon.querySelector(".arrow-container");
      const arrow = arrowContainer ? arrowContainer.querySelector("ion-icon") : null;
      const baseAnimation = createAnimation().duration(1e3).easing("ease-out");
      const spinnerArrowContainerAnimation = createAnimation().addElement(spinnerArrowContainer).keyframes([
        { offset: 0, opacity: "0.3" },
        { offset: 0.45, opacity: "0.3" },
        { offset: 0.55, opacity: "1" },
        { offset: 1, opacity: "1" }
      ]);
      const circleInnerAnimation = createAnimation().addElement(circle).keyframes([
        { offset: 0, strokeDasharray: "1px, 200px" },
        { offset: 0.2, strokeDasharray: "1px, 200px" },
        { offset: 0.55, strokeDasharray: "100px, 200px" },
        { offset: 1, strokeDasharray: "100px, 200px" }
      ]);
      const circleOuterAnimation = createAnimation().addElement(spinner).keyframes([
        { offset: 0, transform: "rotate(-90deg)" },
        { offset: 1, transform: "rotate(210deg)" }
      ]);
      if (arrowContainer && arrow) {
        const arrowContainerAnimation = createAnimation().addElement(arrowContainer).keyframes([
          { offset: 0, transform: "rotate(0deg)" },
          { offset: 0.3, transform: "rotate(0deg)" },
          { offset: 0.55, transform: "rotate(280deg)" },
          { offset: 1, transform: "rotate(400deg)" }
        ]);
        const arrowAnimation = createAnimation().addElement(arrow).keyframes([
          { offset: 0, transform: "translateX(2px) scale(0)" },
          { offset: 0.3, transform: "translateX(2px) scale(0)" },
          { offset: 0.55, transform: "translateX(-1.5px) scale(1)" },
          { offset: 1, transform: "translateX(-1.5px) scale(1)" }
        ]);
        baseAnimation.addAnimation([arrowContainerAnimation, arrowAnimation]);
      }
      return baseAnimation.addAnimation([spinnerArrowContainerAnimation, circleInnerAnimation, circleOuterAnimation]);
    };
    createScaleAnimation = (pullingRefresherIcon, refresherEl) => {
      const height = refresherEl.clientHeight;
      const spinnerAnimation = createAnimation().addElement(pullingRefresherIcon).keyframes([
        { offset: 0, transform: `scale(0) translateY(-${height}px)` },
        { offset: 1, transform: "scale(1) translateY(100px)" }
      ]);
      return createBaseAnimation(pullingRefresherIcon).addAnimation([spinnerAnimation]);
    };
    createTranslateAnimation = (pullingRefresherIcon, refresherEl) => {
      const height = refresherEl.clientHeight;
      const spinnerAnimation = createAnimation().addElement(pullingRefresherIcon).keyframes([
        { offset: 0, transform: `translateY(-${height}px)` },
        { offset: 1, transform: "translateY(100px)" }
      ]);
      return createBaseAnimation(pullingRefresherIcon).addAnimation([spinnerAnimation]);
    };
    createSnapBackAnimation = (pullingRefresherIcon) => {
      return createAnimation().duration(125).addElement(pullingRefresherIcon).fromTo("transform", "translateY(var(--ion-pulling-refresher-translate, 100px))", "translateY(0px)");
    };
    setSpinnerOpacity = (spinner, opacity) => {
      spinner.style.setProperty("opacity", opacity.toString());
    };
    handleScrollWhilePulling = (ticks, numTicks, pullAmount) => {
      const max = 1;
      writeTask(() => {
        ticks.forEach((el, i) => {
          const min = i * (max / numTicks);
          const range = max - min;
          const start = pullAmount - min;
          const progression = clamp(0, start / range, 1);
          el.style.setProperty("opacity", progression.toString());
        });
      });
    };
    handleScrollWhileRefreshing = (spinner, lastVelocityY) => {
      writeTask(() => {
        spinner.style.setProperty("--refreshing-rotation-duration", lastVelocityY >= 1 ? "0.5s" : "2s");
        spinner.style.setProperty("opacity", "1");
      });
    };
    translateElement = (el, value, duration = 200) => {
      if (!el) {
        return Promise.resolve();
      }
      const trans = transitionEndAsync(el, duration);
      writeTask(() => {
        el.style.setProperty("transition", `${duration}ms all ease-out`);
        if (value === void 0) {
          el.style.removeProperty("transform");
        } else {
          el.style.setProperty("transform", `translate3d(0px, ${value}, 0px)`);
        }
      });
      return trans;
    };
    supportsRubberBandScrolling = () => {
      return navigator.maxTouchPoints > 0 && CSS.supports("background: -webkit-named-image(apple-pay-logo-black)");
    };
    shouldUseNativeRefresher = (referenceEl, mode) => __async(null, null, function* () {
      const refresherContent = referenceEl.querySelector("ion-refresher-content");
      if (!refresherContent) {
        return Promise.resolve(false);
      }
      yield new Promise((resolve) => componentOnReady(refresherContent, resolve));
      const pullingSpinner = referenceEl.querySelector("ion-refresher-content .refresher-pulling ion-spinner");
      const refreshingSpinner = referenceEl.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");
      return pullingSpinner !== null && refreshingSpinner !== null && (mode === "ios" && supportsRubberBandScrolling() || mode === "md");
    });
    refresherIosCss = () => `ion-refresher{top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}ion-refresher{inset-inline-start:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:200ms;transition:200ms;font-size:30px;text-align:center}:host-context([dir=rtl]) .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}[dir=rtl] .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}@supports selector(:dir(rtl)){.refresher-pulling-icon:dir(rtl),.refresher-refreshing-icon:dir(rtl){-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-ios .refresher-pulling-icon,.refresher-ios .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-ios .refresher-pulling-text,.refresher-ios .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-lines-ios line,.refresher-ios .refresher-refreshing .spinner-lines-small-ios line,.refresher-ios .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-bubbles circle,.refresher-ios .refresher-refreshing .spinner-circles circle,.refresher-ios .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0}.refresher-native .refresher-refreshing ion-spinner{--refreshing-rotation-duration:2s;display:none;-webkit-animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards;animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards}.refresher-native .refresher-refreshing{display:none;-webkit-animation:250ms linear refresher-pop forwards;animation:250ms linear refresher-pop forwards}.refresher-native ion-spinner{width:32px;height:32px;color:var(--ion-color-step-450, var(--ion-background-color-step-450, #747577))}.refresher-native.refresher-refreshing .refresher-pulling ion-spinner,.refresher-native.refresher-completing .refresher-pulling ion-spinner{display:none}.refresher-native.refresher-refreshing .refresher-refreshing ion-spinner,.refresher-native.refresher-completing .refresher-refreshing ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-pulling ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-refreshing ion-spinner{display:none}.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0) rotate(180deg);transform:scale(0) rotate(180deg);-webkit-transition:300ms;transition:300ms}@-webkit-keyframes refresher-pop{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:scale(1.2);transform:scale(1.2);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes refresher-pop{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:scale(1.2);transform:scale(1.2);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes refresher-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes refresher-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}`;
    refresherMdCss = () => `ion-refresher{top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}ion-refresher{inset-inline-start:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:200ms;transition:200ms;font-size:30px;text-align:center}:host-context([dir=rtl]) .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}[dir=rtl] .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}@supports selector(:dir(rtl)){.refresher-pulling-icon:dir(rtl),.refresher-refreshing-icon:dir(rtl){-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-md .refresher-pulling-icon,.refresher-md .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-md .refresher-pulling-text,.refresher-md .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-lines-md line,.refresher-md .refresher-refreshing .spinner-lines-small-md line,.refresher-md .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-bubbles circle,.refresher-md .refresher-refreshing .spinner-circles circle,.refresher-md .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;width:24px;height:24px;color:var(--ion-color-primary, #0054e9)}ion-refresher.refresher-native .spinner-arrow-container{display:inherit}ion-refresher.refresher-native .arrow-container{display:block;position:absolute;width:24px;height:24px}ion-refresher.refresher-native .arrow-container ion-icon{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;left:0;right:0;bottom:-4px;position:absolute;color:var(--ion-color-primary, #0054e9);font-size:12px}ion-refresher.refresher-native.refresher-pulling ion-refresher-content .refresher-pulling,ion-refresher.refresher-native.refresher-ready ion-refresher-content .refresher-pulling{display:-ms-flexbox;display:flex}ion-refresher.refresher-native.refresher-refreshing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-cancelling ion-refresher-content .refresher-refreshing{display:-ms-flexbox;display:flex}ion-refresher.refresher-native .refresher-pulling-icon{-webkit-transform:translateY(calc(-100% - 10px));transform:translateY(calc(-100% - 10px))}ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:0;margin-bottom:0;border-radius:100%;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px;padding-top:8px;padding-bottom:8px;display:-ms-flexbox;display:flex;border:1px solid var(--ion-color-step-200, var(--ion-background-color-step-200, #ececec));background:var(--ion-color-step-250, var(--ion-background-color-step-250, #ffffff));-webkit-box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1);box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1)}`;
    Refresher = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionRefresh = createEvent(this, "ionRefresh", 7);
        this.ionPull = createEvent(this, "ionPull", 7);
        this.ionStart = createEvent(this, "ionStart", 7);
        this.ionPullStart = createEvent(this, "ionPullStart", 7);
        this.ionPullEnd = createEvent(this, "ionPullEnd", 7);
        this.appliedStyles = false;
        this.didStart = false;
        this.progress = 0;
        this.pointerDown = false;
        this.needsCompletion = false;
        this.didRefresh = false;
        this.contentFullscreen = false;
        this.lastVelocityY = 0;
        this.animations = [];
        this.nativeRefresher = false;
        this.state = 1;
        this.pullMin = 60;
        this.pullMax = this.pullMin + 60;
        this.closeDuration = "280ms";
        this.snapbackDuration = "280ms";
        this.pullFactor = 1;
        this.disabled = false;
      }
      disabledChanged() {
        if (this.gesture) {
          this.gesture.enable(!this.disabled);
        }
      }
      checkNativeRefresher() {
        return __async(this, null, function* () {
          const useNativeRefresher = yield shouldUseNativeRefresher(this.el, getIonMode(this));
          if (useNativeRefresher && !this.nativeRefresher) {
            const contentEl = this.el.closest("ion-content");
            this.setupNativeRefresher(contentEl);
          } else if (!useNativeRefresher) {
            this.destroyNativeRefresher();
          }
        });
      }
      destroyNativeRefresher() {
        if (this.scrollEl && this.scrollListenerCallback) {
          this.scrollEl.removeEventListener("scroll", this.scrollListenerCallback);
          this.scrollListenerCallback = void 0;
        }
        this.nativeRefresher = false;
      }
      resetNativeRefresher(el, state) {
        return __async(this, null, function* () {
          this.state = state;
          if (getIonMode(this) === "ios") {
            yield translateElement(el, void 0, 300);
          } else {
            yield transitionEndAsync(this.el.querySelector(".refresher-refreshing-icon"), 200);
          }
          this.didRefresh = false;
          this.needsCompletion = false;
          this.pointerDown = false;
          this.animations.forEach((ani) => ani.destroy());
          this.animations = [];
          this.progress = 0;
          this.state = 1;
          this.ionPullEnd.emit({
            reason: state === 32 ? "complete" : "cancel"
          });
        });
      }
      setupiOSNativeRefresher(pullingSpinner, refreshingSpinner) {
        return __async(this, null, function* () {
          this.elementToTransform = this.scrollEl;
          const ticks = pullingSpinner.shadowRoot.querySelectorAll("svg");
          let MAX_PULL = this.scrollEl.clientHeight * 0.16;
          const NUM_TICKS = ticks.length;
          writeTask(() => ticks.forEach((el) => el.style.setProperty("animation", "none")));
          this.scrollListenerCallback = () => {
            if (!this.pointerDown && this.state === 1) {
              return;
            }
            readTask(() => {
              const scrollTop = this.scrollEl.scrollTop;
              const refresherHeight = this.el.clientHeight;
              if (scrollTop > 0) {
                if (this.state === 8) {
                  const ratio = clamp(0, scrollTop / (refresherHeight * 0.5), 1);
                  writeTask(() => setSpinnerOpacity(refreshingSpinner, 1 - ratio));
                  return;
                }
                return;
              }
              if (this.pointerDown) {
                if (!this.didStart) {
                  this.didStart = true;
                  this.ionStart.emit();
                  this.ionPullStart.emit();
                }
                if (this.pointerDown) {
                  this.ionPull.emit();
                }
              }
              const offset = this.didStart ? 30 : 0;
              const pullAmount = this.progress = clamp(0, (Math.abs(scrollTop) - offset) / MAX_PULL, 1);
              const shouldShowRefreshingSpinner = this.state === 8 || pullAmount === 1;
              if (shouldShowRefreshingSpinner) {
                if (this.pointerDown) {
                  handleScrollWhileRefreshing(refreshingSpinner, this.lastVelocityY);
                }
                if (!this.didRefresh) {
                  this.beginRefresh();
                  this.didRefresh = true;
                  hapticImpact({ style: ImpactStyle.Light });
                  const activeElement = document.activeElement;
                  if (activeElement?.blur !== void 0) {
                    activeElement.blur();
                  }
                  if (!this.pointerDown) {
                    translateElement(this.elementToTransform, `${refresherHeight}px`);
                  }
                }
              } else {
                this.state = 2;
                handleScrollWhilePulling(ticks, NUM_TICKS, pullAmount);
              }
            });
          };
          this.scrollEl.addEventListener("scroll", this.scrollListenerCallback);
          const { createGesture } = yield import("./chunk-YHTSP4B3.js");
          if (!this.scrollEl) {
            return;
          }
          this.gesture = createGesture({
            el: this.scrollEl,
            gestureName: "refresher",
            gesturePriority: 31,
            direction: "y",
            threshold: 5,
            onStart: () => {
              this.pointerDown = true;
              if (!this.didRefresh) {
                translateElement(this.elementToTransform, "0px");
              }
              if (MAX_PULL === 0) {
                MAX_PULL = this.scrollEl.clientHeight * 0.16;
              }
            },
            onMove: (ev) => {
              this.lastVelocityY = ev.velocityY;
            },
            onEnd: () => {
              const hadStarted = this.didStart;
              this.pointerDown = false;
              this.didStart = false;
              if (this.needsCompletion) {
                this.resetNativeRefresher(
                  this.elementToTransform,
                  32
                  /* RefresherState.Completing */
                );
                this.needsCompletion = false;
              } else if (this.didRefresh) {
                readTask(() => translateElement(this.elementToTransform, `${this.el.clientHeight}px`));
              } else if (hadStarted) {
                this.ionPullEnd.emit({ reason: "cancel" });
              }
            }
          });
          this.disabledChanged();
        });
      }
      setupMDNativeRefresher(contentEl, pullingSpinner, refreshingSpinner) {
        return __async(this, null, function* () {
          const circle = getElementRoot(pullingSpinner).querySelector("circle");
          const pullingRefresherIcon = this.el.querySelector("ion-refresher-content .refresher-pulling-icon");
          const refreshingCircle = getElementRoot(refreshingSpinner).querySelector("circle");
          if (circle !== null && refreshingCircle !== null) {
            writeTask(() => {
              circle.style.setProperty("animation", "none");
              refreshingSpinner.style.setProperty("animation-delay", "-655ms");
              refreshingCircle.style.setProperty("animation-delay", "-655ms");
            });
          }
          const { createGesture } = yield import("./chunk-YHTSP4B3.js");
          if (!this.scrollEl) {
            return;
          }
          this.gesture = createGesture({
            el: this.scrollEl,
            gestureName: "refresher",
            gesturePriority: 31,
            direction: "y",
            threshold: 5,
            canStart: () => this.state !== 8 && this.state !== 32 && this.scrollEl.scrollTop === 0,
            onStart: (ev) => {
              this.progress = 0;
              ev.data = { animation: void 0, didStart: false, cancelled: false };
            },
            onMove: (ev) => {
              if (ev.velocityY < 0 && this.progress === 0 && !ev.data.didStart || ev.data.cancelled) {
                ev.data.cancelled = true;
                return;
              }
              if (!ev.data.didStart) {
                ev.data.didStart = true;
                this.state = 2;
                const { scrollEl } = this;
                const overflowProperty = scrollEl.matches(ION_CONTENT_CLASS_SELECTOR) ? "overflow" : "--overflow";
                writeTask(() => scrollEl.style.setProperty(overflowProperty, "hidden"));
                const animationType = getRefresherAnimationType(contentEl);
                const animation = createPullingAnimation(animationType, pullingRefresherIcon, this.el);
                ev.data.animation = animation;
                animation.progressStart(false, 0);
                this.ionStart.emit();
                this.ionPullStart.emit();
                this.animations.push(animation);
                return;
              }
              this.progress = clamp(0, ev.deltaY / 180 * 0.5, 1);
              ev.data.animation.progressStep(this.progress);
              this.ionPull.emit();
            },
            onEnd: (ev) => {
              if (!ev.data.didStart) {
                return;
              }
              this.gesture.enable(false);
              const { scrollEl } = this;
              const overflowProperty = scrollEl.matches(ION_CONTENT_CLASS_SELECTOR) ? "overflow" : "--overflow";
              writeTask(() => scrollEl.style.removeProperty(overflowProperty));
              if (this.progress <= 0.4) {
                ev.data.animation.progressEnd(0, this.progress, 500).onFinish(() => {
                  this.animations.forEach((ani) => ani.destroy());
                  this.animations = [];
                  this.gesture.enable(true);
                  this.state = 1;
                  this.ionPullEnd.emit({ reason: "cancel" });
                });
                return;
              }
              const progress = getTimeGivenProgression([0, 0], [0, 0], [1, 1], [1, 1], this.progress)[0];
              const snapBackAnimation = createSnapBackAnimation(pullingRefresherIcon);
              this.animations.push(snapBackAnimation);
              writeTask(() => __async(this, null, function* () {
                pullingRefresherIcon.style.setProperty("--ion-pulling-refresher-translate", `${progress * 100}px`);
                ev.data.animation.progressEnd();
                yield snapBackAnimation.play();
                this.beginRefresh();
                ev.data.animation.destroy();
                this.gesture.enable(true);
              }));
            }
          });
          this.disabledChanged();
        });
      }
      setupNativeRefresher(contentEl) {
        return __async(this, null, function* () {
          if (this.scrollListenerCallback || !contentEl || this.nativeRefresher || !this.scrollEl) {
            return;
          }
          this.setCss(0, "", false, "");
          this.nativeRefresher = true;
          const pullingSpinner = this.el.querySelector("ion-refresher-content .refresher-pulling ion-spinner");
          const refreshingSpinner = this.el.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");
          if (getIonMode(this) === "ios") {
            this.setupiOSNativeRefresher(pullingSpinner, refreshingSpinner);
          } else {
            this.setupMDNativeRefresher(contentEl, pullingSpinner, refreshingSpinner);
          }
        });
      }
      componentDidUpdate() {
        this.checkNativeRefresher();
      }
      /**
       * Validate the slot attribute before rendering, while the host still reflects the
       * developer's original markup. `connectedCallback` is too early: in the custom
       * elements build it runs during insertion, before frameworks such as React assign
       * the slot.
       */
      componentWillLoad() {
        if (this.el.getAttribute("slot") !== "fixed") {
          printIonError('[ion-refresher] - Make sure you use: <ion-refresher slot="fixed">');
        }
      }
      connectedCallback() {
        return __async(this, null, function* () {
          const contentEl = this.el.closest(ION_CONTENT_ELEMENT_SELECTOR);
          if (!contentEl) {
            printIonContentErrorMsg(this.el);
            return;
          }
          componentOnReady(contentEl, () => __async(this, null, function* () {
            const customScrollTarget = findRefresherScrollHost(contentEl);
            this.scrollEl = yield getScrollElement(customScrollTarget ?? contentEl);
            this.backgroundContentEl = yield contentEl.getBackgroundElement();
            this.contentFullscreen = contentEl.fullscreen;
            if (yield shouldUseNativeRefresher(this.el, getIonMode(this))) {
              this.setupNativeRefresher(contentEl);
            } else {
              const { createGesture } = yield import("./chunk-YHTSP4B3.js");
              if (!contentEl.isConnected) {
                return;
              }
              this.gesture = createGesture({
                el: contentEl,
                gestureName: "refresher",
                gesturePriority: 31,
                direction: "y",
                threshold: 20,
                passive: false,
                canStart: () => this.canStart(),
                onStart: () => this.onStart(),
                onMove: (ev) => this.onMove(ev),
                onEnd: () => this.onEnd()
              });
              this.disabledChanged();
            }
          }));
        });
      }
      disconnectedCallback() {
        this.destroyNativeRefresher();
        this.scrollEl = void 0;
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = void 0;
        }
      }
      /**
       * Call `complete()` when your async operation has completed.
       * For example, the `refreshing` state is while the app is performing
       * an asynchronous operation, such as receiving more data from an
       * AJAX request. Once the data has been received, you then call this
       * method to signify that the refreshing has completed and to close
       * the refresher. This method also changes the refresher's state from
       * `refreshing` to `completing`.
       */
      complete() {
        return __async(this, null, function* () {
          if (this.nativeRefresher) {
            this.needsCompletion = true;
            if (!this.pointerDown) {
              raf(() => raf(() => this.resetNativeRefresher(
                this.elementToTransform,
                32
                /* RefresherState.Completing */
              )));
            }
          } else {
            this.close(32, "120ms");
          }
        });
      }
      /**
       * Changes the refresher's state from `refreshing` to `cancelling`.
       */
      cancel() {
        return __async(this, null, function* () {
          if (this.nativeRefresher) {
            if (!this.pointerDown) {
              raf(() => raf(() => this.resetNativeRefresher(
                this.elementToTransform,
                16
                /* RefresherState.Cancelling */
              )));
            }
          } else {
            this.close(16, "");
          }
        });
      }
      /**
       * A number representing how far down the user has pulled.
       * The number `0` represents the user hasn't pulled down at all. The
       * number `1`, and anything greater than `1`, represents that the user
       * has pulled far enough down that when they let go then the refresh will
       * happen. If they let go and the number is less than `1`, then the
       * refresh will not happen, and the content will return to it's original
       * position.
       */
      getProgress() {
        return Promise.resolve(this.progress);
      }
      canStart() {
        if (!this.scrollEl) {
          return false;
        }
        if (this.state !== 1) {
          return false;
        }
        if (this.scrollEl.scrollTop > 0) {
          return false;
        }
        return true;
      }
      onStart() {
        this.progress = 0;
        this.state = 1;
        this.memoizeOverflowStyle();
        if (this.contentFullscreen && this.backgroundContentEl) {
          this.backgroundContentEl.style.setProperty("--offset-top", "0px");
        }
      }
      onMove(detail) {
        if (!this.scrollEl) {
          return;
        }
        const ev = detail.event;
        if (ev.touches !== void 0 && ev.touches.length > 1) {
          return;
        }
        if ((this.state & 56) !== 0) {
          return;
        }
        const pullFactor = Number.isNaN(this.pullFactor) || this.pullFactor < 0 ? 1 : this.pullFactor;
        const deltaY = detail.deltaY * pullFactor;
        if (deltaY <= 0) {
          this.progress = 0;
          this.state = 1;
          if (this.appliedStyles) {
            this.setCss(0, "", false, "");
            return;
          }
          return;
        }
        if (this.state === 1) {
          const scrollHostScrollTop = this.scrollEl.scrollTop;
          if (scrollHostScrollTop > 0) {
            this.progress = 0;
            return;
          }
          this.state = 2;
        }
        if (ev.cancelable) {
          ev.preventDefault();
        }
        this.setCss(deltaY, "0ms", true, "");
        if (deltaY === 0) {
          this.progress = 0;
          return;
        }
        const pullMin = this.pullMin;
        this.progress = deltaY / pullMin;
        if (!this.didStart) {
          this.didStart = true;
          this.ionStart.emit();
          this.ionPullStart.emit();
        }
        this.ionPull.emit();
        if (deltaY < pullMin) {
          this.state = 2;
          return;
        }
        if (deltaY > this.pullMax) {
          this.beginRefresh();
          return;
        }
        this.state = 4;
        return;
      }
      onEnd() {
        if (this.state === 4) {
          this.beginRefresh();
        } else if (this.state === 2) {
          this.cancel();
        } else if (this.state === 1) {
          this.restoreOverflowStyle();
          if (this.didStart) {
            this.didStart = false;
            this.ionPullEnd.emit({ reason: "cancel" });
          }
        }
      }
      beginRefresh() {
        this.state = 8;
        this.setCss(this.pullMin, this.snapbackDuration, true, "");
        const activeElement = document.activeElement;
        if (activeElement?.blur !== void 0) {
          activeElement.blur();
        }
        this.ionRefresh.emit({
          complete: this.complete.bind(this)
        });
      }
      close(state, delay) {
        setTimeout(() => {
          this.state = 1;
          this.progress = 0;
          this.didStart = false;
          this.setCss(0, "0ms", false, "", true);
          if (this.contentFullscreen && this.backgroundContentEl) {
            this.backgroundContentEl?.style.removeProperty("--offset-top");
          }
          this.ionPullEnd.emit({
            reason: state === 32 ? "complete" : "cancel"
          });
        }, 600);
        this.state = state;
        this.setCss(0, this.closeDuration, true, delay);
      }
      setCss(y, duration, overflowVisible, delay, shouldRestoreOverflowStyle = false) {
        if (this.nativeRefresher) {
          return;
        }
        this.appliedStyles = y > 0;
        writeTask(() => {
          if (this.scrollEl && this.backgroundContentEl) {
            const scrollStyle = this.scrollEl.style;
            const backgroundStyle = this.backgroundContentEl.style;
            scrollStyle.transform = backgroundStyle.transform = y > 0 ? `translateY(${y}px) translateZ(0px)` : "";
            scrollStyle.transitionDuration = backgroundStyle.transitionDuration = duration;
            scrollStyle.transitionDelay = backgroundStyle.transitionDelay = delay;
            scrollStyle.overflow = overflowVisible ? "hidden" : "";
          }
          if (shouldRestoreOverflowStyle) {
            this.restoreOverflowStyle();
          }
        });
      }
      memoizeOverflowStyle() {
        if (this.scrollEl) {
          const { overflow, overflowX, overflowY } = this.scrollEl.style;
          this.overflowStyles = {
            overflow: overflow ?? "",
            overflowX: overflowX ?? "",
            overflowY: overflowY ?? ""
          };
        }
      }
      restoreOverflowStyle() {
        if (this.overflowStyles !== void 0 && this.scrollEl !== void 0) {
          const { overflow, overflowX, overflowY } = this.overflowStyles;
          this.scrollEl.style.overflow = overflow;
          this.scrollEl.style.overflowX = overflowX;
          this.scrollEl.style.overflowY = overflowY;
          this.overflowStyles = void 0;
        }
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "fd9c8e51155d56f12148e8eb547e45c05807b4b5", slot: "fixed", class: {
          [mode]: true,
          // Used internally for styling
          [`refresher-${mode}`]: true,
          "refresher-native": this.nativeRefresher,
          "refresher-active": this.state !== 1,
          "refresher-pulling": this.state === 2,
          "refresher-ready": this.state === 4,
          "refresher-refreshing": this.state === 8,
          "refresher-cancelling": this.state === 16,
          "refresher-completing": this.state === 32
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
    Refresher.style = {
      ios: refresherIosCss(),
      md: refresherMdCss()
    };
    RefresherContent = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.customHTMLEnabled = config.get("innerHTMLTemplatesEnabled", ENABLE_HTML_CONTENT_DEFAULT);
      }
      componentWillLoad() {
        if (this.pullingIcon === void 0) {
          const hasRubberBandScrolling = supportsRubberBandScrolling();
          const mode = getIonMode(this);
          const overflowRefresher = hasRubberBandScrolling ? "lines" : arrowDown;
          this.pullingIcon = config.get("refreshingIcon", mode === "ios" && hasRubberBandScrolling ? config.get("spinner", overflowRefresher) : "circular");
        }
        if (this.refreshingSpinner === void 0) {
          const mode = getIonMode(this);
          this.refreshingSpinner = config.get("refreshingSpinner", config.get("spinner", mode === "ios" ? "lines" : "circular"));
        }
      }
      renderPullingText() {
        const { customHTMLEnabled, pullingText } = this;
        if (customHTMLEnabled) {
          return h("div", { class: "refresher-pulling-text", innerHTML: sanitizeDOMString(pullingText) });
        }
        return h("div", { class: "refresher-pulling-text" }, pullingText);
      }
      renderRefreshingText() {
        const { customHTMLEnabled, refreshingText } = this;
        if (customHTMLEnabled) {
          return h("div", { class: "refresher-refreshing-text", innerHTML: sanitizeDOMString(refreshingText) });
        }
        return h("div", { class: "refresher-refreshing-text" }, refreshingText);
      }
      render() {
        const pullingIcon = this.pullingIcon;
        const hasSpinner = pullingIcon != null && SPINNERS[pullingIcon] !== void 0;
        const mode = getIonMode(this);
        return h(Host, { key: "a1546008813bbcfa70f97e9b9025846ee0aed722", class: mode }, h("div", { key: "5422771d67fe201e22d4f9d7db6b685f3db5d99d", class: "refresher-pulling" }, this.pullingIcon && hasSpinner && h("div", { key: "5c2b6dfc3f01b42586ea83380548d454b220a7ca", class: "refresher-pulling-icon" }, h("div", { key: "2c3799ca3f66960d7081c63c5a0840951f694baf", class: "spinner-arrow-container" }, h("ion-spinner", { key: "03f766a9b9354dcb8f6975757a9b882c2eb5cf4a", name: this.pullingIcon, paused: true }), mode === "md" && this.pullingIcon === "circular" && h("div", { key: "e5f4ba7c6a70adb71f8985af0e23aca07d7b005a", class: "arrow-container" }, h("ion-icon", { key: "ddccbd9164ae8daa97178fc53b52f74f1fd298ef", icon: caretBackSharp, "aria-hidden": "true" })))), this.pullingIcon && !hasSpinner && h("div", { key: "6fb742f47f9149fa6dc3daefe5aaa77f925da4bd", class: "refresher-pulling-icon" }, h("ion-icon", { key: "907657135eeac4c394be1eae4a659664a7bfacb0", icon: this.pullingIcon, lazy: false, "aria-hidden": "true" })), this.pullingText !== void 0 && this.renderPullingText()), h("div", { key: "fb3094b3ed7e100ab9641c3221770889088e27f3", class: "refresher-refreshing" }, this.refreshingSpinner && h("div", { key: "bc8078f94e7cea3cb6f03a09e98540f0e0b38721", class: "refresher-refreshing-icon" }, h("ion-spinner", { key: "8f39524f073aa828e941bcdd4d48e4d5dfc759c6", name: this.refreshingSpinner })), this.refreshingText !== void 0 && this.renderRefreshingText()));
      }
      get el() {
        return getElement(this);
      }
    };
  }
});
init_ion_refresher_2_entry();
export {
  Refresher as ion_refresher,
  RefresherContent as ion_refresher_content
};
//# debugId=d8dfead9-1718-544b-a132-cc1b5c5a1713
//# sourceMappingURL=chunk-IL2TKO72.js.map
