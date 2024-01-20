import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './user-measures-list/dashboard/dashboard.component';
import { FilterComponent } from './user-measures-list/filter/filter.component';
import { ListComponent } from './user-measures-list/list/list.component';
import { CreateWarningComponent } from './create-warning/create-warning.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'createWarning', component: CreateWarningComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        CreateWarningComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UserMeasuresModule { }
