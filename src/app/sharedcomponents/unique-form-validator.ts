import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'

/** The option-name has to be unique */

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
