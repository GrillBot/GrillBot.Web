import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { CheckboxComponent, InfoRowComponent } from "../../../../../../components";
import { AsReadonlyFormControlPipe, SpacedNumberPipe, TimeSpanPipe } from "../../../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-channel-preview',
  templateUrl: './channel-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    InfoRowComponent,
    TimeSpanPipe,
    SpacedNumberPipe,
    CheckboxComponent,
    ReactiveFormsModule,
    AsReadonlyFormControlPipe
  ]
})
export class ChannelPreviewComponent {
  preview = input.required<any>();
}
