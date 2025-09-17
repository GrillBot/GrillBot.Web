import { Component, computed, input } from "@angular/core";
import { UnverifyLogDetail } from "../../../../../core/models/unverify/unverify-log-detail";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { AsReadonlyFormControlPipe, DatetimeDiffPipe, LocaleDatePipe, TimeSpanPipe } from "../../../../../core/pipes";
import { InfoRowComponent, TextInputComponent } from "../../../../../components";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-log-detail-update',
  templateUrl: './log-detail-update.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    LocaleDatePipe,
    RowComponent,
    ColComponent,
    DatetimeDiffPipe,
    TimeSpanPipe,
    InfoRowComponent,
    TextInputComponent,
    ReactiveFormsModule,
    AsReadonlyFormControlPipe
  ]
})
export class LogDetailUpdateComponent {
  detail = input.required<UnverifyLogDetail>();

  data = computed(() => this.detail().data);
}
