import { Observable } from 'rxjs';

export class PaginatedParams {
    public page: number;
    public pageSize: number;

    static create(form: any): PaginatedParams | null {
        if (!form) { return null; }
        const item = new PaginatedParams();

        item.page = form.page;
        item.pageSize = form.pageSize;

        return item;
    }

    clone(): PaginatedParams {
        return PaginatedParams.create({
            page: this.page,
            pageSize: this.pageSize
        });
    }
}

export class PaginatedResponse<TData> {
    public data: TData[];
    public page: number;
    public totalItemsCount: number;
    public canNext: boolean;
    public canPrev: boolean;

    // eslint-disable-next-line no-shadow
    static create<TData>(data: any, converter: (item: any) => TData): PaginatedResponse<TData> {
        const response = new PaginatedResponse<TData>();

        response.canNext = data.canNext;
        response.canPrev = data.canPrev;
        response.data = data.data.map((o: any) => converter(o));
        response.page = data.page;
        response.totalItemsCount = data.totalItemsCount;

        return response;
    }
}

export interface KeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

export type Dictionary<TKey, TValue> = KeyValuePair<TKey, TValue>[];
export type ObservableDict<TKey, TValue> = Observable<Dictionary<TKey, TValue>>;
export type ObservableList<TItem> = Observable<TItem[]>;
export type List<T> = T[];

export interface RangeParams<T> {
    from?: T;
    to?: T;
}

export const createRangeParams = <T, >(from?: T, to?: T): RangeParams<T> =>
    !from && !to ? null : { from, to };

export interface SortParams {
    orderBy?: string;
    descending?: boolean;
}

export class FilterBase {
    public pagination: PaginatedParams;
    public sort: SortParams;

    set(pagination: PaginatedParams, sort: SortParams): void {
        const paginatedData = pagination.clone();
        paginatedData.page = Math.max(paginatedData.page - 1, 0);

        this.pagination = paginatedData;
        this.sort = sort;
    }
}
