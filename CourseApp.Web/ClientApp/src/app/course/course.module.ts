import { NgModule } from "@angular/core";
import { CourseListComponent } from "./pages/list/course-list.component";
import { CourseDetailsComponent } from "./pages/details/course-details.component";
import { CourseCreateComponent } from "./pages/create/course-create.component";
import { CourseEditComponent } from "./pages/edit/course-edit.component";
import { CourseRoutingModule } from "./course-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent
  ],
  imports: [CourseRoutingModule, SharedModule]
})
export class CourseModule {}
