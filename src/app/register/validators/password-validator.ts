import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const c_value : string = control.value;
    const c_hasMinimumLength : boolean = c_value.length >= 12;
    const c_hasSpecialCharacter : boolean = /[!@#$%^&*(),.?":{}|<>]/.test(c_value);
    const c_hasNumber : boolean = /\d/.test(c_value);

    const passwordValid = c_hasMinimumLength && c_hasSpecialCharacter && c_hasNumber;
    return !passwordValid ? { passwordStrength: true } : null;
}