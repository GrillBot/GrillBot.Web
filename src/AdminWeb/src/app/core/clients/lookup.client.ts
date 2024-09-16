import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { RawHttpResponse } from "../models/common";
import { User } from "../models/users/user";

@Injectable({ providedIn: 'root' })
export class LookupClient extends BaseClient {
  constructor() {
    super();
  }

  resolveUser: (userId: string) => Observable<RawHttpResponse<User>>
    = (userId: string) => this.getRequest(`lookup/user/${userId}`);
}
