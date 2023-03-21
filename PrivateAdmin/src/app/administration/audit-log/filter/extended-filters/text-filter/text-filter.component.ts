import { FormGroup, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextFilter } from './../../../../../core/models/audit-log';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { noop } from 'rxjs';

@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextFilterComponent),
            multi: true
        }
    ]
})
export class TextFilterComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;

    form: FormGroup;

    private onChange: (obj: TextFilter) => void = noop;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            text: []
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: TextFilter): void {
        if (obj) {
            this.form.get('text').setValue(obj?.text ?? '');
        }
    }

    registerOnChange(fn: (_: TextFilter) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void { noop(); }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    private submit(): void {
        const filter = TextFilter.create(this.form.value);
        this.onChange(filter);
    }
}
