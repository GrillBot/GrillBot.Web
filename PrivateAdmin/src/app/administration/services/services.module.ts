import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceInfoComponent } from './service-info/service-info.component';

const routes: Routes = [{ path: ':id', component: ServiceInfoComponent }];

@NgModule({
    declarations: [
        ServiceInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ServicesModule { }
