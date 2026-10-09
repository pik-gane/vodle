import {
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/simple-format.ts
function format_details(text) {
  if (!text) {
    return "";
  }
  const escaped = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return escaped.replace(/\*\*(\S(?:[^*\n]*\S)?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*(\S(?:[^*\n]*\S)?)\*(?!\*)/g, "$1<i>$2</i>").replace(/\r\n?/g, "\n").replace(/\n[ \t]*\n+/g, "<br/><br/>").replace(/\n/g, "<br/>");
}
function apply_format_shortcut(ev, control) {
  if (!ev || !(ev.ctrlKey || ev.metaKey) || ev.altKey) {
    return false;
  }
  const key = (ev.key || "").toLowerCase();
  const mark = key === "b" ? "**" : key === "i" ? "*" : null;
  if (!mark) {
    return false;
  }
  const target = ev.target;
  const field = target && ["TEXTAREA", "INPUT"].includes(target.tagName) ? target : target?.querySelector?.("textarea, input");
  if (!field) {
    return false;
  }
  ev.preventDefault();
  const text = field.value || "", start = field.selectionStart ?? text.length, end = field.selectionEnd ?? start, selected = text.slice(start, end), wrapped = start >= mark.length && text.slice(start - mark.length, start) === mark && text.slice(end, end + mark.length) === mark && text[start - mark.length - 1] !== "*" && text[end + mark.length] !== "*", next = wrapped ? text.slice(0, start - mark.length) + selected + text.slice(end + mark.length) : text.slice(0, start) + mark + selected + mark + text.slice(end), caret = wrapped ? start - mark.length : start + mark.length;
  field.value = next;
  control?.setValue(next);
  control?.markAsDirty();
  if (typeof field.setSelectionRange === "function") {
    field.setSelectionRange(caret, caret + selected.length);
  }
  return true;
}
var init_simple_format = __esm({
  "src/app/simple-format.ts"() {
  }
});

export {
  format_details,
  apply_format_shortcut,
  init_simple_format
};
//# debugId=6498a60c-327a-5f37-80ac-296a20e77a4f
//# sourceMappingURL=chunk-HQCDYSGJ.js.map
