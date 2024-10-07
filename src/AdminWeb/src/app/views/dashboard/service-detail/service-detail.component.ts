import { Component, inject, LOCALE_ID } from "@angular/core";
import { DashboardClient } from "../../../core/clients/dashboard.client";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { RawHttpResponse } from "../../../core/models/common";
import { ServiceDetail } from "../../../core/models/dashboard/service-detail";
import { AsyncPipe, DatePipe, NgTemplateOutlet } from "@angular/common";
import { AlertComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardTitleDirective, ColComponent, RowComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { GridOptions, RowClassParams, RowStyle } from "ag-grid-community";
import { RequestStatistics } from '../../../core/models/dashboard/request-statistics';
import {
  AgGridComponent, COLUMN_FILTERS, DEFAULT_CELL_PADDING, DEFAULT_CELL_PADDING_LEFT,
  LoadingComponent, STRIPED_ROW_STYLE, usePipeTransform
} from '../../../components';
import { WithLoadingPipe, FilesizePipe, TimeSpanPipe, SpacedNumberPipe, ObservablePipe, DictToListPipe, WithNestingPipe } from "../../../pipes";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  standalone: true,
  imports: [
    WithLoadingPipe,
    AsyncPipe,
    LoadingComponent,
    AlertComponent,
    IconDirective,
    RowComponent,
    ColComponent,
    CardComponent,
    CardTitleDirective,
    CardBodyComponent,
    CardFooterComponent,
    NgTemplateOutlet,
    FilesizePipe,
    TimeSpanPipe,
    SpacedNumberPipe,
    DatePipe,
    AgGridComponent,
    ObservablePipe,
    DictToListPipe,
    WithNestingPipe
  ]
})
export class ServiceDetailComponent {
  readonly #client = inject(DashboardClient);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  $getServiceDetail!: Observable<RawHttpResponse<ServiceDetail>>;
  endpointsGrid!: GridOptions;
  dbStatsGrid!: GridOptions;
  operationsGrid!: GridOptions;

  constructor() {
    const serviceId = this.#activatedRoute.snapshot.params['serviceId'];
    this.$getServiceDetail = this.#client.getServiceDetail(serviceId);

    this.endpointsGrid = {
      columnDefs: [
        {
          field: 'endpoint',
          tooltipField: 'endpoint',
          filter: COLUMN_FILTERS.TEXT
        },
        {
          field: 'lastRequestAt',
          headerName: 'Poslední požadavek',
          valueFormatter: params => new DatePipe(this.#LOCALE_ID).transform(params.value, 'dd. MM. yyyy HH:mm:ss')!,
          maxWidth: 200
        },
        {
          field: 'totalTime',
          headerName: 'Celkový čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          field: 'lastTime',
          headerName: 'Poslední čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          field: 'avgTime',
          headerName: 'Průměrný čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          headerName: 'Úspěšnost',
          valueGetter: params => {
            const data: RequestStatistics = params.data;
            const pipe = new SpacedNumberPipe();

            return `${pipe.transform(data.successCount)} / ${pipe.transform(data.failedCount)} (${data.successRate} %)`;
          }
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };

    this.dbStatsGrid = {
      columnDefs: [
        {
          field: 'key',
          headerName: 'Tabulka',
          filter: COLUMN_FILTERS.TEXT
        },
        {
          field: 'value',
          headerName: 'Počet záznamů',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 200,
          filter: COLUMN_FILTERS.NUMBER
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };

    this.operationsGrid = {
      columnDefs: [
        {
          field: 'item.section',
          cellStyle: $event => {
            return {
              ...DEFAULT_CELL_PADDING,
              'padding-left': $event.data.level === 0 ?
                `calc(${DEFAULT_CELL_PADDING_LEFT})` :
                `calc(${$event.data.level * 30}px + (${DEFAULT_CELL_PADDING_LEFT}))`
            }
          },
          headerName: 'Sekce'
        },
        {
          field: 'item.count',
          headerName: 'Počet',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          field: 'item.totalTime',
          headerName: 'Celkový čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 200,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          field: 'item.averageTime',
          headerName: 'Průměrný čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 200,
          filter: COLUMN_FILTERS.NUMBER
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }
}
