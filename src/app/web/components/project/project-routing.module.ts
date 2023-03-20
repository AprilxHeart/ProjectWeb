import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({


   imports: [RouterModule.forChild(
    [
     
        { path: '', loadChildren: () => import('./list-project/list-project.module').then(m => m.ListProjectModule) },
        { path: 'create', loadChildren: () => import('./create-project/create-project.module').then(m => m.CreateProjectModule) },
        { path: 'view', loadChildren: () => import('./view-project/view-project.module').then(m => m.ViewProjectModule) },
        { path: 'edit', loadChildren: () => import('./edit-project/edit-project.module').then(m => m.EditProjectModule) }
    ]
  )], 
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
