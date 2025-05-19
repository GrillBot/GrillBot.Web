import { Component } from "@angular/core";
import { CardHeaderComponent, FilterBaseComponent, FilterButtonsComponent, FilterStoreComponent, FormCardBodyComponent, GuildLookupComponent } from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CardComponent, CardFooterComponent, ColComponent, RowComponent } from "@coreui/angular";
import { VisibilityDirective } from "../../../../core/directives";

@Component({
  selector: 'app-support-list-filter',
  templateUrl: './support-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    VisibilityDirective,
    GuildLookupComponent,
    FilterButtonsComponent,
    FormCardBodyComponent,
    CardFooterComponent,
    FilterStoreComponent
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
