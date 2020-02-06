import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
    })
  ]
})
export class CoreModule {}

export function tokenGetter() {
  return localStorage.getItem("jwt");
}
