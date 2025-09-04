import { LocalizedMessageContent } from "../common";

export interface RemoveUnverifyResponse {
  message: LocalizedMessageContent;
  returnedRolesCount: number;
  returnedChannelsCount: number;
}
