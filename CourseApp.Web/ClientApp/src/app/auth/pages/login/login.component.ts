import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { ILoginDto } from "../../models/login-dto";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
        this.toastr.info("Sign in success.");
      },
      error => {
        this.toastr.error("Error occurred.");
        console.log(error);
      }
    );
  }
}
