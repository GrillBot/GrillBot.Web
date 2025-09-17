import { Component, computed, input } from "@angular/core";
import { UnverifyLogDetail } from "../../../../../core/models/unverify/unverify-log-detail";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { CardHeaderComponent, CheckboxComponent, InfoRowComponent, TextInputComponent } from "../../../../../components";
import { AsReadonlyFormControlPipe, LocaleDatePipe, TimeSpanPipe } from "../../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";
import { ChannelListComponent, RoleListComponent } from "../../../components";

@Component({
  selector: 'app-log-detail-unverify',
  templateUrl: './log-detail-unverify.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    InfoRowComponent,
    RowComponent,
    ColComponent,
    LocaleDatePipe,
    TimeSpanPipe,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    CheckboxComponent,
    CardHeaderComponent,
    TextInputComponent,
    RoleListComponent,
    ChannelListComponent
  ]
})
export class LogDetailUnverifyComponent {
  detail = input.required<UnverifyLogDetail>();

  data = computed(() => this.detail().data);
  type = computed(() => this.detail().operationType);
}
