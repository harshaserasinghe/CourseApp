import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { ILoginDto } from "./login-dto";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);

    this.loginFrom = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  login(): void {
    let cred: ILoginDto = {
      username: this.username.value,
      password: this.password.value
    };

    this.authService.login(cred).subscribe(
      token => {
        localStorage.setItem("jwt", token.token);
        this.router.navigate(["/"]);
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
