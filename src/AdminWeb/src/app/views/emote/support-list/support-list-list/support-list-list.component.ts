import { Component, inject } from "@angular/core";
import { AsyncLookupCellRendererComponent, CheckboxCellRenderer, ImageCellRendererComponent, ListBaseComponent, PaginatedGridComponent } from "../../../../components";
import { EmoteDefinition } from "../../../../core/models/emote";
import { GridOptions } from "ag-grid-community";
import * as rxjs from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { EmoteClient, LookupClient } from "../../../../core/clients";
import { mapEmoteIdToAnimatedFlag, mapEmoteIdToName, mapEmoteIdToNumberId, mapEmoteIdToUrl, mapGuildToLookupRow } from "../../../../core/mappers";
import { HttpErrorResponse } from "@angular/common/http";
import { Guild } from "../../../../core/models/guilds";

@Component({
  selector: 'app-support-list-list',
  templateUrl: './support-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class SupportListListComponent extends ListBaseComponent<{ guildId: string | null }, EmoteDefinition> {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'fullId',
          headerName: 'Emote',
          maxWidth: 100,
          cellRenderer: ImageCellRendererComponent,
          cellRendererParams: {
            width: 64,
            height: 64
          },
          valueGetter: params => mapEmoteIdToUrl(params.data.fullId)
        },
        {
          colId: 'id',
          headerName: 'ID',
          maxWidth: 230,
          valueGetter: params => mapEmoteIdToNumberId(params.data.fullId)
        },
        {
          colId: 'name',
          headerName: 'Název',
          valueGetter: params => mapEmoteIdToName(params.data.fullId)
        },
        {
          colId: 'animated',
          headerName: 'Animovaný',
          valueGetter: params => mapEmoteIdToAnimatedFlag(params.data.fullId),
          cellRenderer: CheckboxCellRenderer,
          maxWidth: 150
        },
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) =>
              this.#lookupClient.resolveGuild(guildId).pipe(
                rxjs.catchError((err: HttpErrorResponse) => err.status == 404 ? rxjs.of(null as Guild | null) : rxjs.throwError(() => err)),
                rxjs.map(guild => mapGuildToLookupRow(guild, guildId))
              )
          },
          maxWidth: 500
        },
        {
          field: 'fullId',
          headerName: 'Plné ID'
        }
      ]
    }
  }

  override createRequest(request: WithSortAndPagination<{ guildId: string | null; }>)
    : rxjs.Observable<RawHttpResponse<PaginatedResponse<EmoteDefinition>>> {
    return this.#client.getSupportedEmotesList(request.guildId).pipe(
      rxjs.map(response => ({
        type: response.type,
        value: {
          data: response.value ?? [],
          page: 1,
          totalItemsCount: response.value?.length ?? 0
        }
      }))
    );
  }

  override createDefaultSort(): SortParameters {
    return {};
  }
}
