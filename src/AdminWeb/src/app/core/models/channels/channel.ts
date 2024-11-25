import { ChannelType } from "../../enums/channel-type";

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  flags: number;
}
