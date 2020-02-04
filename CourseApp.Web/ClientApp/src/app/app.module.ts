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
import { OrderModule } from "ngx-order-pipe";
import { RegisterComponent } from "./users/register.component";
import { LoginComponent } from "./users/login.component";
import { LogoutComponent } from "./users/logout.component";
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseCreateComponent,
    CourseEditComponent,
    EnumMemberPipe,
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
