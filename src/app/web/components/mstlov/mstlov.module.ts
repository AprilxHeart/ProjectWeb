import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MstlovRoutingModule } from './mstlov-routing.module';
import { ListMstlovComponent } from './list-mstlov/list-mstlov.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import {SelectButtonModule} from 'primeng/selectbutton';




@NgModule({
  declarations: [
    ListMstlovComponent
  ],
  imports: [
    CommonModule,
    MstlovRoutingModule,
    TableModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    DropdownModule,
    ToastModule,
    FileUploadModule,
    ToolbarModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    MenuModule,
    PanelModule,
    SelectButtonModule


  ]
})
export class MstlovModule { }
