import { Observable } from 'rxjs';
import { Directive, ViewChild, OnInit } from '@angular/core';
import { PaginatedParams, PaginatedResponse, SortParams } from 'src/app/core/models/common';
import { DataListComponent } from '../data-list/data-list.component';

@Directive()
export abstract class ListComponentBase<TFilter> implements OnInit {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = {};
    sortEnabled = true;

    protected filter: TFilter;

    ngOnInit(): void {
        this.configure();
    }

    filterChanged(filter: TFilter): void {
        this.filter = filter;
        this.reload();
    }

    reload(): void {
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        const request = this.getRequest(pagination);
        request.subscribe(data => this.list.setData(data));
    }

    setSort(orderBy: string | null = null): void {
        if (!this.sortEnabled) { return; }

        if (!orderBy) {
            this.sort.descending = !this.sort.descending;
        } else {
            if (this.sort.orderBy !== orderBy) {
                this.sort.orderBy = orderBy;
            } else {
                this.sort.descending = !this.sort.descending;
            }
        }

        this.reload();
    }

    abstract configure(): void;
    abstract getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>>;
}
