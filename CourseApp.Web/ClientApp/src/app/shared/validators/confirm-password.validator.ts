import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";

export function confirmPasswordValidator(
  password: string,
  confirmPassword: string
): ValidatorFn {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    debugger;
    const control = formGroup.controls[password];
    const matchingControl = formGroup.controls[confirmPassword];
    if (control.value || matchingControl.value) return;
    if (control.value !== matchingControl.value)
      return { confirmPasswordValidator: true };
    else return null;
  };
}
