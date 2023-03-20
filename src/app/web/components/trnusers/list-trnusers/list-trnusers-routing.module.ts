import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListTrnusersComponent } from './list-trnusers.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListTrnusersComponent }
    ])],
    exports: [RouterModule]
})
export class ListTrnusersRoutingModule { }
