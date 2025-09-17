import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";
import { SpacedNumberPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-autoremove-preview',
  templateUrl: './autoremove-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    SpacedNumberPipe
  ]
})
export class AutoremovePreviewComponent {
  preview = input.required<any>();
}
