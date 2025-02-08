import { Component, computed, inject, signal, viewChild } from "@angular/core";
import { EmoteClient } from "../../../core/clients";
import {
  AlertComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent,
  CardTitleDirective, ColComponent, ColDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, RowComponent
} from "@coreui/angular";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot as mapParamsFromSnapshot } from "../../../core/mappers/router.mapper";
import { AsReadonlyFormControlPipe, LocaleDatePipe, SpacedNumberPipe, WithLoadingPipe } from "../../../core/pipes";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { CheckboxComponent, GuildLookupPipe, LoadingComponent } from "../../../components";
import { IconDirective } from "@coreui/icons-angular";
import { mapEmoteIdToNumberId } from "../../../core/mappers";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentBase } from "../../../components/component.base";
import { Observable, tap } from "rxjs";
import { RawHttpResponse } from "../../../core/models/common";
import { EmoteInfo } from "../../../core/models/emote";
import { EmoteUsageListComponent } from "./emote-usage-list/emote-usage-list.component";

@Component({
  templateUrl: './emote-detail.component.html',
  standalone: true,
  imports: [
    CardComponent,
    RowComponent,
    ColComponent,
    WithLoadingPipe,
    AsyncPipe,
    LoadingComponent,
    CardBodyComponent,
    CardFooterComponent,
    AlertComponent,
    IconDirective,
    CardTitleDirective,
    NgTemplateOutlet,
    ColDirective,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    GuildLookupPipe,
    LocaleDatePipe,
    SpacedNumberPipe,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ButtonCloseDirective,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    EmoteUsageListComponent
  ]
})
export class EmoteDetailComponent extends ComponentBase {
  readonly #client = inject(EmoteClient);
  readonly #router = inject(Router);

  deleteAllStatisticsModal = viewChild<ModalComponent>('deleteAllStatisticsModal');

  emoteFullId = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root)['emoteId'] as string);
  emoteId = computed(() => mapEmoteIdToNumberId(this.emoteFullId()) ?? '-');
  guildId = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root)['guildId'] as string);
  emoteName = signal<string>('');

  getEmoteInfoRequest$ = computed(() => this.createRequest());

  deleteAllStatistics(action: 'confirm' | 'process'): void {
    const modal = this.deleteAllStatisticsModal();
    if (!modal) {
      return;
    }

    if (action === 'confirm') {
      this.openModal(modal);
      return;
    }

    this.#client.deleteStatistics(this.guildId(), this.emoteFullId(), null).pipe(
      tap(() => this.getEmoteInfoRequest$ = computed(() => this.createRequest())),
    ).subscribe(_ => modal.visible = false);
  }

  reload(): void {
    setTimeout(() => {
      this.getEmoteInfoRequest$ = computed(() => this.createRequest());
    }, 100);
  }

  private createRequest(): Observable<RawHttpResponse<EmoteInfo>> {
    return this.#client.getEmoteInfo(this.guildId(), this.emoteFullId()).pipe(
      tap(response => {
        this.emoteName.set(response.value?.emoteName ?? '');
      })
    );
  }
}
