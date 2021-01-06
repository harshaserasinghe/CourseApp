import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.logout();
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem("jwt");
        this.router.navigate(["/"]);
        this.toastr.info("Sign out success.");
      },
      error => {
        this.toastr.error("Error occurred.");
        console.log(error);
      }
    );
  }
}
