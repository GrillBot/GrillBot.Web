import { Component, input } from "@angular/core";
import { ChannelOverride } from "../../../../core/models/unverify/channel-override";
import { AsyncPipe } from "@angular/common";
import { ChannelLookupPipe } from "../../../../components";

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    ChannelLookupPipe
  ]
})
export class ChannelListComponent {
  channels = input.required<ChannelOverride[]>();
  title = input<string | null>(null);
}
