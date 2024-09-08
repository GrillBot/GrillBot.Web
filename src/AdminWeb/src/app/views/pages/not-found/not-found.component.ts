import { Component } from "@angular/core";
import { ContainerComponent, RowComponent, ColComponent, ButtonDirective } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    IconDirective,
    ButtonDirective
  ]
})
export class NotFoundComponent { }
