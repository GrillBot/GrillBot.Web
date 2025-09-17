import { Component, computed, forwardRef, input } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ButtonDirective, ButtonGroupComponent, FormControlDirective } from "@coreui/angular";
import { IconComponent } from "@coreui/icons-angular";
import { noop } from "rxjs";

type ButtonType = 'first' | 'prev' | 'next' | 'last';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [
    ButtonGroupComponent,
    ButtonDirective,
    FormControlDirective,
    FormsModule,
    IconComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginationComponent),
      multi: true
    }
  ],
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements ControlValueAccessor {
  itemsCount = input.required<number>();
  pageSize = input.required<number>();

  pageCount = computed(() => Math.ceil(this.itemsCount() / this.pageSize()));

  currentPage: number = 1;
  disabled = false;
  onChange: (_: number) => void = noop;

  writeValue(obj: number): void {
    this.currentPage = Math.max(obj, 1);
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(_: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isDisabled(type: ButtonType): boolean {
    switch (type) {
      case 'first':
      case 'prev':
        return this.disabled || this.currentPage <= 1;
      case 'next':
      case 'last':
        return this.disabled || this.currentPage === this.pageCount();
      default:
        throw new Error(`Unsupported type ${type as string}`);
    }
  }

  move(type: ButtonType): void {
    switch (type) {
      case 'first':
        this.currentPage = 1;
        break;
      case 'prev':
        this.currentPage--;
        break;
      case 'next':
        this.currentPage++;
        break;
      case 'last':
        this.currentPage = this.pageCount();
        break;
    }

    this.pageChanged();
  }

  pageChanged(): void {
    this.onChange(Math.max(this.currentPage - 1, 0));
  }
}
