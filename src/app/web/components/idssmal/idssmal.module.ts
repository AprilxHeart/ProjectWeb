import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdssamlRoutingModule } from './idssaml-routing.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { LogoutCallbackComponent } from './logout-callback/logout-callback.component';



@NgModule({
  declarations: [
    //LoginCallbackComponent,
    //LogoutCallbackComponent
  ],
  imports: [
    CommonModule,
    IdssamlRoutingModule
  ]
})
export class IdssmalModule { }
