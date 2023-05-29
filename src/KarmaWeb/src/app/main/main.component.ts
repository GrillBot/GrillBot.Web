import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KarmaResult } from '../core/models';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    @Input() data?: KarmaResult;
    @Input() currentPage = 1;
    @Input() pageSize!: number;

    @Output() pageChanged = new EventEmitter<number>();

    loading = false;

    onPageChange(event: any) {
        this.pageChanged.emit(event);
        this.loading = true;
    }

}
