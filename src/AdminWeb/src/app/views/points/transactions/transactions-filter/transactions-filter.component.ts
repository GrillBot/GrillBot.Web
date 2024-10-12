import { Component, inject } from "@angular/core";
import {
  ButtonDirective,
  CardBodyComponent, CardComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective,
  InputGroupComponent, RowComponent
} from "@coreui/angular";
import { CardHeaderComponent, FilterBaseComponent } from "../../../../components";
import { VisibilityDirective } from "../../../../core/directives/visibility.directive";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { IForm } from "../../../../core/models/common";
import { AdminListRequest } from "../../../../core/models/points/admin-list-request";
import { NgOptionTemplateDirective, NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../../core/directives/ng-selector.directive";
import { WithLoadingPipe } from "../../../../pipes";
import { AsyncPipe } from "@angular/common";
import { NgOptionHighlightDirective } from '@ng-select/ng-option-highlight';
import { GuildLookupComponent } from "../../../../components/lookups";

@Component({
  selector: 'app-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    VisibilityDirective,
    FormDirective,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    NgSelectComponent,
    NgSelectorDirective,
    FormLabelDirective,
    WithLoadingPipe,
    AsyncPipe,
    InputGroupComponent,
    FormControlDirective,
    NgOptionHighlightDirective,
    NgOptionTemplateDirective,
    ButtonDirective,
    GuildLookupComponent
  ]
})
export class TransactionsFilterComponent extends FilterBaseComponent<AdminListRequest> {
  readonly #lookupClient = inject(LookupClient);

  userLookup$ = this.#lookupClient.resolveUserList();

  override configure(): void {
    this.filterId = 'points/transactions';
  }

  override createForm(): IForm<AdminListRequest> {
    return {
      guildId: this.createControl(),
      createdFrom: this.createControl(),
      createdTo: this.createControl(),
      messageId: this.createControl({
        validators: [Validators.pattern(/\d+/)]
      }),
      onlyMessages: this.createControl({ validators: [] }, false),
      onlyReactions: this.createControl({ validators: [] }, false),
      showMerged: this.createControl({ validators: [] }, true),
      userId: this.createControl()
    };
  }
}
