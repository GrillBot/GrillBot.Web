import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-emote-deleted-preview',
  templateUrl: './emote-deleted-preview.component.html',
  standalone: true,
  imports: [InfoRowComponent]
})
export class EmoteDeletedPreviewComponent {
  preview = input.required<any>();
}
