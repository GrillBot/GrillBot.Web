import { Component, inject, LOCALE_ID } from "@angular/core";
import { StatisticsFilterComponent } from "./statistics-filter/statistics-filter.component";
import { ChartComponent } from "../../../components";
import { UnverifyClient } from "../../../core/clients";
import { map, Observable } from "rxjs";
import { RawHttpResponse } from "../../../core/models/common";
import { StatisticsFilter } from "../../../core/models/unverify/statistics-filter";
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
  readonly #client = inject(UnverifyClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  dataSource$: Observable<RawHttpResponse<{ key: string, value: number }[]>> | null = null;

  onFilterChanged(filter: StatisticsFilter): void {
    if (!filter.groupingKey || filter.operationType == null) {
      this.dataSource$ = null;
      return;
    }

    this.dataSource$ = this.#client.getPeriodStatistics(filter.groupingKey, filter.operationType).pipe(map(data => {
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
