import { Component, computed, input } from "@angular/core";
import { UnverifyLogDetail } from "../../../../../core/models/unverify/unverify-log-detail";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent } from "../../../../../components";
import { AsReadonlyFormControlPipe } from "../../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";
import { ChannelListComponent, RoleListComponent } from "../../../components";

@Component({
  selector: 'app-log-detail-remove',
  templateUrl: './log-detail-remove.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    InfoRowComponent,
    RowComponent,
    ColComponent,
    AsReadonlyFormControlPipe,
    CheckboxComponent,
    ReactiveFormsModule,
    RoleListComponent,
    ChannelListComponent
  ]
})
export class LogDetailRemoveComponent {
  detail = input.required<UnverifyLogDetail>();

  data = computed(() => this.detail().data);
  type = computed(() => this.detail().operationType);
}
