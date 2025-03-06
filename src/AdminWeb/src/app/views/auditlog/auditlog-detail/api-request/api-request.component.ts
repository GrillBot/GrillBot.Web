import { Component, computed, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import {
  TabDirective, TableDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent
} from "@coreui/angular";
import { InfoRowComponent } from "../../../../components";
import { DictToListPipe, LocaleDatePipe, TimeSpanPipe } from "../../../../core/pipes";
import { DateTime } from "luxon";

@Component({
  selector: 'app-api-request',
  templateUrl: './api-request.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    LocaleDatePipe,
    TimeSpanPipe,
    DictToListPipe,
    TableDirective,
    TabsComponent,
    TabsListComponent,
    TabsContentComponent,
    TabPanelComponent,
    TabDirective
  ]
})
export class ApiRequestComponent {
  detail = input.required<Detail>();

  duration = computed(() => {
    const startAt = DateTime.fromISO(this.detail().data.startAt);
    const endAt = DateTime.fromISO(this.detail().data.endAt);
    return endAt.diff(startAt).toMillis();
  });

  hasParameters = computed(() => Object.keys(this.detail().data.parameters).length > 0);
  hasHeaders = computed(() => Object.keys(this.detail().data.headers).length > 0);
}
