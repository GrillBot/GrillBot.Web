import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  DatetimeRangeComponent,
  FilterBaseComponent, FilterCardComponent, GuildLookupComponent, UserLookupComponent
} from "../../../../components";
import { InfractionListFilter } from "../../../../core/models/infractions/infraction-list-params";
import { IForm } from "../../../../core/models/common";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { NgSelectorDirective } from "../../../../core/directives/ng-selector.directive";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: 'app-infraction-list-filter',
  templateUrl: './infraction-list-filter.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
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
export class InfractionListFilterComponent extends FilterBaseComponent<InfractionListFilter> {
  override configure(): void {
    this.filterId = 'infractions/list';
  }

  override createForm(): IForm<InfractionListFilter> {
    return {
      type: this.createControl(),
      guildId: this.createControl(),
      userId: this.createControl(),
      moderatorId: this.createControl(),
      created: this.createControl()
    };
  }
}
