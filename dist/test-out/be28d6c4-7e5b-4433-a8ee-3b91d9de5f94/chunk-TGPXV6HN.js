import {
  init_helpers_BJqKF1pr,
  raf,
  win
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde,
  isRTL
} from "./chunk-Z6RQ22J2.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/slot-mutation-controller-hAS2uJ7c.js
var createNotchController, SKIP_LABEL_TRANSITION_CLASS, START_CONTAINER_ADJUSTMENT_VAR, createStartContainerController, getSlottedClickContent, isSlottedClick, createClickController, createSlotMutationController;
var init_slot_mutation_controller_hAS2uJ7c = __esm({
  "node_modules/@ionic/core/dist/esm/slot-mutation-controller-hAS2uJ7c.js"() {
    init_helpers_BJqKF1pr();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    createNotchController = (el, getNotchSpacerEl, getLabelSlot) => {
      let notchVisibilityIO;
      const needsExplicitNotchWidth = () => {
        const notchSpacerEl = getNotchSpacerEl();
        if (
          /**
           * If the notch is not being used
           * then we do not need to set the notch width.
           */
          notchSpacerEl === void 0 || /**
           * If either the label property is being
           * used or the label slot is not defined,
           * then we do not need to estimate the notch width.
           */
          el.label !== void 0 || getLabelSlot() === null
        ) {
          return false;
        }
        return true;
      };
      const calculateNotchWidth = () => {
        if (needsExplicitNotchWidth()) {
          raf(() => {
            setNotchWidth();
          });
        }
      };
      const setNotchWidth = () => {
        const notchSpacerEl = getNotchSpacerEl();
        if (notchSpacerEl === void 0) {
          return;
        }
        if (!needsExplicitNotchWidth()) {
          notchSpacerEl.style.removeProperty("width");
          return;
        }
        const width = getLabelSlot().scrollWidth;
        if (
          /**
           * If the computed width of the label is 0
           * and notchSpacerEl's offsetParent is null
           * then that means the element is hidden.
           * As a result, we need to wait for the element
           * to become visible before setting the notch width.
           *
           * We do not check el.offsetParent because
           * that can be null if the host element has
           * position: fixed applied to it.
           * notchSpacerEl does not have position: fixed.
           */
          width === 0 && notchSpacerEl.offsetParent === null && win !== void 0 && "IntersectionObserver" in win
        ) {
          if (notchVisibilityIO !== void 0) {
            return;
          }
          const io = notchVisibilityIO = new IntersectionObserver(
            (ev) => {
              if (ev[0].intersectionRatio === 1) {
                setNotchWidth();
                io.disconnect();
                notchVisibilityIO = void 0;
              }
            },
            /**
             * Set the root to be the host element
             * This causes the IO callback
             * to be fired in WebKit as soon as the element
             * is visible. If we used the default root value
             * then WebKit would only fire the IO callback
             * after any animations (such as a modal transition)
             * finished, and there would potentially be a flicker.
             */
            { threshold: 0.01, root: el }
          );
          io.observe(notchSpacerEl);
          return;
        }
        notchSpacerEl.style.setProperty("width", `${width * 0.75}px`);
      };
      const destroy = () => {
        if (notchVisibilityIO) {
          notchVisibilityIO.disconnect();
          notchVisibilityIO = void 0;
        }
      };
      return {
        calculateNotchWidth,
        destroy
      };
    };
    SKIP_LABEL_TRANSITION_CLASS = "skip-label-transition";
    START_CONTAINER_ADJUSTMENT_VAR = "--internal-start-container-adjustment";
    createStartContainerController = (el, getStartContainer, shouldApplyAdjustment) => {
      let resizeObserver;
      let observedContainer;
      let measurementRaf;
      let transitionRaf;
      let appliedAdjustment;
      const calculateAdjustment = () => {
        const startSlot = getStartContainer();
        if (!startSlot || !shouldApplyAdjustment()) {
          return "";
        }
        const startContainerWidth = startSlot.getBoundingClientRect().width;
        const roundedWidth = Math.round(startContainerWidth * 10) / 10;
        const sign = isRTL(el) ? "" : "-";
        return roundedWidth ? `${sign}${roundedWidth}px` : "0px";
      };
      const scheduleAdjustmentUpdate = () => {
        if (measurementRaf !== void 0) {
          return;
        }
        measurementRaf = raf(() => {
          measurementRaf = void 0;
          const adjustment = calculateAdjustment();
          if (adjustment !== appliedAdjustment) {
            if (transitionRaf !== void 0) {
              cancelAnimationFrame(transitionRaf);
            }
            el.classList.add(SKIP_LABEL_TRANSITION_CLASS);
            el.style.setProperty(START_CONTAINER_ADJUSTMENT_VAR, adjustment);
            appliedAdjustment = adjustment;
            transitionRaf = raf(() => {
              transitionRaf = void 0;
              el.classList.remove(SKIP_LABEL_TRANSITION_CLASS);
            });
          }
          setupResizeObserver();
        });
      };
      const disconnectResizeObserver = () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = void 0;
          observedContainer = void 0;
        }
      };
      const setupResizeObserver = () => {
        const startSlot = getStartContainer();
        if (!startSlot || !shouldApplyAdjustment()) {
          disconnectResizeObserver();
          return;
        }
        if (typeof ResizeObserver !== "function" || resizeObserver && observedContainer === startSlot) {
          return;
        }
        disconnectResizeObserver();
        resizeObserver = new ResizeObserver(() => {
          scheduleAdjustmentUpdate();
        });
        observedContainer = startSlot;
        resizeObserver.observe(startSlot);
      };
      const calculateStartContainerWidth = () => {
        scheduleAdjustmentUpdate();
      };
      const destroy = () => {
        disconnectResizeObserver();
        if (measurementRaf !== void 0) {
          cancelAnimationFrame(measurementRaf);
          measurementRaf = void 0;
        }
        if (transitionRaf !== void 0) {
          cancelAnimationFrame(transitionRaf);
          transitionRaf = void 0;
          el.classList.remove(SKIP_LABEL_TRANSITION_CLASS);
        }
        appliedAdjustment = void 0;
      };
      return {
        calculateStartContainerWidth,
        destroy
      };
    };
    getSlottedClickContent = (ev, el) => {
      const slotted = ev.target.closest('[slot="start"], [slot="end"]');
      return slotted !== null && slotted !== el && el.contains(slotted) ? slotted : null;
    };
    isSlottedClick = (ev, el) => getSlottedClickContent(ev, el) !== null;
    createClickController = (el, getNativeInput) => {
      let hasSlottedClick = false;
      const handleClickCapture = (ev) => {
        if (isSlottedClick(ev, el)) {
          hasSlottedClick = true;
          raf(() => hasSlottedClick = false);
          return;
        }
        if (getNativeInput === void 0) {
          if (hasSlottedClick) {
            ev.stopPropagation();
            hasSlottedClick = false;
          }
          return;
        }
        const nativeInput = getNativeInput();
        if (nativeInput !== void 0 && ev.target === nativeInput) {
          ev.stopPropagation();
          if (!hasSlottedClick) {
            el.click();
          }
          hasSlottedClick = false;
        }
      };
      return { handleClickCapture };
    };
    createSlotMutationController = (el, slotName, mutationCallback) => {
      let hostMutationObserver;
      let slottedContentMutationObserver;
      if (win !== void 0 && "MutationObserver" in win) {
        const slots = Array.isArray(slotName) ? slotName : [slotName];
        hostMutationObserver = new MutationObserver((entries) => {
          for (const entry of entries) {
            for (const node of entry.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE && slots.includes(node.slot)) {
                mutationCallback();
                raf(() => watchForSlotChange(node));
                return;
              }
            }
          }
        });
        hostMutationObserver.observe(el, {
          childList: true,
          /**
           * This fixes an issue with the `ion-input` and
           * `ion-textarea` not re-rendering in some cases
           * when using the label slot functionality.
           *
           * HTML element patches in Stencil that are enabled
           * by the `experimentalSlotFixes` flag in Stencil v4
           * result in DOM manipulations that won't trigger
           * the current mutation observer configuration and
           * callback.
           */
          subtree: true
        });
      }
      const watchForSlotChange = (slottedEl) => {
        if (slottedContentMutationObserver) {
          slottedContentMutationObserver.disconnect();
          slottedContentMutationObserver = void 0;
        }
        slottedContentMutationObserver = new MutationObserver((entries) => {
          mutationCallback();
          for (const entry of entries) {
            for (const node of entry.removedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE && node.slot === slotName) {
                destroySlottedContentObserver();
              }
            }
          }
        });
        slottedContentMutationObserver.observe(slottedEl.parentElement ?? slottedEl, { subtree: true, childList: true });
      };
      const destroy = () => {
        if (hostMutationObserver) {
          hostMutationObserver.disconnect();
          hostMutationObserver = void 0;
        }
        destroySlottedContentObserver();
      };
      const destroySlottedContentObserver = () => {
        if (slottedContentMutationObserver) {
          slottedContentMutationObserver.disconnect();
          slottedContentMutationObserver = void 0;
        }
      };
      return {
        destroy
      };
    };
  }
});

export {
  createNotchController,
  createStartContainerController,
  getSlottedClickContent,
  createClickController,
  createSlotMutationController,
  init_slot_mutation_controller_hAS2uJ7c
};
//# debugId=ca69bdfc-13f3-5cb4-9836-4ba326075bde
//# sourceMappingURL=chunk-TGPXV6HN.js.map
