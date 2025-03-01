import { Component, forwardRef } from "@angular/core";
import { UserSearchRequest } from "../../../../../core/models/audit-log";
import { AdvancedFilterBase } from "../advanced-filter.component.base";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { IForm } from "../../../../../core/models/common";
import { UserLookupComponent } from "../../../../../components";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  standalone: true,
  imports: [
    UserLookupComponent,
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSearchComponent),
      multi: true
    }
  ]
})
export class UserSearchComponent extends AdvancedFilterBase<UserSearchRequest> {
  override writeValue(obj: UserSearchRequest | null): void {
    this.form.patchValue({
      userId: obj?.userId ?? null
    });
  }

  override createForm(): IForm<UserSearchRequest> {
    return {
      userId: this.formBuilder.control<string | null>(null)
    };
  }
}
