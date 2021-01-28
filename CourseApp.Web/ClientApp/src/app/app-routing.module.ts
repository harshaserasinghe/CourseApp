import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./core/pages/error.component";

export const routes: Routes = [
  {
    path: "course",
    loadChildren: () =>
      import("./course/course.module").then(m => m.CourseModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  { path: "error", component: ErrorComponent },
  {
    path: "",
    redirectTo: "course",
    pathMatch: "full"
  },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
