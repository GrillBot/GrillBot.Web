import { RawHttpResponse } from '../../core/models/common';
import { AsyncPipe, NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, OnInit, computed, input } from "@angular/core";
import { TableDirective } from "@coreui/angular";
import { ColumnDef, SimpleDataTableDefs } from "./simple-data-table.models";
import { WithLoadingPipe } from "../../pipes/with-loading.pipe";
import { Observable, concat, delay, isObservable, map, of, startWith, tap } from "rxjs";
import { LoadingComponent } from '../loading/loading.component';
import { IconDirective } from '@coreui/icons-angular';

interface DataRowColumn {
  columnDef: ColumnDef,
  value: Observable<string>
};

@Component({
  selector: 'app-simple-data-table',
  templateUrl: './simple-data-table.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    TableDirective,
    NgTemplateOutlet,
    WithLoadingPipe,
    NgClass,
    LoadingComponent,
    IconDirective
  ]
})
export class SimpleDataTableComponent implements OnInit {
  readonly defs = input.required<SimpleDataTableDefs<any>>();
  dataSource!: Observable<RawHttpResponse<any>>;

  headerFields = computed(() => Object.keys(this.defs().columns));
  dataFields = computed(() => this.headerFields().filter(o => o !== '$index'));
  isIndexColumn = computed(() => Object.keys(this.defs().columns).includes('$index'));
  columnsCount = computed(() => this.headerFields().length);

  ngOnInit(): void {
    this.configureDataSource();
  }

  private configureDataSource(): void {
    const defs = this.defs();

    const dataSource = isObservable(defs.dataSource) ?
      defs.dataSource :
      concat(
        of({ type: 'start' } as RawHttpResponse<any>),
        of({ type: 'finish', value: defs.dataSource } as RawHttpResponse<any>).pipe(delay(100))
      );

    this.dataSource = dataSource.pipe(
      map((response) => ({
        type: response.type,
        value: response.value ?
          response.value.map((row: RawHttpResponse<any[]>, index: number) => this.mapResponseRow(row, index, defs)) :
          []
      }))
    );
  }

  private mapResponseRow(row: any, index: number, defs: SimpleDataTableDefs<any>): DataRowColumn[] {
    const result: DataRowColumn[] = [];

    if (this.isIndexColumn()) {
      result.push({
        columnDef: defs.columns['$index'],
        value: of(`${index + 1}.`)
      });
    }

    for (const field of this.dataFields()) {
      const columnDef = defs.columns[field];
      const raw = row[field];

      result.push({
        columnDef: columnDef,
        value: columnDef.valueFormatter ?
          columnDef.valueFormatter(raw).pipe(startWith(raw)) :
          of(raw)
      });
    }

    return result;
  }
}
