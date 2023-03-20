import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewTrnusersComponent } from './view-trnusers.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViewTrnusersComponent }
    ])],
    exports: [RouterModule]
})
export class ViewTrnusersRoutingModule { }
