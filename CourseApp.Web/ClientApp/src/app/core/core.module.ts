import { NgModule, Optional, SkipSelf } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ErrorComponent } from "./pages/error.component";
import { JwtModule } from "@auth0/angular-jwt";
import { throwIfAlreadyLoaded } from "./guards/module-import.guard";

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}

export function tokenGetter(): any {
  return localStorage.getItem("jwt");
}
