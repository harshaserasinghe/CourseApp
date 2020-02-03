import { Routes } from "@angular/router";
import { CourseListComponent } from "../courses/course-list.component";
import { CourseDetailsComponent } from "../courses/course-details.component";
import { CourseCreateComponent } from "../courses/course-create.component";
import { CourseEditComponent } from "../courses/course-edit.component";
import { UserRegisterComponent } from "../users/user-register.component";

export const appRoutes: Routes = [
  { path: "course-details/:id", component: CourseDetailsComponent },
  { path: "course-edit/:id", component: CourseEditComponent },
  { path: "course-create", component: CourseCreateComponent },
  { path: "user-register", component: UserRegisterComponent },
  { path: "", component: CourseListComponent, pathMatch: "full" }
];
