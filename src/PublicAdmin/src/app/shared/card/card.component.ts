import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input() title: string;
    @Input() icon?: string;
    @Input() size: 'sm' | 'md' | 'lg' = 'lg';
    @Input() header = true;
    @Input() allowHideButton = false;
    @Input() classes: string[];
    @Input() maxWidth?: string;
    @Input() recordsCount?: number;
    @Input() visible = true;

    toggleVisiblity(): void {
        this.visible = !this.visible;
    }
}
