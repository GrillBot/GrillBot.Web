/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { GuildDetail, UpdateGuildParams } from 'src/app/core/models/guilds';
import { GuildService } from 'src/app/core/services/guild.service';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-guild-detail',
    templateUrl: './guild-detail.component.html',
    styleUrls: ['./guild-detail.component.scss']
})
export class GuildDetailComponent implements OnInit {
    data: GuildDetail;
    form: UntypedFormGroup;

    constructor(
        private guildService: GuildService,
        private activatedRoute: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private modalBox: ModalBoxService
    ) { }

    ngOnInit(): void {
        const guildId: string = this.activatedRoute.snapshot.params.id as string;

        this.guildService.getGuildDetail(guildId).subscribe(detail => {
            this.data = detail;

            this.form = this.fb.group(
                {
                    mutedRole: [this.data.mutedRole?.id ?? null],
                    adminChannel: [this.data.adminChannel?.id ?? null],
                    emoteSuggestionChannel: [this.data.emoteSuggestionChannel?.id ?? null],
                    voteChannel: [this.data.voteChannel?.id ?? null],
                    emoteSuggestionsFrom: [this.data.emoteSuggestionsFrom?.toFormString(true) ?? null],
                    emoteSuggestionsTo: [this.data.emoteSuggestionsTo?.toFormString(true) ?? null],
                    botRoomChannel: [this.data.botRoomChannel?.id]
                },
                { validators: [ValidationHelper.multipleRequired('emoteSuggestionsInvalid', 'emoteSuggestionsFrom', 'emoteSuggestionsTo')] }
            );
        });
    }

    submitSettings(): void {
        let emoteSuggestionsValidity = {
            from: this.form.value.emoteSuggestionsFrom,
            to: this.form.value.emoteSuggestionsTo
        };

        if (!emoteSuggestionsValidity.from && !emoteSuggestionsValidity.to) {
            emoteSuggestionsValidity = null;
        }

        const params = new UpdateGuildParams(
            this.form.value.mutedRole,
            this.form.value.adminChannel,
            this.form.value.emoteSuggestionChannel,
            this.form.value.voteChannel,
            emoteSuggestionsValidity,
            this.form.value.botRoomChannel
        );

        this.guildService.updateGuild(this.data.id, params).subscribe(_ => {
            this.modalBox.show(new InfoModal('Změna nastavení serveru', 'Nastavení serveru bylo úspěšně provedeno.'));
        });
    }

}
