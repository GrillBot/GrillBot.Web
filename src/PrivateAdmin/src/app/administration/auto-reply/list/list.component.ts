import { AutoReplyItem } from './../../../core/models/auto-reply';
import { Component, OnInit } from '@angular/core';
import { AutoReplyService } from 'src/app/core/services/auto-reply.service';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { QuestionModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styles: ['list-button { margin-right: 5px; }']
})
export class ListComponent implements OnInit {
    data: AutoReplyItem[];

    constructor(
        private autoReplyService: AutoReplyService,
        private modalBox: ModalBoxService
    ) { }

    ngOnInit(): void {
        this.reloadData();
    }

    reloadData(): void {
        this.autoReplyService.getAutoReplyList().subscribe(data => this.data = data);
    }

    removeItem(item: AutoReplyItem): void {
        const modal = new QuestionModal('Smazání automatické odpovědi', `Opravdu si přeješ smazat automatickou odpověď s ID ${item.id}?`);
        modal.onAccept.subscribe(() => this.autoReplyService.removeItem(item.id).subscribe(__ => this.reloadData()));

        this.modalBox.show(modal);
    }
}
