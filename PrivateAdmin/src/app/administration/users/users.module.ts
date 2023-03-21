import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './users-list/dashboard/dashboard.component';
import { ListComponent } from './users-list/list/list.component';
import { FilterComponent } from './users-list/filter/filter.component';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';
import { UserDetailGuildsComponent } from './detail/user-detail-guilds/user-detail-guilds.component';
import { UserDetailSettingsComponent } from './detail/user-detail-settings/user-detail-settings.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: UserDetailComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        UserDetailComponent,
        UserDetailGuildsComponent,
        UserDetailSettingsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }
