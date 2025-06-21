import { Component, Input, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-generic-list-page',
  template: `
    <ng-container #filterContainer></ng-container>
    <ng-container #listContainer></ng-container>
  `,
  standalone: true
})
export class ListContainerComponent implements AfterViewInit {
  @ViewChild('filterContainer', { read: ViewContainerRef, static: true }) filterContainer!: ViewContainerRef;
  @ViewChild('listContainer', { read: ViewContainerRef, static: true }) listContainer!: ViewContainerRef;

  private filterComponentRef?: ComponentRef<any>;
  private listComponentRef?: ComponentRef<any>;

  constructor(private route: ActivatedRoute, private injector: Injector) { }

  ngAfterViewInit() {
    const filterComponent = this.route.snapshot.data['filterComponent'];
    const listComponent = this.route.snapshot.data['listComponent'];

    if (filterComponent) {
      this.filterComponentRef = this.filterContainer.createComponent(filterComponent, { injector: this.injector });
    }

    if (listComponent) {
      this.listComponentRef = this.listContainer.createComponent(listComponent, { injector: this.injector });
    }

    if (this.filterComponentRef && this.listComponentRef) {
      if (this.filterComponentRef.instance.filterEvent && this.listComponentRef.instance.onFilterChanged) {
        this.filterComponentRef.instance.filterEvent.subscribe((event: any) => {
          this.listComponentRef!.instance.onFilterChanged(event);
        });
      }
    }
  }
}
