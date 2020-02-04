import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { IUserRegistrationDTO } from "./user-registration-dto";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ILoginDto } from "./login-dto";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authUrl: string = "";
  constructor(
    private http: HttpClient,
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
      .pipe(catchError(this.handleError));
  }

  login(cred: ILoginDto) {
    const loginUrl: string = `${this.authUrl}/login`;
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<any>(loginUrl, cred, options)
      .pipe(catchError(this.handleError));
  }

  logout() {
    const loginUrl: string = `${this.authUrl}/logout`;
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<any>(loginUrl, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
