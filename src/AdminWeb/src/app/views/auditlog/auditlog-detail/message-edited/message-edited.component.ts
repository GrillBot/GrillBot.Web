import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { AlertComponent } from "@coreui/angular";
import { StringDiffPipe } from "../../../../core/pipes";

@Component({
  selector: 'app-message-edited',
  templateUrl: './message-edited.component.html',
  standalone: true,
  imports: [
    AlertComponent,
    StringDiffPipe
  ]
})
export class MessageEditedComponent {
  detail = input.required<Detail>();
}
