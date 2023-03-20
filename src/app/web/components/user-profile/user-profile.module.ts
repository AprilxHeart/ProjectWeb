import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
//import { CreateUserProfileComponent } from './create-UserProfile/create-UserProfile.component';
//import { EditUserProfileComponent } from './edit-UserProfile/edit-UserProfile.component';
//import { ListUserProfileComponent } from './list-UserProfile/list-UserProfile.component';
//import { CreateUserProfileComponent } from './create-UserProfile/create-UserProfile.component';


@NgModule({
  
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  declarations: [
    //CreateUserProfileComponent,
    //EditUserProfileComponent,
    //ListUserProfileComponent,
    //CreateUserProfileComponent
  ]
})

export class UserProfileModule { }
