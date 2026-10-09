import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/overlay-control-label-BSQPZ79H.js
var getOverlayLabelPlacement, getOverlayLabelJustify;
var init_overlay_control_label_BSQPZ79H = __esm({
  "node_modules/@ionic/core/dist/esm/overlay-control-label-BSQPZ79H.js"() {
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    getOverlayLabelPlacement = (mode, control, interfaceType) => {
      if (mode === "ios" && control === "radio" && interfaceType !== "modal") {
        return "start";
      }
      return "end";
    };
    getOverlayLabelJustify = (mode, control, interfaceType) => {
      if (mode === "ios" && control === "radio" && interfaceType !== "modal") {
        return "space-between";
      }
      return "start";
    };
  }
});

export {
  getOverlayLabelPlacement,
  getOverlayLabelJustify,
  init_overlay_control_label_BSQPZ79H
};
//# debugId=05dd17cd-b20a-5c22-ba33-3a63f270aa3d
//# sourceMappingURL=chunk-YYER5HYK.js.map
