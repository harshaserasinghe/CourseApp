import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { CourseListComponent } from "./courses/course-list.component";
import { CourseDetailsComponent } from "./courses/course-details.component";
import { CourseCreateComponent } from "./courses/course-create.component";
import { CourseEditComponent } from "./courses/course-edit.component";
import { CourseDeleteComponent } from "./courses/course-delete.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent,
    CourseDeleteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: CourseListComponent, pathMatch: "full" },
      { path: "course-details/:id", component: CourseDetailsComponent },
      { path: "course-create", component: CourseCreateComponent },
      { path: "course-edit/:id", component: CourseEditComponent },
      { path: "course-delete/:id", component: CourseDeleteComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
