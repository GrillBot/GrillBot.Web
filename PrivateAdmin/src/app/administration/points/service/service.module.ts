import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncrementPointsComponent } from './actions/increment-points/increment-points.component';
import { TransferPointsComponent } from './actions/transfer-points/transfer-points.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
    declarations: [
        DashboardComponent,
        IncrementPointsComponent,
        TransferPointsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ServiceModule { }
