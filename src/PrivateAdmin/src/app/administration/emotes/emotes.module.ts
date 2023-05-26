import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './emotes-list/dashboard/dashboard.component';
import { FilterComponent } from './emotes-list/filter/filter.component';
import { ListComponent } from './emotes-list/list/list.component';
import { MergeModalComponent } from './merge-modal/merge-modal.component';
import { EmoteUsersListComponent } from './emote-users-list/emote-users-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'supported' },
    { path: 'supported', component: DashboardComponent },
    { path: 'unsupported', component: DashboardComponent },
    { path: ':encodedEmoteId/users', component: EmoteUsersListComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        MergeModalComponent,
        EmoteUsersListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class EmotesModule { }
