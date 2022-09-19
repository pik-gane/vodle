import { unique_name_validator$ } from './unique-form-validator';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

describe('Unique form validator, async', () => {

  it('should return observable with null if the name does not exist', (done) => {
    const ctrl = { value: 'California' };
    const av_fn: AsyncValidatorFn = unique_name_validator$(of(['Alaska']));
    const res = av_fn(ctrl as AbstractControl);
    (res as Observable<ValidationErrors | null>).subscribe(r => {
      expect(r).toBeNull();
      done();
    });
  });

  it('should return observable with saying it is not unique, if the name does exist', (done) => {
    const ctrl = { value: 'California' };
    const av_fn: AsyncValidatorFn = unique_name_validator$(of(['Alaska', 'California']));
    const res = av_fn(ctrl as AbstractControl);
    (res as Observable<ValidationErrors | null>).subscribe(r => {
      expect(r).toEqual({ not_unique: true });
      done();
    });
  });

})
