import { Component, forwardRef, input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import {
  CardBodyComponent, CardComponent, CardTitleDirective, ColComponent,
  FormControlDirective, FormLabelDirective, RowComponent
} from "@coreui/angular";
import { IForm } from "../../../../../core/models/common";
import { TextSearchRequest } from "../../../../../core/models/audit-log";
import { AdvancedFilterBase } from "../advanced-filter.component.base";

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    FormControlDirective,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextSearchComponent),
      multi: true
    }
  ]
})
export class TextSearchComponent extends AdvancedFilterBase<TextSearchRequest> {
  title = input.required<string>();

  override createForm(): IForm<TextSearchRequest> {
    return {
      source: this.formBuilder.control<string>(''),
      sourceAppName: this.formBuilder.control<string>(''),
      text: this.formBuilder.control<string>('')
    };
  }

  override writeValue(obj: TextSearchRequest | null): void {
    this.form.patchValue({
      source: obj?.source ?? '',
      sourceAppName: obj?.sourceAppName ?? '',
      text: obj?.text ?? ''
    });
  }

  protected override transform(value: TextSearchRequest): TextSearchRequest {
    return {
      source: value.source?.toNullIfEmpty() ?? null,
      sourceAppName: value.sourceAppName?.toNullIfEmpty() ?? null,
      text: value.text?.toNullIfEmpty() ?? null
    }
  }
}
