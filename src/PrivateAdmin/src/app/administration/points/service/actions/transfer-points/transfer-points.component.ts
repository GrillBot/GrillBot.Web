/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { PointsService } from 'src/app/core/services/points.service';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-transfer-points',
    templateUrl: './transfer-points.component.html'
})
export class TransferPointsComponent implements OnInit {
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
            fromUserId: [null, Validators.required],
            toUserId: [null, Validators.required],
            amount: [null, Validators.compose([Validators.required, ValidationHelper.nonZeroNumber()])]
        });
    }

    submitForm(): void {
        if (this.form.invalid) { return; }
        const value = this.form.value;

        const modal = new QuestionModal('Převod bodů', 'Opravdu si přejete převést body?');
        modal.onAccept.subscribe(() => {
            this.pointsService.serviceTransferPoints(value.guildId, value.fromUserId, value.toUserId, value.amount).subscribe(() => {
                this.modalBox.show(new InfoModal('Převod bodů', 'Body byly úspěšně převedeny.'));
            });
        });

        this.modalBox.show(modal);
    }
}
