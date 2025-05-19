import { Component } from "@angular/core";
import { ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent } from "@coreui/angular";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { IForm } from "../../../../core/models/common";
import { AdminListRequest } from "../../../../core/models/points/admin-list-request";
import { GuildLookupComponent, UserLookupComponent } from "../../../../components/lookups";
import { CheckboxComponent, RadioGroupComponent, TextInputComponent } from "../../../../components/forms";
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
    InputGroupComponent,
    FormControlDirective,
    GuildLookupComponent,
    UserLookupComponent,
    CheckboxComponent,
    RadioGroupComponent,
    FilterCardComponent,
    TextInputComponent
  ]
})
export class TransactionsFilterComponent extends FilterBaseComponent<AdminListRequest> {
  override configure(): void { }

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
      showMerged: this.createControl({ validators: [] }, false),
      userId: this.createControl()
    };
  }
}
