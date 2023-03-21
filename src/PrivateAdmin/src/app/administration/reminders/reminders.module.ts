import { NgModule } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        FilterComponent,
        DashboardComponent,
        ListComponent,
        DetailModalComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class RemindersModule { }
