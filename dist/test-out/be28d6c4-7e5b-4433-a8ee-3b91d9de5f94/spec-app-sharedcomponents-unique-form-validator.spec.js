import {
  init_unique_form_validator,
  unique_name_validator$
} from "./chunk-3ELJSMGV.js";
import {
  init_esm,
  of
} from "./chunk-CGNCHVYB.js";
import "./chunk-PKPTYHZH.js";

// src/app/sharedcomponents/unique-form-validator.spec.ts
init_unique_form_validator();
init_esm();
describe("Unique form validator, async", () => {
  it("should return observable with null if the name does not exist", (done) => {
    const ctrl = { value: "California", valueChanges: of("California"), pristine: false };
    const av_fn = unique_name_validator$(of(["Alaska"]));
    const res = av_fn(ctrl);
    res.subscribe((r) => {
      expect(r).toBeNull();
      done();
    });
  });
  it("should return observable with saying it is not unique, if the name does exist", (done) => {
    const ctrl = { value: "California", valueChanges: of("California"), pristine: false };
    const av_fn = unique_name_validator$(of(["Alaska", "California"]));
    const res = av_fn(ctrl);
    res.subscribe((r) => {
      expect(r).toEqual({ not_unique: true });
      done();
    });
  });
});
//# debugId=e09eb4f5-5ba5-5f92-9450-d39934b3493a
//# sourceMappingURL=spec-app-sharedcomponents-unique-form-validator.spec.js.map
