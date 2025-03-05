import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { ColComponent, RowComponent } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent } from "../../../../components";
import { AsReadonlyFormControlPipe, TimeSpanPipe } from "../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-thread-deleted',
  templateUrl: './thread-deleted.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    InfoRowComponent,
    TimeSpanPipe,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule
  ]
})
export class ThreadDeletedComponent {
  detail = input.required<Detail>();

  formatThreadType(value: number): string {
    switch (value) {
      case 10: return 'Novinky';
      case 11: return 'Veřejné vlákno';
      case 12: return 'Soukromé vlákno';
      default: return `Neznámé vlákno (${value})`;
    }
  }

  formatArchiveDuration(value: number): string {
    switch (value) {
      case 60: return 'Hodina';
      case 1440: return 'Den';
      case 4320: return '3 dny';
      case 10080: return 'Týden';
      default: return `Neznámá hodnota (${value})`;
    }
  }
}
