import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './emotes-list/dashboard/dashboard.component';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: DashboardComponent }
        ])
    ]
})
export class EmotesModule { }
