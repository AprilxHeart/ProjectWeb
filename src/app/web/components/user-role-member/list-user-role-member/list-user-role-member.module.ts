import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserRoleRoutingModule } from './list-user-role-member-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ListUserRoleComponent } from './list-user-role-member.component';
import {DialogModule} from 'primeng/dialog';
import { CalendarModule } from "primeng/calendar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [ListUserRoleComponent],
  imports: [
    CommonModule,
    ListUserRoleRoutingModule,
    ButtonModule,
    MenuModule,
    RippleModule,
    DialogModule,
    FormsModule,
    PanelModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    ConfirmDialogModule,
    MessagesModule,
	  ToastModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
  ]
})
export class ListUserRoleModule { }
