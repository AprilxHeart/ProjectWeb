import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(
        [

            { path: '', loadChildren: () => import('./list-division/list-division.module').then(m => m.ListDivisionModule) },
            { path: 'back', loadChildren: () => import('../organization/list-organization/list-organization.module').then(m => m.ListOrganizationModule) },
            { path: 'position', loadChildren: () => import('../position/list-position/list-position.module').then(m => m.ListPositionModule) }
        ]
      )],
      exports: [RouterModule]
})
export class DivisionRoutingModule { }
