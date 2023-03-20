import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
        { path: '', loadChildren: () => import('./list-trnusers/list-trnusers.module').then(m => m.ListTrnusersModule) },
        { path: 'create', loadChildren: () => import('./create-trnusers/create-trnusers.module').then(m => m.CreateTrnusersModule) },
        { path: 'view', loadChildren: () => import('./view-trnusers/view-trnusers.module').then(m => m.ViewTrnusersModule) },
        { path: 'edit', loadChildren: () => import('./edit-trnusers/edit-trnusers.module').then(m => m.EditTrnusersModule) }
    ]
  )], 
  exports: [RouterModule]
})
export class TrnusersRoutingModule { }
