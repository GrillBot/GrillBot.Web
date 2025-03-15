import { Component, input } from "@angular/core";

@Component({
  selector: 'app-thread-updated-preview',
  templateUrl: './thread-updated-preview.component.html',
  standalone: true
})
export class ThreadUpdatedPreviewComponent {
  preview = input.required<any>();
}
