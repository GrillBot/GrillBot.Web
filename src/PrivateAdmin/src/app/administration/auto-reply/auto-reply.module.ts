import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent },
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AutoReplyModule { }
