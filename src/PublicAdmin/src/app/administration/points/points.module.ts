import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { PointsListComponent } from './points-list/points-list.component';

const routes: Routes = [
    { path: '', component: PointsListComponent },
];

@NgModule({
    declarations: [
        PointsListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PointsModule { }
