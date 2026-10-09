import {
  componentOnReady,
  init_helpers_BJqKF1pr
} from "./chunk-LEFG5EZ6.js";
import {
  __async,
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/framework-delegate-CDjM1vRH.js
var attachComponent, detachComponent, CoreDelegate;
var init_framework_delegate_CDjM1vRH = __esm({
  "node_modules/@ionic/core/dist/esm/framework-delegate-CDjM1vRH.js"() {
    init_helpers_BJqKF1pr();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    attachComponent = (delegate, container, component, cssClasses, componentProps, inline) => __async(null, null, function* () {
      if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
      }
      if (!inline && typeof component !== "string" && !(component instanceof HTMLElement)) {
        throw new Error("framework delegate is missing");
      }
      const el = typeof component === "string" ? container.ownerDocument?.createElement(component) : component;
      if (cssClasses) {
        cssClasses.forEach((c) => el.classList.add(c));
      }
      if (componentProps) {
        Object.assign(el, componentProps);
      }
      container.appendChild(el);
      yield new Promise((resolve) => componentOnReady(el, resolve));
      return el;
    });
    detachComponent = (delegate, element) => {
      if (element) {
        if (delegate) {
          const container = element.parentElement;
          return delegate.removeViewFromDom(container, element);
        }
        element.remove();
      }
      return Promise.resolve();
    };
    CoreDelegate = () => {
      let BaseComponent;
      let Reference;
      const attachViewToDom = (_0, _1, ..._2) => __async(null, [_0, _1, ..._2], function* (parentElement, userComponent, userComponentProps = {}, cssClasses = []) {
        BaseComponent = parentElement;
        let ChildComponent;
        if (userComponent) {
          const el = typeof userComponent === "string" ? BaseComponent.ownerDocument?.createElement(userComponent) : userComponent;
          cssClasses.forEach((c) => el.classList.add(c));
          Object.assign(el, userComponentProps);
          BaseComponent.appendChild(el);
          ChildComponent = el;
          yield new Promise((resolve) => componentOnReady(el, resolve));
        } else if (BaseComponent.children.length > 0 && (BaseComponent.tagName === "ION-MODAL" || BaseComponent.tagName === "ION-POPOVER")) {
          const root = ChildComponent = BaseComponent.children[0];
          if (!root.classList.contains("ion-delegate-host")) {
            const el = BaseComponent.ownerDocument?.createElement("div");
            el.classList.add("ion-delegate-host");
            cssClasses.forEach((c) => el.classList.add(c));
            el.append(...BaseComponent.children);
            BaseComponent.appendChild(el);
            ChildComponent = el;
          }
        }
        const app = document.querySelector("ion-app") || document.body;
        Reference = document.createComment("ionic teleport");
        BaseComponent.parentNode.insertBefore(Reference, BaseComponent);
        app.appendChild(BaseComponent);
        return ChildComponent ?? BaseComponent;
      });
      const removeViewFromDom = () => {
        if (BaseComponent && Reference) {
          Reference.parentNode.insertBefore(BaseComponent, Reference);
          Reference.remove();
        }
        return Promise.resolve();
      };
      return { attachViewToDom, removeViewFromDom };
    };
  }
});

export {
  attachComponent,
  detachComponent,
  CoreDelegate,
  init_framework_delegate_CDjM1vRH
};
//# debugId=d812ff43-8e5f-5762-bd16-bb7c37c9cbb5
//# sourceMappingURL=chunk-62ARMAPG.js.map
