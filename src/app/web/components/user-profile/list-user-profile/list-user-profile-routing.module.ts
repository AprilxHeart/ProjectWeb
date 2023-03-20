import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListUserProfileComponent } from './list-user-profile.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListUserProfileComponent }
    ])],
    exports: [RouterModule]
})
export class ListUserProfileRoutingModule { }
