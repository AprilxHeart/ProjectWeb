import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CreateProjectComponent }
    ])],
    exports: [RouterModule]
})
export class CreateProjectRoutingModule { }
