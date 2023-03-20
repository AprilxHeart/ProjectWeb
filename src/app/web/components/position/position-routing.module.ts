import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
      { path: '', loadChildren: () => import('./list-position/list-position.module').then(m => m.ListPositionModule) }
    ]
  )], 
  exports: [RouterModule]
})
export class PositionRoutingModule { }
