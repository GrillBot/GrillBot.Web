import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserMeasuresClient } from "../../../core/clients/user-measures.client";
import { IForm } from "../../../core/models/common";
import { CreateMemberWarningParams } from "../../../core/models/user-measures/create-member-warning-params";
import {
  AlertComponent, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, Colors, ContainerComponent,
  FormControlDirective,
  FormDirective, FormLabelDirective, RowComponent
} from "@coreui/angular";
import { CheckboxComponent, GuildLookupComponent, LoadingComponent, UserLookupComponent, ValidationErrorsComponent } from "../../../components";
import { IconDirective } from "@coreui/icons-angular";
import { catchError, debounceTime, EMPTY, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { mapHttpErrors } from "../../../core/mappers/validations.mapper";

type CreateState = 'NotStarted' | 'Executing' | 'Failed' | 'Success';

@Component({
  templateUrl: './create-warning.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    GuildLookupComponent,
    UserLookupComponent,
    ValidationErrorsComponent,
    ButtonDirective,
    AlertComponent,
    LoadingComponent,
    IconDirective,
    CheckboxComponent,
    FormControlDirective
  ],
  styleUrl: './create-warning.component.scss'
})
export class CreateWarningComponent implements OnInit {
  readonly #formBuilder = inject(FormBuilder);
  readonly #client = inject(UserMeasuresClient);

  form!: FormGroup<IForm<CreateMemberWarningParams>>;
  state = signal<CreateState>('NotStarted');
  stateErrorMessages = signal<string[] | null>(null);

  stateColor = computed<Colors>(() => {
    switch (this.state()) {
      case 'Executing': return 'primary';
      case 'Success': return 'success';
      case 'Failed': return 'danger';
      default: return 'transparent';
    }
  });

  ngOnInit(): void {
    this.form = this.#formBuilder.group<IForm<CreateMemberWarningParams>>({
      guildId: this.#formBuilder.control('', {
        validators: [Validators.required]
      }),
      userId: this.#formBuilder.control('', {
        validators: [Validators.required]
      }),
      message: this.#formBuilder.control('', {
        validators: [Validators.required]
      }),
      sendDmNotification: this.#formBuilder.control(true)
    });
  }

  submitWarning(): void {
    if (this.form.invalid) {
      return;
    }

    this.state.set('Executing');

    const request = this.form.value as CreateMemberWarningParams;
    this.#client.createMemberWarning(request)
      .pipe(
        debounceTime(100),
        catchError((err: HttpErrorResponse) => {
          this.state.set('Failed');
          this.stateErrorMessages.set(mapHttpErrors(err));

          return EMPTY;
        })
      ).subscribe(() => { this.state.set('Success'); });
  }
}
