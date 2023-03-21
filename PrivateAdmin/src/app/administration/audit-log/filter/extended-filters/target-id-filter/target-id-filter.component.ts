import { noop } from 'rxjs';
import { TargetIdFilter } from './../../../../../core/models/audit-log';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, forwardRef, Input } from '@angular/core';

@Component({
    selector: 'app-target-id-filter',
    templateUrl: './target-id-filter.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TargetIdFilterComponent),
            multi: true
        }
    ]
})
export class TargetIdFilterComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;

    form: FormGroup;

    private onChange: (obj: TargetIdFilter) => void = noop;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            targetId: []
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: TargetIdFilter): void {
        if (obj) {
            this.form.get('targetId').setValue(obj.targetId ?? '');
        }
    }

    registerOnChange(fn: (_: TargetIdFilter) => void): void {
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
        const filter = TargetIdFilter.create(this.form.value);
        this.onChange(filter);
    }
}
