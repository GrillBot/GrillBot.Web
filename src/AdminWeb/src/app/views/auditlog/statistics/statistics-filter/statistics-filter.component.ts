import { Component } from "@angular/core";
import { FilterBaseComponent, FilterCardComponent, RadioGroupComponent, RadioItem } from "../../../../components";
import { StatisticsFilter } from "../../../../core/models/audit-log";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../../core/directives";

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
  endpoints = [
    { value: 'Privátní API', key: 'private-api' },
    { value: 'Veřejné API', key: 'public-api' },
    { value: 'Příkazy', key: 'interactions' },
    { value: 'AuditLog', key: 'audit-log' }
  ];

  groupingKeys: RadioItem[] = [
    { label: 'Denní', value: 'ByDate' },
    { label: 'Měsíční', value: 'ByMonth' },
    { label: 'Roční', value: 'ByYear' }
  ];

  override configure(): void {
    this.filterId = 'auditlog/statistics';
  }

  override createForm(): IForm<StatisticsFilter> {
    return {
      endpoint: this.createControl({ validators: [] }),
      groupingKey: this.createControl({ validators: [] })
    };
  }

  override beforeFill(): void {
    this.form.patchValue({
      endpoint: this.endpoints[0].key,
      groupingKey: this.groupingKeys[0].value
    });
  }
}
