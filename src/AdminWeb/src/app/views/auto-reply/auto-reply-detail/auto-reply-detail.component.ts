import { Component, computed, inject, signal } from "@angular/core";
import { MessageClient } from "../../../core/clients/message.client";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot } from "../../../core/mappers/router.mapper";
import { catchError, debounceTime, EMPTY, of, tap } from "rxjs";
import { AutoReplyDefinition, AutoReplyDefinitionRequest } from "../../../core/models/message";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { IForm, RawHttpResponse } from "../../../core/models/common";
import { AlertComponent, CardComponent, CardFooterComponent, ColComponent, ContainerComponent, RowComponent } from "@coreui/angular";
import { CardHeaderComponent, CheckboxComponent, FormCardBodyComponent, LoadingComponent, TextInputComponent } from "../../../components";
import { WithLoadingPipe } from "../../../core/pipes";
import { AsyncPipe } from "@angular/common";
import { ButtonComponent } from "../../../components/button/button.component";
import { ButtonDef } from "../../../components/button/button.models";
import { IconDirective } from "@coreui/icons-angular";
import { HttpErrorResponse } from "@angular/common/http";
import { mapHttpErrors } from "../../../core/mappers";

type SaveState = 'not-started' | 'executing' | 'failed' | 'created' | 'updated';

@Component({
  templateUrl: './auto-reply-detail.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    FormCardBodyComponent,
    WithLoadingPipe,
    AsyncPipe,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    TextInputComponent,
    LoadingComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    CardFooterComponent,
    ButtonComponent,
    AlertComponent,
    IconDirective
  ]
})
export class AutoReplyDetailComponent {
  readonly #client = inject(MessageClient);
  readonly #router = inject(Router);
  readonly #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group<IForm<AutoReplyDefinition>>({
    id: this.#formBuilder.control<string>(
      mapParamsFromSnapshot(this.#router.routerState.snapshot.root)['id'] ?? '',
      { validators: [Validators.required] }
    ),
    isCaseSensitive: this.#formBuilder.control<boolean>(false, {}),
    isDisabled: this.#formBuilder.control<boolean>(false),
    reply: this.#formBuilder.control<string>('', { validators: [Validators.required] }),
    template: this.#formBuilder.control<string>('', { validators: [Validators.required] })
  });

  state = signal<SaveState>('not-started');
  saveErrorMessages = signal<string[] | null>(null);
  id = signal('');
  isCreate = computed(() => !this.id());

  stateColor = computed(() => {
    switch (this.state()) {
      case 'executing': return 'primary';
      case 'failed': return 'danger';
      case 'created':
      case 'updated':
        return 'success';
      default: return 'transparent';
    }
  });

  definitionSource$ = computed(() => {
    const request = this.isCreate() ?
      of({ type: 'finish', value: {} } as RawHttpResponse<AutoReplyDefinition>) :
      this.#client.getAutoReplyDefinition(this.id());

    return request.pipe(tap(response => {
      if (response.type == 'finish' && response.value) {
        this.form.patchValue({
          isCaseSensitive: response.value.isCaseSensitive,
          isDisabled: response.value.isDisabled,
          reply: response.value.reply,
          template: response.value.template
        });
      }
    }));
  });

  saveButtonDef: ButtonDef = {
    id: 'save',
    action: _ => this.saveChanges(),
    color: 'success',
    size: '',
    title: 'Uložit změny',
    variant: 'outline'
  };

  ngOnInit(): void {
    this.form.get('id')?.disable();
    this.id.set(this.form.get('id')!.value as string);
  }

  saveChanges(): void {
    if (this.form.invalid) {
      return;
    }

    const request: AutoReplyDefinitionRequest = {
      isCaseSensitive: this.form.value.isCaseSensitive as boolean,
      isDisabled: this.form.value.isDisabled as boolean,
      reply: this.form.value.reply as string,
      template: this.form.value.template as string
    };

    const httpRequest = this.isCreate() ?
      this.#client.createAutoReplyDefinition(request) :
      this.#client.updateAutoReplyDefinition(this.id(), request);

    httpRequest.pipe(
      tap(data => {
        if (data.type == 'start') {
          this.state.set('executing');
        }
      }),
      debounceTime(300),
      catchError((err: HttpErrorResponse) => {
        this.state.set('failed');

        this.saveErrorMessages.set([...new Set(
          mapHttpErrors(err).map(e => {
            if (!e.startsWith('ValidationError')) {
              return e
            } else {
              const [key, value] = e.replace('ValidationError:', '').trim().split(' => ');
              return `${key}: ${value}`;
            }
          })
        )]);

        return EMPTY;
      })
    ).subscribe(response => {
      if (response.value) {
        this.state.set(this.isCreate() ? 'created' : 'updated');
        this.form.get('id')?.patchValue(response.value.id);
        this.id.set(response.value.id);
      }
    });
  }
}
