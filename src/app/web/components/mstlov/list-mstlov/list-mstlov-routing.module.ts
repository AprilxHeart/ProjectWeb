import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMstlovComponent } from './list-mstlov.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListMstlovComponent }
    ])],
    exports: [RouterModule]
})
export class ListMstlovRoutingModule { }
