import {
  apply_format_shortcut,
  format_details,
  init_simple_format
} from "./chunk-HQCDYSGJ.js";
import {
  UntypedFormControl,
  init_forms
} from "./chunk-MMJERPYN.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-SGQRHDJN.js";
import "./chunk-CGNCHVYB.js";
import {
  __spreadValues
} from "./chunk-PKPTYHZH.js";

// src/app/simple-format.spec.ts
init_forms();
init_simple_format();
describe("simple formatting of details texts (#214)", () => {
  describe("format_details", () => {
    it("renders bold, italics and paragraphs", () => {
      expect(format_details("**bold** and *italics*")).toBe("<b>bold</b> and <i>italics</i>");
      expect(format_details("one\ntwo")).toBe("one<br/>two");
      expect(format_details("first paragraph\n\nsecond paragraph")).toBe("first paragraph<br/><br/>second paragraph");
      expect(format_details("windows\r\n\r\nlines")).toBe("windows<br/><br/>lines");
    });
    it("escapes everything that could be HTML, so the result is safe for [innerHtml]", () => {
      expect(format_details("<script>alert(1)<\/script>")).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
      expect(format_details('<b onmouseover="x()">no</b> & "quotes"')).toBe("&lt;b onmouseover=&quot;x()&quot;&gt;no&lt;/b&gt; &amp; &quot;quotes&quot;");
      expect(format_details("**<i>still escaped</i>**")).toBe("<b>&lt;i&gt;still escaped&lt;/i&gt;</b>");
    });
    it("leaves asterisks alone that do not mark anything", () => {
      expect(format_details("2 * 3 * 4")).toBe("2 * 3 * 4");
      expect(format_details("*unclosed")).toBe("*unclosed");
      expect(format_details("a ** b")).toBe("a ** b");
      expect(format_details("**")).toBe("**");
    });
    it("does not support links or underlining", () => {
      expect(format_details("[link](https://example.org) __u__")).toBe("[link](https://example.org) __u__");
    });
    it("renders nothing for nothing", () => {
      expect(format_details("")).toBe("");
      expect(format_details(null)).toBe("");
      expect(format_details(void 0)).toBe("");
    });
  });
  describe("apply_format_shortcut", () => {
    function field(value, start, end) {
      return {
        tagName: "TEXTAREA",
        value,
        selectionStart: start,
        selectionEnd: end,
        setSelectionRange(a, b) {
          this.selectionStart = a;
          this.selectionEnd = b;
        }
      };
    }
    function key(k, target, modifiers = { ctrlKey: true }) {
      return __spreadValues({ key: k, target, preventDefault: jasmine.createSpy("preventDefault"), altKey: false }, modifiers);
    }
    it("wraps the selection in ** for Ctrl-B and * for Ctrl-I, and updates the form control", () => {
      const control = new UntypedFormControl("hello world");
      const ta = field("hello world", 6, 11);
      const ev = key("b", ta);
      expect(apply_format_shortcut(ev, control)).toBeTrue();
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(ta.value).toBe("hello **world**");
      expect(control.value).toBe("hello **world**");
      expect([ta.selectionStart, ta.selectionEnd]).toEqual([8, 13]);
      expect(apply_format_shortcut(key("i", ta, { metaKey: true }), control)).toBeTrue();
      expect(ta.value).toBe("hello ***world***");
    });
    it("unwraps a selection that is already marked", () => {
      const control = new UntypedFormControl("hello **world**");
      const ta = field("hello **world**", 8, 13);
      expect(apply_format_shortcut(key("B", ta), control)).toBeTrue();
      expect(ta.value).toBe("hello world");
      expect(control.value).toBe("hello world");
    });
    it("inserts an empty pair at the caret when nothing is selected", () => {
      const control = new UntypedFormControl("ab");
      const ta = field("ab", 1, 1);
      expect(apply_format_shortcut(key("i", ta), control)).toBeTrue();
      expect(ta.value).toBe("a**b");
      expect([ta.selectionStart, ta.selectionEnd]).toEqual([2, 2]);
    });
    it("ignores other keys and unmodified letters", () => {
      const control = new UntypedFormControl("x");
      const ta = field("x", 0, 1);
      expect(apply_format_shortcut(key("b", ta, { ctrlKey: false }), control)).toBeFalse();
      expect(apply_format_shortcut(key("k", ta), control)).toBeFalse();
      expect(apply_format_shortcut(key("b", ta, { ctrlKey: true, altKey: true }), control)).toBeFalse();
      expect(ta.value).toBe("x");
    });
    it("finds the native field inside an ion-textarea host", () => {
      const control = new UntypedFormControl("abc");
      const inner = field("abc", 0, 3);
      const host = { tagName: "ION-TEXTAREA", querySelector: () => inner };
      expect(apply_format_shortcut(key("b", host), control)).toBeTrue();
      expect(control.value).toBe("**abc**");
    });
  });
});
//# debugId=0ebdc271-4a12-5646-b43c-0aae551c5980
//# sourceMappingURL=spec-app-simple-format.spec.js.map
