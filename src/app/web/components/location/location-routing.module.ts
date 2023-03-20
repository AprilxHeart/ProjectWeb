import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(
        [

            { path: '', loadChildren: () => import('./list-location/list-location.module').then(m => m.ListLocationModule) },
            { path: 'create', loadChildren: () => import('./create-location/create-location/create-location.module').then(m => m.CreateLocationModule) },
            { path: 'update', loadChildren: () => import('./update-location/update-location.module').then(m => m.UpdateLocationModule) },
            { path: 'view', loadChildren: () => import('./view-location/view-location.module').then(m => m.ViewLocationModule) }
        ]
      )],
      exports: [RouterModule]
})
export class LocationRoutingModule { }
