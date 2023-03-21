import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './channels-list/dashboard/dashboard.component';
import { ListComponent } from './channels-list/list/list.component';
import { FilterComponent } from './channels-list/filter/filter.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: ChannelDetailComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        ChannelDetailComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ChannelsModule { }
