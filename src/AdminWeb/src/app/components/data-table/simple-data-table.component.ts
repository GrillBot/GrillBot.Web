import { RawHttpResponse } from '../../core/models/common';
import { AsyncPipe, NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, OnInit, computed, input } from "@angular/core";
import { TableDirective } from "@coreui/angular";
import { SimpleDataTableDefs } from "./simple-data-table.models";
import { WithLoadingPipe } from "../../pipes/with-loading.pipe";
import { Observable, concat, delay, isObservable, of } from "rxjs";
import { LoadingComponent } from '../loading/loading.component';

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
    LoadingComponent
  ]
})
export class SimpleDataTableComponent implements OnInit {
  readonly defs = input.required<SimpleDataTableDefs<any>>();
  dataSource!: Observable<RawHttpResponse<any>>;

  headerFields = computed(() => Object.keys(this.defs().columns));
  dataFields = computed(() => this.headerFields().filter(o => o !== '$index'));
  isIndexColumn = computed(() => Object.keys(this.defs().columns).includes('$index'));
  columnsCount = computed(() => this.dataFields().length);

  ngOnInit(): void {
    this.configureDataSource();
  }

  private configureDataSource(): void {
    const dataSource = this.defs().dataSource;

    if (isObservable(dataSource)) {
      this.dataSource = dataSource;
    } else {
      this.dataSource = concat(
        of({ type: 'start' } as RawHttpResponse<any>),
        of({
          type: 'finish',
          value: dataSource
        } as RawHttpResponse<any>).pipe(delay(100))
      );
    }
  }
}
