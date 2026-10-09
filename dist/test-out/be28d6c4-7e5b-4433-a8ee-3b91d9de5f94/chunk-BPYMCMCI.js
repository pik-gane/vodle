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

// node_modules/@ionic/core/dist/esm/ios.transition-B8netzsb.js
var DURATION, getClonedElement, shadow, getLargeTitle, getBackButton, createLargeTitleTransition, animateBackButton, animateLargeTitle, iosTransitionAnimation, LARGE_TITLE_SIZE_OFFSET;
var init_ios_transition_B8netzsb = __esm({
  "node_modules/@ionic/core/dist/esm/ios.transition-B8netzsb.js"() {
    init_animation_DmtJpz89();
    init_index_BBASprVu();
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    DURATION = 540;
    getClonedElement = (tagName) => {
      return document.querySelector(`${tagName}.ion-cloned-element`);
    };
    shadow = (el) => {
      return el.shadowRoot || el;
    };
    getLargeTitle = (refEl) => {
      const tabs = refEl.tagName === "ION-TABS" ? refEl : refEl.querySelector("ion-tabs");
      const query = "ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large";
      if (tabs != null) {
        const activeTab = tabs.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");
        return activeTab != null ? activeTab.querySelector(query) : null;
      }
      return refEl.querySelector(query);
    };
    getBackButton = (refEl, backDirection) => {
      const tabs = refEl.tagName === "ION-TABS" ? refEl : refEl.querySelector("ion-tabs");
      let buttonsList = [];
      if (tabs != null) {
        const activeTab = tabs.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");
        if (activeTab != null) {
          buttonsList = activeTab.querySelectorAll("ion-buttons");
        }
      } else {
        buttonsList = refEl.querySelectorAll("ion-buttons");
      }
      for (const buttons of buttonsList) {
        const parentHeader = buttons.closest("ion-header");
        const activeHeader = parentHeader && !parentHeader.classList.contains("header-collapse-condense-inactive");
        const backButton = buttons.querySelector("ion-back-button");
        const buttonsCollapse = buttons.classList.contains("buttons-collapse");
        const startSlot = buttons.slot === "start" || buttons.slot === "";
        if (backButton !== null && startSlot && (buttonsCollapse && activeHeader && backDirection || !buttonsCollapse)) {
          return backButton;
        }
      }
      return null;
    };
    createLargeTitleTransition = (rootAnimation, rtl, backDirection, enteringEl, leavingEl) => {
      const enteringBackButton = getBackButton(enteringEl, backDirection);
      const leavingLargeTitle = getLargeTitle(leavingEl);
      const enteringLargeTitle = getLargeTitle(enteringEl);
      const leavingBackButton = getBackButton(leavingEl, backDirection);
      const shouldAnimationForward = enteringBackButton !== null && leavingLargeTitle !== null && !backDirection;
      const shouldAnimationBackward = enteringLargeTitle !== null && leavingBackButton !== null && backDirection;
      if (shouldAnimationForward) {
        const leavingLargeTitleBox = leavingLargeTitle.getBoundingClientRect();
        const enteringBackButtonBox = enteringBackButton.getBoundingClientRect();
        const enteringBackButtonTextEl = shadow(enteringBackButton).querySelector(".button-text");
        const enteringBackButtonTextBox = enteringBackButtonTextEl?.getBoundingClientRect();
        const leavingLargeTitleTextEl = shadow(leavingLargeTitle).querySelector(".toolbar-title");
        const leavingLargeTitleTextBox = leavingLargeTitleTextEl.getBoundingClientRect();
        animateLargeTitle(rootAnimation, rtl, backDirection, leavingLargeTitle, leavingLargeTitleBox, leavingLargeTitleTextBox, enteringBackButtonBox, enteringBackButtonTextEl, enteringBackButtonTextBox);
        animateBackButton(rootAnimation, rtl, backDirection, enteringBackButton, enteringBackButtonBox, enteringBackButtonTextEl, enteringBackButtonTextBox, leavingLargeTitle, leavingLargeTitleTextBox);
      } else if (shouldAnimationBackward) {
        const enteringLargeTitleBox = enteringLargeTitle.getBoundingClientRect();
        const leavingBackButtonBox = leavingBackButton.getBoundingClientRect();
        const leavingBackButtonTextEl = shadow(leavingBackButton).querySelector(".button-text");
        const leavingBackButtonTextBox = leavingBackButtonTextEl?.getBoundingClientRect();
        const enteringLargeTitleTextEl = shadow(enteringLargeTitle).querySelector(".toolbar-title");
        const enteringLargeTitleTextBox = enteringLargeTitleTextEl.getBoundingClientRect();
        animateLargeTitle(rootAnimation, rtl, backDirection, enteringLargeTitle, enteringLargeTitleBox, enteringLargeTitleTextBox, leavingBackButtonBox, leavingBackButtonTextEl, leavingBackButtonTextBox);
        animateBackButton(rootAnimation, rtl, backDirection, leavingBackButton, leavingBackButtonBox, leavingBackButtonTextEl, leavingBackButtonTextBox, enteringLargeTitle, enteringLargeTitleTextBox);
      }
      return {
        forward: shouldAnimationForward,
        backward: shouldAnimationBackward
      };
    };
    animateBackButton = (rootAnimation, rtl, backDirection, backButtonEl, backButtonBox, backButtonTextEl, backButtonTextBox, largeTitleEl, largeTitleTextBox) => {
      const BACK_BUTTON_START_OFFSET = rtl ? `calc(100% - ${backButtonBox.right + 4}px)` : `${backButtonBox.left - 4}px`;
      const TEXT_ORIGIN_X = rtl ? "right" : "left";
      const ICON_ORIGIN_X = rtl ? "left" : "right";
      const CONTAINER_ORIGIN_X = rtl ? "right" : "left";
      let WIDTH_SCALE = 1;
      let HEIGHT_SCALE = 1;
      let TEXT_START_SCALE = `scale(${HEIGHT_SCALE})`;
      const TEXT_END_SCALE = "scale(1)";
      if (backButtonTextEl && backButtonTextBox) {
        const doTitleAndButtonTextsMatch = backButtonTextEl.textContent?.trim() === largeTitleEl.textContent?.trim();
        WIDTH_SCALE = largeTitleTextBox.width / backButtonTextBox.width;
        HEIGHT_SCALE = (largeTitleTextBox.height - LARGE_TITLE_SIZE_OFFSET) / backButtonTextBox.height;
        TEXT_START_SCALE = doTitleAndButtonTextsMatch ? `scale(${WIDTH_SCALE}, ${HEIGHT_SCALE})` : `scale(${HEIGHT_SCALE})`;
      }
      const backButtonIconEl = shadow(backButtonEl).querySelector("ion-icon");
      const backButtonIconBox = backButtonIconEl.getBoundingClientRect();
      const CONTAINER_START_TRANSLATE_X = rtl ? `${backButtonIconBox.width / 2 - (backButtonIconBox.right - backButtonBox.right)}px` : `${backButtonBox.left - backButtonIconBox.width / 2}px`;
      const CONTAINER_END_TRANSLATE_X = rtl ? `-${window.innerWidth - backButtonBox.right}px` : `${backButtonBox.left}px`;
      const CONTAINER_START_TRANSLATE_Y = `${largeTitleTextBox.top}px`;
      const CONTAINER_END_TRANSLATE_Y = `${backButtonBox.top}px`;
      const FORWARD_CONTAINER_KEYFRAMES = [
        { offset: 0, transform: `translate3d(${CONTAINER_START_TRANSLATE_X}, ${CONTAINER_START_TRANSLATE_Y}, 0)` },
        { offset: 1, transform: `translate3d(${CONTAINER_END_TRANSLATE_X}, ${CONTAINER_END_TRANSLATE_Y}, 0)` }
      ];
      const BACKWARD_CONTAINER_KEYFRAMES = [
        { offset: 0, transform: `translate3d(${CONTAINER_END_TRANSLATE_X}, ${CONTAINER_END_TRANSLATE_Y}, 0)` },
        { offset: 1, transform: `translate3d(${CONTAINER_START_TRANSLATE_X}, ${CONTAINER_START_TRANSLATE_Y}, 0)` }
      ];
      const CONTAINER_KEYFRAMES = backDirection ? BACKWARD_CONTAINER_KEYFRAMES : FORWARD_CONTAINER_KEYFRAMES;
      const FORWARD_TEXT_KEYFRAMES = [
        { offset: 0, opacity: 0, transform: TEXT_START_SCALE },
        { offset: 1, opacity: 1, transform: TEXT_END_SCALE }
      ];
      const BACKWARD_TEXT_KEYFRAMES = [
        { offset: 0, opacity: 1, transform: TEXT_END_SCALE },
        { offset: 1, opacity: 0, transform: TEXT_START_SCALE }
      ];
      const TEXT_KEYFRAMES = backDirection ? BACKWARD_TEXT_KEYFRAMES : FORWARD_TEXT_KEYFRAMES;
      const FORWARD_ICON_KEYFRAMES = [
        { offset: 0, opacity: 0, transform: "scale(0.6)" },
        { offset: 0.6, opacity: 0, transform: "scale(0.6)" },
        { offset: 1, opacity: 1, transform: "scale(1)" }
      ];
      const BACKWARD_ICON_KEYFRAMES = [
        { offset: 0, opacity: 1, transform: "scale(1)" },
        { offset: 0.2, opacity: 0, transform: "scale(0.6)" },
        { offset: 1, opacity: 0, transform: "scale(0.6)" }
      ];
      const ICON_KEYFRAMES = backDirection ? BACKWARD_ICON_KEYFRAMES : FORWARD_ICON_KEYFRAMES;
      const enteringBackButtonTextAnimation = createAnimation();
      const enteringBackButtonIconAnimation = createAnimation();
      const enteringBackButtonAnimation = createAnimation();
      const clonedBackButtonEl = getClonedElement("ion-back-button");
      const clonedBackButtonTextEl = shadow(clonedBackButtonEl).querySelector(".button-text");
      const clonedBackButtonIconEl = shadow(clonedBackButtonEl).querySelector("ion-icon");
      clonedBackButtonEl.text = backButtonEl.text;
      clonedBackButtonEl.mode = backButtonEl.mode;
      clonedBackButtonEl.icon = backButtonEl.icon;
      clonedBackButtonEl.color = backButtonEl.color;
      clonedBackButtonEl.disabled = backButtonEl.disabled;
      clonedBackButtonEl.style.setProperty("display", "block");
      clonedBackButtonEl.style.setProperty("position", "fixed");
      enteringBackButtonIconAnimation.addElement(clonedBackButtonIconEl);
      enteringBackButtonTextAnimation.addElement(clonedBackButtonTextEl);
      enteringBackButtonAnimation.addElement(clonedBackButtonEl);
      enteringBackButtonAnimation.beforeStyles({
        position: "absolute",
        top: "0px",
        [CONTAINER_ORIGIN_X]: "0px"
      }).beforeAddWrite(() => {
        backButtonEl.style.setProperty("display", "none");
        clonedBackButtonEl.style.setProperty(TEXT_ORIGIN_X, BACK_BUTTON_START_OFFSET);
      }).afterAddWrite(() => {
        backButtonEl.style.setProperty("display", "");
        clonedBackButtonEl.style.setProperty("display", "none");
        clonedBackButtonEl.style.removeProperty(TEXT_ORIGIN_X);
      }).keyframes(CONTAINER_KEYFRAMES);
      enteringBackButtonTextAnimation.beforeStyles({
        "transform-origin": `${TEXT_ORIGIN_X} top`
      }).keyframes(TEXT_KEYFRAMES);
      enteringBackButtonIconAnimation.beforeStyles({
        "transform-origin": `${ICON_ORIGIN_X} center`
      }).keyframes(ICON_KEYFRAMES);
      rootAnimation.addAnimation([
        enteringBackButtonTextAnimation,
        enteringBackButtonIconAnimation,
        enteringBackButtonAnimation
      ]);
    };
    animateLargeTitle = (rootAnimation, rtl, backDirection, largeTitleEl, largeTitleBox, largeTitleTextBox, backButtonBox, backButtonTextEl, backButtonTextBox) => {
      const ORIGIN_X = rtl ? "right" : "left";
      const TITLE_START_OFFSET = rtl ? `calc(100% - ${largeTitleBox.right}px)` : `${largeTitleBox.left}px`;
      const START_TRANSLATE_X = "0px";
      const START_TRANSLATE_Y = `${largeTitleBox.top}px`;
      const LARGE_TITLE_TRANSLATION_OFFSET = 8;
      let END_TRANSLATE_X = rtl ? `-${window.innerWidth - backButtonBox.right - LARGE_TITLE_TRANSLATION_OFFSET}px` : `${backButtonBox.x + LARGE_TITLE_TRANSLATION_OFFSET}px`;
      let HEIGHT_SCALE = 0.5;
      const START_SCALE = "scale(1)";
      let END_SCALE = `scale(${HEIGHT_SCALE})`;
      if (backButtonTextEl && backButtonTextBox) {
        END_TRANSLATE_X = rtl ? `-${window.innerWidth - backButtonTextBox.right - LARGE_TITLE_TRANSLATION_OFFSET}px` : `${backButtonTextBox.x - LARGE_TITLE_TRANSLATION_OFFSET}px`;
        const doTitleAndButtonTextsMatch = backButtonTextEl.textContent?.trim() === largeTitleEl.textContent?.trim();
        const WIDTH_SCALE = backButtonTextBox.width / largeTitleTextBox.width;
        HEIGHT_SCALE = backButtonTextBox.height / (largeTitleTextBox.height - LARGE_TITLE_SIZE_OFFSET);
        END_SCALE = doTitleAndButtonTextsMatch ? `scale(${WIDTH_SCALE}, ${HEIGHT_SCALE})` : `scale(${HEIGHT_SCALE})`;
      }
      const backButtonMidPoint = backButtonBox.top + backButtonBox.height / 2;
      const titleMidPoint = largeTitleBox.height * HEIGHT_SCALE / 2;
      const END_TRANSLATE_Y = `${backButtonMidPoint - titleMidPoint}px`;
      const BACKWARDS_KEYFRAMES = [
        { offset: 0, opacity: 0, transform: `translate3d(${END_TRANSLATE_X}, ${END_TRANSLATE_Y}, 0) ${END_SCALE}` },
        { offset: 0.1, opacity: 0 },
        { offset: 1, opacity: 1, transform: `translate3d(${START_TRANSLATE_X}, ${START_TRANSLATE_Y}, 0) ${START_SCALE}` }
      ];
      const FORWARDS_KEYFRAMES = [
        {
          offset: 0,
          opacity: 0.99,
          transform: `translate3d(${START_TRANSLATE_X}, ${START_TRANSLATE_Y}, 0) ${START_SCALE}`
        },
        { offset: 0.6, opacity: 0 },
        { offset: 1, opacity: 0, transform: `translate3d(${END_TRANSLATE_X}, ${END_TRANSLATE_Y}, 0) ${END_SCALE}` }
      ];
      const KEYFRAMES = backDirection ? BACKWARDS_KEYFRAMES : FORWARDS_KEYFRAMES;
      const clonedTitleEl = getClonedElement("ion-title");
      const clonedLargeTitleAnimation = createAnimation();
      clonedTitleEl.innerText = largeTitleEl.innerText;
      clonedTitleEl.size = largeTitleEl.size;
      clonedTitleEl.color = largeTitleEl.color;
      clonedLargeTitleAnimation.addElement(clonedTitleEl);
      clonedLargeTitleAnimation.beforeStyles({
        "transform-origin": `${ORIGIN_X} top`,
        /**
         * Since font size changes will cause
         * the dimension of the large title to change
         * we need to set the cloned title height
         * equal to that of the original large title height.
         */
        height: `${largeTitleBox.height}px`,
        display: "",
        position: "relative",
        [ORIGIN_X]: TITLE_START_OFFSET
      }).beforeAddWrite(() => {
        largeTitleEl.style.setProperty("opacity", "0");
      }).afterAddWrite(() => {
        largeTitleEl.style.setProperty("opacity", "");
        clonedTitleEl.style.setProperty("display", "none");
      }).keyframes(KEYFRAMES);
      rootAnimation.addAnimation(clonedLargeTitleAnimation);
    };
    iosTransitionAnimation = (navEl, opts) => {
      try {
        const EASING = "cubic-bezier(0.32,0.72,0,1)";
        const OPACITY = "opacity";
        const TRANSFORM = "transform";
        const CENTER = "0%";
        const OFF_OPACITY = 0.8;
        const isRTL = navEl.ownerDocument.dir === "rtl";
        const OFF_RIGHT = isRTL ? "-99.5%" : "99.5%";
        const OFF_LEFT = isRTL ? "33%" : "-33%";
        const enteringEl = opts.enteringEl;
        const leavingEl = opts.leavingEl;
        const backDirection = opts.direction === "back";
        const contentEl = enteringEl.querySelector(":scope > ion-content");
        const headerEls = enteringEl.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");
        const enteringToolBarEls = enteringEl.querySelectorAll(":scope > ion-header > ion-toolbar");
        const rootAnimation = createAnimation();
        const enteringContentAnimation = createAnimation();
        rootAnimation.addElement(enteringEl).duration((opts.duration ?? 0) || DURATION).easing(opts.easing || EASING).fill("both").beforeRemoveClass("ion-page-invisible");
        if (leavingEl && navEl !== null && navEl !== void 0) {
          const navDecorAnimation = createAnimation();
          navDecorAnimation.addElement(navEl);
          rootAnimation.addAnimation(navDecorAnimation);
        }
        if (!contentEl && enteringToolBarEls.length === 0 && headerEls.length === 0) {
          enteringContentAnimation.addElement(enteringEl.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs"));
        } else {
          enteringContentAnimation.addElement(contentEl);
          enteringContentAnimation.addElement(headerEls);
        }
        rootAnimation.addAnimation(enteringContentAnimation);
        if (backDirection) {
          enteringContentAnimation.beforeClearStyles([OPACITY]).fromTo("transform", `translateX(${OFF_LEFT})`, `translateX(${CENTER})`).fromTo(OPACITY, OFF_OPACITY, 1);
        } else {
          enteringContentAnimation.beforeClearStyles([OPACITY]).fromTo("transform", `translateX(${OFF_RIGHT})`, `translateX(${CENTER})`);
        }
        if (contentEl) {
          const enteringTransitionEffectEl = shadow(contentEl).querySelector(".transition-effect");
          if (enteringTransitionEffectEl) {
            const enteringTransitionCoverEl = enteringTransitionEffectEl.querySelector(".transition-cover");
            const enteringTransitionShadowEl = enteringTransitionEffectEl.querySelector(".transition-shadow");
            const enteringTransitionEffect = createAnimation();
            const enteringTransitionCover = createAnimation();
            const enteringTransitionShadow = createAnimation();
            enteringTransitionEffect.addElement(enteringTransitionEffectEl).beforeStyles({ opacity: "1", display: "block" }).afterStyles({ opacity: "", display: "" });
            enteringTransitionCover.addElement(enteringTransitionCoverEl).beforeClearStyles([OPACITY]).fromTo(OPACITY, 0, 0.1);
            enteringTransitionShadow.addElement(enteringTransitionShadowEl).beforeClearStyles([OPACITY]).fromTo(OPACITY, 0.03, 0.7);
            enteringTransitionEffect.addAnimation([enteringTransitionCover, enteringTransitionShadow]);
            enteringContentAnimation.addAnimation([enteringTransitionEffect]);
          }
        }
        const enteringContentHasLargeTitle = enteringEl.querySelector("ion-header.header-collapse-condense");
        const { forward, backward } = createLargeTitleTransition(rootAnimation, isRTL, backDirection, enteringEl, leavingEl);
        enteringToolBarEls.forEach((enteringToolBarEl) => {
          const enteringToolBar = createAnimation();
          enteringToolBar.addElement(enteringToolBarEl);
          rootAnimation.addAnimation(enteringToolBar);
          const enteringTitle = createAnimation();
          enteringTitle.addElement(enteringToolBarEl.querySelector("ion-title"));
          const enteringToolBarButtons = createAnimation();
          const buttons = Array.from(enteringToolBarEl.querySelectorAll("ion-buttons,[menuToggle]"));
          const parentHeader = enteringToolBarEl.closest("ion-header");
          const inactiveHeader = parentHeader?.classList.contains("header-collapse-condense-inactive");
          let buttonsToAnimate;
          if (backDirection) {
            buttonsToAnimate = buttons.filter((button) => {
              const isCollapseButton = button.classList.contains("buttons-collapse");
              return isCollapseButton && !inactiveHeader || !isCollapseButton;
            });
          } else {
            buttonsToAnimate = buttons.filter((button) => !button.classList.contains("buttons-collapse"));
          }
          enteringToolBarButtons.addElement(buttonsToAnimate);
          const enteringToolBarItems = createAnimation();
          enteringToolBarItems.addElement(enteringToolBarEl.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));
          const enteringToolBarBg = createAnimation();
          enteringToolBarBg.addElement(shadow(enteringToolBarEl).querySelector(".toolbar-background"));
          const enteringBackButton = createAnimation();
          const backButtonEl = enteringToolBarEl.querySelector("ion-back-button");
          if (backButtonEl) {
            enteringBackButton.addElement(backButtonEl);
          }
          enteringToolBar.addAnimation([
            enteringTitle,
            enteringToolBarButtons,
            enteringToolBarItems,
            enteringToolBarBg,
            enteringBackButton
          ]);
          enteringToolBarButtons.fromTo(OPACITY, 0.01, 1);
          enteringToolBarItems.fromTo(OPACITY, 0.01, 1);
          if (backDirection) {
            if (!inactiveHeader) {
              enteringTitle.fromTo("transform", `translateX(${OFF_LEFT})`, `translateX(${CENTER})`).fromTo(OPACITY, 0.01, 1);
            }
            enteringToolBarItems.fromTo("transform", `translateX(${OFF_LEFT})`, `translateX(${CENTER})`);
            enteringBackButton.fromTo(OPACITY, 0.01, 1);
          } else {
            if (!enteringContentHasLargeTitle) {
              enteringTitle.fromTo("transform", `translateX(${OFF_RIGHT})`, `translateX(${CENTER})`).fromTo(OPACITY, 0.01, 1);
            }
            enteringToolBarItems.fromTo("transform", `translateX(${OFF_RIGHT})`, `translateX(${CENTER})`);
            enteringToolBarBg.beforeClearStyles([OPACITY, "transform"]);
            const translucentHeader = parentHeader?.translucent;
            if (!translucentHeader) {
              enteringToolBarBg.fromTo(OPACITY, 0.01, "var(--opacity)");
            } else {
              enteringToolBarBg.fromTo("transform", isRTL ? "translateX(-100%)" : "translateX(100%)", "translateX(0px)");
            }
            if (!forward) {
              enteringBackButton.fromTo(OPACITY, 0.01, 1);
            }
            if (backButtonEl && !forward) {
              const enteringBackBtnText = createAnimation();
              enteringBackBtnText.addElement(shadow(backButtonEl).querySelector(".button-text")).fromTo(`transform`, isRTL ? "translateX(-100px)" : "translateX(100px)", "translateX(0px)");
              enteringToolBar.addAnimation(enteringBackBtnText);
            }
          }
        });
        if (leavingEl) {
          const leavingContent = createAnimation();
          const leavingContentEl = leavingEl.querySelector(":scope > ion-content");
          const leavingToolBarEls = leavingEl.querySelectorAll(":scope > ion-header > ion-toolbar");
          const leavingHeaderEls = leavingEl.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");
          if (!leavingContentEl && leavingToolBarEls.length === 0 && leavingHeaderEls.length === 0) {
            leavingContent.addElement(leavingEl.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs"));
          } else {
            leavingContent.addElement(leavingContentEl);
            leavingContent.addElement(leavingHeaderEls);
          }
          rootAnimation.addAnimation(leavingContent);
          if (backDirection) {
            leavingContent.beforeClearStyles([OPACITY]).fromTo("transform", `translateX(${CENTER})`, isRTL ? "translateX(-100%)" : "translateX(100%)");
            const leavingPage = getIonPageElement(leavingEl);
            rootAnimation.afterAddWrite(() => {
              if (rootAnimation.getDirection() === "normal") {
                leavingPage.style.setProperty("display", "none");
              }
            });
          } else {
            leavingContent.fromTo("transform", `translateX(${CENTER})`, `translateX(${OFF_LEFT})`).fromTo(OPACITY, 1, OFF_OPACITY);
          }
          if (leavingContentEl) {
            const leavingTransitionEffectEl = shadow(leavingContentEl).querySelector(".transition-effect");
            if (leavingTransitionEffectEl) {
              const leavingTransitionCoverEl = leavingTransitionEffectEl.querySelector(".transition-cover");
              const leavingTransitionShadowEl = leavingTransitionEffectEl.querySelector(".transition-shadow");
              const leavingTransitionEffect = createAnimation();
              const leavingTransitionCover = createAnimation();
              const leavingTransitionShadow = createAnimation();
              leavingTransitionEffect.addElement(leavingTransitionEffectEl).beforeStyles({ opacity: "1", display: "block" }).afterStyles({ opacity: "", display: "" });
              leavingTransitionCover.addElement(leavingTransitionCoverEl).beforeClearStyles([OPACITY]).fromTo(OPACITY, 0.1, 0);
              leavingTransitionShadow.addElement(leavingTransitionShadowEl).beforeClearStyles([OPACITY]).fromTo(OPACITY, 0.7, 0.03);
              leavingTransitionEffect.addAnimation([leavingTransitionCover, leavingTransitionShadow]);
              leavingContent.addAnimation([leavingTransitionEffect]);
            }
          }
          leavingToolBarEls.forEach((leavingToolBarEl) => {
            const leavingToolBar = createAnimation();
            leavingToolBar.addElement(leavingToolBarEl);
            const leavingTitle = createAnimation();
            leavingTitle.addElement(leavingToolBarEl.querySelector("ion-title"));
            const leavingToolBarButtons = createAnimation();
            const buttons = leavingToolBarEl.querySelectorAll("ion-buttons,[menuToggle]");
            const parentHeader = leavingToolBarEl.closest("ion-header");
            const inactiveHeader = parentHeader?.classList.contains("header-collapse-condense-inactive");
            const buttonsToAnimate = Array.from(buttons).filter((button) => {
              const isCollapseButton = button.classList.contains("buttons-collapse");
              return isCollapseButton && !inactiveHeader || !isCollapseButton;
            });
            leavingToolBarButtons.addElement(buttonsToAnimate);
            const leavingToolBarItems = createAnimation();
            const leavingToolBarItemEls = leavingToolBarEl.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");
            if (leavingToolBarItemEls.length > 0) {
              leavingToolBarItems.addElement(leavingToolBarItemEls);
            }
            const leavingToolBarBg = createAnimation();
            leavingToolBarBg.addElement(shadow(leavingToolBarEl).querySelector(".toolbar-background"));
            const leavingBackButton = createAnimation();
            const backButtonEl = leavingToolBarEl.querySelector("ion-back-button");
            if (backButtonEl) {
              leavingBackButton.addElement(backButtonEl);
            }
            leavingToolBar.addAnimation([
              leavingTitle,
              leavingToolBarButtons,
              leavingToolBarItems,
              leavingBackButton,
              leavingToolBarBg
            ]);
            rootAnimation.addAnimation(leavingToolBar);
            leavingBackButton.fromTo(OPACITY, 0.99, 0);
            leavingToolBarButtons.fromTo(OPACITY, 0.99, 0);
            leavingToolBarItems.fromTo(OPACITY, 0.99, 0);
            if (backDirection) {
              if (!inactiveHeader) {
                leavingTitle.fromTo("transform", `translateX(${CENTER})`, isRTL ? "translateX(-100%)" : "translateX(100%)").fromTo(OPACITY, 0.99, 0);
              }
              leavingToolBarItems.fromTo("transform", `translateX(${CENTER})`, isRTL ? "translateX(-100%)" : "translateX(100%)");
              leavingToolBarBg.beforeClearStyles([OPACITY, "transform"]);
              const translucentHeader = parentHeader?.translucent;
              if (!translucentHeader) {
                leavingToolBarBg.fromTo(OPACITY, "var(--opacity)", 0);
              } else {
                leavingToolBarBg.fromTo("transform", "translateX(0px)", isRTL ? "translateX(-100%)" : "translateX(100%)");
              }
              if (backButtonEl && !backward) {
                const leavingBackBtnText = createAnimation();
                leavingBackBtnText.addElement(shadow(backButtonEl).querySelector(".button-text")).fromTo("transform", `translateX(${CENTER})`, `translateX(${(isRTL ? -124 : 124) + "px"})`);
                leavingToolBar.addAnimation(leavingBackBtnText);
              }
            } else {
              if (!inactiveHeader) {
                leavingTitle.fromTo("transform", `translateX(${CENTER})`, `translateX(${OFF_LEFT})`).fromTo(OPACITY, 0.99, 0).afterClearStyles([TRANSFORM, OPACITY]);
              }
              leavingToolBarItems.fromTo("transform", `translateX(${CENTER})`, `translateX(${OFF_LEFT})`).afterClearStyles([TRANSFORM, OPACITY]);
              leavingBackButton.afterClearStyles([OPACITY]);
              leavingTitle.afterClearStyles([OPACITY]);
              leavingToolBarButtons.afterClearStyles([OPACITY]);
            }
          });
        }
        return rootAnimation;
      } catch (err) {
        throw err;
      }
    };
    LARGE_TITLE_SIZE_OFFSET = 10;
  }
});

export {
  shadow,
  iosTransitionAnimation,
  init_ios_transition_B8netzsb
};
//# debugId=fdaf5de7-cfe1-57f7-84c5-090c9c2b8419
//# sourceMappingURL=chunk-BPYMCMCI.js.map
