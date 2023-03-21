import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'create', component: CreateComponent, data: { isAdd: true } },
    { path: ':id', component: CreateComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        CreateComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AutoReplyModule { }
