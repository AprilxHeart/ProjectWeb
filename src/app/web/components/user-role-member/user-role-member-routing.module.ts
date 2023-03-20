import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
        { path: '', loadChildren: () => import('./list-user-role-member/list-user-role-member.module').then(m => m.ListUserRoleModule) },
    ]
  )], 
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }
