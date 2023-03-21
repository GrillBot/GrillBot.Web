/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { SelectItems } from './models';
import { noop } from 'rxjs';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {
    @Input() items: SelectItems = [];
    @Input() isMultiSelect = false;
    @Input() searchable = false;

    selected: any | any[];
    disabled = false;

    private onTouched: () => void = noop;
    private onChange: (value: any | any[]) => void = noop;

    writeValue(obj: any | any[]): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.selected = obj;
    }

    registerOnChange(fn: (value: any | any[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onBlur(): void {
        this.onTouched();
    }

    onValueChange(_: any | any[]): void {
        if (this.selected) {
            if (Array.isArray(this.selected)) {
                this.selected = this.selected.map(o => o?.$ngOptionValue !== undefined ? o?.$ngOptionValue : o);
            } else {
                if (this.selected.$ngOptionValue !== undefined) {
                    this.selected = this.selected.$ngOptionValue;
                }
            }
        }

        this.onChange(this.selected);
    }
}
