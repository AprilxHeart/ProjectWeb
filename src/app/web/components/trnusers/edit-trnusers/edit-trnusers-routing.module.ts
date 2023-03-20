import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditTrnusersComponent } from './edit-trnusers.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EditTrnusersComponent }
    ])],
    exports: [RouterModule]
})
export class EditTrnusersRoutingModule { }
