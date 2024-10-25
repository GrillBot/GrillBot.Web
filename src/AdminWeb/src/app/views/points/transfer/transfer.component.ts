import { Component, computed, inject, OnInit, signal } from "@angular/core";
import {
  AlertComponent,
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, Colors, ContainerComponent, FormControlDirective,
  FormDirective, FormLabelDirective, RowComponent
} from "@coreui/angular";
import { GuildLookupComponent, LoadingComponent, UserLookupComponent, ValidationErrorsComponent } from "../../../components";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IForm, ValidationProblemDetails } from "../../../core/models/common";
import { TransferPointsRequest } from "../../../core/models/points/transfer-points-request";
import { PointsClient } from "../../../core/clients/points.client";
import { IconDirective } from "@coreui/icons-angular";
import { catchError, debounceTime, EMPTY, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export type TransferState = 'NotStarted' | 'Executing' | 'Failed' | 'Success';

@Component({
  templateUrl: './transfer.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    ContainerComponent,
    RowComponent,
    ColComponent,
    GuildLookupComponent,
    UserLookupComponent,
    ReactiveFormsModule,
    FormDirective,
    ButtonDirective,
    FormControlDirective,
    FormLabelDirective,
    ValidationErrorsComponent,
    AlertComponent,
    LoadingComponent,
    IconDirective
  ],
  styleUrl: './transfer.component.scss'
})
export class TransferComponent implements OnInit {
  readonly #formBuilder = inject(FormBuilder);
  readonly #pointsClient = inject(PointsClient);

  form!: FormGroup<IForm<TransferPointsRequest>>;
  state = signal<TransferState>('NotStarted');
  stateErrorMessages = signal<string[] | null>(null);

  stateColor = computed<Colors>(() => {
    switch (this.state()) {
      case 'Executing': return 'primary';
      case 'Success': return 'success';
      case 'Failed': return 'danger';
      default: return 'transparent';
    }
  })

  ngOnInit(): void {
    this.form = this.#formBuilder.group<IForm<TransferPointsRequest>>({
      amount: this.#formBuilder.control(0, {
        validators: [Validators.required, Validators.min(1), Validators.pattern(/\d+/)]
      }),
      fromUserId: this.#formBuilder.control('', {
        validators: [Validators.required]
      }),
      guildId: this.#formBuilder.control('', {
        validators: [Validators.required]
      }),
      toUserId: this.#formBuilder.control('', {
        validators: [Validators.required]
      })
    });
  }

  executeTransfer() {
    if (this.form.invalid) {
      return;
    }

    this.state.set('Executing');

    const request = this.form.value as TransferPointsRequest;
    this.#pointsClient.transferPoints(request)
      .pipe(
        debounceTime(300),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.processValidationErrors(err.error);

            this.state.set('Failed');
            return EMPTY;
          } else {
            if (Array.isArray(err.error)) {
              this.stateErrorMessages.set(err.error.map(o => typeof o === 'object' ? JSON.stringify(o) : String(o)))
            } else {
              this.stateErrorMessages.set([JSON.stringify(err.error)]);
            }

            this.state.set('Failed');
            return throwError(() => err);
          }
        })
      )
      .subscribe(() => { this.state.set('Success'); });
  }

  private processValidationErrors(error: ValidationProblemDetails): void {
    const result: string[] = [];

    for (const errorKey of Object.keys(error.errors)) {
      result.push(...error.errors[errorKey].map(val => this.processValidationError(errorKey, val)))
    }

    this.stateErrorMessages.set(result);
  }

  private processValidationError(key: string, value: string): string {
    const fallback = `${key}: ${value}`;

    switch (key) {
      case 'Amount':
        switch (value) {
          case 'NotEnoughPoints':
            return 'Uživatel nemá dostatek bodů, které by mohl převést.';
          default:
            return fallback;
        }
      case 'ToUserId':
        switch (value) {
          case 'UnknownUser':
            return 'Nepodařilo se dohledat cílového uživatele.';
          default:
            return fallback;
        }
      case 'FromUserId':
        switch (value) {
          case 'UnknownUser':
            return 'Nepodařilo se dohledat uživatele, který posílá body.'
          default:
            return fallback;
        }
      default:
        return fallback;
    }
  }
}