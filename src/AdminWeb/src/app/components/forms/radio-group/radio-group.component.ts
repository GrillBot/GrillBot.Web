import { Component, forwardRef, inject, input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ColComponent, FormCheckInputDirective, FormCheckLabelDirective, RowComponent } from "@coreui/angular";
import { RadioItem } from "./radio-group.models";
import { ChunkPipe } from "../../../core/pipes";

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    ReactiveFormsModule,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ChunkPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ],
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent implements ControlValueAccessor {
  readonly #formBuilder = inject(FormBuilder);

  radioId = input.required<string>();
  items = input.required<RadioItem[]>();
  formControl = this.#formBuilder.control<any | null>(null);

  writeValue(obj: any): void {
    this.formControl.patchValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: (_: any) => void): void {
    this.formControl.valueChanges.subscribe(val => fn(val));
  }

  registerOnTouched(fn: () => void): void {
    this.formControl.statusChanges.subscribe(_ => fn());
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
