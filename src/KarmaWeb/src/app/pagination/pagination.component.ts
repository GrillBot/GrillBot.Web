import { Component, EventEmitter, Input, Output } from '@angular/core';

type PageType = 'first' | 'prev' | 'next' | 'last';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    @Input() totalCount!: number;
    @Input() page: number = 1;
    @Input() pageSize!: number;
    @Input() maxSize!: number;

    @Output() pageChange = new EventEmitter<number>();

    get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    disabled(type: PageType): boolean {
        switch (type) {
            case 'first':
            case 'prev':
                return this.page === 1;
            case 'last':
            case 'next':
                return this.page === this.pageCount;
            default:
                throw new Error(`Unsupported type ${type}`);
        }
    }

    click(type: PageType): void {
        this.page = this.getNewPage(type);
        this.pageChange.emit(this.page);
    }

    private getNewPage(type: PageType): number {
        switch (type) {
            case 'first':
                return 1;
            case 'last':
                return this.pageCount;
            case 'prev':
                return this.page - 1;
            case 'next':
                return this.page + 1;
            default:
                throw new Error(`Unsupported type ${type}`);
        }
    }
}
