import {
  getIonPageElement,
  init_index_BBASprVu
} from "./chunk-GMOSWYPY.js";
import {
  createAnimation,
  init_animation_DmtJpz89
} from "./chunk-UYK5QVEZ.js";
import {
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/md.transition-DNCSSiXk.js
var mdTransitionAnimation;
var init_md_transition_DNCSSiXk = __esm({
  "node_modules/@ionic/core/dist/esm/md.transition-DNCSSiXk.js"() {
    init_animation_DmtJpz89();
    init_index_BBASprVu();
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    mdTransitionAnimation = (_, opts) => {
      const OFF_BOTTOM = "40px";
      const CENTER = "0px";
      const backDirection = opts.direction === "back";
      const enteringEl = opts.enteringEl;
      const leavingEl = opts.leavingEl;
      const ionPageElement = getIonPageElement(enteringEl);
      const enteringToolbarEle = ionPageElement.querySelector("ion-toolbar");
      const rootTransition = createAnimation();
      rootTransition.addElement(ionPageElement).fill("both").beforeRemoveClass("ion-page-invisible");
      if (backDirection) {
        rootTransition.duration((opts.duration ?? 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
      } else {
        rootTransition.duration((opts.duration ?? 0) || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform", `translateY(${OFF_BOTTOM})`, `translateY(${CENTER})`).fromTo("opacity", 0.01, 1);
      }
      if (enteringToolbarEle) {
        const enteringToolBar = createAnimation();
        enteringToolBar.addElement(enteringToolbarEle);
        rootTransition.addAnimation(enteringToolBar);
      }
      if (leavingEl && backDirection) {
        rootTransition.duration((opts.duration ?? 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
        const leavingPage = createAnimation();
        leavingPage.addElement(getIonPageElement(leavingEl)).onFinish((currentStep) => {
          if (currentStep === 1 && leavingPage.elements.length > 0) {
            leavingPage.elements[0].style.setProperty("display", "none");
          }
        }).fromTo("transform", `translateY(${CENTER})`, `translateY(${OFF_BOTTOM})`).fromTo("opacity", 1, 0);
        rootTransition.addAnimation(leavingPage);
      }
      return rootTransition;
    };
  }
});

export {
  mdTransitionAnimation,
  init_md_transition_DNCSSiXk
};
//# debugId=4c2578f9-b5f1-5bb0-b55c-5802756326ef
//# sourceMappingURL=chunk-DL2EKLCJ.js.map
