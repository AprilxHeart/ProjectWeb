import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTrnusersComponent } from './edit-trnusers.component';
import { EditTrnusersRoutingModule } from './edit-trnusers-routing.module';
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
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [EditTrnusersComponent],
  imports: [
    CommonModule,
    EditTrnusersRoutingModule,
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
    MessagesModule, ToastModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
    PanelModule,
    CalendarModule,
    FieldsetModule,
    AutoCompleteModule,
    VirtualScrollerModule, DividerModule, InputNumberModule,KeyFilterModule
  ]
})
export class EditTrnusersModule { }
