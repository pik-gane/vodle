import {
  getIonMode,
  init_ionic_global_Cep6oYzK
} from "./chunk-URXKFSPR.js";
import {
  Host,
  getElement,
  h,
  init_index_BpRUsN_W,
  readTask,
  registerInstance,
  writeTask
} from "./chunk-ONSJ7667.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/ion-ripple-effect.entry.js
var rippleEffectCss, RippleEffect, removeRipple, PADDING, INITIAL_ORIGIN_SCALE;
var init_ion_ripple_effect_entry = __esm({
  "node_modules/@ionic/core/dist/esm/ion-ripple-effect.entry.js"() {
    init_index_BpRUsN_W();
    init_ionic_global_Cep6oYzK();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    rippleEffectCss = () => `:host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}`;
    RippleEffect = class {
      constructor(hostRef) {
        registerInstance(this, hostRef);
        this.type = "bounded";
      }
      /**
       * Adds the ripple effect to the parent element.
       *
       * @param x The horizontal coordinate of where the ripple should start.
       * @param y The vertical coordinate of where the ripple should start.
       */
      addRipple(x, y) {
        return __async(this, null, function* () {
          return new Promise((resolve) => {
            readTask(() => {
              const rect = this.el.getBoundingClientRect();
              const width = rect.width;
              const height = rect.height;
              const hypotenuse = Math.sqrt(width * width + height * height);
              const maxDim = Math.max(height, width);
              const maxRadius = this.unbounded ? maxDim : hypotenuse + PADDING;
              const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
              const finalScale = maxRadius / initialSize;
              let posX = x - rect.left;
              let posY = y - rect.top;
              if (this.unbounded) {
                posX = width * 0.5;
                posY = height * 0.5;
              }
              const styleX = posX - initialSize * 0.5;
              const styleY = posY - initialSize * 0.5;
              const moveX = width * 0.5 - posX;
              const moveY = height * 0.5 - posY;
              writeTask(() => {
                const div = document.createElement("div");
                div.classList.add("ripple-effect");
                const style = div.style;
                style.top = styleY + "px";
                style.left = styleX + "px";
                style.width = style.height = initialSize + "px";
                style.setProperty("--final-scale", `${finalScale}`);
                style.setProperty("--translate-end", `${moveX}px, ${moveY}px`);
                const container = this.el.shadowRoot || this.el;
                container.appendChild(div);
                setTimeout(() => {
                  resolve(() => {
                    removeRipple(div);
                  });
                }, 225 + 100);
              });
            });
          });
        });
      }
      get unbounded() {
        return this.type === "unbounded";
      }
      render() {
        const mode = getIonMode(this);
        return h(Host, { key: "371350cb76e98338ef7467191aaaf817b1298b3f", role: "presentation", class: {
          [mode]: true,
          unbounded: this.unbounded
        } });
      }
      get el() {
        return getElement(this);
      }
    };
    removeRipple = (ripple) => {
      ripple.classList.add("fade-out");
      setTimeout(() => {
        ripple.remove();
      }, 200);
    };
    PADDING = 10;
    INITIAL_ORIGIN_SCALE = 0.5;
    RippleEffect.style = rippleEffectCss();
  }
});
init_ion_ripple_effect_entry();
export {
  RippleEffect as ion_ripple_effect
};
//# debugId=5c99c765-3d1c-59d1-9de1-759880c41252
//# sourceMappingURL=chunk-ZYUWOUOO.js.map
