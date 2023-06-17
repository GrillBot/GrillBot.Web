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
    data?: PinChannel;
    currentLoading: 'data' | 'markdown' | 'archive' | 'nothing' = 'nothing';

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

        this.currentLoading = 'data';
        this.data = null;
        this.channelService.getChannelPins(this.channelId, false).subscribe(data => {
            this.data = PinChannel.create(JSON.parse(data));
            this.currentLoading = 'nothing';
        });
    }

    download(withAttachments: boolean): void {
        if (!this.channelId) { return; }

        const filename = `${this.channelId}.zip`;
        if (withAttachments) {
            this.currentLoading = 'archive';
            this.channelService.getChannelPinsWithAttachments(this.channelId).subscribe(blob => {
                this.currentLoading = 'nothing';
                saveAs(blob, filename);
            });

            return;
        }

        this.currentLoading = 'markdown';
        this.channelService.getChannelPins(this.channelId, true).subscribe(data => {
            this.currentLoading = 'nothing';
            saveAs(new Blob([data], { type: 'text/markdown' }), filename);
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
