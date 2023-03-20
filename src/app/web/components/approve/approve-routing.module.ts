import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
        { path: '', loadChildren: () => import('./list-approve/list-approve.module').then(m => m.ListApproveModule) },
    ]
  )], 
  exports: [RouterModule]
})
export class ApproveRoutingModule { }
