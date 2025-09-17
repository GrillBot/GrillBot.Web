import { Component, inject } from "@angular/core";
import { DashboardClient } from "../../../core/clients/dashboard.client";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { RawHttpResponse } from "../../../core/models/common";
import { ServiceDetail } from "../../../core/models/dashboard/service-detail";
import { AsyncPipe } from "@angular/common";
import {
  AlertComponent, CardBodyComponent, CardComponent,
  CardTitleDirective, ColComponent, RowComponent
} from "@coreui/angular";
import { IconComponent } from "@coreui/icons-angular";
import { GridOptions } from "ag-grid-community";
import { RequestStatistics } from '../../../core/models/dashboard/request-statistics';
import {
  AgGridComponent, COLUMN_FILTERS, DEFAULT_CELL_PADDING, DEFAULT_CELL_PADDING_LEFT,
  LoadingComponent, STRIPED_ROW_STYLE} from '../../../components';
import {
  WithLoadingPipe, FilesizePipe, TimeSpanPipe, SpacedNumberPipe,
  ObservablePipe, DictToListPipe, WithNestingPipe
} from "../../../core/pipes";
import { LocaleDatePipe } from "../../../core/pipes/locale-date.pipe";
import { InfoRowComponent } from "../../../components/info-row/info-row.component";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  standalone: true,
  imports: [
    WithLoadingPipe,
    AsyncPipe,
    LoadingComponent,
    AlertComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardTitleDirective,
    CardBodyComponent,
    FilesizePipe,
    TimeSpanPipe,
    SpacedNumberPipe,
    AgGridComponent,
    ObservablePipe,
    DictToListPipe,
    WithNestingPipe,
    LocaleDatePipe,
    InfoRowComponent,
    IconComponent
  ]
})
export class ServiceDetailComponent {
  readonly #client = inject(DashboardClient);
  readonly #activatedRoute = inject(ActivatedRoute);

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
          maxWidth: 200,
          cellDataType: 'localeDatetime'
        },
        {
          field: 'totalTime',
          headerName: 'Celkový čas',
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'duration'
        },
        {
          field: 'lastTime',
          headerName: 'Poslední čas',
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'duration'
        },
        {
          field: 'avgTime',
          headerName: 'Průměrný čas',
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'duration'
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
          maxWidth: 200,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'spacedNumber'
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
          maxWidth: 150,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'item.totalTime',
          headerName: 'Celkový čas',
          maxWidth: 200,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'duration'
        },
        {
          field: 'item.averageTime',
          headerName: 'Průměrný čas',
          maxWidth: 200,
          filter: COLUMN_FILTERS.NUMBER,
          cellDataType: 'duration'
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }
}
