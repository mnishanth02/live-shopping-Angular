import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserPageRoutingModule } from "./user-routing.module";

import { UserPage } from "./user.page";
import { PopoverComponentPageModule } from "../popover-component/popover-component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    PopoverComponentPageModule,
  ],
  declarations: [UserPage],
})
export class UserPageModule {}
