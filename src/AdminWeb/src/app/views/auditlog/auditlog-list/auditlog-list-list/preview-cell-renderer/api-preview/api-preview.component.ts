import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";
import { TimeSpanPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-api-preview',
  templateUrl: './api-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    TimeSpanPipe
  ]
})
export class ApiPreviewComponent {
  preview = input.required<any>();
}
