import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, ChannelLookupPipe, GuildLookupPipe,
  ListBaseComponent, ModalComponent, PaginatedGridComponent, UserLookupPipe
} from "../../../../components";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { SearchListItem } from "../../../../core/models/searching/search-list-item";
import { SearchingListRequest } from "../../../../core/models/searching/searching-list-request";
import { Component, computed, inject, signal, viewChild } from "@angular/core";
import { SearchingClient } from "../../../../core/clients/searching.client";
import { LocaleDatePipe, PropsPipe } from "../../../../core/pipes";
import { LookupClient } from "../../../../core/clients/lookup.client";
import * as rxjs from 'rxjs';
import { AlertComponent, ButtonDirective, ColComponent, RowComponent, TableDirective } from "@coreui/angular";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-searching-list-list',
  templateUrl: './searching-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    ModalComponent,
    AlertComponent,
    TableDirective,
    PropsPipe,
    LocaleDatePipe,
    GuildLookupPipe,
    UserLookupPipe,
    ChannelLookupPipe,
    AsyncPipe,
  ]
})
export class SearchingListListComponent extends ListBaseComponent<SearchingListRequest, SearchListItem> {
  readonly #client = inject(SearchingClient);
  readonly #lookupClient = inject(LookupClient);

  selectedRows = signal<SearchListItem[]>([]);
  canDeleteMultipleRows = computed(() => this.selectedRows().length > 0);

  messageModal = viewChild<ModalComponent>('messageModal');
  removeModal = viewChild<ModalComponent>('removeModal');
  modalRows?: SearchListItem[];

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'id',
          headerName: '#',
          maxWidth: 100,
          sortable: true,
          context: {
            sortingKey: 'Id'
          },
          sort: 'desc',
          cellDataType: 'spacedNumber'
        },
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
          }
        },
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
          }
        },
        {
          field: 'channelId',
          headerName: 'Kanál',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (channelId: string) => ChannelLookupPipe.processTransform(channelId, this.#lookupClient)
          }
        },
        {
          field: 'createdAtUtc',
          headerName: 'Vytvořeno',
          maxWidth: 230,
          sortable: true,
          context: {
            sortingKey: 'CreatedAt'
          },
          cellDataType: 'localeDatetime'
        },
        {
          field: 'validToUtc',
          headerName: 'Platné do',
          maxWidth: 230,
          sortable: true,
          context: {
            sortingKey: 'ValidTo'
          },
          cellDataType: 'localeDatetime'
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'show-message',
                title: 'Zobrazit zprávu',
                color: 'primary',
                action: row => this.messageModal()?.open(
                  () => this.modalRows = [row],
                  () => this.modalRows = undefined
                )
              },
              {
                id: 'remove-message',
                title: 'Smazat zprávu',
                color: 'danger',
                action: row => this.removeModal()?.open(
                  () => this.modalRows = [row],
                  () => this.modalRows = undefined
                ),
                isVisible: row => !row.isDeleted
              }
            ] as ButtonDef[]
          }
        }
      ],
      selection: {
        mode: 'multiRow',
        isRowSelectable: row => !row.data.isDeleted
      },
      context: {
        indicateDeletion: true,
        indicateInvalid: true
      }
    };
  }

  override createRequest(request: WithSortAndPagination<SearchingListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<SearchListItem>>> {
    if (request.createdFrom) { request.createdFrom = `${request.createdFrom}Z` };
    if (request.createdTo) { request.createdTo = `${request.createdTo}Z` };
    if (request.validFrom) { request.validFrom = `${request.validFrom}Z` };
    if (request.validTo) { request.validTo = `${request.validTo}Z` };

    return this.#client.getSearchingList(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'Id',
      descending: true
    };
  }

  removeSelectedRows(): void {
    this.removeModal()?.open(
      () => this.modalRows = this.selectedRows(),
      () => this.modalRows = undefined
    );
  }

  confirmRemove(): void {
    const modal = this.removeModal();
    if (!modal || !this.modalRows) {
      return;
    }

    const requests = this.modalRows.map(o => this.#client.removeSearching(o.id));

    rxjs
      .forkJoin(requests)
      .pipe(rxjs.filter(responses => responses.every(x => x.type == 'finish')))
      .subscribe(() => {
        modal.close();
        this.reload();
      });
  }
}
