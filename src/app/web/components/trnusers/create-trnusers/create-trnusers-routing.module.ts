import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateTrnusersComponent } from './create-trnusers.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CreateTrnusersComponent }
    ])],
    exports: [RouterModule]
})
export class CreateTrnusersRoutingModule { }
