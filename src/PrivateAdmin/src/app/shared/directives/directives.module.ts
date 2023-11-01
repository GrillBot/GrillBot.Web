import { KeyValueItemDirective } from './key-value-item.directive';
import { NgModule } from '@angular/core';
import { RouteClickDirective } from './route-click.directive';
import { UserLinkDirective } from './user-link.directive';

@NgModule({
    declarations: [
        RouteClickDirective,
        KeyValueItemDirective,
        UserLinkDirective
    ],
    exports: [
        RouteClickDirective,
        KeyValueItemDirective,
        UserLinkDirective
    ]
})
export class DirectivesModule { }
