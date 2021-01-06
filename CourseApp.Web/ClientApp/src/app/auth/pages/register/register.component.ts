import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { IUserRegistrationDTO } from "../../models/user-registration-dto";
import { Router } from "@angular/router";
import { confirmPasswordValidator } from "src/app/shared/validators/confirm-password.validator";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registrationFrom: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.confirmPassword = new FormControl("");

    this.registrationFrom = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });

    this.confirmPassword.setValidators([
      Validators.required,
      Validators.minLength(8),
      confirmPasswordValidator(this.password, this.confirmPassword)
    ]);
  }

  registerUser(): void {
    let user: IUserRegistrationDTO = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    };

    this.authService.registerUser(user).subscribe(
      () => {
        this.router.navigate(["/auth/login"]);
        this.toastr.info("Sign up success.");
      },
      error => {
        this.toastr.error("Error occurred.");
        console.log(error);
      }
    );
  }
}
