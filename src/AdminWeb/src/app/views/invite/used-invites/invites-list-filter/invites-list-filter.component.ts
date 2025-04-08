import { ReactiveFormsModule, Validators } from "@angular/forms";
import {
  CardHeaderComponent, CheckboxComponent, FilterBaseComponent, FilterButtonsComponent, FilterStoreComponent,
  FormCardBodyComponent, GuildLookupComponent, GuildLookupPipe, ModalComponent, UserLookupComponent, ValidationErrorsComponent
} from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { InviteListRequest } from "../../../../core/models/invite";
import { Component, computed, inject, input, viewChild } from "@angular/core";
import {
  ButtonDirective, CardComponent, CardFooterComponent, ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent,
  RowComponent
} from "@coreui/angular";
import { AsyncPipe } from "@angular/common";
import { InviteClient } from "../../../../core/clients/invite.client";

@Component({
  selector: 'app-invites-list-filter',
  templateUrl: './invites-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    FormCardBodyComponent,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    FormControlDirective,
    GuildLookupComponent,
    UserLookupComponent,
    ValidationErrorsComponent,
    FilterButtonsComponent,
    CheckboxComponent,
    CardFooterComponent,
    FilterStoreComponent,
    InputGroupComponent,
    ButtonDirective,
    ModalComponent,
    GuildLookupPipe,
    AsyncPipe
  ]
})
export class InvitesListFilterComponent extends FilterBaseComponent<InviteListRequest> {
  readonly #client = inject(InviteClient);

  allowSynchronization = input<boolean>(false);

  isSynchronizationEnabled = computed(() => this.allowSynchronization() && this.form.value.guildId);
  guildId = computed(() => this.form.value.guildId as string | null);

  synchronizationModal = viewChild<ModalComponent>('synchronizationModal');

  override configure(): void { }

  override createForm(): IForm<InviteListRequest> {
    const creatorId = this.createControl();
    const onlyWithoutCreator = this.createControl({ validators: [] }, false);

    onlyWithoutCreator.valueChanges.subscribe(value => {
      if (value) {
        creatorId.setValue(null);
        creatorId.disable();
      } else {
        creatorId.enable();
      }
    });

    return {
      guildId: this.createControl(),
      creatorId: creatorId,
      onlyWithoutCreator: onlyWithoutCreator,
      code: this.createControl({
        validators: [
          Validators.pattern(/^[a-zA-Z0-9]+$/),
          Validators.maxLength(10)
        ]
      }, null),
      createdFrom: this.createControl(),
      createdTo: this.createControl()
    };
  }

  confirmSynchronization(): void {
    const modal = this.synchronizationModal();
    const guildId = this.guildId();

    if (!modal || !this.isSynchronizationEnabled() || !guildId) {
      return;
    }

    this.#client.synchronizeGuildInvites(guildId).subscribe(() => {
      this.submitForm();
      modal.close();
    });
  }
}
