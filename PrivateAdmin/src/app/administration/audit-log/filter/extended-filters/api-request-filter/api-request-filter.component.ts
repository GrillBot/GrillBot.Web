/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { noop } from 'rxjs';
import { ApiRequestFilter } from './../../../../../core/models/audit-log';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef } from '@angular/core';
import { SelectItems } from 'src/app/shared/select/models';

@Component({
    selector: 'app-api-request-filter',
    templateUrl: './api-request-filter.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ApiRequestFilterComponent),
            multi: true
        }
    ]
})
export class ApiRequestFilterComponent implements OnInit, ControlValueAccessor {
    form: FormGroup;

    userRoles: SelectItems = [
        { key: 'Nerozhoduje', value: null },
        { key: 'Admin', value: 'Admin' },
        { key: 'User', value: 'User' }
    ];

    httpMethods: SelectItems = [
        { key: 'Nerozhoduje', value: null },
        { key: 'GET', value: 'GET' },
        { key: 'HEAD', value: 'HEAD' },
        { key: 'POST', value: 'POST' },
        { key: 'PUT', value: 'PUT' },
        { key: 'DELETE', value: 'DELETE' },
        { key: 'OPTIONS', value: 'OPTIONS' },
        { key: 'PATCH', value: 'PATCH' }
    ];

    apiGroupNames: SelectItems = [
        { key: 'V1', value: 'V1' },
        { key: 'V2', value: 'V2' }
    ];

    private onChange: (obj: ApiRequestFilter) => void = noop;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            controllerName: [],
            actionName: [],
            pathTemplate: [],
            durationFrom: [],
            durationTo: [],
            method: [null],
            loggedUserRole: [null],
            apiGroupName: [null]
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: ApiRequestFilter): void {
        if (obj) {
            this.form.patchValue(obj.serialized);
        }
    }

    registerOnChange(fn: (_: ApiRequestFilter) => void): void {
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
        const filter = ApiRequestFilter.create(this.form.value);
        this.onChange(filter);
    }
}
