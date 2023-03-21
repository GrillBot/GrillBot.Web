import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './suggestions-list/dashboard/dashboard.component';
import { ListComponent } from './suggestions-list/list/list.component';
import { FilterComponent } from './suggestions-list/filter/filter.component';
import { SuggestionDetailModalComponent } from './suggestion-detail-modal/suggestion-detail-modal.component';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        SuggestionDetailModalComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class EmoteSuggestionsModule { }
