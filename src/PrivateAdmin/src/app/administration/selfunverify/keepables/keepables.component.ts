import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservableDict } from './../../../core/models/common';
import { Component, OnInit } from '@angular/core';
import { SelfUnverifyService } from 'src/app/core/services/selfunverify.service';
import { KeepableParams } from 'src/app/core/models/selfunverify';
import { SelfUnverifyValidators } from './validators';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { QuestionModal } from 'src/app/shared/modal-box/models';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';

@Component({
    selector: 'app-keepables',
    templateUrl: './keepables.component.html',
    styleUrls: ['./keepables.component.scss']
})
export class KeepablesComponent implements OnInit {
    $keepablesRequest: ObservableDict<string, string[]>;
    form: FormGroup;

    constructor(
        private selfunverifyService: SelfUnverifyService,
        private fb: FormBuilder,
        private modalBox: ModalBoxService
    ) { }

    get formItems(): FormArray {
        return this.form.get('items') as FormArray;
    }

    ngOnInit(): void {
        this.$keepablesRequest = this.selfunverifyService.getKeepables();

        this.form = this.fb.group({
            items: this.fb.array([])
        });
    }

    remove(group: string, name: string = null): void {
        const title = `Odebrání ${(name ? 'položky' : 'skupiny')}`;
        const message = name ?
            `Opravu si přejete odebrat položku ${group}/${name}?` :
            `Opravu si přejete odebrat celou skupinu ${group}?`;

        const modal = new QuestionModal(title, message);
        modal.onAccept.subscribe(() => {
            this.selfunverifyService.removeKeepable(group, name).subscribe(__ => this.reload());
        });

        this.modalBox.show(modal);
    }

    submitForm(filledGroup: HTMLInputElement, filledName: HTMLInputElement, filledNoGroup: CheckboxComponent): void {
        if (!this.canSubmitForm(filledGroup, filledName, filledNoGroup)) { return; }

        if (
            ((filledGroup.value && filledGroup.value.length > 0) || filledNoGroup.checked) &&
            (filledName.value && filledName.value.length > 0)
        ) {
            this.addItemRow(filledGroup, filledName, filledNoGroup);
        }

        const items = this.formItems.controls.map(o => KeepableParams.create(o));
        this.selfunverifyService.addKeepable(items).subscribe(_ => {
            this.reload();
            this.formItems.clear();
        });
    }

    addItemRow(group: HTMLInputElement, name: HTMLInputElement, noGroup: CheckboxComponent): boolean {
        const control = this.fb.group(
            {
                group: [group.value],
                // eslint-disable-next-line @typescript-eslint/unbound-method
                name: [name.value, Validators.required],
                noGroup: [noGroup.checked]
            },
            {
                asyncValidators: [SelfUnverifyValidators.keepableExists(this.selfunverifyService)]
            }
        );

        this.formItems.push(control);
        group.value = '';
        name.value = '';
        noGroup.writeValue(false);

        return false;
    }

    removeItemRow(index: number): boolean {
        this.formItems.removeAt(index);
        return false;
    }

    canSubmitForm(group: HTMLInputElement, name: HTMLInputElement, noGroup: CheckboxComponent): boolean {
        if (this.form.invalid) { return false; }

        if (this.formItems.length === 0) {
            if (name.value && name.value.length > 0 && ((group.value && group.value.length > 0) || noGroup.checked)) {
                return true;
            }

            return false;
        }

        return true;
    }

    private reload(): void {
        this.$keepablesRequest = null;
        setTimeout(() => this.$keepablesRequest = this.selfunverifyService.getKeepables(), 10);
    }
}
