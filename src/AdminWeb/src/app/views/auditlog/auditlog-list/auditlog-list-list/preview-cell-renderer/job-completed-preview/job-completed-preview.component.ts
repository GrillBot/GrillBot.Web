import { Component, computed, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components/info-row/info-row.component";
import { LocaleDatePipe, TimeSpanPipe } from "../../../../../../core/pipes";
import { DateTime } from "luxon";
import { BadgeComponent } from "@coreui/angular";

@Component({
  selector: 'app-job-completed-preview',
  templateUrl: './job-completed-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    LocaleDatePipe,
    TimeSpanPipe,
    BadgeComponent
  ]
})
export class JobCompletedPreviewComponent {
  preview = input.required<any>();

  duration = computed(() => {
    const startAt = DateTime.fromISO(this.preview().startAt);
    const endAt = DateTime.fromISO(this.preview().endAt);
    return endAt.diff(startAt).toMillis();
  });
}
