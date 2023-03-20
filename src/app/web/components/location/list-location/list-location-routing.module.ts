import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLocationComponent } from './list-location.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListLocationComponent }
    ])],
    exports: [RouterModule]
})
export class ListLocationRoutingModule { }
