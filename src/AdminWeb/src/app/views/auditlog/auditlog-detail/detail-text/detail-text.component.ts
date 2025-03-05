import { Component, computed, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { AlertComponent, ColComponent, RowComponent } from "@coreui/angular";
import { InfoRowComponent } from "../../../../components";
import { AuditLogType } from "../../../../core/enums/audit-log-type";

@Component({
  selector: 'app-detail-text',
  templateUrl: './detail-text.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    InfoRowComponent,
    AlertComponent
  ]
})
export class DetailTextComponent {
  detail = input.required<Detail>();

  alertColor = computed(() => {
    switch (this.detail().type) {
      case AuditLogType.Info: return 'secondary';
      case AuditLogType.Warning: return 'warning';
      case AuditLogType.Error: return 'danger';
      default: return 'transparent';
    }
  })
}
