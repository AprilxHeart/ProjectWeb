import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPositionRoutingModule } from './list-position-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ListPositionComponent } from './list-position.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [ListPositionComponent],
  imports: [
    CommonModule,
    ListPositionRoutingModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    DialogModule,
    PanelModule,
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
    ConfirmPopupModule
  ]
})
export class ListPositionModule { }