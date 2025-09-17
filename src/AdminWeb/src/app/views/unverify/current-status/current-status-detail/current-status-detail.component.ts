import { AsyncPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { AsReadonlyFormControlPipe, WithLoadingPipe } from "../../../../core/pipes";
import {
  CheckboxComponent, GuildLookupPipe, InfoRowComponent, LoadingComponent, UserLookupPipe
} from "../../../../components";
import { AlertComponent, CardBodyComponent, CardComponent, ColComponent, ContainerComponent, RowComponent } from "@coreui/angular";
import { UnverifyClient } from "../../../../core/clients";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot } from "../../../../core/mappers/router.mapper";
import { IconComponent } from "@coreui/icons-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { UnverifyTimingComponent } from "./unverify-timing/unverify-timing.component";
import { UnverifyCommonInfoComponent } from "./unverify-common-info/unverify-common-info.component";
import { RoleListComponent, ChannelListComponent } from "../../components";

@Component({
  templateUrl: './current-status-detail.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    LoadingComponent,
    CardComponent,
    CardBodyComponent,
    InfoRowComponent,
    GuildLookupPipe,
    UserLookupPipe,
    ContainerComponent,
    AlertComponent,
    IconComponent,
    RowComponent,
    ColComponent,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    UnverifyTimingComponent,
    UnverifyCommonInfoComponent,
    RoleListComponent,
    ChannelListComponent
  ]
})
export class CurrentStatusDetailComponent {
  readonly #client = inject(UnverifyClient);
  readonly #router = inject(Router);

  routeParams = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root));
  guildId = computed(() => this.routeParams()['guildId'] as string);
  userId = computed(() => this.routeParams()['userId'] as string)

  detailRequest$ = computed(() => this.#client.getActiveUnverifyDetailAsync(this.guildId(), this.userId()));
}
