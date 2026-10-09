import {
  ariaAttributes,
  inheritAttributes,
  init_helpers_BJqKF1pr,
  win
} from "./chunk-LEFG5EZ6.js";
import {
  __esm,
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/attribute-controller-DPMIcbef.js
var createAttributeController, createAriaAttributeController;
var init_attribute_controller_DPMIcbef = __esm({
  "node_modules/@ionic/core/dist/esm/attribute-controller-DPMIcbef.js"() {
    init_helpers_BJqKF1pr();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    createAttributeController = (el, attributes, onChange, hostOwnedAttributes = []) => {
      let inherited = inheritAttributes(el, attributes);
      let observer;
      const watchedAttributes = attributes.filter((attr) => !hostOwnedAttributes.includes(attr));
      const hostWritten = /* @__PURE__ */ new Set();
      const setPresence = (name, value) => {
        if (value === null) {
          hostWritten.delete(name);
        } else {
          hostWritten.add(name);
        }
      };
      const readMissedChanges = () => {
        const changed = {};
        for (const name of watchedAttributes) {
          const value = el.getAttribute(name);
          const wasOnHost = hostWritten.has(name);
          setPresence(name, value);
          if (value === null && !wasOnHost || value === inherited[name]) {
            continue;
          }
          changed[name] = value;
        }
        if (Object.keys(changed).length > 0) {
          inherited = __spreadValues(__spreadValues({}, inherited), changed);
          onChange();
        }
      };
      const init = () => {
        if (observer !== void 0 || watchedAttributes.length === 0 || win === void 0 || !("MutationObserver" in win)) {
          return;
        }
        readMissedChanges();
        observer = new MutationObserver((mutations) => {
          const changed = {};
          for (const mutation of mutations) {
            const name = mutation.attributeName;
            const value = el.getAttribute(name);
            setPresence(name, value);
            changed[name] = value;
          }
          inherited = __spreadValues(__spreadValues({}, inherited), changed);
          onChange();
        });
        observer.observe(el, { attributeFilter: watchedAttributes });
      };
      const destroy = () => {
        observer?.disconnect();
        observer = void 0;
      };
      init();
      return {
        get attributes() {
          return inherited;
        },
        init,
        destroy
      };
    };
    createAriaAttributeController = (el, onChange, hostOwnedAttributes = []) => {
      return createAttributeController(el, ariaAttributes, onChange, hostOwnedAttributes);
    };
  }
});

export {
  createAttributeController,
  createAriaAttributeController,
  init_attribute_controller_DPMIcbef
};
//# debugId=9aca3752-0c2d-561f-8ebd-07d299e9f19a
//# sourceMappingURL=chunk-F4FVLEFZ.js.map
