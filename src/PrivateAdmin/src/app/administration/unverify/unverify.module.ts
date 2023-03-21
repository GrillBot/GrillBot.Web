import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { CurrentStateComponent } from './current-state/current-state.component';
import { UpdateUnverifyTimeModalComponent } from './update-unverify-time-modal/update-unverify-time-modal.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: CurrentStateComponent },
    { path: 'logs', component: DashboardComponent }
];


@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        CurrentStateComponent,
        UpdateUnverifyTimeModalComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UnverifyModule { }
