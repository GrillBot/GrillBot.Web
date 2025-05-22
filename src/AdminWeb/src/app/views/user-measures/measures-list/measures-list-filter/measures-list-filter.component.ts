import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  DatetimeRangeComponent,
  FilterBaseComponent, FilterCardComponent, GuildLookupComponent, UserLookupComponent
} from "../../../../components";
import { MeasuresListFilter } from "../../../../core/models/user-measures/measures-list-params";
import { IForm } from "../../../../core/models/common";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { NgSelectorDirective } from "../../../../core/directives/ng-selector.directive";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: 'app-measures-list-filter',
  templateUrl: './measures-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormLabelDirective,
    GuildLookupComponent,
    UserLookupComponent,
    RowComponent,
    ColComponent,
    NgSelectComponent,
    NgSelectorDirective,
    FilterCardComponent,
    DatetimeRangeComponent
  ]
})
export class MeasuresListFilterComponent extends FilterBaseComponent<MeasuresListFilter> {
  override configure(): void {
    this.filterId = 'user-measures/measures-list';
  }

  override createForm(): IForm<MeasuresListFilter> {
    return {
      type: this.createControl(),
      guildId: this.createControl(),
      userId: this.createControl(),
      moderatorId: this.createControl(),
      created: this.createControl()
    };
  }
}
