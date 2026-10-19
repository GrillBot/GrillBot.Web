import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { CutStringPipe, LocaleDatePipe } from "../../../../../../core/pipes";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-update-preview',
  templateUrl: './update-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    LocaleDatePipe,
    InfoRowComponent,
    CutStringPipe
  ]
})
export class UpdatePreviewComponent {
  preview = input.required<any>();
}
