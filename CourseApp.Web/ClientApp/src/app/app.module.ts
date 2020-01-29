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
import { EnumMemberPipe } from "./shared/enum-member.pipe";
import { appRoutes } from "./shared/routes";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent,
    EnumMemberPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
