import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './invites-list/dashboard/dashboard.component';
import { ListComponent } from './invites-list/list/list.component';
import { FilterComponent } from './invites-list/filter/filter.component';
import { RouterModule, Routes } from '@angular/router';
import { ServiceOperationsComponent } from './service-operations/service-operations.component';
import { RefreshCacheModalComponent } from './modals/refresh-cache-modal/refresh-cache-modal.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'service', component: ServiceOperationsComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        ServiceOperationsComponent,
        RefreshCacheModalComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class InvitesModule { }
