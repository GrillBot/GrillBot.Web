import { Component, computed, inject } from "@angular/core";
import { AuditLogClient } from "../../../core/clients";
import { AsyncPipe } from "@angular/common";
import { LocaleDatePipe, WithLoadingPipe } from "../../../core/pipes";
import { ChannelLookupPipe, GuildLookupPipe, LoadingComponent, UserLookupPipe } from "../../../components";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot } from "../../../core/mappers/router.mapper";
import { map, Observable } from "rxjs";
import { RawHttpResponse, WithSortAndPagination } from "../../../core/models/common";
import { LogListItem, SearchRequest } from "../../../core/models/audit-log";
import { AlertComponent, CardBodyComponent, CardComponent, ContainerComponent } from "@coreui/angular";
import { InfoRowComponent } from "../../../components/info-row/info-row.component";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogType, AuditLogTypeLocalization } from "../../../core/enums/audit-log-type";
import { mapEnumToDict } from "../../../core/mappers";
import { DetailTextComponent } from "./detail-text/detail-text.component";
import { ChannelUpdatedComponent } from "./channel-updated/channel-updated.component";
import { OverwriteUpdatedComponent } from "./overwrite-updated/overwrite-updated.component";
import { MemberUpdatedComponent } from "./member-updated/member-updated.component";
import { GuildUpdatedComponent } from "./guild-updated/guild-updated.component";
import { ThreadUpdatedComponent } from "./thread-updated/thread-updated.component";
import { MessageDeletedComponent } from "./message-deleted/message-deleted.component";
import { InteractionCommandComponent } from "./interaction-command/interaction-command.component";
import { ThreadDeletedComponent } from "./thread-deleted/thread-deleted.component";
import { JobCompletedComponent } from "./job-completed/job-completed.component";
import { RoleDeletedComponent } from "./role-deleted/role-deleted.component";
import { ApiRequestComponent } from "./api-request/api-request.component";
import { FilesListComponent } from "./files-list/files-list.component";
import { MessageEditedComponent } from "./message-edited/message-edited.component";
import { OverwriteComponent } from "./overwrite/overwrite.component";

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
    LocaleDatePipe,
    GuildLookupPipe,
    UserLookupPipe,
    ChannelLookupPipe,
    ContainerComponent,
    DetailTextComponent,
    ChannelUpdatedComponent,
    OverwriteUpdatedComponent,
    MemberUpdatedComponent,
    GuildUpdatedComponent,
    ThreadUpdatedComponent,
    MessageDeletedComponent,
    InteractionCommandComponent,
    ThreadDeletedComponent,
    JobCompletedComponent,
    RoleDeletedComponent,
    ApiRequestComponent,
    FilesListComponent,
    MessageEditedComponent,
    OverwriteComponent
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
