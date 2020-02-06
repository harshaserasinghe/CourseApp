import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseDetailsComponent } from "./pages/details/course-details.component";
import { CourseEditComponent } from "./pages/edit/course-edit.component";
import { CourseCreateComponent } from "./pages/create/course-create.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { CourseListComponent } from "./pages/list/course-list.component";

const routes: Routes = [
  { path: "details/:id", component: CourseDetailsComponent },
  { path: "edit/:id", component: CourseEditComponent },
  {
    path: "create",
    component: CourseCreateComponent
  },
  { path: "list", component: CourseListComponent },
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
