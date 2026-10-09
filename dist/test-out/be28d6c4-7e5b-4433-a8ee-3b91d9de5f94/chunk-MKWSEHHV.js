import {
  init_dir_Dojwmvde,
  isRTL
} from "./chunk-Z6RQ22J2.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-segment-view.entry.js
var segmentViewIosCss, segmentViewMdCss, SegmentView;
var init_ion_segment_view_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-segment-view.entry.js"() {
    init_index_BpRUsN_W();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    segmentViewIosCss = () => `:host{display:-ms-flexbox;display:flex;height:100%;overflow-x:scroll;-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory;scrollbar-width:none;-ms-overflow-style:none}:host::-webkit-scrollbar{display:none}:host(.segment-view-disabled),:host(.segment-view-swipe-disabled){-ms-touch-action:none;touch-action:none;overflow-x:hidden}:host(.segment-view-scroll-disabled){pointer-events:none}:host(.segment-view-disabled){opacity:0.3}`;
    segmentViewMdCss = () => `:host{display:-ms-flexbox;display:flex;height:100%;overflow-x:scroll;-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory;scrollbar-width:none;-ms-overflow-style:none}:host::-webkit-scrollbar{display:none}:host(.segment-view-disabled),:host(.segment-view-swipe-disabled){-ms-touch-action:none;touch-action:none;overflow-x:hidden}:host(.segment-view-scroll-disabled){pointer-events:none}:host(.segment-view-disabled){opacity:0.3}`;
    SegmentView = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionSegmentViewScroll = createEvent(this, "ionSegmentViewScroll", 7);
        this.scrollEndTimeout = null;
        this.isTouching = false;
        this.disabled = false;
        this.swipeGesture = true;
      }
      handleScroll(ev) {
        const { scrollLeft, scrollWidth, clientWidth } = ev.target;
        const max = scrollWidth - clientWidth;
        const scrollRatio = (isRTL(this.el) ? -1 : 1) * (scrollLeft / max);
        this.ionSegmentViewScroll.emit({
          scrollRatio,
          isManualScroll: this.isManualScroll ?? true
        });
        this.resetScrollEndTimeout();
      }
      /**
       * Handle touch start event to know when the user is actively dragging the segment view.
       */
      handleScrollStart() {
        if (this.scrollEndTimeout) {
          clearTimeout(this.scrollEndTimeout);
          this.scrollEndTimeout = null;
        }
        this.isTouching = true;
      }
      /**
       * Handle touch end event to know when the user is no longer dragging the segment view.
       */
      handleTouchEnd() {
        this.isTouching = false;
      }
      /**
       * Reset the scroll end detection timer. This is called on every scroll event.
       */
      resetScrollEndTimeout() {
        if (this.scrollEndTimeout) {
          clearTimeout(this.scrollEndTimeout);
          this.scrollEndTimeout = null;
        }
        this.scrollEndTimeout = setTimeout(
          () => {
            this.checkForScrollEnd();
          },
          // Setting this to a lower value may result in inconsistencies in behavior
          // across browsers (particularly Firefox).
          // Ideally, all of this logic is removed once the scroll end event is
          // supported on all browsers (https://caniuse.com/?search=scrollend)
          100
        );
      }
      /**
       * Check if the scroll has ended and the user is not actively touching.
       * If the conditions are met (active content is enabled and no active touch),
       * reset the scroll position and emit the scroll end event.
       */
      checkForScrollEnd() {
        if (!this.isTouching) {
          this.isManualScroll = void 0;
        }
      }
      /**
       * @internal
       *
       * This method is used to programmatically set the displayed segment content
       * in the segment view. Calling this method will update the `value` of the
       * corresponding segment button.
       *
       * @param id: The id of the segment content to display.
       * @param smoothScroll: Whether to animate the scroll transition.
       */
      setContent(id, smoothScroll = true) {
        return __async(this, null, function* () {
          const contents = this.getSegmentContents();
          const index = contents.findIndex((content) => content.id === id);
          if (index === -1)
            return;
          this.isManualScroll = false;
          this.resetScrollEndTimeout();
          const contentWidth = this.el.offsetWidth;
          const offset = index * contentWidth;
          this.el.scrollTo({
            top: 0,
            left: (isRTL(this.el) ? -1 : 1) * offset,
            behavior: smoothScroll ? "smooth" : "instant"
          });
        });
      }
      getSegmentContents() {
        return Array.from(this.el.querySelectorAll("ion-segment-content"));
      }
      render() {
        const { disabled, isManualScroll, swipeGesture } = this;
        return h(Host, { key: "b3cd48fead5d2877ead68cf6d81955fc31530c7a", class: {
          "segment-view-disabled": disabled,
          "segment-view-scroll-disabled": isManualScroll === false,
          "segment-view-swipe-disabled": swipeGesture === false
        } }, h("slot", { key: "ad5aa8b79790c490e13438afa0cbb2c241eab0a1" }));
      }
      get el() {
        return getElement(this);
      }
    };
    SegmentView.style = {
      ios: segmentViewIosCss(),
      md: segmentViewMdCss()
    };
  }
});
init_ion_segment_view_entry();
export {
  SegmentView as ion_segment_view
};
//# debugId=bfecb151-7cd5-5dca-89e1-cb52b2a87427
//# sourceMappingURL=chunk-MKWSEHHV.js.map
