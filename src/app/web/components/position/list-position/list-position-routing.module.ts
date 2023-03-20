import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPositionComponent } from './list-position.component';
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListPositionComponent }
    ])],
    exports: [RouterModule]
})
export class ListPositionRoutingModule { }