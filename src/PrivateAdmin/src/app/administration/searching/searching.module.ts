import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchingDetailComponent } from './searching-detail/searching-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        ListComponent,
        FilterComponent,
        DashboardComponent,
        SearchingDetailComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class SearchingModule { }
