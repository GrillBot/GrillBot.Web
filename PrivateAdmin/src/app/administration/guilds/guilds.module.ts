import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './guild-list/dashboard/dashboard.component';
import { FilterComponent } from './guild-list/filter/filter.component';
import { ListComponent } from './guild-list/list/list.component';
import { GuildDetailComponent } from './guild-detail/guild-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: GuildDetailComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        GuildDetailComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class GuildsModule { }
