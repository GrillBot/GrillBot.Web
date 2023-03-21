import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChannelboardComponent } from './channelboard/channelboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: ChannelboardComponent }
];

@NgModule({
    declarations: [
        ChannelboardComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ChannelsModule { }
