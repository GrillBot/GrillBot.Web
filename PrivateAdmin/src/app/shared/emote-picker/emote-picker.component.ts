import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from 'rxjs';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { EmoteItem } from 'src/app/core/models/emotes';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-emote-picker',
    templateUrl: './emote-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmotePickerComponent),
            multi: true
        }
    ]
})
export class EmotePickerComponent implements OnInit, ControlValueAccessor {
    @Input() isMultiSelect = false;

    data: EmoteItem[];
    selected: string | string[];
    disabled = false;

    private onTouched: () => void = noop;
    private onChange: (value: string | string[]) => void = noop;

    constructor(
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getEmotes().subscribe(data => this.data = data);
    }

    writeValue(obj: string | string[]): void {
        this.selected = obj;
    }

    registerOnChange(fn: (_: string | string[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = this.disabled;
    }

    onBlur(): void {
        this.onTouched();
    }

    onValueChanged(_: string | string[]): void {
        this.onChange(this.selected);
    }
}
