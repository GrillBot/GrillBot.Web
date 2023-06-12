import { UntypedFormGroup, UntypedFormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextSearchRequest } from './../../../../../core/models/audit-log';
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

    form: UntypedFormGroup;
    private onChange: (obj: TextSearchRequest) => void = noop;

    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            text: [],
            sourceAppName: [],
            source: []
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: TextSearchRequest): void {
        if (obj) {
            this.form.patchValue({
                text: obj.text ?? '',
                sourceAppName: obj.sourceAppName,
                source: obj.source
            });
        }
    }

    registerOnChange(fn: (_: TextSearchRequest) => void): void {
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
        this.onChange(TextSearchRequest.create(this.form.value));
    }
}
