import { Component, computed } from "@angular/core";
import { DatetimeRangeComponent, FilterBaseComponent, FilterCardComponent, GuildLookupComponent, TextInputComponent, UserLookupComponent } from "../../../../components";
import { UnverifyLogFilter } from "../../../../core/models/unverify/unverify-log-list-request";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../../core/directives";
import { mapEnumToDict } from "../../../../core/mappers";
import { UnverifyOperationLocalization, UnverifyOperationType } from "../../../../core/enums/unverify-operation-type";

@Component({
  templateUrl: './log-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    GuildLookupComponent,
    FilterCardComponent,
    DatetimeRangeComponent,
    NgSelectComponent,
    NgSelectorDirective,
    UserLookupComponent,
    TextInputComponent,
    FormLabelDirective
  ]
})
export class LogFilterComponent extends FilterBaseComponent<UnverifyLogFilter> {
  operationTypes = computed(() => mapEnumToDict(UnverifyOperationType, UnverifyOperationLocalization));

  override configure(): void {
    this.filterId = 'unverify/log';
  }

  override createForm(): IForm<UnverifyLogFilter> {
    return {
      created: this.createControl(),
      fromUserId: this.createControl(),
      guildId: this.createControl(),
      operation: this.createControl(),
      parentLogItemId: this.createControl(),
      toUserId: this.createControl()
    };
  }

}
