import { Component, Input, OnInit } from '@angular/core';
import { RemindMessage } from 'src/app/core/models/reminder';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
    @Input() item: RemindMessage;

    constructor() { }

    ngOnInit(): void {
    }

}
