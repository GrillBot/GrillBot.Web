import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SortParams } from 'src/app/core/models/common';

@Directive({
    selector: '[sortable]'
})
export class SortingDirective implements OnInit {
    @Input() key: string;
    @Input() sort: SortParams | null = null;

    @Output() clicked = new EventEmitter<string>();

    constructor(private ref: ElementRef<HTMLElement>) { }

    @HostListener('click')
    onClick(): void {
        this.clicked.emit(this.key);
        this.setSortIcon();
    }

    ngOnInit(): void {
        this.ref.nativeElement.classList.add('sortable');

        if (this.sort?.orderBy === this.key) {
            this.setSortIcon();
        }
    }

    setSortIcon(): void {
        if (!this.sort) { return; }
        document.querySelectorAll('.sortable').forEach(elem => elem.classList.remove('sort-desc', 'sort-asc'));

        if (this.sort.descending) {
            this.ref.nativeElement.classList.add('sort-desc');
        } else {
            this.ref.nativeElement.classList.add('sort-asc');
        }
    }
}
