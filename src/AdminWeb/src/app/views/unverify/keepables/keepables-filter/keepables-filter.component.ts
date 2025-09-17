import { Component } from "@angular/core";
import { DatetimeRangeComponent, FilterBaseComponent, FilterCardComponent, TextInputComponent } from "../../../../components";
import { KeepablesListFilter } from "../../../../core/models/unverify/keepables-list-request";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";

@Component({
  templateUrl: './keepables-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    TextInputComponent,
    FilterCardComponent,
    DatetimeRangeComponent
  ]
})
export class KeepablesFilterComponent extends FilterBaseComponent<KeepablesListFilter> {
  override configure(): void {
    this.filterId = 'unverify/keepables';
  }

  override createForm(): IForm<KeepablesListFilter> {
    return {
      created: this.createControl(),
      group: this.createControl()
    };
  }
}
