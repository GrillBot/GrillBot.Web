import { Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import {
  CardHeaderComponent, FilterBaseComponent, FilterButtonsComponent, FormCardBodyComponent, UserLookupComponent,
  ValidationErrorsComponent
} from "../../../../components";
import { ReminderListRequest } from "../../../../core/models/reminder/reminder-list-request";
import { IForm } from "../../../../core/models/common";
import {
  CardComponent, ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent
} from "@coreui/angular";
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-reminder-list-filter',
  templateUrl: './reminder-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    InputGroupComponent,
    FormControlDirective,
    UserLookupComponent,
    FilterButtonsComponent,
    ValidationErrorsComponent,
    TriStateCheckboxModule,
    FormCardBodyComponent
  ]
})
export class ReminderListFilterComponent extends FilterBaseComponent<ReminderListRequest> {
  override configure(): void {
    this.filterId = 'reminder/reminder-list';
  }

  override createForm(): IForm<ReminderListRequest> {
    return {
      commandMessageId: this.createControl({
        validators: [
          Validators.pattern(/\d+/),
          Validators.minLength(15)
        ]
      }),
      fromUserId: this.createControl(),
      messageContains: this.createControl(),
      notifyAtFromUtc: this.createControl(),
      notifyAtToUtc: this.createControl(),
      onlyInProcess: this.createControl(),
      onlyPending: this.createControl(),
      toUserId: this.createControl()
    }
  }
}
