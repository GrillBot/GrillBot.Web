/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { UserMeasuresNavigation } from '../navigation';

@Component({
    selector: 'app-create-warning',
    templateUrl: './create-warning.component.html'
})
export class CreateWarningComponent {
    navigation: INavigation;

    constructor(route: ActivatedRoute) {
        this.navigation = new UserMeasuresNavigation(route);
    }
}
