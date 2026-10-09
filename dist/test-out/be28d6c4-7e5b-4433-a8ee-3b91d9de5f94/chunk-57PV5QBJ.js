import {
  componentOnReady,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_index_BpRUsN_W,
  printRequiredElementError
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/index-TkLga3ma.js
var ION_CONTENT_TAG_NAME, ION_CONTENT_ELEMENT_SELECTOR, ION_CONTENT_CLASS_SELECTOR, ION_CONTENT_SELECTOR, isIonContent, getScrollElement, findIonContent, findClosestIonContent, findRefresherScrollHost, findRefresherInContent, scrollToTop, scrollByPoint, printIonContentErrorMsg, disableContentScrollY, resetContentScrollY;
var init_index_TkLga3ma = __esm({
  "node_modules/@ionic/core/dist/esm/index-TkLga3ma.js"() {
    init_helpers_BJqKF1pr();
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    ION_CONTENT_TAG_NAME = "ION-CONTENT";
    ION_CONTENT_ELEMENT_SELECTOR = "ion-content";
    ION_CONTENT_CLASS_SELECTOR = ".ion-content-scroll-host";
    ION_CONTENT_SELECTOR = `${ION_CONTENT_ELEMENT_SELECTOR}, ${ION_CONTENT_CLASS_SELECTOR}`;
    isIonContent = (el) => el.tagName === ION_CONTENT_TAG_NAME;
    getScrollElement = (el) => __async(null, null, function* () {
      if (isIonContent(el)) {
        yield new Promise((resolve) => componentOnReady(el, resolve));
        return el.getScrollElement();
      }
      return el;
    });
    findIonContent = (el) => {
      const customContentHost = el.querySelector(ION_CONTENT_CLASS_SELECTOR);
      if (customContentHost) {
        return customContentHost;
      }
      return el.querySelector(ION_CONTENT_SELECTOR);
    };
    findClosestIonContent = (el) => {
      return el.closest(ION_CONTENT_SELECTOR);
    };
    findRefresherScrollHost = (ionContent) => {
      return ionContent.querySelector(ION_CONTENT_CLASS_SELECTOR);
    };
    findRefresherInContent = (contentEl) => {
      if (isIonContent(contentEl)) {
        return contentEl.querySelector("ion-refresher");
      }
      const ionContent = contentEl.closest(ION_CONTENT_ELEMENT_SELECTOR);
      if (ionContent === null) {
        return null;
      }
      const refresherScrollHost = findRefresherScrollHost(ionContent);
      if (refresherScrollHost === null || !refresherScrollHost.contains(contentEl)) {
        return null;
      }
      return ionContent.querySelector("ion-refresher");
    };
    scrollToTop = (el, durationMs) => {
      if (isIonContent(el)) {
        const content = el;
        return content.scrollToTop(durationMs);
      }
      return Promise.resolve(el.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      }));
    };
    scrollByPoint = (el, x, y, durationMs) => {
      if (isIonContent(el)) {
        const content = el;
        return content.scrollByPoint(x, y, durationMs);
      }
      return Promise.resolve(el.scrollBy({
        top: y,
        left: x,
        behavior: durationMs > 0 ? "smooth" : "auto"
      }));
    };
    printIonContentErrorMsg = (el) => {
      return printRequiredElementError(el, ION_CONTENT_ELEMENT_SELECTOR);
    };
    disableContentScrollY = (contentEl) => {
      if (isIonContent(contentEl)) {
        const ionContent = contentEl;
        const initialScrollY = ionContent.scrollY;
        ionContent.scrollY = false;
        return initialScrollY;
      } else {
        contentEl.style.setProperty("overflow", "hidden");
        return true;
      }
    };
    resetContentScrollY = (contentEl, initialScrollY) => {
      if (isIonContent(contentEl)) {
        contentEl.scrollY = initialScrollY;
      } else {
        contentEl.style.removeProperty("overflow");
      }
    };
  }
});

export {
  ION_CONTENT_ELEMENT_SELECTOR,
  ION_CONTENT_CLASS_SELECTOR,
  isIonContent,
  getScrollElement,
  findIonContent,
  findClosestIonContent,
  findRefresherScrollHost,
  findRefresherInContent,
  scrollToTop,
  scrollByPoint,
  printIonContentErrorMsg,
  disableContentScrollY,
  resetContentScrollY,
  init_index_TkLga3ma
};
//# debugId=6e1c140a-1edf-59ae-9393-00a80e54f9cb
//# sourceMappingURL=chunk-57PV5QBJ.js.map
