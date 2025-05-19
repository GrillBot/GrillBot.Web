import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AdvancedFilterBase } from "../advanced-filter.component.base";
import { MessageDeletedSearchRequest } from "../../../../../core/models/audit-log";
import { IForm } from "../../../../../core/models/common";
import {
  CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, RowComponent
} from "@coreui/angular";
import { TextInputComponent, UserLookupComponent } from "../../../../../components";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";

@Component({
  selector: 'app-message-deleted-search',
  templateUrl: './message-deleted-search.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    RowComponent,
    ColComponent,
    UserLookupComponent,
    TriStateCheckboxModule,
    ReactiveFormsModule,
    TextInputComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MessageDeletedSearchComponent),
      multi: true
    }
  ]
})
export class MessageDeletedSearchComponent extends AdvancedFilterBase<MessageDeletedSearchRequest> {
  override writeValue(obj: MessageDeletedSearchRequest | null): void {
    this.form.patchValue({
      authorId: obj?.authorId,
      containsEmbed: obj?.containsEmbed,
      contentContains: obj?.contentContains ?? ''
    });
  }

  override createForm(): IForm<MessageDeletedSearchRequest> {
    return {
      authorId: this.formBuilder.control<string | null>(null),
      containsEmbed: this.formBuilder.control<boolean | null>(null),
      contentContains: this.formBuilder.control<string>('')
    };
  }

  protected override transform(value: MessageDeletedSearchRequest): MessageDeletedSearchRequest {
    return {
      authorId: value.authorId ?? null,
      containsEmbed: value.containsEmbed ?? null,
      contentContains: value.contentContains?.toNullIfEmpty() ?? null
    };
  }
}
