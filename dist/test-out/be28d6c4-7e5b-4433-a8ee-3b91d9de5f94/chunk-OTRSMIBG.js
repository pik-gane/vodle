import {
  GESTURE_CONTROLLER,
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/index-BmLuEdV7.js
var addEventListener, MOUSE_WAIT, createPointerEvents, getDocument, createPanRecognizer, createGesture, calcGestureData, updateDetail, now;
var init_index_BmLuEdV7 = __esm({
  "node_modules/@ionic/core/dist/esm/index-BmLuEdV7.js"() {
    init_gesture_controller_B_gJaBk0();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    addEventListener = (el, eventName, callback, opts) => {
      const listenerOpts = {
        capture: false,
        passive: !!opts.passive
      };
      let add;
      let remove;
      if (el["__zone_symbol__addEventListener"]) {
        add = "__zone_symbol__addEventListener";
        remove = "__zone_symbol__removeEventListener";
      } else {
        add = "addEventListener";
        remove = "removeEventListener";
      }
      el[add](eventName, callback, listenerOpts);
      return () => {
        el[remove](eventName, callback, listenerOpts);
      };
    };
    MOUSE_WAIT = 2e3;
    createPointerEvents = (el, pointerDown, pointerMove, pointerUp, options) => {
      let rmTouchStart;
      let rmTouchMove;
      let rmTouchEnd;
      let rmTouchCancel;
      let rmMouseStart;
      let rmMouseMove;
      let rmMouseUp;
      let lastTouchEvent = 0;
      const handleTouchStart = (ev) => {
        lastTouchEvent = Date.now() + MOUSE_WAIT;
        if (!pointerDown(ev)) {
          return;
        }
        if (!rmTouchMove && pointerMove) {
          rmTouchMove = addEventListener(el, "touchmove", pointerMove, options);
        }
        if (!rmTouchEnd) {
          rmTouchEnd = addEventListener(ev.target, "touchend", handleTouchEnd, options);
        }
        if (!rmTouchCancel) {
          rmTouchCancel = addEventListener(ev.target, "touchcancel", handleTouchEnd, options);
        }
      };
      const handleMouseDown = (ev) => {
        if (lastTouchEvent > Date.now()) {
          return;
        }
        if (!pointerDown(ev)) {
          return;
        }
        if (!rmMouseMove && pointerMove) {
          rmMouseMove = addEventListener(getDocument(el), "mousemove", pointerMove, options);
        }
        if (!rmMouseUp) {
          rmMouseUp = addEventListener(getDocument(el), "mouseup", handleMouseUp, options);
        }
      };
      const handleTouchEnd = (ev) => {
        stopTouch();
        if (pointerUp) {
          pointerUp(ev);
        }
      };
      const handleMouseUp = (ev) => {
        stopMouse();
        if (pointerUp) {
          pointerUp(ev);
        }
      };
      const stopTouch = () => {
        if (rmTouchMove) {
          rmTouchMove();
        }
        if (rmTouchEnd) {
          rmTouchEnd();
        }
        if (rmTouchCancel) {
          rmTouchCancel();
        }
        rmTouchMove = rmTouchEnd = rmTouchCancel = void 0;
      };
      const stopMouse = () => {
        if (rmMouseMove) {
          rmMouseMove();
        }
        if (rmMouseUp) {
          rmMouseUp();
        }
        rmMouseMove = rmMouseUp = void 0;
      };
      const stop = () => {
        stopTouch();
        stopMouse();
      };
      const enable = (isEnabled = true) => {
        if (!isEnabled) {
          if (rmTouchStart) {
            rmTouchStart();
          }
          if (rmMouseStart) {
            rmMouseStart();
          }
          rmTouchStart = rmMouseStart = void 0;
          stop();
        } else {
          if (!rmTouchStart) {
            rmTouchStart = addEventListener(el, "touchstart", handleTouchStart, options);
          }
          if (!rmMouseStart) {
            rmMouseStart = addEventListener(el, "mousedown", handleMouseDown, options);
          }
        }
      };
      const destroy = () => {
        enable(false);
        pointerUp = pointerMove = pointerDown = void 0;
      };
      return {
        enable,
        stop,
        destroy
      };
    };
    getDocument = (node) => {
      return node instanceof Document ? node : node.ownerDocument;
    };
    createPanRecognizer = (direction, thresh, maxAngle) => {
      const radians = maxAngle * (Math.PI / 180);
      const isDirX = direction === "x";
      const maxCosine = Math.cos(radians);
      const threshold = thresh * thresh;
      let startX = 0;
      let startY = 0;
      let dirty = false;
      let isPan = 0;
      return {
        start(x, y) {
          startX = x;
          startY = y;
          isPan = 0;
          dirty = true;
        },
        detect(x, y) {
          if (!dirty) {
            return false;
          }
          const deltaX = x - startX;
          const deltaY = y - startY;
          const distance = deltaX * deltaX + deltaY * deltaY;
          if (distance < threshold) {
            return false;
          }
          const hypotenuse = Math.sqrt(distance);
          const cosine = (isDirX ? deltaX : deltaY) / hypotenuse;
          if (cosine > maxCosine) {
            isPan = 1;
          } else if (cosine < -maxCosine) {
            isPan = -1;
          } else {
            isPan = 0;
          }
          dirty = false;
          return true;
        },
        isGesture() {
          return isPan !== 0;
        },
        getDirection() {
          return isPan;
        }
      };
    };
    createGesture = (config) => {
      let hasCapturedPan = false;
      let hasStartedPan = false;
      let hasFiredStart = true;
      let isMoveQueued = false;
      const finalConfig = __spreadValues({
        direction: "x",
        passive: true,
        maxAngle: 40,
        threshold: 10
      }, config);
      const canStart = finalConfig.canStart;
      const onWillStart = finalConfig.onWillStart;
      const onStart = finalConfig.onStart;
      const onEnd = finalConfig.onEnd;
      const notCaptured = finalConfig.notCaptured;
      const onMove = finalConfig.onMove;
      const threshold = finalConfig.threshold;
      const passive = finalConfig.passive;
      const blurOnStart = finalConfig.blurOnStart;
      const detail = {
        type: "pan",
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
        event: void 0,
        data: void 0
      };
      const pan = createPanRecognizer(finalConfig.direction, finalConfig.threshold, finalConfig.maxAngle);
      const gesture = GESTURE_CONTROLLER.createGesture({
        name: config.gestureName,
        priority: config.gesturePriority,
        disableScroll: config.disableScroll
      });
      const pointerDown = (ev) => {
        const timeStamp = now(ev);
        if (hasStartedPan || !hasFiredStart) {
          return false;
        }
        updateDetail(ev, detail);
        detail.startX = detail.currentX;
        detail.startY = detail.currentY;
        detail.startTime = detail.currentTime = timeStamp;
        detail.velocityX = detail.velocityY = detail.deltaX = detail.deltaY = 0;
        detail.event = ev;
        if (canStart && canStart(detail) === false) {
          return false;
        }
        gesture.release();
        if (!gesture.start()) {
          return false;
        }
        hasStartedPan = true;
        if (threshold === 0) {
          return tryToCapturePan();
        }
        pan.start(detail.startX, detail.startY);
        return true;
      };
      const pointerMove = (ev) => {
        if (hasCapturedPan) {
          if (!isMoveQueued && hasFiredStart) {
            isMoveQueued = true;
            calcGestureData(detail, ev);
            requestAnimationFrame(fireOnMove);
          }
          return;
        }
        calcGestureData(detail, ev);
        if (pan.detect(detail.currentX, detail.currentY)) {
          if (!pan.isGesture() || !tryToCapturePan()) {
            abortGesture();
          }
        }
      };
      const fireOnMove = () => {
        if (!hasCapturedPan) {
          return;
        }
        isMoveQueued = false;
        if (onMove) {
          onMove(detail);
        }
      };
      const tryToCapturePan = () => {
        if (!gesture.capture()) {
          return false;
        }
        hasCapturedPan = true;
        hasFiredStart = false;
        detail.startX = detail.currentX;
        detail.startY = detail.currentY;
        detail.startTime = detail.currentTime;
        if (onWillStart) {
          onWillStart(detail).then(fireOnStart);
        } else {
          fireOnStart();
        }
        return true;
      };
      const blurActiveElement = () => {
        if (typeof document !== "undefined") {
          const activeElement = document.activeElement;
          if (activeElement?.blur) {
            activeElement.blur();
          }
        }
      };
      const fireOnStart = () => {
        if (blurOnStart) {
          blurActiveElement();
        }
        if (onStart) {
          onStart(detail);
        }
        hasFiredStart = true;
      };
      const reset = () => {
        hasCapturedPan = false;
        hasStartedPan = false;
        isMoveQueued = false;
        hasFiredStart = true;
        gesture.release();
      };
      const pointerUp = (ev) => {
        const tmpHasCaptured = hasCapturedPan;
        const tmpHasFiredStart = hasFiredStart;
        reset();
        if (!tmpHasFiredStart) {
          return;
        }
        calcGestureData(detail, ev);
        if (tmpHasCaptured) {
          if (onEnd) {
            onEnd(detail);
          }
          return;
        }
        if (notCaptured) {
          notCaptured(detail);
        }
      };
      const pointerEvents = createPointerEvents(finalConfig.el, pointerDown, pointerMove, pointerUp, {
        passive
      });
      const abortGesture = () => {
        reset();
        pointerEvents.stop();
        if (notCaptured) {
          notCaptured(detail);
        }
      };
      return {
        enable(enable = true) {
          if (!enable) {
            if (hasCapturedPan) {
              pointerUp(void 0);
            }
            reset();
          }
          pointerEvents.enable(enable);
        },
        destroy() {
          gesture.destroy();
          pointerEvents.destroy();
        }
      };
    };
    calcGestureData = (detail, ev) => {
      if (!ev) {
        return;
      }
      const prevX = detail.currentX;
      const prevY = detail.currentY;
      const prevT = detail.currentTime;
      updateDetail(ev, detail);
      const currentX = detail.currentX;
      const currentY = detail.currentY;
      const timestamp = detail.currentTime = now(ev);
      const timeDelta = timestamp - prevT;
      if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
      }
      detail.deltaX = currentX - detail.startX;
      detail.deltaY = currentY - detail.startY;
      detail.event = ev;
    };
    updateDetail = (ev, detail) => {
      let x = 0;
      let y = 0;
      if (ev) {
        const changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
          const touch = changedTouches[0];
          x = touch.clientX;
          y = touch.clientY;
        } else if (ev.pageX !== void 0) {
          x = ev.pageX;
          y = ev.pageY;
        }
      }
      detail.currentX = x;
      detail.currentY = y;
    };
    now = (ev) => {
      return ev.timeStamp || Date.now();
    };
  }
});

export {
  createGesture,
  init_index_BmLuEdV7
};
//# debugId=39319f13-b29d-5221-8896-c7d8b220508e
//# sourceMappingURL=chunk-OTRSMIBG.js.map
