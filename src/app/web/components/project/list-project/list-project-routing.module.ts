import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListProjectComponent } from './list-project.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListProjectComponent }
    ])],
    exports: [RouterModule]
})
export class ListProjectRoutingModule { }
