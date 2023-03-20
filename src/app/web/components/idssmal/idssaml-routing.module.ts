import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'callback/login', loadChildren: () => import('./login-callback/login-callback.module').then(m => m.LoginCallbackModule) },
        { path: 'callback/logout', loadChildren: () => import('./logout-callback/logout-callback.module').then(m => m.LogoutCallbackModule) },
        //{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ])],
    exports: [RouterModule]
})
export class IdssamlRoutingModule { }
