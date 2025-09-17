import { Component, input } from "@angular/core";
import { LocaleDatePipe, SpacedNumberPipe } from "../../../../../../core/pipes";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-selfunverify-preview',
  templateUrl: './selfunverify-preview.component.html',
  standalone: true,
  imports: [
    LocaleDatePipe,
    SpacedNumberPipe,
    InfoRowComponent
  ]
})
export class SelfunverifyPreviewComponent {
  preview = input.required<any>();
}
