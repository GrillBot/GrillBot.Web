import { Component, computed, inject, input, signal, viewChild } from "@angular/core";
import { UnverifyDetail } from "../../../../../core/models/unverify/unverify-detail";
import { BadgeComponent, CardBodyComponent, CardComponent, CardFooterComponent } from "@coreui/angular";
import { ButtonComponent } from "../../../../../components/button/button.component";
import { InfoRowComponent, LoadingComponent, ModalComponent, ModalQuestionButtonsComponent, UserLookupPipe } from "../../../../../components";
import { ButtonDef } from "../../../../../components/button/button.models";
import { AsyncPipe } from "@angular/common";
import { UnverifyClient } from "../../../../../core/clients";
import { catchError, filter, throwError } from "rxjs";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot } from "../../../../../core/mappers/router.mapper";

type RemoveAccessState = 'not-started' | 'running' | 'failed';

@Component({
  selector: 'app-unverify-common-info',
  templateUrl: './unverify-common-info.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    ButtonComponent,
    InfoRowComponent,
    ModalComponent,
    UserLookupPipe,
    AsyncPipe,
    ModalQuestionButtonsComponent,
    LoadingComponent,
    BadgeComponent
  ]
})
export class UnverifyCommonInfoComponent {
  readonly #client = inject(UnverifyClient);
  readonly #router = inject(Router);

  detail = input.required<UnverifyDetail>();

  removeAccessState = signal<RemoveAccessState>('not-started');

  removeQuestionModal = viewChild<ModalComponent>('removeQuestionModal');

  routeParams = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root));
  guildId = computed(() => this.routeParams()['guildId'] as string);
  userId = computed(() => this.routeParams()['userId'] as string);

  isForceRemove?: boolean;

  buttons: ButtonDef[] = [
    {
      id: 'remove-unverify',
      title: 'Vrátit přístup',
      color: 'primary',
      variant: 'outline',
      size: 'sm',
      action: () => this.removeQuestionModal()?.open(
        () => this.isForceRemove = false,
        () => this.isForceRemove = undefined
      )
    },
    {
      id: 'force-remove-unverify',
      title: 'Smazat odebrání přístupu',
      color: 'danger',
      variant: 'outline',
      size: 'sm',
      action: () => this.removeQuestionModal()?.open(
        () => this.isForceRemove = true,
        () => this.isForceRemove = undefined
      )
    }
  ]

  removeUnverifyConfirmed(): void {
    if (this.isForceRemove === undefined) {
      return;
    }

    this.removeAccessState.set('running');

    this.#client.removeUnverify(this.guildId(), this.userId(), this.isForceRemove)
      .pipe(
        filter(res => res.type === 'finish'),
        catchError(err => {
          this.removeAccessState.set('failed');
          return throwError(() => err);
        })
      ).subscribe(() => this.#router.navigate(['/web/unverify/current-status']));
  }
}
