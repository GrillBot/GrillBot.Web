import { Component, inject } from "@angular/core";
import { AuditLogClient } from "../../../../core/clients/audit-log.client";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent, WidgetStatEComponent } from "@coreui/angular";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { LoadingComponent } from "../../../../components";
import { WithLoadingPipe, TimeSpanPipe } from "../../../../pipes";

@Component({
  selector: 'app-today-avg-times',
  templateUrl: './today-avg-times.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    WidgetStatEComponent,
    AsyncPipe,
    WithLoadingPipe,
    LoadingComponent,
    RowComponent,
    ColComponent,
    TimeSpanPipe,
    NgTemplateOutlet
  ]
})
export class TodayAvgTimesComponent {
  readonly #client = inject(AuditLogClient);
  readonly $getTodayAvgTimes = this.#client.getTodayAvgTimes();
}
