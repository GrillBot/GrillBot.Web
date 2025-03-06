import { Component, computed, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { AlertComponent, ColComponent, RowComponent } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent, UserLookupPipe } from "../../../../components";
import { AsReadonlyFormControlPipe, LocaleDatePipe, TimeSpanPipe } from "../../../../core/pipes";
import { AsyncPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DateTime } from "luxon";

@Component({
  selector: 'app-job-completed',
  templateUrl: './job-completed.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    InfoRowComponent,
    AlertComponent,
    LocaleDatePipe,
    UserLookupPipe,
    AsyncPipe,
    ReactiveFormsModule,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    TimeSpanPipe
]
})
export class JobCompletedComponent {
  detail = input.required<Detail>();

  duration = computed(() => {
    const startAt = DateTime.fromISO(this.detail().data.startAt);
    const endAt = DateTime.fromISO(this.detail().data.endAt);
    return endAt.diff(startAt).toMillis();
  });
}
