import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLocationComponent } from './list-location/list-location.component';
import { LocationRoutingModule } from './location-routing.module';
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
import { CalendarModule } from "primeng/calendar";
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { CreateLocationComponent } from './create-location/create-location/create-location.component';
import { UpdateLocationComponent } from './update-location/update-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';


@NgModule({
  declarations: [
    ListLocationComponent,
    CreateLocationComponent,
    UpdateLocationComponent,
    ViewLocationComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
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
    CalendarModule,
    PanelModule,
    MenuModule,
    DividerModule,
    SplitterModule,
    FieldsetModule,
    SplitButtonModule,
    AccordionModule
  ]
})
export class LocationModule { }
