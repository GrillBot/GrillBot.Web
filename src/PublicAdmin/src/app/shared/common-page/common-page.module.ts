import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';

@NgModule({
    declarations: [CommonDashboardComponent],
    imports: [CommonModule],
    exports: [CommonDashboardComponent]
})
export class CommonPageModule { }
