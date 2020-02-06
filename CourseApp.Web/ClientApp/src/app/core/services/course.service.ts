import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ICourseDTO } from "src/app/course/models/course-dto";
import { ICourseCreateDTO } from "src/app/course/models/course-create-dto";
import { ICourseUpdateDTO } from "src/app/course/models/course-update-dto";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courseUrl: string = "";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    this.courseUrl = `${this.baseUrl}api/courses`;
  }

  getCourses(filter: string): Observable<ICourseDTO[]> {
    const params = new HttpParams().set("filter", filter);
    return this.http
      .get<ICourseDTO[]>(this.courseUrl, { params })
      .pipe(catchError(this.handleError));
  }

  getCourse(id: number): Observable<ICourseDTO> {
    return this.http
      .get<ICourseDTO>(`${this.courseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addCourse(course: ICourseCreateDTO): Observable<ICourseDTO> {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<ICourseDTO>(this.courseUrl, course, options)
      .pipe(catchError(this.handleError));
  }

  updateCourse(id: number, course: ICourseUpdateDTO) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .put(`${this.courseUrl}/${id}`, course, options)
      .pipe(catchError(this.handleError));
  }

  removeCourse(id: number) {
    return this.http
      .delete(`${this.courseUrl}/${id}`)
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
