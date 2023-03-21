export class NavigationItem {
    constructor(
        public routerLink: string,
        public label: string,
        public title: string = '',
        public icon: string = null,
        public iconAsImg: boolean = true
    ) { }
}

export interface INavigation {
    getItems: () => NavigationItem[];
    isActive: (item: NavigationItem) => boolean;
}
