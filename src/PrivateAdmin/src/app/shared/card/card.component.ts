import { Component, Input } from '@angular/core';
import { TemplateBinding } from 'src/app/core/models/common';

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
    @Input() recordsCount?: number;
    @Input() bodyClasses: string[];
    @Input() footer?: TemplateBinding;
    @Input() visible = true;

    toggleVisiblity($event: Event): void {
        if (this.allowHideButton) {
            this.visible = !this.visible;
        }

        $event.stopPropagation();
        $event.preventDefault();
    }
}
