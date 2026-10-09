import {
  init_index_BpRUsN_W,
  printIonError,
  printIonWarning
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/index-CK8uF0iB.js
var sanitizeDOMString, sanitizeDOMTree, sanitizeElement, getElementChildren, isSanitizerEnabled, reflectPropertiesToAttributes, domStringAllowedAttributes, richContentAllowedAttributes, richContentAllowedAttributePrefixes, isAttributeAllowed, controlCharactersAndWhitespace, urlAttributes, safeDataImageUri, blockedTags, elementPropsToReflect, IonicSafeString;
var init_index_CK8uF0iB = __esm({
  "node_modules/@ionic/core/dist/esm/index-CK8uF0iB.js"() {
    init_index_BpRUsN_W();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    sanitizeDOMString = (untrustedString) => {
      try {
        if (untrustedString instanceof IonicSafeString) {
          return untrustedString.value;
        }
        if (!isSanitizerEnabled() || typeof untrustedString !== "string" || untrustedString === "") {
          return untrustedString;
        }
        if (/onload\s*=/i.test(untrustedString)) {
          printIonWarning("sanitizeDOMString - Content was discarded because it appears to contain an onload handler:", untrustedString.substring(0, 100));
          return "";
        }
        const documentFragment = document.createDocumentFragment();
        const workingDiv = document.createElement("div");
        documentFragment.appendChild(workingDiv);
        workingDiv.innerHTML = untrustedString;
        blockedTags.forEach((blockedTag) => {
          const getElementsToRemove = documentFragment.querySelectorAll(blockedTag);
          for (let elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
            const element = getElementsToRemove[elementIndex];
            if (element.parentNode) {
              element.parentNode.removeChild(element);
            } else {
              documentFragment.removeChild(element);
            }
            const childElements = getElementChildren(element);
            for (let childIndex = 0; childIndex < childElements.length; childIndex++) {
              sanitizeElement(childElements[childIndex], domStringAllowedAttributes);
            }
          }
        });
        const dfChildren = getElementChildren(documentFragment);
        for (let childIndex = 0; childIndex < dfChildren.length; childIndex++) {
          sanitizeElement(dfChildren[childIndex], domStringAllowedAttributes);
        }
        const fragmentDiv = document.createElement("div");
        fragmentDiv.appendChild(documentFragment);
        const getInnerDiv = fragmentDiv.querySelector("div");
        return getInnerDiv !== null ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;
      } catch (err) {
        printIonError("sanitizeDOMString", err);
        return "";
      }
    };
    sanitizeDOMTree = (root) => {
      if (!isSanitizerEnabled()) {
        return;
      }
      blockedTags.forEach((tag) => {
        const matches = root.querySelectorAll(tag);
        for (let i = matches.length - 1; i >= 0; i--) {
          matches[i].remove();
        }
      });
      sanitizeElement(root, richContentAllowedAttributes, richContentAllowedAttributePrefixes);
    };
    sanitizeElement = (element, allowedAttributes, allowedAttributePrefixes = []) => {
      if (element.nodeType && element.nodeType !== 1) {
        return;
      }
      if (typeof NamedNodeMap !== "undefined" && !(element.attributes instanceof NamedNodeMap)) {
        element.remove();
        return;
      }
      element.removeAttribute("style");
      for (let i = element.attributes.length - 1; i >= 0; i--) {
        const attribute = element.attributes.item(i);
        const attributeName = attribute.name;
        const lowerName = attributeName.toLowerCase();
        if (!isAttributeAllowed(lowerName, allowedAttributes, allowedAttributePrefixes)) {
          element.removeAttribute(attributeName);
          continue;
        }
        const attributeValue = attribute.value;
        if (attributeValue == null) {
          continue;
        }
        const normalizedValue = attributeValue.replace(controlCharactersAndWhitespace, "").toLowerCase();
        if (normalizedValue.includes("javascript:") || normalizedValue.includes("vbscript:")) {
          element.removeAttribute(attributeName);
          continue;
        }
        if (urlAttributes.includes(lowerName) && normalizedValue.startsWith("data:") && !safeDataImageUri.test(normalizedValue)) {
          element.removeAttribute(attributeName);
        }
      }
      const childElements = getElementChildren(element);
      for (let i = 0; i < childElements.length; i++) {
        sanitizeElement(childElements[i], allowedAttributes, allowedAttributePrefixes);
      }
    };
    getElementChildren = (el) => {
      return el.children != null ? el.children : el.childNodes;
    };
    isSanitizerEnabled = () => {
      const win = window;
      const config = win?.Ionic?.config;
      if (config) {
        if (config.get) {
          return config.get("sanitizerEnabled", true);
        } else {
          return config.sanitizerEnabled === true || config.sanitizerEnabled === void 0;
        }
      }
      return true;
    };
    reflectPropertiesToAttributes = (root) => {
      const candidates = [];
      if (root.tagName in elementPropsToReflect) {
        candidates.push(root);
      }
      for (const tagName of Object.keys(elementPropsToReflect)) {
        candidates.push(...Array.from(root.querySelectorAll(tagName.toLowerCase())));
      }
      for (const el of candidates) {
        if (!(el.tagName in elementPropsToReflect)) {
          continue;
        }
        const props = elementPropsToReflect[el.tagName];
        for (const prop of props) {
          const value = el[prop];
          if (typeof value === "string" && value.length > 0 && !el.hasAttribute(prop)) {
            el.setAttribute(prop, value);
          }
        }
      }
    };
    domStringAllowedAttributes = ["class", "id", "href", "src", "name", "slot"];
    richContentAllowedAttributes = [
      // Global / structural
      "class",
      "id",
      "slot",
      "name",
      "title",
      "alt",
      "lang",
      "dir",
      "role",
      "type",
      "value",
      "disabled",
      "width",
      "height",
      "href",
      "src",
      // Ionic component presentational props
      "color",
      "size",
      "shape",
      "fill",
      "expand",
      "mode",
      "theme",
      "icon",
      "label",
      "label-placement",
      "justify",
      "inset",
      "lines",
      "ios",
      "md",
      // SVG presentation attributes (compared lowercased, e.g. `viewBox`)
      "xmlns",
      "viewbox",
      "preserveaspectratio",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-opacity",
      "stroke-dasharray",
      "fill-rule",
      "fill-opacity",
      "clip-rule",
      "d",
      "points",
      "cx",
      "cy",
      "r",
      "rx",
      "ry",
      "x",
      "y",
      "x1",
      "y1",
      "x2",
      "y2",
      "transform",
      "opacity"
    ];
    richContentAllowedAttributePrefixes = ["aria-", "data-"];
    isAttributeAllowed = (lowerName, allowedAttributes, allowedAttributePrefixes) => {
      if (allowedAttributes.includes(lowerName)) {
        return true;
      }
      return allowedAttributePrefixes.some((prefix) => lowerName.startsWith(prefix));
    };
    controlCharactersAndWhitespace = /[\u0000-\u0020\u007f-\u00a0]/g;
    urlAttributes = ["href", "src"];
    safeDataImageUri = /^data:image\/(?:png|jpe?g|gif|webp|bmp|avif|x-icon|vnd\.microsoft\.icon)[;,]/;
    blockedTags = ["script", "style", "iframe", "meta", "link", "object", "embed", "base"];
    elementPropsToReflect = {
      "ION-ICON": ["icon", "name", "src", "ios", "md"]
    };
    IonicSafeString = class {
      constructor(value) {
        this.value = value;
      }
    };
  }
});

export {
  sanitizeDOMString,
  sanitizeDOMTree,
  reflectPropertiesToAttributes,
  blockedTags,
  init_index_CK8uF0iB
};
//# debugId=54c37224-9e71-53a8-98c7-283d2c76857a
//# sourceMappingURL=chunk-CPN2CPEA.js.map
