import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components/info-row/info-row.component";
import { DatetimeDiffPipe, TimeSpanPipe } from "../../../../../../core/pipes";
import { BadgeComponent } from "@coreui/angular";

@Component({
  selector: 'app-job-completed-preview',
  templateUrl: './job-completed-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    TimeSpanPipe,
    BadgeComponent,
    DatetimeDiffPipe
  ]
})
export class JobCompletedPreviewComponent {
  preview = input.required<any>();
}
