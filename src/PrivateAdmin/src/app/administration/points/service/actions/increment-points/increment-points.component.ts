/* eslint-disable @typescript-eslint/unbound-method */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PointsService } from 'src/app/core/services/points.service';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-increment-points',
    templateUrl: './increment-points.component.html'
})
export class IncrementPointsComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private pointsService: PointsService,
        private modalBox: ModalBoxService
    ) { }

    get guildId(): string { return this.form.get('guildId').value as string; }

    ngOnInit(): void {
        this.form = this.fb.group({
            guildId: [null, Validators.required],
            toUserId: [null, Validators.required],
            amount: [null, Validators.compose([Validators.required, ValidationHelper.nonZeroNumber()])]
        });
    }

    submitForm(): void {
        if (this.form.invalid) { return; }
        const value = this.form.value;

        const modal = new QuestionModal('Udělit bonusové body', 'Opravdu si přejete udělit bonusové body?');
        modal.onAccept.subscribe(() => {
            this.pointsService.serviceIncrementPoints(value.guildId, value.toUserId, value.amount).subscribe(() => {
                this.modalBox.show(new InfoModal('Udělit bonusové body', 'Body byly úspěšně uděleny.'));
            });
        });

        this.modalBox.show(modal);
    }
}
