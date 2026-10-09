import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/dir-Dojwmvde.js
var isRTL;
var init_dir_Dojwmvde = __esm({
  "node_modules/@ionic/core/dist/esm/dir-Dojwmvde.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    isRTL = (hostEl) => {
      for (let el = hostEl; el; el = el.parentElement) {
        const dir = el.getAttribute("dir")?.toLowerCase();
        if (dir === "rtl") {
          return true;
        }
        if (dir === "ltr") {
          return false;
        }
      }
      return document?.dir?.toLowerCase() === "rtl";
    };
  }
});

export {
  isRTL,
  init_dir_Dojwmvde
};
//# debugId=51ea918c-3555-538e-a8ca-d383196a39b4
//# sourceMappingURL=chunk-Z6RQ22J2.js.map
