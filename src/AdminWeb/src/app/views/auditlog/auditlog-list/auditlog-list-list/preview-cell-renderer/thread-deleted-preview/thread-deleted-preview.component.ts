import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-thread-deleted-preview',
  templateUrl: './thread-deleted-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent
  ]
})
export class ThreadDeletedPreviewComponent {
  preview = input.required<any>();
}
