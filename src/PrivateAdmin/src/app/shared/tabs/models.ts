import { TemplateRef } from '@angular/core';

export interface TabItem {
    name: string;
    condition: boolean;
    template: TemplateRef<any>;
}

export interface Tab {
    id: string;
    name: string;
    template: TemplateRef<any>;
}
