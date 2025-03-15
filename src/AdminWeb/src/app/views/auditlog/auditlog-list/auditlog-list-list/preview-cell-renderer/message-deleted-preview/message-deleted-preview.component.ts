import { Component, input } from "@angular/core";
import { InfoRowComponent, UserLookupPipe } from "../../../../../../components";
import { AsyncPipe } from "@angular/common";
import { LocaleDatePipe, SpacedNumberPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-message-deleted-preview',
  templateUrl: './message-deleted-preview.component.html',
  standalone: true,
  imports: [
    UserLookupPipe,
    AsyncPipe,
    InfoRowComponent,
    LocaleDatePipe,
    SpacedNumberPipe
  ]
})
export class MessageDeletedPreviewComponent {
  preview = input.required<any>();
}
