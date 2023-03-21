import { noop } from 'rxjs';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef } from '@angular/core';
import { SelectItems } from 'src/app/shared/select/models';
import { MessageDeletedFilter } from 'src/app/core/models/audit-log';

@Component({
    selector: 'app-message-deleted-filter',
    templateUrl: './message-deleted-filter.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MessageDeletedFilterComponent),
            multi: true
        }
    ]
})
export class MessageDeletedFilterComponent implements OnInit, ControlValueAccessor {
    form: FormGroup;

    containsEmbedItems: SelectItems = [
        { key: 'Nerozhoduje', value: null },
        { key: 'Pouze zprávy s embedy', value: true },
        { key: 'Pouze zprávy bez embedů', value: false }
    ];

    private onChange: (obj: MessageDeletedFilter) => void = noop;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            containsEmbed: [null],
            contentContains: [],
            authorId: []
        });

        this.form.valueChanges.subscribe(_ => this.submit());
    }

    writeValue(obj: MessageDeletedFilter): void {
        if (!obj) { return; }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        this.form.patchValue(obj.serialized);
    }

    registerOnChange(fn: (obj: MessageDeletedFilter) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void { noop(); }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) { this.form.disable(); }
        else { this.form.enable(); }
    }

    private submit(): void {
        const filter = MessageDeletedFilter.create(this.form.value);
        this.onChange(filter);
    }
}
