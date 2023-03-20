import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListApproveComponent } from './list-approve.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListApproveComponent }
    ])],
    exports: [RouterModule]
})

export class ListApproveRoutingModule { }
