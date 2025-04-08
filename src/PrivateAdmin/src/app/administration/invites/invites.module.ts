import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './invites-list/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: DashboardComponent }
        ])
    ]
})
export class InvitesModule { }
