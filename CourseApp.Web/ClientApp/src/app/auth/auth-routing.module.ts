import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { LogoutComponent } from "./pages/logout/logout.component";

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
