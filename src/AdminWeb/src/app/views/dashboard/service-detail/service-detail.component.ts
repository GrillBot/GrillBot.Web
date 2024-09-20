import { SpacedNumberPipe } from './../../../pipes/spaced-number.pipe';
import { Component, inject, LOCALE_ID } from "@angular/core";
import { DashboardClient } from "../../../core/clients/dashboard.client";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { RawHttpResponse } from "../../../core/models/common";
import { ServiceDetail } from "../../../core/models/dashboard/service-detail";
import { WithLoadingPipe } from "../../../pipes/with-loading.pipe";
import { AsyncPipe, DatePipe, NgTemplateOutlet } from "@angular/common";
import { LoadingComponent } from "../../../components/loading/loading.component";
import { AlertComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardTitleDirective, ColComponent, RowComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { FilesizePipe } from "../../../pipes/filesize.pipe";
import { TimeSpanPipe } from "../../../pipes/timespan.pipe";
import { GridOptions } from "ag-grid-community";
import { AgGridComponent } from "../../../components/ag-grid/ag-grid.component";
import { DEFAULT_COL_DEF, DEFAULT_GRID_OPTIONS, STRIPED_ROW_STYLE } from "../../../components/ag-grid/ag-grid.defaults";
import { usePipeTransform } from "../../../components/ag-grid/ag-grid.functions";
import { RequestStatistics } from '../../../core/models/dashboard/request-statistics';

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
    AgGridComponent
  ]
})
export class ServiceDetailComponent {
  readonly #client = inject(DashboardClient);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  $getServiceDetail!: Observable<RawHttpResponse<ServiceDetail>>;
  endpointsGrid!: GridOptions;

  get Object() { return Object; }
  get of() { return of; }

  constructor() {
    const serviceId = this.#activatedRoute.snapshot.params['serviceId'];
    this.$getServiceDetail = this.#client.getServiceDetail(serviceId);

    this.endpointsGrid = {
      ...DEFAULT_GRID_OPTIONS,
      columnDefs: [
        {
          field: 'endpoint',
          tooltipField: 'endpoint'
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
          maxWidth: 150
        },
        {
          field: 'lastTime',
          headerName: 'Poslední čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 150
        },
        {
          field: 'avgTime',
          headerName: 'Průměrný čas',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 150
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
      defaultColDef: DEFAULT_COL_DEF,
      onGridReady: $event => {
        $event.api.autoSizeAllColumns()
      },
      getRowStyle: STRIPED_ROW_STYLE
    };
  }
}
