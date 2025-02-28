
export interface FormSearchRequest {
  guildId: string | null;
  userIds: string[];
  channelId: string | null;
  showTypes: number[];
  ignoreTypes: number[];
  createdFrom: string | null;
  createdTo: string | null;
  onlyWithFiles: boolean;
  ids: string | null;
}

export interface SearchRequest {
  guildId: string | null;
  userIds: string[];
  channelId: string | null;
  showTypes: number[];
  ignoreTypes: number[];
  createdFrom: string | null;
  createdTo: string | null;
  onlyWithFiles: boolean;
  ids: string[] | null;
}
