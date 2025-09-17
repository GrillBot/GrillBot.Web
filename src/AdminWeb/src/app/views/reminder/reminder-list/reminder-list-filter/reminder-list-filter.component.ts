import { Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import {
  DatetimeRangeComponent, FilterBaseComponent, FilterCardComponent, RadioGroupComponent,
  RadioItem, TextInputComponent, UserLookupComponent
} from "../../../../components";
import { ReminderListFilter } from "../../../../core/models/reminder/reminder-list-request";
import { IForm } from "../../../../core/models/common";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-reminder-list-filter',
  templateUrl: './reminder-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    UserLookupComponent,
    FilterCardComponent,
    TextInputComponent,
    DatetimeRangeComponent,
    RadioGroupComponent,
    FormLabelDirective
  ]
})
export class ReminderListFilterComponent extends FilterBaseComponent<ReminderListFilter> {
  onlyInProcessItems: RadioItem[] = [
    { label: 'Zpracovávané', value: true },
    { label: 'Nezpracovávané', value: false },
    { label: 'Nerozhoduje', value: null }
  ];

  onlyPendingItems: RadioItem[] = [
    { label: 'Čekající', value: true },
    { label: 'Oznámené', value: false },
    { label: 'Nerozhoduje', value: null }
  ];

  override configure(): void {
    this.filterId = 'reminder/reminder-list';
  }

  override createForm(): IForm<ReminderListFilter> {
    return {
      commandMessageId: this.createControl({
        validators: [
          Validators.pattern(/\d+/),
          Validators.minLength(15)
        ]
      }),
      fromUserId: this.createControl(),
      messageContains: this.createControl(),
      onlyInProcess: this.createControl(),
      onlyPending: this.createControl(),
      toUserId: this.createControl(),
      notifyAt: this.createControl()
    }
  }
}
