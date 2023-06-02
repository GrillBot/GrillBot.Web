import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PinListComponent } from './pin-list/pin-list.component';

const routes: Routes = [{ path: '', component: PinListComponent }];

@NgModule({
    declarations: [
        PinListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PinsModule { }
