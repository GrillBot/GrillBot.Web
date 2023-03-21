import { KeyValueItemDirective } from './key-value-item.directive';
import { NgModule } from '@angular/core';
import { RouteClickDirective } from './route-click.directive';

@NgModule({
    declarations: [
        RouteClickDirective,
        KeyValueItemDirective
    ],
    exports: [
        RouteClickDirective,
        KeyValueItemDirective
    ]
})
export class DirectivesModule { }
