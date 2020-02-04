import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { IUserRegistrationDTO } from "./user-registration-dto";
import { Router } from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.email = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.confirmPassword = new FormControl("", Validators.required);

    this.registrationFrom = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
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
        this.router.navigate(["user-login"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
}
