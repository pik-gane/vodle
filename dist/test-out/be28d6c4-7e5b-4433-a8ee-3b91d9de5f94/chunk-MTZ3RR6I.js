import {
  init_index_CK8uF0iB,
  sanitizeDOMTree
} from "./chunk-CPN2CPEA.js";
import {
  h,
  init_index_BpRUsN_W
} from "./chunk-ONSJ7667.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// node_modules/@ionic/core/dist/esm/select-option-render-BSDT9oSA.js
var cloneToVNode, renderClonedContent, renderOptionLabel;
var init_select_option_render_BSDT9oSA = __esm({
  "node_modules/@ionic/core/dist/esm/select-option-render-BSDT9oSA.js"() {
    init_index_BpRUsN_W();
    init_index_CK8uF0iB();
    /*!
     * (C) Ionic http://ionicframework.com - MIT License
     */
    cloneToVNode = (node, keyPrefix, index) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent ?? "";
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }
      const el = node;
      const tag = el.tagName.toLowerCase();
      const key = `${keyPrefix}-${index}`;
      const attrs = { key };
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes.item(i);
        attrs[attr.name] = attr.value;
      }
      const children = Array.from(el.childNodes).map((child, i) => cloneToVNode(child, key, i)).filter((c) => c !== null);
      return h(tag, attrs, children);
    };
    renderClonedContent = (id, content, className, useSpan = false) => {
      const Tag = useSpan ? "span" : "div";
      const keyPrefix = `${className}-${id}`;
      sanitizeDOMTree(content);
      return h(Tag, { class: className, key: keyPrefix }, Array.from(content.childNodes).map((child, i) => cloneToVNode(child, keyPrefix, i)));
    };
    renderOptionLabel = (option, className, useSpan = false) => {
      const { id, label, startContent, endContent, description } = option;
      const hasRichContent = !!startContent || !!endContent || !!description;
      const Tag = useSpan ? "span" : "div";
      if (!hasRichContent && (typeof label === "string" || !label)) {
        return h(Tag, { class: className, key: `${className}-${id}` }, label);
      }
      const labelEl = typeof label === "string" || !label ? (
        // Label is a simple string or undefined
        h(Tag, { key: `${className}-label-${id}` }, label)
      ) : (
        // Label is an HTMLElement with potential rich content
        renderClonedContent(id, label, `${className}-text`, useSpan)
      );
      if (!hasRichContent) {
        return h(Tag, { class: className, key: `${className}-${id}` }, labelEl);
      }
      return h(Tag, { class: `${className} ${className}-has-rich-content`, key: `${className}-${id}` }, startContent && renderClonedContent(id, startContent, "select-option-start", useSpan), h(Tag, { class: "select-option-content", key: `${className}-content-${id}` }, labelEl, description && h(Tag, { class: "select-option-description", key: `${className}-desc-${id}` }, description)), endContent && renderClonedContent(id, endContent, "select-option-end", useSpan));
    };
  }
});

export {
  renderOptionLabel,
  init_select_option_render_BSDT9oSA
};
//# debugId=7ae7965d-2e95-58b3-9d33-944d88d3d92a
//# sourceMappingURL=chunk-MTZ3RR6I.js.map
