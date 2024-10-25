import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, data: { merged: false } },
    { path: 'merged', component: DashboardComponent, data: { merged: true } },
    { path: 'charts', component: ChartsComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ChartsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class TransactionsModule { }
