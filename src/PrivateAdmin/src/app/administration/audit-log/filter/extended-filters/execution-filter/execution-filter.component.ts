import { SelectItems } from './../../../../../shared/select/models';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ExecutionSearchRequest } from './../../../../../core/models/audit-log';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { noop } from 'rxjs';

@Component({
    selector: 'app-execution-filter',
    templateUrl: './execution-filter.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ExecutionFilterComponent),
            multi: true
        }
    ]
})
export class ExecutionFilterComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;

    form: UntypedFormGroup;

    successItems: SelectItems = [
        { key: 'Nerozhoduje', value: null },
        { key: 'Ano', value: true },
        { key: 'Ne', value: false }
    ];

    private onChange: (obj: ExecutionSearchRequest) => void = noop;

    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            actionName: [],
            success: [null],
            durationFrom: [],
            durationTo: []
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: ExecutionSearchRequest): void {
        if (obj) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.form.patchValue(obj.serialized);
        }
    }

    registerOnChange(fn: (obj: ExecutionSearchRequest) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(_: () => void): void { noop(); }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    private submit(): void {
        this.onChange(ExecutionSearchRequest.create(this.form.value));
    }
}
