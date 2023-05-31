import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup, AbstractControl } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
    @Input() id: string;
    @Input() label: string;
    @Input() checked = false;
    @Input() disabled = false;
    @Output('onChange') onChangeEvent = new EventEmitter<boolean>();

    form: UntypedFormGroup;

    private onChange: (_: any) => void = noop;

    constructor(private fb: UntypedFormBuilder) { }

    get checkbox(): AbstractControl { return this.form.get('checkbox'); }

    ngOnInit(): void {
        this.form = this.fb.group({
            checkbox: [{ value: this.checked, disabled: this.disabled }]
        });

        this.checkbox.valueChanges.subscribe((value: boolean) => {
            this.onChange(value);
            this.onChangeEvent.emit(value);
            this.checked = value;
        });
    }

    writeValue(obj: boolean): void {
        this.checkbox.setValue(obj);
        this.checked = obj;
    }

    registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void { noop(); }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.checkbox.disable();
        } else {
            this.checkbox.enable();
        }

        this.disabled = isDisabled;
    }
}
