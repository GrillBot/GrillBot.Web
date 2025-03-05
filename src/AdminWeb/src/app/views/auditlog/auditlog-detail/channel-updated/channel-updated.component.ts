import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { TableDirective } from "@coreui/angular";
import { AsBitmaskStringPipe, AsReadonlyFormControlPipe, SpacedNumberPipe, TimeSpanPipe } from "../../../../core/pipes";
import { CheckboxComponent } from "../../../../components";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-channel-updated',
  templateUrl: './channel-updated.component.html',
  standalone: true,
  imports: [
    TableDirective,
    SpacedNumberPipe,
    AsBitmaskStringPipe,
    TimeSpanPipe,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule
  ]
})
export class ChannelUpdatedComponent {
  detail = input.required<Detail>();
}
