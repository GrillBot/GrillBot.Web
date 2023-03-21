import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    { path: '', redirectTo: 'transactions' },
    {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(mod => mod.TransactionsModule)
    },
    {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(mod => mod.ServiceModule)
    }
];

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class PointsModule { }
