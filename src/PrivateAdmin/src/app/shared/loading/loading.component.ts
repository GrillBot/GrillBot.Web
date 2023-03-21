import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    @Input() noText = false;
    @Input() small = false;
    @Input() align: 'start' | 'end' | 'center' | 'justify' = 'center';
    @Input() text = 'Probíhá načítání';
}
