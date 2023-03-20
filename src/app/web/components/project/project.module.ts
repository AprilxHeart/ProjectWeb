import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
//import { CreateprojectComponent } from './create-project/create-project.component';
//import { ViewprojectComponent } from './view-project/view-project.component';
//import { ListprojectComponent } from './list-project/list-project.component';



@NgModule({
  declarations: [
    //ListprojectComponent
  
    //CreateprojectComponent
  
    //ViewprojectComponent
  
    //EditprojectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
