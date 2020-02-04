import { Routes } from "@angular/router";
import { CourseListComponent } from "../courses/course-list.component";
import { CourseDetailsComponent } from "../courses/course-details.component";
import { CourseCreateComponent } from "../courses/course-create.component";
import { CourseEditComponent } from "../courses/course-edit.component";
import { RegisterComponent } from "../users/register.component";
import { LoginComponent } from "../users/login.component";
import { LogoutComponent } from "../users/logout.component";
import { AuthGuard } from "./auth.guard";

export const appRoutes: Routes = [
  { path: "course-details/:id", component: CourseDetailsComponent },
  { path: "course-edit/:id", component: CourseEditComponent },
  {
    path: "course-create",
    component: CourseCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "user-register", component: RegisterComponent },
  { path: "user-login", component: LoginComponent },
  { path: "user-logout", component: LogoutComponent },
  { path: "", component: CourseListComponent, pathMatch: "full" }
];
