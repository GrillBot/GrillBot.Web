import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { InfoRowComponent, UserLookupPipe } from "../../../../components";
import { AlertComponent, ColComponent, RowComponent } from "@coreui/angular";
import { LocaleDatePipe } from "../../../../core/pipes";
import { AsyncPipe } from "@angular/common";
import { MessageEmbedComponent } from "./message-embed/message-embed.component";

@Component({
  selector: 'app-message-deleted',
  templateUrl: './message-deleted.component.html',
  standalone: true,
  imports: [
    UserLookupPipe,
    InfoRowComponent,
    RowComponent,
    ColComponent,
    AsyncPipe,
    LocaleDatePipe,
    AlertComponent,
    MessageEmbedComponent
  ]
})
export class MessageDeletedComponent {
  detail = input.required<Detail>();
}
