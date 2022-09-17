import { unique_name_validator } from './unique-form-validator';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

describe('Unique form validator', () => {

  it('should return null if the name does not exist', () => {
    const ctrl = { value: 'California' };
    const v_fn: ValidatorFn = unique_name_validator(['Alaska']);
    const res: ValidationErrors = v_fn(ctrl as AbstractControl);
    expect(res).toBeNull()
  });

  it('should return validation error if the name does exist', () => {
    const ctrl = { value: 'California' };
    const v_fn: ValidatorFn = unique_name_validator(['Alaska', 'California']);
    const res: ValidationErrors = v_fn(ctrl as AbstractControl);
    expect(res).toEqual({ not_unique: true });
  });

})
