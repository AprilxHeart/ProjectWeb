import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLocationComponent } from './view-location.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViewLocationComponent }
    ])],
    exports: [RouterModule]
})
export class ViewLocationRoutingModule { }
