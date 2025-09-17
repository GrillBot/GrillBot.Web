import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AdvancedFilterBase } from "../advanced-filter.component.base";
import { ExecutionSearchRequest } from "../../../../../core/models/audit-log";
import { IForm } from "../../../../../core/models/common";
import {
  CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, FormControlDirective,
  FormLabelDirective, InputGroupComponent, RowComponent
} from "@coreui/angular";
import { CheckboxModule } from "primeng/checkbox";
import { RadioGroupComponent, RadioItem, TextInputComponent } from "../../../../../components";

@Component({
  selector: 'app-execution-search',
  templateUrl: './execution-search.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    FormLabelDirective,
    FormControlDirective,
    RowComponent,
    ColComponent,
    InputGroupComponent,
    TextInputComponent,
    CheckboxModule,
    RadioGroupComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExecutionSearchComponent),
      multi: true
    }
  ]
})
export class ExecutionSearchComponent extends AdvancedFilterBase<ExecutionSearchRequest> {
  successItems: RadioItem[] = [
    { label: 'Úspěšně', value: true },
    { label: 'Neúspěšně', value: false },
    { label: 'Nerozhoduje', value: null }
  ];

  override createForm(): IForm<ExecutionSearchRequest> {
    return {
      actionName: this.formBuilder.control<string>(''),
      durationFrom: this.formBuilder.control<number | null>(null),
      durationTo: this.formBuilder.control<number | null>(null),
      success: this.formBuilder.control<boolean | null>(null)
    };
  }

  override writeValue(obj: ExecutionSearchRequest | null): void {
    this.form.patchValue({
      actionName: obj?.actionName ?? '',
      durationFrom: obj?.durationFrom,
      durationTo: obj?.durationTo,
      success: obj?.success
    });
  }

  protected override transform(value: ExecutionSearchRequest): ExecutionSearchRequest {
    return {
      actionName: value.actionName?.toNullIfEmpty() ?? null,
      durationFrom: value.durationFrom ?? null,
      durationTo: value.durationTo ?? null,
      success: value.success ?? null
    };
  }
}
