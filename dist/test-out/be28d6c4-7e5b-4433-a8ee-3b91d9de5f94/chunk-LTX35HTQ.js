import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/gesture-controller-B_gJaBk0.js
var GestureController, GestureDelegate, BlockerDelegate, BACKDROP_NO_SCROLL, GESTURE_CONTROLLER;
var init_gesture_controller_B_gJaBk0 = __esm({
  "node_modules/@ionic/core/dist/esm/gesture-controller-B_gJaBk0.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    GestureController = class {
      constructor() {
        this.gestureId = 0;
        this.requestedStart = /* @__PURE__ */ new Map();
        this.disabledGestures = /* @__PURE__ */ new Map();
        this.disabledScroll = /* @__PURE__ */ new Set();
      }
      /**
       * Creates a gesture delegate based on the GestureConfig passed
       */
      createGesture(config) {
        return new GestureDelegate(this, this.newID(), config.name, config.priority ?? 0, !!config.disableScroll);
      }
      /**
       * Creates a blocker that will block any other gesture events from firing. Set in the ion-gesture component.
       */
      createBlocker(opts = {}) {
        return new BlockerDelegate(this, this.newID(), opts.disable, !!opts.disableScroll);
      }
      start(gestureName, id, priority) {
        if (!this.canStart(gestureName)) {
          this.requestedStart.delete(id);
          return false;
        }
        this.requestedStart.set(id, priority);
        return true;
      }
      capture(gestureName, id, priority) {
        if (!this.start(gestureName, id, priority)) {
          return false;
        }
        const requestedStart = this.requestedStart;
        let maxPriority = -1e4;
        requestedStart.forEach((value) => {
          maxPriority = Math.max(maxPriority, value);
        });
        if (maxPriority === priority) {
          this.capturedId = id;
          requestedStart.clear();
          const event = new CustomEvent("ionGestureCaptured", { detail: { gestureName } });
          document.dispatchEvent(event);
          return true;
        }
        requestedStart.delete(id);
        return false;
      }
      release(id) {
        this.requestedStart.delete(id);
        if (this.capturedId === id) {
          this.capturedId = void 0;
        }
      }
      disableGesture(gestureName, id) {
        let set = this.disabledGestures.get(gestureName);
        if (set === void 0) {
          set = /* @__PURE__ */ new Set();
          this.disabledGestures.set(gestureName, set);
        }
        set.add(id);
      }
      enableGesture(gestureName, id) {
        const set = this.disabledGestures.get(gestureName);
        if (set !== void 0) {
          set.delete(id);
        }
      }
      disableScroll(id) {
        this.disabledScroll.add(id);
        if (this.disabledScroll.size === 1) {
          document.body.classList.add(BACKDROP_NO_SCROLL);
        }
      }
      enableScroll(id) {
        this.disabledScroll.delete(id);
        if (this.disabledScroll.size === 0) {
          document.body.classList.remove(BACKDROP_NO_SCROLL);
        }
      }
      canStart(gestureName) {
        if (this.capturedId !== void 0) {
          return false;
        }
        if (this.isDisabled(gestureName)) {
          return false;
        }
        return true;
      }
      isCaptured() {
        return this.capturedId !== void 0;
      }
      isScrollDisabled() {
        return this.disabledScroll.size > 0;
      }
      isDisabled(gestureName) {
        const disabled = this.disabledGestures.get(gestureName);
        if (disabled && disabled.size > 0) {
          return true;
        }
        return false;
      }
      newID() {
        this.gestureId++;
        return this.gestureId;
      }
    };
    GestureDelegate = class {
      constructor(ctrl, id, name, priority, disableScroll) {
        this.id = id;
        this.name = name;
        this.disableScroll = disableScroll;
        this.priority = priority * 1e6 + id;
        this.ctrl = ctrl;
      }
      canStart() {
        if (!this.ctrl) {
          return false;
        }
        return this.ctrl.canStart(this.name);
      }
      start() {
        if (!this.ctrl) {
          return false;
        }
        return this.ctrl.start(this.name, this.id, this.priority);
      }
      capture() {
        if (!this.ctrl) {
          return false;
        }
        const captured = this.ctrl.capture(this.name, this.id, this.priority);
        if (captured && this.disableScroll) {
          this.ctrl.disableScroll(this.id);
        }
        return captured;
      }
      release() {
        if (this.ctrl) {
          this.ctrl.release(this.id);
          if (this.disableScroll) {
            this.ctrl.enableScroll(this.id);
          }
        }
      }
      destroy() {
        this.release();
        this.ctrl = void 0;
      }
    };
    BlockerDelegate = class {
      constructor(ctrl, id, disable, disableScroll) {
        this.id = id;
        this.disable = disable;
        this.disableScroll = disableScroll;
        this.ctrl = ctrl;
      }
      block() {
        if (!this.ctrl) {
          return;
        }
        if (this.disable) {
          for (const gesture of this.disable) {
            this.ctrl.disableGesture(gesture, this.id);
          }
        }
        if (this.disableScroll) {
          this.ctrl.disableScroll(this.id);
        }
      }
      unblock() {
        if (!this.ctrl) {
          return;
        }
        if (this.disable) {
          for (const gesture of this.disable) {
            this.ctrl.enableGesture(gesture, this.id);
          }
        }
        if (this.disableScroll) {
          this.ctrl.enableScroll(this.id);
        }
      }
      destroy() {
        this.unblock();
        this.ctrl = void 0;
      }
    };
    BACKDROP_NO_SCROLL = "backdrop-no-scroll";
    GESTURE_CONTROLLER = new GestureController();
  }
});

export {
  BACKDROP_NO_SCROLL,
  GESTURE_CONTROLLER,
  init_gesture_controller_B_gJaBk0
};
//# debugId=baf29d12-f4b8-5418-a836-a0b79b7cb1c2
//# sourceMappingURL=chunk-LTX35HTQ.js.map
