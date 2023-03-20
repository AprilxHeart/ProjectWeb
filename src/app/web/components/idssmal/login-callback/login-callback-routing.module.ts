import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginCallbackComponent } from './login-callback.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginCallbackComponent }
    ])],
    exports: [RouterModule]
})
export class LoginCallbackRoutingModule { }
