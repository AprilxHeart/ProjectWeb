import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutCallbackComponent } from './logout-callback.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LogoutCallbackComponent }
    ])],
    exports: [RouterModule]
})
export class LogoutCallbackRoutingModule { }
