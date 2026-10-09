import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/validity-DJztqcrH.js
var checkInvalidState;
var init_validity_DJztqcrH = __esm({
  "node_modules/@ionic/core/dist/esm/validity-DJztqcrH.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    checkInvalidState = (el) => {
      const hasIonTouched = el.classList.contains("ion-touched");
      const hasIonInvalid = el.classList.contains("ion-invalid");
      return hasIonTouched && hasIonInvalid;
    };
  }
});

export {
  checkInvalidState,
  init_validity_DJztqcrH
};
//# debugId=262ae0a2-ce47-54be-ad74-5c083d627928
//# sourceMappingURL=chunk-MXARAUZW.js.map
