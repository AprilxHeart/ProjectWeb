import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleRoutingModule } from './user-role-member-routing.module';
//import { CreateUserRoleComponent } from './create-UserRole/create-UserRole.component';
//import { EditUserRoleComponent } from './edit-UserRole/edit-UserRole.component';
//import { ListUserRoleComponent } from './list-UserRole/list-UserRole.component';
//import { CreateUserRoleComponent } from './create-UserRole/create-UserRole.component';


@NgModule({
  
  imports: [
    CommonModule,
    UserRoleRoutingModule
  ],
  declarations: [
    //CreateUserRoleComponent,
    //EditUserRoleComponent,
    //ListUserRoleComponent,
    //CreateUserRoleComponent
  ]
})

export class UserRoleModule { }
