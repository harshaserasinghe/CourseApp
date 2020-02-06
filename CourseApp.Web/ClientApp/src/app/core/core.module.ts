import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ]
})
export class CoreModule {}

export function tokenGetter(): any {
  return localStorage.getItem("jwt");
}
