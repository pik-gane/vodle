import {
  getCapacitor,
  init_capacitor_CHJaJ9aX
} from "./chunk-ABFS5V4F.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/haptic-WXfMCob9.js
var ImpactStyle, NotificationType, HapticEngine, hapticAvailable, hapticSelection, hapticSelectionStart, hapticSelectionChanged, hapticSelectionEnd, hapticImpact;
var init_haptic_WXfMCob9 = __esm({
  "node_modules/@ionic/core/dist/esm/haptic-WXfMCob9.js"() {
    init_capacitor_CHJaJ9aX();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    (function(ImpactStyle2) {
      ImpactStyle2["Heavy"] = "HEAVY";
      ImpactStyle2["Medium"] = "MEDIUM";
      ImpactStyle2["Light"] = "LIGHT";
    })(ImpactStyle || (ImpactStyle = {}));
    (function(NotificationType2) {
      NotificationType2["Success"] = "SUCCESS";
      NotificationType2["Warning"] = "WARNING";
      NotificationType2["Error"] = "ERROR";
    })(NotificationType || (NotificationType = {}));
    HapticEngine = {
      getEngine() {
        const capacitor = getCapacitor();
        if (capacitor?.isPluginAvailable("Haptics")) {
          return capacitor.Plugins.Haptics;
        }
        return void 0;
      },
      available() {
        const engine = this.getEngine();
        if (!engine) {
          return false;
        }
        const capacitor = getCapacitor();
        if (capacitor?.getPlatform() === "web") {
          return typeof navigator !== "undefined" && navigator.vibrate !== void 0;
        }
        return true;
      },
      impact(options) {
        const engine = this.getEngine();
        if (!engine) {
          return;
        }
        engine.impact({ style: options.style });
      },
      notification(options) {
        const engine = this.getEngine();
        if (!engine) {
          return;
        }
        engine.notification({ type: options.type });
      },
      selection() {
        this.impact({ style: ImpactStyle.Light });
      },
      selectionStart() {
        const engine = this.getEngine();
        if (!engine) {
          return;
        }
        engine.selectionStart();
      },
      selectionChanged() {
        const engine = this.getEngine();
        if (!engine) {
          return;
        }
        engine.selectionChanged();
      },
      selectionEnd() {
        const engine = this.getEngine();
        if (!engine) {
          return;
        }
        engine.selectionEnd();
      }
    };
    hapticAvailable = () => {
      return HapticEngine.available();
    };
    hapticSelection = () => {
      hapticAvailable() && HapticEngine.selection();
    };
    hapticSelectionStart = () => {
      hapticAvailable() && HapticEngine.selectionStart();
    };
    hapticSelectionChanged = () => {
      hapticAvailable() && HapticEngine.selectionChanged();
    };
    hapticSelectionEnd = () => {
      hapticAvailable() && HapticEngine.selectionEnd();
    };
    hapticImpact = (options) => {
      hapticAvailable() && HapticEngine.impact(options);
    };
  }
});

export {
  ImpactStyle,
  hapticSelection,
  hapticSelectionStart,
  hapticSelectionChanged,
  hapticSelectionEnd,
  hapticImpact,
  init_haptic_WXfMCob9
};
//# debugId=c31ded4f-51cf-579c-92cc-dde2e16853c9
//# sourceMappingURL=chunk-XHGNMG47.js.map
