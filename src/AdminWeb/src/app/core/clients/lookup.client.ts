import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { User } from "../models/users/user";
import { Guild } from "../models/guilds/guild";
import { filter, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LookupClient extends BaseClient {
  constructor() {
    super();
  }

  resolveUser = (userId: string) => this.getRequest<User>(`lookup/user/${userId}`).pipe(
    filter(res => res.type === 'finish'),
    map(res => res.value!)
  );

  resolveGuildList = () => this.getRequest<Guild[]>('lookup/guild/list');
}
