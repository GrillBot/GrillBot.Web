import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UnverifyClient } from "../../../../core/clients";
import { AlertComponent, CardBodyComponent, CardComponent, ContainerComponent } from "@coreui/angular";
import { CardHeaderComponent, GuildLookupPipe, InfoRowComponent, LoadingComponent, UserLookupPipe } from "../../../../components";
import { LocaleDatePipe, WithLoadingPipe } from "../../../../core/pipes";
import { AsyncPipe } from "@angular/common";
import { IconComponent } from "@coreui/icons-angular";
import { mapEnumToDict } from "../../../../core/mappers";
import { UnverifyOperationLocalization, UnverifyOperationType } from "../../../../core/enums/unverify-operation-type";
import { LogDetailUnverifyComponent } from "./log-detail-unverify/log-detail-unverify.component";
import { LogDetailRemoveComponent } from "./log-detail-remove/log-detail-remove.component";
import { LogDetailUpdateComponent } from "./log-detail-update/log-detail-update.component";

@Component({
  templateUrl: './log-detail.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    LoadingComponent,
    AlertComponent,
    WithLoadingPipe,
    AsyncPipe,
    IconComponent,
    CardComponent,
    CardBodyComponent,
    InfoRowComponent,
    LocaleDatePipe,
    GuildLookupPipe,
    UserLookupPipe,
    CardHeaderComponent,
    LogDetailUnverifyComponent,
    LogDetailRemoveComponent,
    LogDetailUpdateComponent
  ]
})
export class LogDetailComponent implements OnInit {
  readonly #client = inject(UnverifyClient);
  readonly #route = inject(ActivatedRoute);

  id = signal<string>('');
  detailRequest$ = computed(() => this.#client.getUnverifyLogDetail(this.id()));

  ngOnInit(): void {
    this.#route.params.subscribe(o => this.id.set(o['id']));
  }

  mapLogType(value: number): string {
    const values = mapEnumToDict(UnverifyOperationType, UnverifyOperationLocalization);
    return values.find(o => o.key === value)?.value ?? `Neznámý typ (${value})`;
  }
}
