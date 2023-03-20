import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListOrganizationComponent } from './list-organization.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListOrganizationComponent }
    ])],
    exports: [RouterModule]
})
export class ListOrganizationRoutingModule { }
