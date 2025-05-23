import { AdminListFilter } from './../../../core/models/points/admin-list-request';
import { RawHttpResponse } from '../../../core/models/common';
import { Component, inject, LOCALE_ID } from "@angular/core";
import { TransactionsFilterComponent } from "../transactions/transactions-filter/transactions-filter.component";
import { ChartComponent } from "../../../components/chart/chart.component";
import { PointsClient } from "../../../core/clients/points.client";
import { AdminListRequest } from "../../../core/models/points/admin-list-request";
import { map, Observable, of } from "rxjs";
import { PointsChartItem, PointsMessagesChartItem, PointsReactionsChartItem } from "../../../core/models/points/points-chart-item";
import { LocaleDatePipe } from '../../../core/pipes/locale-date.pipe';

@Component({
  templateUrl: './stats.component.html',
  standalone: true,
  imports: [
    TransactionsFilterComponent,
    ChartComponent
  ]
})
export class ChartsComponent {
  readonly #pointsClient = inject(PointsClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  messagePointsSource$: Observable<RawHttpResponse<PointsMessagesChartItem[]>> | null = null;
  reactionPointsSource$: Observable<RawHttpResponse<PointsReactionsChartItem[]>> | null = null;

  onFilterChanged(filter: AdminListFilter) {
    const requestData: AdminListRequest = {
      createdFrom: filter.created?.from ?? null,
      createdTo: filter.created?.to ?? null,
      guildId: filter.guildId,
      messageId: filter.messageId,
      onlyMessages: filter.onlyMessages,
      onlyReactions: filter.onlyReactions,
      showMerged: filter.showMerged,
      userId: filter.userId
    };

    const request = this.#pointsClient.getChartData(requestData);

    const showAll = !filter.onlyMessages && !filter.onlyReactions;
    const showMessages = showAll || filter.onlyMessages;
    const showReactions = showAll || filter.onlyReactions;

    this.messagePointsSource$ = showMessages ? this.mapToSource<PointsMessagesChartItem>(
      request,
      item => ({
        day: LocaleDatePipe.transformValue(item.day, 'dd. MM. yyyy', this.#LOCALE_ID),
        messagePoints: item.messagePoints
      })
    ) : null;

    this.reactionPointsSource$ = showReactions ? this.mapToSource<PointsReactionsChartItem>(
      request,
      item => ({
        day: LocaleDatePipe.transformValue(item.day, 'dd. MM. yyyy', this.#LOCALE_ID),
        reactionPoints: item.reactionPoints
      })
    ) : null;
  }

  private mapToSource<TData>(
    request: Observable<RawHttpResponse<PointsChartItem[]>>,
    mapData: (item: PointsChartItem) => TData
  ): Observable<RawHttpResponse<TData[]>> {
    return request.pipe(map(data => {
      return {
        type: data.type,
        value: data.value?.map(item => mapData(item))
      };
    }));
  }
}
