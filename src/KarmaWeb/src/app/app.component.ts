import { Component, OnInit, ViewChild } from '@angular/core';
import { MainComponent } from './main/main.component';
import { KarmaResult } from './core/models';
import { ApiService } from './core/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    isLoaded = false;
    data?: KarmaResult;

    pageSize = 50;

    @ViewChild('main', { static: false }) mainComponent!: MainComponent;

    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        const page = this.getPage();
        this.getData(page);
    }

    private getPage() {
        const pathElements = location.pathname.split('/');
        let page = parseInt(pathElements[pathElements.length - 1], 10);

        return !page || isNaN(page) ? 1 : page;
    }

    private getData(page: number) {
        window.history.replaceState({}, '', `/${page}`);

        const requestPage = page - 1;
        this.api.getKarmaData('karma', true, requestPage, this.pageSize).subscribe(data => {
            this.data = data;
            this.isLoaded = true;
            data.page = data.page + 1;

            if (this.mainComponent) {
                this.mainComponent.loading = false;
            }
        });
    }

    onPageChanged(page: number) {
        this.getData(page);
    }
}
