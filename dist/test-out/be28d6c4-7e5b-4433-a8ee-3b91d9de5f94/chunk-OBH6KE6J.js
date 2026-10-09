import {
  inheritAttributes,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  init_dir_Dojwmvde
} from "./chunk-Z6RQ22J2.js";
import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  init_index_BpRUsN_W,
  printIonWarning,
  registerInstance
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-img.entry.js
var imgCss, Img, isDraggable;
var init_ion_img_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-img.entry.js"() {
    init_index_BpRUsN_W();
    init_helpers_BJqKF1pr();
    init_ionic_global_Cep6oYzK();
    init_dir_Dojwmvde();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    imgCss = () => `:host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}`;
    Img = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionImgWillLoad = createEvent(this, "ionImgWillLoad", 7);
        this.ionImgDidLoad = createEvent(this, "ionImgDidLoad", 7);
        this.ionError = createEvent(this, "ionError", 7);
        this.inheritedAttributes = {};
        this.onLoad = () => {
          this.ionImgDidLoad.emit();
        };
        this.onError = () => {
          this.ionError.emit();
        };
      }
      srcChanged() {
        this.addIO();
      }
      componentWillLoad() {
        this.inheritedAttributes = inheritAttributes(this.el, ["draggable"]);
      }
      componentDidLoad() {
        printIonWarning('[ion-img] - This component is deprecated and will be removed in Ionic v10. Use a native <img> with the loading="lazy" attribute instead.', this.el);
        this.addIO();
      }
      disconnectedCallback() {
        if (this.loadTimeout) {
          clearTimeout(this.loadTimeout);
        }
      }
      addIO() {
        if (this.loadTimeout) {
          clearTimeout(this.loadTimeout);
          this.loadTimeout = void 0;
        }
        if (this.src === void 0) {
          return;
        }
        if (typeof window !== "undefined" && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "isIntersecting" in window.IntersectionObserverEntry.prototype) {
          this.removeIO();
          this.io = new IntersectionObserver((data) => {
            if (data[data.length - 1].isIntersecting) {
              this.load();
              this.removeIO();
            }
          });
          this.io.observe(this.el);
        } else {
          this.loadTimeout = setTimeout(() => this.load(), 200);
        }
      }
      load() {
        this.loadError = this.onError;
        this.loadSrc = this.src;
        this.ionImgWillLoad.emit();
      }
      removeIO() {
        if (this.io) {
          this.io.disconnect();
          this.io = void 0;
        }
      }
      render() {
        const { loadSrc, alt, onLoad, loadError, inheritedAttributes } = this;
        const { draggable } = inheritedAttributes;
        return h(Host, { key: "57bfb44d9850381fe7b6fcf0c9019b03f7ef86ec", class: getIonMode(this) }, h("img", { key: "888ec06a266fa2751fc0147ede6a567f4e2b29a6", decoding: "async", src: loadSrc, alt, onLoad, onError: loadError, part: "image", draggable: isDraggable(draggable) }));
      }
      get el() {
        return getElement(this);
      }
      static get watchers() {
        return {
          "src": [{
            "srcChanged": 0
          }]
        };
      }
    };
    isDraggable = (draggable) => {
      switch (draggable) {
        case "true":
          return true;
        case "false":
          return false;
        default:
          return void 0;
      }
    };
    Img.style = imgCss();
  }
});
init_ion_img_entry();
export {
  Img as ion_img
};
//# debugId=ce557c51-efee-51e2-b7ef-ef2f4c9311b5
//# sourceMappingURL=chunk-OBH6KE6J.js.map
