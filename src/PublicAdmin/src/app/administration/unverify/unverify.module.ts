import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { CurrentStateComponent } from './current-state/current-state.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: CurrentStateComponent },
    { path: 'logs', component: DashboardComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        CurrentStateComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UnverifyModule { }
