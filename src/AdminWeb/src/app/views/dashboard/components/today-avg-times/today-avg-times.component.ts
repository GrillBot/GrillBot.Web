import { Component, inject, OnInit } from "@angular/core";
import { AuditLogClient } from "../../../../core/clients/audit-log.client";
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, WidgetStatEComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { WithLoadingPipe } from "../../../../pipes/with-loading.pipe";
import { LoadingComponent } from "../../../../components/loading/loading.component";
import { TimeSpanPipe } from "../../../../pipes/timespan.pipe";

@Component({
  selector: 'app-today-avg-times',
  templateUrl: './today-avg-times.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
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
