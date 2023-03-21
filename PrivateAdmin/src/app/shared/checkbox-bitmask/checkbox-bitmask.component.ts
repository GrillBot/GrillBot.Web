import { noop } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, Input, forwardRef } from '@angular/core';
import { Dictionary } from 'src/app/core/models/common';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'checkbox-bitmask',
    templateUrl: './checkbox-bitmask.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxBitmaskComponent),
            multi: true
        }
    ]
})
export class CheckboxBitmaskComponent implements ControlValueAccessor {
    @Input() options: Dictionary<number, string>;

    bitmask = 0;
    disabled: boolean;

    private onChange: (value: number) => void = noop;
    private onTouched: () => void = noop;

    writeValue(obj: number): void {
        this.bitmask = obj;
    }

    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // tslint:disable: no-bitwise
    onValueChange(maskValue: number, isChecked: boolean): void {
        if (isChecked) {
            this.bitmask |= maskValue;
        } else {
            this.bitmask &= ~maskValue;
        }

        this.onTouched();
        this.onChange(this.bitmask);
    }

    isChecked(mask: number): boolean {
        return (this.bitmask & mask) !== 0;
    }
}
