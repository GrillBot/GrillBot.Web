import { Component, input } from "@angular/core";
import { CutStringPipe, LocaleDatePipe, SpacedNumberPipe } from "../../../../../../core/pipes";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-unverify-preview',
  templateUrl: './unverify-preview.component.html',
  standalone: true,
  imports: [
    LocaleDatePipe,
    SpacedNumberPipe,
    CutStringPipe,
    InfoRowComponent
  ]
})
export class UnverifyPreviewComponent {
  preview = input.required<any>();
}
