import { Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { DatetimeRangeComponent, FilterBaseComponent, FilterCardComponent, TextInputComponent, UserLookupComponent } from "../../../../components";
import { ReminderListFilter } from "../../../../core/models/reminder/reminder-list-request";
import { IForm } from "../../../../core/models/common";
import { ColComponent, RowComponent } from "@coreui/angular";
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-reminder-list-filter',
  templateUrl: './reminder-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    UserLookupComponent,
    TriStateCheckboxModule,
    FilterCardComponent,
    TextInputComponent,
    DatetimeRangeComponent
  ]
})
export class ReminderListFilterComponent extends FilterBaseComponent<ReminderListFilter> {
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
