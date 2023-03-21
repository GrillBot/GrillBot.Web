/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-argument */
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

@Directive()
export abstract class FilterComponentBase<TFilter> implements OnInit {
    @Output() filterChanged = new EventEmitter<TFilter>();

    form: FormGroup;
    filterId: string | null = null;
    autoSubmit = true;

    constructor(
        protected fb: FormBuilder,
        protected storage: StorageService
    ) { }

    get canStoreData(): boolean { return !!this.filterId; }

    ngOnInit(): void {
        this.configure();

        this.initForm(this.loadFormData());
        if (this.autoSubmit) {
            this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.submitForm());
        }

        this.submitForm();
    }

    submitForm(): void {
        if (this.form.invalid) {
            return;
        }

        const filter = this.createData(false);
        this.filterChanged.emit(filter);

        if (this.canStoreData) {
            const serializedFilter = (filter as any).serialize ? (filter as any).serialize() : filter;
            this.storage.store<TFilter>(this.filterId, serializedFilter);
        }
    }

    cleanFilter(): void {
        const empty = this.createData(true);

        this.updateForm(empty);
    }

    private loadFormData(): TFilter {
        if (!this.canStoreData) {
            return this.createData(true);
        }

        const data = this.storage.read<TFilter>(this.filterId);
        return data ? this.deserializeData(data) : this.createData(true);
    }

    abstract configure(): void;
    abstract deserializeData(data: any): TFilter;
    abstract createData(empty: boolean): TFilter;
    abstract updateForm(filter: TFilter): void;
    abstract initForm(filter: TFilter): void;
}
