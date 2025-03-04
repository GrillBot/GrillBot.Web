import { Channel } from "../models/channels/channel";

export const mapChannelToLookupRow = (channel: Channel | null, channelId?: string) => {
  return channel?.name ?? 'Neznámý kanál' + (channelId ? ` ${channelId}` : '');
};

export const mapEnumToDict = (enumType: any, localizationEnumType: any): { key: number; value: string }[] => {
  return Object.keys(enumType)
    .map(o => parseInt(o, 10))
    .map(key => ({
      key,
      value: localizationEnumType[Object.keys(enumType).find(x => enumType[x] === key) as string] as string
    }))
    .filter(o => !isNaN(o.key) && o.key > 0);
}
