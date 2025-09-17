import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentStateComponent } from './current-state/current-state.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: CurrentStateComponent },
    { path: 'logs', component: DashboardComponent }
];


@NgModule({
    declarations: [
        DashboardComponent,
        CurrentStateComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UnverifyModule { }
