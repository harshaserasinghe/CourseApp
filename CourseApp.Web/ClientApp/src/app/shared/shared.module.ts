import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrderModule } from "ngx-order-pipe";
import { EnumMemberPipe } from "./pipes/enum-member.pipe";

@NgModule({
  declarations: [EnumMemberPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OrderModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OrderModule,
    EnumMemberPipe
  ]
})
export class SharedModule {}
