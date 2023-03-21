import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/core/services/channel.service';
import { ChannelboardItem } from 'src/app/core/models/channels';
import { ObservableList } from 'src/app/core/models/common';

@Component({
    selector: 'app-channelboard',
    templateUrl: './channelboard.component.html'
})
export class ChannelboardComponent implements OnInit {
    channelboard: ObservableList<ChannelboardItem>;

    constructor(
        private channelService: ChannelService
    ) { }

    ngOnInit(): void {
        this.channelboard = this.channelService.getChannelboard();
    }

}
