import { noop } from 'rxjs';
import { UserIdSearchRequest } from './../../../../../core/models/audit-log';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
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

    form: UntypedFormGroup;

    private onChange: (obj: UserIdSearchRequest) => void = noop;
    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            userId: []
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: UserIdSearchRequest): void {
        if (obj) {
            this.form.get('userId').setValue(obj.userId ?? '');
        }
    }

    registerOnChange(fn: (_: UserIdSearchRequest) => void): void {
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
        this.onChange(UserIdSearchRequest.create(this.form.value));
    }
}
