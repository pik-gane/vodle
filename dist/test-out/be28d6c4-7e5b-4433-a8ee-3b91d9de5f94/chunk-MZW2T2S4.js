import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/lock-controller-B-hirT0v.js
var createLockController;
var init_lock_controller_B_hirT0v = __esm({
  "node_modules/@ionic/core/dist/esm/lock-controller-B-hirT0v.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    createLockController = () => {
      let waitPromise;
      const lock = () => __async(null, null, function* () {
        const p = waitPromise;
        let resolve;
        waitPromise = new Promise((r) => resolve = r);
        if (p !== void 0) {
          yield p;
        }
        return resolve;
      });
      return {
        lock
      };
    };
  }
});

export {
  createLockController,
  init_lock_controller_B_hirT0v
};
//# debugId=04dc3de3-f106-560f-a6c2-c05fa75af913
//# sourceMappingURL=chunk-MZW2T2S4.js.map
