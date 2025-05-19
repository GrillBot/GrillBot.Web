import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  FilterBaseComponent, FilterCardComponent, GuildLookupComponent, UserLookupComponent
} from "../../../../components";
import { MeasuresListParams } from "../../../../core/models/user-measures/measures-list-params";
import { IForm } from "../../../../core/models/common";
import { ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent } from "@coreui/angular";
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
    FormControlDirective,
    RowComponent,
    ColComponent,
    NgSelectComponent,
    NgSelectorDirective,
    InputGroupComponent,
    FilterCardComponent
  ]
})
export class MeasuresListFilterComponent extends FilterBaseComponent<MeasuresListParams> {
  override configure(): void {
    this.filterId = 'user-measures/measures-list';
  }

  override createForm(): IForm<MeasuresListParams> {
    return {
      type: this.createControl(),
      guildId: this.createControl(),
      userId: this.createControl(),
      moderatorId: this.createControl(),
      createdFrom: this.createControl(),
      createdTo: this.createControl()
    };
  }
}
