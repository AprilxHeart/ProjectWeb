import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
        { path: '', loadChildren: () => import('./list-user-profile/list-user-profile.module').then(m => m.ListUserProfileModule) },
    ]
  )], 
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
