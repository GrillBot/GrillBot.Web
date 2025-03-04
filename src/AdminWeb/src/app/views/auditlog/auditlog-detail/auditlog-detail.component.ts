import { Component, computed, inject } from "@angular/core";
import { AuditLogClient } from "../../../core/clients";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import {
  AsBitmaskStringPipe, AsReadonlyFormControlPipe, LocaleDatePipe, SpacedNumberPipe, TimeSpanPipe, WithLoadingPipe
} from "../../../core/pipes";
import {
  ChannelLookupPipe, CheckboxComponent, GuildLookupPipe, LoadingComponent, RoleLookupPipe, UserLookupPipe
} from "../../../components";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot } from "../../../core/mappers/router.mapper";
import { map, Observable } from "rxjs";
import { RawHttpResponse, WithSortAndPagination } from "../../../core/models/common";
import { LogListItem, SearchRequest } from "../../../core/models/audit-log";
import {
  AlertComponent, CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, ContainerComponent, RowComponent, TableDirective
} from "@coreui/angular";
import { InfoRowComponent } from "../../../components/info-row/info-row.component";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogType, AuditLogTypeLocalization } from "../../../core/enums/audit-log-type";
import { mapEnumToDict } from "../../../core/mappers";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  templateUrl: './auditlog-detail.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    LoadingComponent,
    CardComponent,
    CardBodyComponent,
    InfoRowComponent,
    AlertComponent,
    IconDirective,
    RowComponent,
    ColComponent,
    LocaleDatePipe,
    NgTemplateOutlet,
    GuildLookupPipe,
    UserLookupPipe,
    ChannelLookupPipe,
    ContainerComponent,
    TableDirective,
    AsBitmaskStringPipe,
    SpacedNumberPipe,
    TimeSpanPipe,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    RoleLookupPipe,
    CardTitleDirective
  ]
})
export class AuditLogDetailComponent {
  readonly #client = inject(AuditLogClient);
  readonly #router = inject(Router);

  id = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root)['id'] as string);

  logItemRequest$ = computed(() => this.createLogItemRequest());
  detailRequest$ = computed(() => this.#client.getDetail(this.id()));

  private createLogItemRequest(): Observable<RawHttpResponse<LogListItem | null>> {
    const request: WithSortAndPagination<SearchRequest> = {
      advancedSearch: null,
      channelId: null,
      createdFrom: null,
      createdTo: null,
      guildId: null,
      ids: [this.id()],
      ignoreTypes: [],
      onlyWithFiles: false,
      pagination: {
        page: 0,
        pageSize: 1
      },
      showTypes: [],
      sort: {
        descending: false,
        orderBy: 'CreatedAt'
      },
      userIds: []
    };

    return this.#client.searchItems(request).pipe(map(response => {
      return {
        type: response.type,
        value: response.value ? response.value.data[0] : null
      };
    }));
  }

  mapLogType(value: number): string {
    const values = mapEnumToDict(AuditLogType, AuditLogTypeLocalization);
    return values.find(o => o.key === value)?.value ?? `Neznámý typ (${value})`;
  }
}
