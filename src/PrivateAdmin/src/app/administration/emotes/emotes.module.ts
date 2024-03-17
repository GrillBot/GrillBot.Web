import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './emotes-list/dashboard/dashboard.component';
import { FilterComponent } from './emotes-list/filter/filter.component';
import { ListComponent } from './emotes-list/list/list.component';
import { EmoteUsersListComponent } from './emote-users-list/emote-users-list.component';
import { EmotesMergeComponent } from './emotes-merge/emotes-merge.component';

const routes: Routes = [
    { path: '', redirectTo: 'supported', pathMatch: 'full' },
    { path: 'supported', component: DashboardComponent },
    { path: 'unsupported', component: DashboardComponent },
    { path: ':encodedEmoteData/users', component: EmoteUsersListComponent },
    { path: ':encodedEmoteData/merge', component: EmotesMergeComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        EmoteUsersListComponent,
        EmotesMergeComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class EmotesModule { }
