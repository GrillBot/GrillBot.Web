import { Component } from "@angular/core";
import { FilterBaseComponent, FilterCardComponent, GuildLookupComponent } from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-support-list-filter',
  templateUrl: './support-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    GuildLookupComponent,
    FilterCardComponent
  ]
})
export class SupportListFilterComponent extends FilterBaseComponent<{ guildId: string | null }> {
  override configure(): void {
    this.filterId = 'emote/support-list';
  }

  override createForm(): IForm<{ guildId: string | null; }> {
    return {
      guildId: this.createControl()
    };
  }
}
