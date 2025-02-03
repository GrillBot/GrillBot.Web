interface EmoteIdValue {
  id: string;
  name: string;
  isAnimated: boolean;
}

const parseEmoteId = (emoteId: string): EmoteIdValue | null => {
  if (!emoteId || !emoteId.startsWith('<')) {
    return null;
  }

  const match = /<(a?):([a-zA-Z0-9_]{2,}):(\d+)>/g.exec(emoteId);
  if (!match || match.length < 2) {
    return null;
  }

  return {
    id: match.at(3) ?? '',
    isAnimated: match.at(1) == 'a',
    name: match.at(2) ?? ''
  }
}

export const mapEmoteIdToUrl = (emoteId: string): string => {
  if (emoteId.startsWith('http')) {
    return emoteId;
  }

  const value = parseEmoteId(emoteId);
  if (!value) {
    return emoteId;
  }

  const extension = value.isAnimated ? 'gif' : 'png';
  return `https://cdn.discordapp.com/emojis/${value.id}.${extension}`;
};

export const mapEmoteIdToName = (emoteId: string): string | undefined => {
  const value = parseEmoteId(emoteId);
  return value?.name;
};

export const mapEmoteIdToNumberId = (emoteId: string): string | undefined => {
  const value = parseEmoteId(emoteId);
  return value?.id;
};

export const mapEmoteIdToAnimatedFlag = (emoteId: string): boolean => {
  const value = parseEmoteId(emoteId);
  return value?.isAnimated ?? false;
}

