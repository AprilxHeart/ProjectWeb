import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
    imports: [RouterModule.forChild(
        [

            { path: '', loadChildren: () => import('./list-mstlov/list-mstlov.module').then(m => m.ListMstlovModule) },
        ]
      )],
      exports: [RouterModule]
})
export class MstlovRoutingModule { }
