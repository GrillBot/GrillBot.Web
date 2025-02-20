import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { StoredFilterInfo } from "../models/filters";

@Injectable({ providedIn: 'root' })
export class FiltersClient extends BaseClient {
  constructor() {
    super();
  }

  storeFilter = (filter: string) =>
    this.postRequest<StoredFilterInfo>('filters', { filterData: filter });

  getFilter = (filterId: string) =>
    this.getRequest<string>(`filters/${filterId}`);
}
