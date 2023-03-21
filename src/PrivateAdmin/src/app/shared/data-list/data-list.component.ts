import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { CardComponent } from '../card/card.component';
import { defaultPageSize, pageSizes } from './models';

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
    @Output() readData = new EventEmitter<any>();
    @Output() setDataEvent = new EventEmitter<PaginatedResponse<any>>();

    @Input() parentCard: CardComponent;

    isDataLoaded = false;
    totalItemsCount = 0;
    items: any[] = [];
    form: FormGroup;
    currentPage = 1;
    pageSize: number;

    constructor(
        private fb: FormBuilder
    ) { }

    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    get limit(): number { return parseInt(this.form?.get('limit')?.value ?? defaultPageSize, 10); }
    get pageSizes(): number[] { return pageSizes; }
    get isEmpty(): boolean { return this.items.length === 0; }

    ngOnInit(): void {
        this.form = this.fb.group({
            limit: [defaultPageSize, Validators.compose([
                Validators.min(pageSizes.reduce((prev, curr) => Math.min(prev, curr), Number.MAX_VALUE)),
                Validators.max(pageSizes.reduce((prev, curr) => Math.max(prev, curr), Number.MIN_VALUE))
            ])]
        });

        this.form.valueChanges.subscribe(() => this.onChange(true));
        this.onChange(true);
    }

    filterChanged(): void {
        this.onChange(true);
    }

    setData(result: PaginatedResponse<any>): void {
        this.items = result.data;
        this.currentPage = result.page + 1;
        this.totalItemsCount = result.totalItemsCount === 0 ? 1 : result.totalItemsCount;

        if (this.parentCard) {
            this.parentCard.recordsCount = result.totalItemsCount;
        }

        this.isDataLoaded = true;
        setTimeout(() => this.setDataEvent.emit(result), 10);
    }

    pageChange(_: number): void {
        this.onChange(false);
    }

    private onChange(forgetPage: boolean): void {
        const limit = this.limit;
        this.pageSize = limit;
        this.isDataLoaded = false;

        if (forgetPage) {
            this.currentPage = 1;
        }

        const paginationParams = PaginatedParams.create({ page: this.currentPage, pageSize: limit });
        this.readData.emit(paginationParams);
    }
}
