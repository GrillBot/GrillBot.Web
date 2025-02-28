import { File } from "./file";

export interface LogListItem {
  guildId: string | null;
  userId: string | null;
  channelId: string | null;
  createdAt: string;
  id: string;
  type: number;
  isDetailAvailable: boolean;
  files: File[];
  preview: any | null;
}
