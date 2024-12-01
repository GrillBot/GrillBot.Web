import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: DashboardComponent }])
    ]
})
export class SearchingModule { }
