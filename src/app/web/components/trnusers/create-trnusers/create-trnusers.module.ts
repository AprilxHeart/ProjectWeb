import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
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
import { PanelModule } from 'primeng/panel';
import { CreateTrnusersRoutingModule } from './create-trnusers-routing.module';
import { CreateTrnusersComponent } from './create-trnusers.component';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {VirtualScrollerModule} from "primeng/virtualscroller";
import { DividerModule } from 'primeng/divider';
import {InputNumberModule} from "primeng/inputnumber";
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [CreateTrnusersComponent],
    imports: [
        CommonModule,
        CreateTrnusersRoutingModule,
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
        VirtualScrollerModule,DividerModule,InputNumberModule,KeyFilterModule
    ]
})

export class CreateTrnusersModule { }
