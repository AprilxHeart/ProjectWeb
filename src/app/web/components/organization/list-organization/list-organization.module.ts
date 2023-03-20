import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrganizationRoutingModule } from './list-organization-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ListOrganizationComponent } from './list-organization.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {VirtualScrollerModule} from "primeng/virtualscroller";
import { KeyFilterModule } from 'primeng/keyfilter';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ListOrganizationComponent],
  imports: [
    CommonModule,
    ListOrganizationRoutingModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    FormsModule,
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
    ReactiveFormsModule, VirtualScrollerModule,KeyFilterModule
  ]
})
export class ListOrganizationModule { }
