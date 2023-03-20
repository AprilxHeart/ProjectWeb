import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateLocationComponent } from './update-location.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UpdateLocationComponent }
    ])],
    exports: [RouterModule]
})
export class UpdateLocationRoutingModule { }
