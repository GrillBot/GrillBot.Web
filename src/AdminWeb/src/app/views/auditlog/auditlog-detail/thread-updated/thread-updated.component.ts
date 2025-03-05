import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { TableDirective } from "@coreui/angular";

@Component({
  selector: 'app-thread-updated',
  templateUrl: './thread-updated.component.html',
  standalone: true,
  imports: [
    TableDirective
  ]
})
export class ThreadUpdatedComponent {
  detail = input.required<Detail>();
}
