import {
  init_esm,
  init_operators,
  map,
  of,
  take
} from "./chunk-CGNCHVYB.js";
import {
  __esm
} from "./chunk-PKPTYHZH.js";

// src/app/sharedcomponents/unique-form-validator.ts
function unique_name_validator$(value$) {
  return (control) => {
    if (!control.valueChanges || control.pristine) {
      return of(null);
    }
    return value$.pipe(map((names) => {
      return names.includes(control.value) ? { not_unique: true } : null;
    }), take(1));
  };
}
var init_unique_form_validator = __esm({
  "src/app/sharedcomponents/unique-form-validator.ts"() {
    init_esm();
    init_operators();
  }
});

export {
  unique_name_validator$,
  init_unique_form_validator
};
//# debugId=b95c2b9e-4926-5ffe-b1fc-1cac7997ff69
//# sourceMappingURL=chunk-3ELJSMGV.js.map
