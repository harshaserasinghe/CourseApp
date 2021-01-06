import { ValidatorFn, FormControl } from "@angular/forms";

export function confirmPasswordValidator(
  password: FormControl,
  confirmPassword: FormControl
): ValidatorFn {
  return (): { [key: string]: any } | null => {
    if (password.value !== confirmPassword.value)
      return { confirmPasswordValidator: true };
    else return null;
  };
}
