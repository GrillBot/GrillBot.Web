import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientFormComponent } from './client-form/client-form.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: ClientFormComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ClientFormComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ApiClientsModule { }
