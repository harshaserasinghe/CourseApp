import { NgModule } from "@angular/core";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { LogoutComponent } from "./pages/logout/logout.component";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [RegisterComponent, LoginComponent, LogoutComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
