import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { LocaleDatePipe, SpacedNumberPipe } from "../../../../../../core/pipes";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-selfunverify-preview',
  templateUrl: './selfunverify-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    LocaleDatePipe,
    SpacedNumberPipe,
    InfoRowComponent
  ]
})
export class SelfunverifyPreviewComponent {
  preview = input.required<any>();
}
