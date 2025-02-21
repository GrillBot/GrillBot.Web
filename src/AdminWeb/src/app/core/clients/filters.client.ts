import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { StoredFilterInfo } from "../models/filters";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FiltersClient extends BaseClient {
  constructor() {
    super();
  }

  storeFilter = (filter: string) =>
    this.postRequest<StoredFilterInfo>('filters', { filterData: filter });

  getFilter = (filterId: string) => {
    return this.getRequest<any>(`filters/${filterId}`)
      .pipe(map(data => ({
        type: data.type,
        value: data?.value && typeof data.value === 'string' ? JSON.parse(data.value) : data.value
      })));
  }

}
