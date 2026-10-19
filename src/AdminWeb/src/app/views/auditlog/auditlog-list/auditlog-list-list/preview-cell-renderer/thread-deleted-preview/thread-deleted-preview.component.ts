import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-thread-deleted-preview',
  templateUrl: './thread-deleted-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    InfoRowComponent
  ]
})
export class ThreadDeletedPreviewComponent {
  preview = input.required<any>();
}
