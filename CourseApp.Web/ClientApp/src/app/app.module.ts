import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [AppComponent, NavMenuComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
