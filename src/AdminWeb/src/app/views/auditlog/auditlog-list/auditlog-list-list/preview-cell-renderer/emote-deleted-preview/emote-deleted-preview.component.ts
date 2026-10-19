import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-emote-deleted-preview',
  templateUrl: './emote-deleted-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [InfoRowComponent]
})
export class EmoteDeletedPreviewComponent {
  preview = input.required<any>();
}
