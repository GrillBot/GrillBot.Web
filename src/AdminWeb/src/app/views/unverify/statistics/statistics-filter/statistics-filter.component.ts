import { Component, computed } from "@angular/core";
import { FilterBaseComponent, FilterCardComponent, RadioGroupComponent, RadioItem } from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../../core/directives";
import { mapEnumToDict } from "../../../../core/mappers";
import { UnverifyOperationLocalization, UnverifyOperationType } from "../../../../core/enums/unverify-operation-type";
import { StatisticsFilter } from "../../../../core/models/unverify/statistics-filter";

@Component({
  selector: 'app-statistics-filter',
  templateUrl: 'statistics-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    NgSelectComponent,
    NgSelectorDirective,
    FormLabelDirective,
    FilterCardComponent,
    RadioGroupComponent
  ]
})
export class StatisticsFilterComponent extends FilterBaseComponent<StatisticsFilter> {
  groupingKeys: RadioItem[] = [
    { label: 'Denní', value: 'ByDate' },
    { label: 'Měsíční', value: 'ByMonth' },
    { label: 'Roční', value: 'ByYear' }
  ];

  operationTypes = computed(() => mapEnumToDict(UnverifyOperationType, UnverifyOperationLocalization));

  override configure(): void {
    this.filterId = 'unverify/statistics';
  }

  override createForm(): IForm<StatisticsFilter> {
    return {
      groupingKey: this.createControl({ validators: [] }),
      operationType: this.createControl({ validators: [] })
    };
  }

  override beforeFill(): void {
    this.form.patchValue({
      groupingKey: this.groupingKeys[0].value,
      operationType: this.operationTypes()[0].key
    });
  }
}
