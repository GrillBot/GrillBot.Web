import { Component, inject, LOCALE_ID } from "@angular/core";
import { StatisticsFilterComponent } from "./statistics-filter/statistics-filter.component";
import { AuditLogClient } from "../../../core/clients";
import { map, Observable } from "rxjs";
import { RawHttpResponse } from "../../../core/models/common";
import { StatisticsFilter } from "../../../core/models/audit-log";
import { ChartComponent } from "../../../components";
import { LocaleDatePipe } from "../../../core/pipes";

@Component({
  templateUrl: './statistics.component.html',
  standalone: true,
  imports: [
    StatisticsFilterComponent,
    ChartComponent
  ]
})
export class StatisticsComponent {
  readonly #auditLogClient = inject(AuditLogClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  dataSource$: Observable<RawHttpResponse<{ key: string, value: number }[]>> | null = null;
  title: string = 'Statistika';

  onFilterChanged(filter: StatisticsFilter): void {
    let request: Observable<RawHttpResponse<{ [key: string]: number }>> | null = null;

    switch (filter.endpoint) {
      case 'private-api':
        request = this.#auditLogClient.getApiPeriodStatistics(['V1', 'V3'], filter.groupingKey);
        this.title = 'Počet volání'
        break;
      case 'public-api':
        request = this.#auditLogClient.getApiPeriodStatistics(['V2'], filter.groupingKey);
        this.title = 'Počet volání'
        break;
      case 'interactions':
        request = this.#auditLogClient.getInteractionsPeriodStatistics(filter.groupingKey);
        this.title = 'Počet volání'
        break;
      case 'audit-log':
        request = this.#auditLogClient.getAuditLogPeriodStatistics(filter.groupingKey);
        this.title = 'Počet záznamů'
        break;
      default:
        return;
    }

    this.dataSource$ = request.pipe(map(data => {
      return {
        type: data.type,
        value: Object.entries(data.value ?? {}).map(o => ({
          key: LocaleDatePipe.transformValue(o[0], 'dd. MM. yyyy', this.#LOCALE_ID),
          value: o[1]
        }))
      };
    }));
  }
}
