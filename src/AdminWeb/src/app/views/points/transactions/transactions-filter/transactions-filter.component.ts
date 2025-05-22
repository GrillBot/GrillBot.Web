import { Component } from "@angular/core";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { IForm } from "../../../../core/models/common";
import { AdminListFilter } from "../../../../core/models/points/admin-list-request";
import { GuildLookupComponent, UserLookupComponent } from "../../../../components/lookups";
import { CheckboxComponent, DatetimeRangeComponent, RadioGroupComponent, TextInputComponent } from "../../../../components/forms";
import { FilterBaseComponent, FilterCardComponent } from "../../../../components/filters";

@Component({
  selector: 'app-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    GuildLookupComponent,
    UserLookupComponent,
    CheckboxComponent,
    RadioGroupComponent,
    FilterCardComponent,
    TextInputComponent,
    DatetimeRangeComponent
  ]
})
export class TransactionsFilterComponent extends FilterBaseComponent<AdminListFilter> {
  override configure(): void { }

  override createForm(): IForm<AdminListFilter> {
    return {
      guildId: this.createControl(),
      created: this.createControl(),
      messageId: this.createControl({
        validators: [Validators.pattern(/\d+/)]
      }),
      onlyMessages: this.createControl({ validators: [] }, false),
      onlyReactions: this.createControl({ validators: [] }, false),
      showMerged: this.createControl({ validators: [] }, false),
      userId: this.createControl()
    };
  }
}
