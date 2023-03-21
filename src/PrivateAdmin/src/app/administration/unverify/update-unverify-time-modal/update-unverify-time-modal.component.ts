import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnverifyUserProfile } from 'src/app/core/models/unverify';

@Component({
    selector: 'app-update-unverify-time-modal',
    templateUrl: './update-unverify-time-modal.component.html'
})
export class UpdateUnverifyTimeModalComponent implements OnInit {
    @Input() profile: UnverifyUserProfile;
    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    get end(): string | null {
        return this.form?.get('end')?.value as string;
    }

    get reason(): string | null {
        return this.form?.get('reason')?.value as string;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            end: [null],
            reason: [null]
        });
    }
}
