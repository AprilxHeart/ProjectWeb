import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDivisionComponent } from './list-division.component';
const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListDivisionComponent }
    ])],
    exports: [RouterModule]
})
export class ListDivisionRoutingModule { }
