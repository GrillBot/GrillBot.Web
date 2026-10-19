import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";
import { SpacedNumberPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-recovery-preview',
  templateUrl: './recovery-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    InfoRowComponent,
    SpacedNumberPipe
  ]
})
export class RecoveryPreviewComponent {
  preview = input.required<any>();
}
