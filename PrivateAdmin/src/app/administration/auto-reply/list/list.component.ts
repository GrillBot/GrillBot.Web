import { AutoReplyItem } from './../../../core/models/auto-reply';
import { Component, OnInit } from '@angular/core';
import { AutoReplyService } from 'src/app/core/services/auto-reply.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styles: ['list-button { margin-right: 5px; }']
})
export class ListComponent implements OnInit {
    data: AutoReplyItem[];

    constructor(
        private autoReplyService: AutoReplyService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.reloadData();
    }

    reloadData(): void {
        this.autoReplyService.getAutoReplyList().subscribe(data => this.data = data);
    }

    removeItem(item: AutoReplyItem): void {
        this.modalService.showQuestion('Smazání automatické odpovědi', `Opravdu si přeješ smazat automatickou odpověď s ID ${item.id}?`)
            .onAccept.subscribe(_ => this.autoReplyService.removeItem(item.id).subscribe(__ => this.reloadData()));
    }
}
