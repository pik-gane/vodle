import {
  init_helpers_BJqKF1pr,
  win
} from "./chunk-LEFG5EZ6.js";
import {
  init_index_BpRUsN_W,
  printIonError
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/animation-DmtJpz89.js
var animationPrefix, getAnimationPrefix, setStyleProperty, addClassToArray, createAnimation;
var init_animation_DmtJpz89 = __esm({
  "node_modules/@ionic/core/dist/esm/animation-DmtJpz89.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getAnimationPrefix = (el) => {
      if (animationPrefix === void 0) {
        const supportsUnprefixed = el.style.animationName !== void 0;
        const supportsWebkitPrefix = el.style.webkitAnimationName !== void 0;
        animationPrefix = !supportsUnprefixed && supportsWebkitPrefix ? "-webkit-" : "";
      }
      return animationPrefix;
    };
    setStyleProperty = (element, propertyName, value) => {
      const prefix = propertyName.startsWith("animation") ? getAnimationPrefix(element) : "";
      element.style.setProperty(prefix + propertyName, value);
    };
    addClassToArray = (classes = [], className) => {
      if (className !== void 0) {
        const classNameToAppend = Array.isArray(className) ? className : [className];
        return [...classes, ...classNameToAppend];
      }
      return classes;
    };
    createAnimation = (animationId) => {
      let _delay;
      let _duration;
      let _easing;
      let _iterations;
      let _fill;
      let _direction;
      let _keyframes = [];
      let beforeAddClasses = [];
      let beforeRemoveClasses = [];
      let initialized = false;
      let parentAnimation;
      let beforeStylesValue = {};
      let afterAddClasses = [];
      let afterRemoveClasses = [];
      let afterStylesValue = {};
      let numAnimationsRunning = 0;
      let shouldForceLinearEasing = false;
      let shouldForceSyncPlayback = false;
      let forceDirectionValue;
      let forceDurationValue;
      let forceDelayValue;
      let willComplete = true;
      let finished = false;
      let shouldCalculateNumAnimations = true;
      let ani;
      let paused = false;
      const id = animationId;
      const onFinishCallbacks = [];
      const onFinishOneTimeCallbacks = [];
      const onStopOneTimeCallbacks = [];
      const elements = [];
      const childAnimations = [];
      const stylesheets = [];
      const _beforeAddReadFunctions = [];
      const _beforeAddWriteFunctions = [];
      const _afterAddReadFunctions = [];
      const _afterAddWriteFunctions = [];
      const webAnimations = [];
      const supportsAnimationEffect = typeof AnimationEffect === "function" || win !== void 0 && typeof win.AnimationEffect === "function";
      const supportsWebAnimations = typeof Element === "function" && typeof Element.prototype.animate === "function" && supportsAnimationEffect;
      const getWebAnimations = () => {
        return webAnimations;
      };
      const destroy = (clearStyleSheets) => {
        childAnimations.forEach((childAnimation) => {
          childAnimation.destroy(clearStyleSheets);
        });
        cleanUp(clearStyleSheets);
        elements.length = 0;
        childAnimations.length = 0;
        _keyframes.length = 0;
        clearOnFinish();
        initialized = false;
        shouldCalculateNumAnimations = true;
        return ani;
      };
      const cleanUp = (clearStyleSheets) => {
        cleanUpElements();
        if (clearStyleSheets) {
          cleanUpStyleSheets();
        }
      };
      const resetFlags = () => {
        shouldForceLinearEasing = false;
        shouldForceSyncPlayback = false;
        shouldCalculateNumAnimations = true;
        forceDirectionValue = void 0;
        forceDurationValue = void 0;
        forceDelayValue = void 0;
        numAnimationsRunning = 0;
        finished = false;
        willComplete = true;
        paused = false;
      };
      const isRunning = () => {
        return numAnimationsRunning !== 0 && !paused;
      };
      const clearCallback = (callbackToRemove, callbackObjects) => {
        const index = callbackObjects.findIndex((callbackObject) => callbackObject.c === callbackToRemove);
        if (index > -1) {
          callbackObjects.splice(index, 1);
        }
      };
      const onStop = (callback, opts) => {
        onStopOneTimeCallbacks.push({ c: callback, o: opts });
        return ani;
      };
      const onFinish = (callback, opts) => {
        const callbacks = opts?.oneTimeCallback ? onFinishOneTimeCallbacks : onFinishCallbacks;
        callbacks.push({ c: callback, o: opts });
        return ani;
      };
      const clearOnFinish = () => {
        onFinishCallbacks.length = 0;
        onFinishOneTimeCallbacks.length = 0;
        return ani;
      };
      const cleanUpElements = () => {
        if (supportsWebAnimations) {
          webAnimations.forEach((animation) => {
            animation.cancel();
          });
          webAnimations.length = 0;
        }
      };
      const cleanUpStyleSheets = () => {
        stylesheets.forEach((stylesheet) => {
          if (stylesheet?.parentNode) {
            stylesheet.parentNode.removeChild(stylesheet);
          }
        });
        stylesheets.length = 0;
      };
      const beforeAddRead = (readFn) => {
        _beforeAddReadFunctions.push(readFn);
        return ani;
      };
      const beforeAddWrite = (writeFn) => {
        _beforeAddWriteFunctions.push(writeFn);
        return ani;
      };
      const afterAddRead = (readFn) => {
        _afterAddReadFunctions.push(readFn);
        return ani;
      };
      const afterAddWrite = (writeFn) => {
        _afterAddWriteFunctions.push(writeFn);
        return ani;
      };
      const beforeAddClass = (className) => {
        beforeAddClasses = addClassToArray(beforeAddClasses, className);
        return ani;
      };
      const beforeRemoveClass = (className) => {
        beforeRemoveClasses = addClassToArray(beforeRemoveClasses, className);
        return ani;
      };
      const beforeStyles = (styles = {}) => {
        beforeStylesValue = styles;
        return ani;
      };
      const beforeClearStyles = (propertyNames = []) => {
        for (const property of propertyNames) {
          beforeStylesValue[property] = "";
        }
        return ani;
      };
      const afterAddClass = (className) => {
        afterAddClasses = addClassToArray(afterAddClasses, className);
        return ani;
      };
      const afterRemoveClass = (className) => {
        afterRemoveClasses = addClassToArray(afterRemoveClasses, className);
        return ani;
      };
      const afterStyles = (styles = {}) => {
        afterStylesValue = styles;
        return ani;
      };
      const afterClearStyles = (propertyNames = []) => {
        for (const property of propertyNames) {
          afterStylesValue[property] = "";
        }
        return ani;
      };
      const getFill = () => {
        if (_fill !== void 0) {
          return _fill;
        }
        if (parentAnimation) {
          return parentAnimation.getFill();
        }
        return "both";
      };
      const getDirection = () => {
        if (forceDirectionValue !== void 0) {
          return forceDirectionValue;
        }
        if (_direction !== void 0) {
          return _direction;
        }
        if (parentAnimation) {
          return parentAnimation.getDirection();
        }
        return "normal";
      };
      const getEasing = () => {
        if (shouldForceLinearEasing) {
          return "linear";
        }
        if (_easing !== void 0) {
          return _easing;
        }
        if (parentAnimation) {
          return parentAnimation.getEasing();
        }
        return "linear";
      };
      const getDuration = () => {
        if (shouldForceSyncPlayback) {
          return 0;
        }
        if (forceDurationValue !== void 0) {
          return forceDurationValue;
        }
        if (_duration !== void 0) {
          return _duration;
        }
        if (parentAnimation) {
          return parentAnimation.getDuration();
        }
        return 0;
      };
      const getIterations = () => {
        if (_iterations !== void 0) {
          return _iterations;
        }
        if (parentAnimation) {
          return parentAnimation.getIterations();
        }
        return 1;
      };
      const getDelay = () => {
        if (forceDelayValue !== void 0) {
          return forceDelayValue;
        }
        if (_delay !== void 0) {
          return _delay;
        }
        if (parentAnimation) {
          return parentAnimation.getDelay();
        }
        return 0;
      };
      const getKeyframes = () => {
        return _keyframes;
      };
      const direction = (animationDirection) => {
        _direction = animationDirection;
        update(true);
        return ani;
      };
      const fill = (animationFill) => {
        _fill = animationFill;
        update(true);
        return ani;
      };
      const delay = (animationDelay) => {
        _delay = animationDelay;
        update(true);
        return ani;
      };
      const easing = (animationEasing) => {
        _easing = animationEasing;
        update(true);
        return ani;
      };
      const duration = (animationDuration) => {
        if (!supportsWebAnimations && animationDuration === 0) {
          animationDuration = 1;
        }
        _duration = animationDuration;
        update(true);
        return ani;
      };
      const iterations = (animationIterations) => {
        _iterations = animationIterations;
        update(true);
        return ani;
      };
      const parent = (animation) => {
        parentAnimation = animation;
        return ani;
      };
      const addElement = (el) => {
        if (el != null) {
          if (el.nodeType === 1) {
            elements.push(el);
          } else if (el.length >= 0) {
            for (let i = 0; i < el.length; i++) {
              elements.push(el[i]);
            }
          } else {
            printIonError("createAnimation - Invalid addElement value.");
          }
        }
        return ani;
      };
      const addAnimation = (animationToAdd) => {
        if (animationToAdd != null) {
          if (Array.isArray(animationToAdd)) {
            for (const animation of animationToAdd) {
              animation.parent(ani);
              childAnimations.push(animation);
            }
          } else {
            animationToAdd.parent(ani);
            childAnimations.push(animationToAdd);
          }
        }
        return ani;
      };
      const keyframes = (keyframeValues) => {
        const different = _keyframes !== keyframeValues;
        _keyframes = keyframeValues;
        if (different) {
          updateKeyframes(_keyframes);
        }
        return ani;
      };
      const updateKeyframes = (keyframeValues) => {
        if (supportsWebAnimations) {
          getWebAnimations().forEach((animation) => {
            const keyframeEffect = animation.effect;
            if (keyframeEffect.setKeyframes) {
              keyframeEffect.setKeyframes(keyframeValues);
            } else {
              const newEffect = new KeyframeEffect(keyframeEffect.target, keyframeValues, keyframeEffect.getTiming());
              animation.effect = newEffect;
            }
          });
        }
      };
      const beforeAnimation = () => {
        _beforeAddReadFunctions.forEach((callback) => callback());
        _beforeAddWriteFunctions.forEach((callback) => callback());
        const addClasses = beforeAddClasses;
        const removeClasses = beforeRemoveClasses;
        const styles = beforeStylesValue;
        elements.forEach((el) => {
          const elementClassList = el.classList;
          addClasses.forEach((c) => elementClassList.add(c));
          removeClasses.forEach((c) => elementClassList.remove(c));
          for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
              setStyleProperty(el, property, styles[property]);
            }
          }
        });
      };
      const afterAnimation = () => {
        _afterAddReadFunctions.forEach((callback) => callback());
        _afterAddWriteFunctions.forEach((callback) => callback());
        const currentStep = willComplete ? 1 : 0;
        const addClasses = afterAddClasses;
        const removeClasses = afterRemoveClasses;
        const styles = afterStylesValue;
        elements.forEach((el) => {
          const elementClassList = el.classList;
          addClasses.forEach((c) => elementClassList.add(c));
          removeClasses.forEach((c) => elementClassList.remove(c));
          for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
              setStyleProperty(el, property, styles[property]);
            }
          }
        });
        forceDurationValue = void 0;
        forceDirectionValue = void 0;
        forceDelayValue = void 0;
        onFinishCallbacks.forEach((onFinishCallback) => {
          return onFinishCallback.c(currentStep, ani);
        });
        onFinishOneTimeCallbacks.forEach((onFinishCallback) => {
          return onFinishCallback.c(currentStep, ani);
        });
        onFinishOneTimeCallbacks.length = 0;
        shouldCalculateNumAnimations = true;
        if (willComplete) {
          finished = true;
        }
        willComplete = true;
      };
      const animationFinish = () => {
        if (numAnimationsRunning === 0) {
          return;
        }
        numAnimationsRunning--;
        if (numAnimationsRunning === 0) {
          afterAnimation();
          if (parentAnimation) {
            parentAnimation.animationFinish();
          }
        }
      };
      const initializeWebAnimation = () => {
        elements.forEach((element) => {
          const animation = element.animate(_keyframes, {
            id,
            delay: getDelay(),
            duration: getDuration(),
            easing: getEasing(),
            iterations: getIterations(),
            fill: getFill(),
            direction: getDirection()
          });
          animation.pause();
          webAnimations.push(animation);
        });
        if (webAnimations.length > 0) {
          webAnimations[0].onfinish = () => {
            animationFinish();
          };
        }
      };
      const initializeAnimation = () => {
        beforeAnimation();
        if (_keyframes.length > 0) {
          if (supportsWebAnimations) {
            initializeWebAnimation();
          }
        }
        initialized = true;
      };
      const setAnimationStep = (step) => {
        step = Math.min(Math.max(step, 0), 0.9999);
        if (supportsWebAnimations) {
          webAnimations.forEach((animation) => {
            animation.currentTime = animation.effect.getComputedTiming().delay + getDuration() * step;
            animation.pause();
          });
        }
      };
      const updateWebAnimation = (step) => {
        webAnimations.forEach((animation) => {
          animation.effect.updateTiming({
            delay: getDelay(),
            duration: getDuration(),
            easing: getEasing(),
            iterations: getIterations(),
            fill: getFill(),
            direction: getDirection()
          });
        });
        if (step !== void 0) {
          setAnimationStep(step);
        }
      };
      const update = (deep = false, toggleAnimationName = true, step) => {
        if (deep) {
          childAnimations.forEach((animation) => {
            animation.update(deep, toggleAnimationName, step);
          });
        }
        if (supportsWebAnimations) {
          updateWebAnimation(step);
        }
        return ani;
      };
      const progressStart = (forceLinearEasing = false, step) => {
        childAnimations.forEach((animation) => {
          animation.progressStart(forceLinearEasing, step);
        });
        pauseAnimation();
        shouldForceLinearEasing = forceLinearEasing;
        if (!initialized) {
          initializeAnimation();
        }
        update(false, true, step);
        return ani;
      };
      const progressStep = (step) => {
        childAnimations.forEach((animation) => {
          animation.progressStep(step);
        });
        setAnimationStep(step);
        return ani;
      };
      const progressEnd = (playTo, step, dur) => {
        shouldForceLinearEasing = false;
        childAnimations.forEach((animation) => {
          animation.progressEnd(playTo, step, dur);
        });
        if (dur !== void 0) {
          forceDurationValue = dur;
        }
        finished = false;
        willComplete = true;
        if (playTo === 0) {
          forceDirectionValue = getDirection() === "reverse" ? "normal" : "reverse";
          if (forceDirectionValue === "reverse") {
            willComplete = false;
          }
          if (supportsWebAnimations) {
            update();
            setAnimationStep(1 - step);
          } else {
            forceDelayValue = (1 - step) * getDuration() * -1;
            update(false, false);
          }
        } else if (playTo === 1) {
          if (supportsWebAnimations) {
            update();
            setAnimationStep(step);
          } else {
            forceDelayValue = step * getDuration() * -1;
            update(false, false);
          }
        }
        if (playTo !== void 0 && !parentAnimation) {
          play();
        }
        return ani;
      };
      const pauseAnimation = () => {
        if (initialized) {
          if (supportsWebAnimations) {
            webAnimations.forEach((animation) => {
              animation.pause();
            });
          } else {
            elements.forEach((element) => {
              setStyleProperty(element, "animation-play-state", "paused");
            });
          }
          paused = true;
        }
      };
      const pause = () => {
        childAnimations.forEach((animation) => {
          animation.pause();
        });
        pauseAnimation();
        return ani;
      };
      const playCSSAnimations = () => {
        animationFinish();
      };
      const playWebAnimations = () => {
        webAnimations.forEach((animation) => {
          animation.play();
        });
        if (_keyframes.length === 0 || elements.length === 0) {
          animationFinish();
        }
      };
      const resetAnimation = () => {
        if (supportsWebAnimations) {
          setAnimationStep(0);
          updateWebAnimation();
        }
      };
      const play = (opts) => {
        return new Promise((resolve) => {
          if (opts?.sync) {
            shouldForceSyncPlayback = true;
            onFinish(() => shouldForceSyncPlayback = false, { oneTimeCallback: true });
          }
          if (!initialized) {
            initializeAnimation();
          }
          if (finished) {
            resetAnimation();
            finished = false;
          }
          if (shouldCalculateNumAnimations) {
            numAnimationsRunning = childAnimations.length + 1;
            shouldCalculateNumAnimations = false;
          }
          const onStopCallback = () => {
            clearCallback(onFinishCallback, onFinishOneTimeCallbacks);
            resolve();
          };
          const onFinishCallback = () => {
            clearCallback(onStopCallback, onStopOneTimeCallbacks);
            resolve();
          };
          onFinish(onFinishCallback, { oneTimeCallback: true });
          onStop(onStopCallback, { oneTimeCallback: true });
          childAnimations.forEach((animation) => {
            animation.play();
          });
          if (supportsWebAnimations) {
            playWebAnimations();
          } else {
            playCSSAnimations();
          }
          paused = false;
        });
      };
      const stop = () => {
        childAnimations.forEach((animation) => {
          animation.stop();
        });
        if (initialized) {
          cleanUpElements();
          initialized = false;
        }
        resetFlags();
        onStopOneTimeCallbacks.forEach((onStopCallback) => onStopCallback.c(0, ani));
        onStopOneTimeCallbacks.length = 0;
      };
      const from = (property, value) => {
        const firstFrame = _keyframes[0];
        if (firstFrame !== void 0 && (firstFrame.offset === void 0 || firstFrame.offset === 0)) {
          firstFrame[property] = value;
        } else {
          _keyframes = [{ offset: 0, [property]: value }, ..._keyframes];
        }
        return ani;
      };
      const to = (property, value) => {
        const lastFrame = _keyframes[_keyframes.length - 1];
        if (lastFrame !== void 0 && (lastFrame.offset === void 0 || lastFrame.offset === 1)) {
          lastFrame[property] = value;
        } else {
          _keyframes = [..._keyframes, { offset: 1, [property]: value }];
        }
        return ani;
      };
      const fromTo = (property, fromValue, toValue) => {
        return from(property, fromValue).to(property, toValue);
      };
      return ani = {
        parentAnimation,
        elements,
        childAnimations,
        id,
        animationFinish,
        from,
        to,
        fromTo,
        parent,
        play,
        pause,
        stop,
        destroy,
        keyframes,
        addAnimation,
        addElement,
        update,
        fill,
        direction,
        iterations,
        duration,
        easing,
        delay,
        getWebAnimations,
        getKeyframes,
        getFill,
        getDirection,
        getDelay,
        getIterations,
        getEasing,
        getDuration,
        afterAddRead,
        afterAddWrite,
        afterClearStyles,
        afterStyles,
        afterRemoveClass,
        afterAddClass,
        beforeAddRead,
        beforeAddWrite,
        beforeClearStyles,
        beforeStyles,
        beforeRemoveClass,
        beforeAddClass,
        onFinish,
        isRunning,
        progressStart,
        progressStep,
        progressEnd
      };
    };
  }
});

export {
  createAnimation,
  init_animation_DmtJpz89
};
//# debugId=7cd792b5-a7f9-5b21-9599-85c7488207d6
//# sourceMappingURL=chunk-UYK5QVEZ.js.map
