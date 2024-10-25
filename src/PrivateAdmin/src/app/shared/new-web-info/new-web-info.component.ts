import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-new-web-info',
    templateUrl: './new-web-info.component.html'
})
export class NewWebInfoComponent {
    @Input() text: string;
}
