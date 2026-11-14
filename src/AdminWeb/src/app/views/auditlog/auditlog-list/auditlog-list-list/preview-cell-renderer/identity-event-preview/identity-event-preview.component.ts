import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { mapIdentityChannel, mapIdentityEventType } from "../../../../../../core/enums/identity-event-type";

@Component({
  selector: 'app-identity-event-preview',
  templateUrl: './identity-event-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager
})
export class IdentityEventPreviewComponent {
  preview = input.required<any>();

  readonly mapEventType = mapIdentityEventType;
  readonly mapChannel = mapIdentityChannel;
}
