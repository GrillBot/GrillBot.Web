import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Tab, TabItem } from './models';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
    @Input() tabs: { [k: string]: TabItem };
    @Input() context: any;

    activeId: string;
    activeTemplate: TemplateRef<any>;

    get availableTags(): Tab[] {
        return Object.keys(this.tabs)
            .filter(k => this.tabs[k].condition)
            .map(o => ({
                id: o,
                name: this.tabs[o].name,
                template: this.tabs[o].template
            }));
    }

    ngOnInit(): void {
        this.buttonClick(this.availableTags[0].id);
    }

    buttonClick(id: string): void {
        this.activeId = id;
        this.activeTemplate = this.availableTags.find(o => o.id === id).template;
    }
}
