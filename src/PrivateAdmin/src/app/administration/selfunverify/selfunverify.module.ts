import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { KeepablesComponent } from './keepables/keepables.component';

const routes: Routes = [
    { path: '', component: KeepablesComponent }
];

@NgModule({
    declarations: [
        KeepablesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class SelfunverifyModule { }
