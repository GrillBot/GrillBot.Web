import { Observable } from 'rxjs';
import { AutoReplyItem, AutoReplyItemParams } from './../../../core/models/auto-reply';
import { AutoReplyItemFlagsTexts } from './../../../core/models/enums/auto-reply-item-flags';
import { AutoReplyService } from 'src/app/core/services/auto-reply.service';
import { Dictionary } from './../../../core/models/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoReplyItemFlags } from 'src/app/core/models/enums/auto-reply-item-flags';
import { Support } from 'src/app/core/lib/support';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
    form: FormGroup;
    flagsOptions: Dictionary<number, string>;
    isAdd: boolean;
    id: number;

    constructor(
        private fb: FormBuilder,
        private autoReplyService: AutoReplyService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
        this.isAdd = this.route.snapshot.data.isAdd ?? false;
        this.id = parseInt(this.route.snapshot.params.id, 10);
        /* eslint-enable */

        this.flagsOptions = Object.keys(AutoReplyItemFlags).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: AutoReplyItemFlagsTexts[Support.getEnumKeyByValue(AutoReplyItemFlags, o)] as string }));

        if (this.isAdd) {
            this.buildForm(new AutoReplyItem());
        } else {
            this.autoReplyService.getItem(this.id).subscribe(item => this.buildForm(item));
        }
    }

    submitForm(): void {
        const params = AutoReplyItemParams.create(this.form.value);

        let request: Observable<AutoReplyItem>;
        if (this.isAdd) {
            request = this.autoReplyService.createItem(params);
        } else {
            request = this.autoReplyService.updateItem(this.id, params);
        }

        request.subscribe(_ => {
            /* eslint-disable @typescript-eslint/no-misused-promises */
            this.modalService.showNotification(
                `${(this.isAdd ? 'Vytvoření' : 'Úprava')} automatické odpovědi.`,
                `Automatická odpověď byla úspěšně ${(this.isAdd ? 'vytvořena' : 'upravena')}`
            ).onClose.subscribe(__ => this.router.navigateByUrl('/admin/auto-reply'));
            /* eslint-enable */
        });
    }

    private buildForm(item: AutoReplyItem): void {
        /* eslint-disable @typescript-eslint/unbound-method */
        this.form = this.fb.group({
            template: [item.template, Validators.required],
            reply: [item.reply, Validators.required],
            flags: [item.flags]
        });
        /* eslint-enable */
    }

}
