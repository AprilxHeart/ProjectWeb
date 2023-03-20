import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewProjectComponent } from './view-project.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViewProjectComponent }
    ])],
    exports: [RouterModule]
})
export class ViewProjectRoutingModule { }
