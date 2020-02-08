import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IUserRegistrationDTO } from "src/app/auth/models/user-registration-dto";
import { ILoginDto } from "src/app/auth/models/login-dto";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authUrl: string = "";
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private jwtHelper: JwtHelperService,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    this.authUrl = `${this.baseUrl}api/auth`;
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  registerUser(user: IUserRegistrationDTO) {
    const registerUrl: string = `${this.authUrl}/register`;
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<IUserRegistrationDTO>(registerUrl, user, options)
      .pipe(catchError(this.errorService.handleError));
  }

  login(cred: ILoginDto) {
    const loginUrl: string = `${this.authUrl}/login`;
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<any>(loginUrl, cred, options)
      .pipe(catchError(this.errorService.handleError));
  }

  logout() {
    const loginUrl: string = `${this.authUrl}/logout`;
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<any>(loginUrl, options)
      .pipe(catchError(this.errorService.handleError));
  }
}
