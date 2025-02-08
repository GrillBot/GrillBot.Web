import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    template: `<common-dashboard>
        <app-new-web-info [text]="'Správa emotů byla přesunuta do nové administrace.'" />
    </common-dashboard>`
})
export class DashboardComponent { }
