import { Component } from "@angular/core";
import { ContainerComponent, RowComponent, ColComponent } from "@coreui/angular";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent
  ]
})
export class NotFoundComponent { }
