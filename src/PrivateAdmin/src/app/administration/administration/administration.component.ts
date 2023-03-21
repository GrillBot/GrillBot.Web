import { OnDestroy, OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html'
})
export class AdministrationComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        document.body.classList.add('sb-nav-fixed');
    }

    ngOnDestroy(): void {
        document.body.classList.remove('sb-nav-fixed');
    }
}
