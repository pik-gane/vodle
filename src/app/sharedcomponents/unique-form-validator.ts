import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

/** The options-name has to be unique */
export function unique_name_validator(names: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return names.includes(control.value) ? { not_unique: true } : null;
  };
}
