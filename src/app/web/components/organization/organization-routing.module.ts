import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
        { path: '', loadChildren: () => import('./list-organization/list-organization.module').then(m => m.ListOrganizationModule) },
    ]
  )], 
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
