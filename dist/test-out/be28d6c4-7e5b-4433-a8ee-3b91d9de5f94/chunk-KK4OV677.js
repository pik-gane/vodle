import {
  findClosestIonContent,
  init_index_TkLga3ma,
  scrollToTop
} from "./chunk-57PV5QBJ.js";
import {
  componentOnReady,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  init_index_BpRUsN_W,
  readTask,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/status-tap-VGRBYwiC.js
var startStatusTap;
var init_status_tap_VGRBYwiC = __esm({
  "node_modules/@ionic/core/dist/esm/status-tap-VGRBYwiC.js"() {
    init_index_BpRUsN_W();
    init_index_TkLga3ma();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    startStatusTap = () => {
      const win = window;
      win.addEventListener("statusTap", () => {
        readTask(() => {
          const width = win.innerWidth;
          const height = win.innerHeight;
          const el = document.elementFromPoint(width / 2, height / 2);
          if (!el) {
            return;
          }
          const contentEl = findClosestIonContent(el);
          if (contentEl) {
            new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
              writeTask(() => __async(null, null, function* () {
                contentEl.style.setProperty("--overflow", "hidden");
                yield scrollToTop(contentEl, 300);
                contentEl.style.removeProperty("--overflow");
              }));
            });
          }
        });
      });
    };
  }
});
init_status_tap_VGRBYwiC();
export {
  startStatusTap
};
//# debugId=190db4a2-df8e-5ae3-ac0c-20324ceeef58
//# sourceMappingURL=chunk-KK4OV677.js.map
