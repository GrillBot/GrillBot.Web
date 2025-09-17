import { Component, computed, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { AlertComponent, ColComponent, RowComponent } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent, UserLookupPipe } from "../../../../components";
import { AsReadonlyFormControlPipe, DatetimeDiffPipe, LocaleDatePipe, TimeSpanPipe } from "../../../../core/pipes";
import { AsyncPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

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
    TimeSpanPipe,
    DatetimeDiffPipe
  ]
})
export class JobCompletedComponent {
  detail = input.required<Detail>();
}
