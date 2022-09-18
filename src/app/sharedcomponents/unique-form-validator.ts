import { AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'

/** The options-name has to be unique */

export function unique_name_validator$(value$: Observable<string[]>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return value$.pipe(
      map(names => {
        return names.includes(control.value) ? { not_unique: true } : null;
      }),
      take(1)
    )
  };
}

export function unique_name_validator(names: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return names.includes(control.value) ? { not_unique: true } : null;
  };
}


// // this one makes the focus go crazy in the form
// export function unique_name_validator_values_from_form(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const allValuesInForm = control.root.value;
//     if (allValuesInForm && control.value) {
//       const keys = Object.keys(allValuesInForm).filter(key => key.includes('option_name'));
//       const names: string[] = [];
//       keys.forEach(key => names.push(allValuesInForm[key]));
//       return names?.includes(control.value) ? { not_unique: true } : null;
//     } else {
//       return { not_unique: true };
//     }
//   };
// };
