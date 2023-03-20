import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditProjectComponent } from './edit-project.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EditProjectComponent }
    ])],
    exports: [RouterModule]
})
export class EditProjectRoutingModule { }
