import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'list-button',
    templateUrl: './list-button.component.html',
    styleUrls: ['./list-button.component.scss']
})
export class ListButtonComponent {
    @Input() link?: string;
    @Input() title?: string;
    @Input() iconGroup = 'fas';
    @Input() icon?: string;
    @Input() classList: string[] = [];
    @Input() absoluteLink = false;

    @Output() clicked = new EventEmitter<Event>();

    onClicked(event: Event): void {
        event.stopPropagation();

        if (!this.link) {
            this.clicked.emit(event);
        }
    }
}
