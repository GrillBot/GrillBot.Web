import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";
import { SpacedNumberPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-message-edited-preview',
  templateUrl: './message-edited-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    SpacedNumberPipe
  ]
})
export class MessageEditedPreview {
  preview = input.required<any>();
}
