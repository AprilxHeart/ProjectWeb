import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLocationComponent } from './create-location.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:CreateLocationComponent }
    ])],
    exports: [RouterModule]
})
export class CreateLocationRoutingModule { }
