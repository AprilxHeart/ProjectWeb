import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserProfileRoutingModule } from './list-user-profile-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ListUserProfileComponent } from './list-user-profile.component';
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
  declarations: [ListUserProfileComponent],
  imports: [
    CommonModule,
    ListUserProfileRoutingModule,
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
export class ListUserProfileModule { }
