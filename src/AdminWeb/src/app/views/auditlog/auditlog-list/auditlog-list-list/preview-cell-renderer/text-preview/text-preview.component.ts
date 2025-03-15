import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-text-preview',
  templateUrl: './text-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent
  ]
})
export class TextPreviewComponent {
  preview = input.required<any>();
}
