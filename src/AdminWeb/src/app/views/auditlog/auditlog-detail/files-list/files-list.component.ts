import { Component, input } from "@angular/core";
import { File } from "../../../../core/models/audit-log";
import { CardBodyComponent, CardComponent, CardTitleDirective } from "@coreui/angular";
import { SasLinkLookupPipe } from "../../../../components/lookups/pipes/sas-link-lookup.pipe";
import { AsyncPipe } from "@angular/common";
import { FilesizePipe } from "../../../../core/pipes";

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    SasLinkLookupPipe,
    AsyncPipe,
    FilesizePipe
  ]
})
export class FilesListComponent {
  files = input.required<File[]>();
}
