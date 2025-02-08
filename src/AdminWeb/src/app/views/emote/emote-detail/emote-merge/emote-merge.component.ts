import { Component, computed, inject, input, OnInit, signal } from "@angular/core";
import { EmoteClient } from "../../../../core/clients";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  AlertComponent, ButtonDirective, CardBodyComponent, CardComponent, CardTitleDirective,
  ColComponent, Colors, FormDirective, FormLabelDirective, RowComponent
} from "@coreui/angular";
import { LoadingComponent, ValidationErrorsComponent } from "../../../../components";
import { SupportedEmotesLookupComponent } from "../../../../components/lookups";
import { IForm } from "../../../../core/models/common";
import { MergeStatisticsResult } from "../../../../core/models/emote";
import { IconDirective } from "@coreui/icons-angular";
import { SpacedNumberPipe } from "../../../../core/pipes";
import { catchError, debounceTime, EMPTY, filter } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { mapHttpErrors } from "../../../../core/mappers";

export type MergeState = 'NotStarted' | 'Executing' | 'Failed' | 'Success';

@Component({
  selector: 'app-emote-merge',
  templateUrl: './emote-merge.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardTitleDirective,
    CardBodyComponent,
    ReactiveFormsModule,
    FormDirective,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    ValidationErrorsComponent,
    SupportedEmotesLookupComponent,
    ButtonDirective,
    AlertComponent,
    IconDirective,
    LoadingComponent,
    SpacedNumberPipe
  ]
})
export class EmoteMergeComponent implements OnInit {
  readonly #client = inject(EmoteClient);
  readonly #formBuilder = inject(FormBuilder);

  form!: FormGroup<IForm<{ destinationEmoteId: string }>>;
  guildId = input.required<string>();
  sourceEmoteId = input.required<string>();
  state = signal<MergeState>('NotStarted');
  stateErrorMessages = signal<string[] | null>(null);
  mergeResult = signal<MergeStatisticsResult | null>(null);
  newEmoteUrl = signal<string | null>(null);

  stateColor = computed<Colors>(() => {
    switch (this.state()) {
      case 'Executing': return 'primary';
      case 'Success': return 'success';
      case 'Failed': return 'danger';
      default: return 'transparent';
    }
  });

  supportedEmotes$ = computed(() => this.#client.getSupportedEmotesList(this.guildId()));

  ngOnInit(): void {
    this.form = this.#formBuilder.group<IForm<{ destinationEmoteId: string }>>({
      destinationEmoteId: this.#formBuilder.control<string>('', {
        validators: [
          Validators.required,
          control => control.value && control.value === this.sourceEmoteId() ? {
            customValidationError: {
              message: 'Zdrojový a cílový emote nesmí být stejný'
            }
          } : null
        ]
      })
    });
  }

  executeMerge(): void {
    if (this.form.invalid) {
      return;
    }

    this.state.set('Executing');
    this.#client.mergeStatistics(this.guildId(), this.sourceEmoteId(), this.form.value.destinationEmoteId).pipe(
      debounceTime(300),
      filter(res => res.type != 'start'),
      catchError((err: HttpErrorResponse) => {
        this.state.set('Failed');
        this.stateErrorMessages.set([...new Set(
          mapHttpErrors(err).map(err => {
            if (!err.startsWith('ValidationError')) {
              return err
            } else {
              const [key, value] = err.replace('ValidationError:', '').trim().split(' => ');
              return `${key}: ${value}`;
            }
          })
        )]);

        return EMPTY;
      })
    ).subscribe(response => {
      this.state.set('Success');
      this.mergeResult.set(response.value ?? null);
      this.newEmoteUrl.set(`/web/emote/stats/${this.guildId()}/${this.form.value.destinationEmoteId}`);
    });
  }
}
