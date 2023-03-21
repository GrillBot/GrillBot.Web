import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChannelboardComponent } from './channelboard/channelboard.component';

const routes: Routes = [
    { path: '', component: ChannelboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChannelsRoutingModule { }
