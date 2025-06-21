import { Component } from "@angular/core";
import { CheckboxComponent, FilterBaseComponent, FilterCardComponent, TextInputComponent } from "../../../../components";
import { AutoReplyDefinitionListRequest } from "../../../../core/models/message";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";
import { IForm } from "../../../../core/models/common";

@Component({
  selector: 'app-auto-reply-list-filter',
  templateUrl: './auto-reply-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    TextInputComponent,
    CheckboxComponent,
    FilterCardComponent
  ],
})
export class AutoReplyListFilterComponent extends FilterBaseComponent<AutoReplyDefinitionListRequest> {
  override configure(): void {
    this.filterId = 'auto-reply/auto-reply-list';
  }

  override createForm(): IForm<AutoReplyDefinitionListRequest> {
    return {
      templateContains: this.createControl(),
      replyContains: this.createControl(),
      hideDisabled: this.createControl({ validators: [] }, false)
    };
  }
}
