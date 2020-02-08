import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ICourseDTO } from "src/app/course/models/course-dto";
import { ICourseCreateDTO } from "src/app/course/models/course-create-dto";
import { ICourseUpdateDTO } from "src/app/course/models/course-update-dto";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courseUrl: string = "";

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    this.courseUrl = `${this.baseUrl}api/courses`;
  }

  getCourses(filter: string): Observable<ICourseDTO[]> {
    this.errorService;
    const params = new HttpParams().set("filter", filter);
    return this.http
      .get<ICourseDTO[]>(this.courseUrl, { params })
      .pipe(catchError(this.errorService.handleError));
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
      .pipe(catchError(this.errorService.handleError));
  }

  updateCourse(id: number, course: ICourseUpdateDTO) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .put(`${this.courseUrl}/${id}`, course, options)
      .pipe(catchError(this.errorService.handleError));
  }

  removeCourse(id: number) {
    return this.http
      .delete(`${this.courseUrl}/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }
}
