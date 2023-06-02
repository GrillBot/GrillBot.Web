import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ChannelService } from 'src/app/core/services/channel.service';
import { Attachment, PinChannel } from 'src/app/core/models/pins';

@Component({
    selector: 'app-pin-list',
    templateUrl: './pin-list.component.html',
    styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent implements OnInit {
    form: UntypedFormGroup;
    loading = false;
    data?: PinChannel;

    constructor(
        private fb: UntypedFormBuilder,
        private channelService: ChannelService
    ) { }

    get channelId(): string | null {
        return this.form.get('channel').value as string;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            channel: [null]
        });
    }

    loadData(): void {
        if (!this.channelId) { return; }

        this.loading = true;
        this.channelService.getChannelPins(this.channelId, false).subscribe(data => {
            this.data = PinChannel.create(JSON.parse(data));
            this.loading = false;
        });
    }

    downloadMarkdown(): void {
        if (!this.channelId) { return; }

        this.channelService.getChannelPins(this.channelId, true).subscribe(data => {
            saveAs(new Blob([data], { type: 'text/markdown' }), `${this.channelId}.md`);
        });
    }

    attachmentClick(attachment: Attachment): void {
        const attachmentElement = document.getElementById(attachment.name);
        const icon = document.getElementById('icon-' + attachment.name);

        if (attachment.isImage) {
            if (attachmentElement.classList.contains('d-none')) {
                // Open
                attachmentElement.classList.add('d-block');
                attachmentElement.classList.remove('d-none');

                icon.classList.remove('fa-caret-square-down');
                icon.classList.add('fa-caret-square-up');
            } else {
                // Close
                attachmentElement.classList.remove('d-block');
                attachmentElement.classList.add('d-none');

                icon.classList.remove('fa-caret-square-up');
                icon.classList.add('fa-caret-square-down');
            }

            return;
        }

        attachmentElement.click();
    }
}
