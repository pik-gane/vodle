import {
  createGesture,
  init_index_BmLuEdV7
} from "./chunk-OTRSMIBG.js";
import {
  init_gesture_controller_B_gJaBk0
} from "./chunk-LTX35HTQ.js";
import {
  clamp,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde,
  isRTL
} from "./chunk-Z6RQ22J2.js";
import {
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/swipe-back-DV3UpWzz.js
var createSwipeBackGesture;
var init_swipe_back_DV3UpWzz = __esm({
  "node_modules/@ionic/core/dist/esm/swipe-back-DV3UpWzz.js"() {
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    init_index_BmLuEdV7();
    init_index_BpRUsN_W();
    init_gesture_controller_B_gJaBk0();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    createSwipeBackGesture = (el, canStartHandler, onStartHandler, onMoveHandler, onEndHandler) => {
      const win = el.ownerDocument.defaultView;
      let rtl = isRTL(el);
      const isAtEdge = (detail) => {
        const threshold = 50;
        const { startX } = detail;
        if (rtl) {
          return startX >= win.innerWidth - threshold;
        }
        return startX <= threshold;
      };
      const getDeltaX = (detail) => {
        return rtl ? -detail.deltaX : detail.deltaX;
      };
      const getVelocityX = (detail) => {
        return rtl ? -detail.velocityX : detail.velocityX;
      };
      const canStart = (detail) => {
        rtl = isRTL(el);
        return isAtEdge(detail) && canStartHandler();
      };
      const onMove = (detail) => {
        const delta = getDeltaX(detail);
        const stepValue = delta / win.innerWidth;
        onMoveHandler(stepValue);
      };
      const onEnd = (detail) => {
        const delta = getDeltaX(detail);
        const width = win.innerWidth;
        const stepValue = delta / width;
        const velocity = getVelocityX(detail);
        const z = width / 2;
        const shouldComplete = velocity >= 0 && (velocity > 0.2 || delta > z);
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
          const dur = missingDistance / Math.abs(velocity);
          realDur = Math.min(dur, 540);
        }
        onEndHandler(shouldComplete, stepValue <= 0 ? 0.01 : clamp(0, stepValue, 0.9999), realDur);
      };
      return createGesture({
        el,
        gestureName: "goback-swipe",
        /**
         * Swipe to go back should have priority over other horizontal swipe
         * gestures. These gestures have a priority of 100 which is why 101 was chosen here.
         */
        gesturePriority: 101,
        threshold: 10,
        canStart,
        onStart: onStartHandler,
        onMove,
        onEnd
      });
    };
  }
});
init_swipe_back_DV3UpWzz();
export {
  createSwipeBackGesture
};
//# debugId=02f74922-ff9c-509a-b31d-4a39d35c8d7f
//# sourceMappingURL=chunk-4WNFHUJF.js.map
