import { Component, forwardRef } from "@angular/core";
import { ApiSearchRequest } from "../../../../../core/models/audit-log";
import { AdvancedFilterBase } from "../advanced-filter.component.base";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { IForm } from "../../../../../core/models/common";
import {
  CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, FormControlDirective,
  FormLabelDirective, InputGroupComponent, RowComponent
} from "@coreui/angular";
import { NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../../../core/directives";
import { TextInputComponent } from "../../../../../components";

@Component({
  selector: 'app-api-search',
  templateUrl: './api-search.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    RowComponent,
    ColComponent,
    NgSelectComponent,
    NgSelectorDirective,
    FormLabelDirective,
    FormControlDirective,
    InputGroupComponent,
    TextInputComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApiSearchComponent),
      multi: true
    }
  ]
})
export class ApiSearchComponent extends AdvancedFilterBase<ApiSearchRequest> {
  readonly api_groups = ['V1', 'V2', 'V3'].map(o => ({ key: o, value: o }));
  readonly methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'].map(o => ({ key: o, value: o }));

  override writeValue(obj: ApiSearchRequest | null): void {
    this.form.patchValue({
      controllerName: obj?.controllerName ?? '',
      actionName: obj?.actionName ?? '',
      pathTemplate: obj?.pathTemplate ?? '',
      durationFrom: obj?.durationFrom,
      durationTo: obj?.durationTo,
      identification: obj?.identification ?? '',
      apiGroupName: obj?.apiGroupName ?? '',
      method: obj?.method ?? ''
    });
  }

  override createForm(): IForm<ApiSearchRequest> {
    return {
      actionName: this.formBuilder.control<string>(''),
      apiGroupName: this.formBuilder.control<string | null>(null),
      controllerName: this.formBuilder.control<string>(''),
      durationFrom: this.formBuilder.control<number | null>(null),
      durationTo: this.formBuilder.control<number | null>(null),
      identification: this.formBuilder.control<string>(''),
      method: this.formBuilder.control<string>(''),
      pathTemplate: this.formBuilder.control<string>('')
    };
  }

  protected override transform(value: ApiSearchRequest): ApiSearchRequest {
    return {
      actionName: value.actionName?.toNullIfEmpty() ?? null,
      apiGroupName: value.apiGroupName?.toNullIfEmpty() ?? null,
      controllerName: value.controllerName?.toNullIfEmpty() ?? null,
      durationFrom: value.durationFrom,
      durationTo: value.durationTo,
      identification: value.identification?.toNullIfEmpty() ?? null,
      method: value.method?.toNullIfEmpty() ?? null,
      pathTemplate: value.pathTemplate?.toNullIfEmpty() ?? null
    };
  }
}
