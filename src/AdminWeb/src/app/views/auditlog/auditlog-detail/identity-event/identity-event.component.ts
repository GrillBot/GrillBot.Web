import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { InfoRowComponent } from "../../../../components";
import { mapIdentityChannel, mapIdentityEventType } from "../../../../core/enums/identity-event-type";

@Component({
  selector: 'app-identity-event',
  templateUrl: './identity-event.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [InfoRowComponent]
})
export class IdentityEventComponent {
  detail = input.required<Detail>();

  readonly mapEventType = mapIdentityEventType;
  readonly mapChannel = mapIdentityChannel;
}
