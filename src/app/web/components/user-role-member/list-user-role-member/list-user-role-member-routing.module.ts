import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListUserRoleComponent } from './list-user-role-member.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListUserRoleComponent }
    ])],
    exports: [RouterModule]
})
export class ListUserRoleRoutingModule { }
