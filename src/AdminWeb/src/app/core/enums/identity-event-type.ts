export enum IdentityEventType {
  SignIn = 1,
  SignInRefused = 2,
  SignOut = 3,
  SessionRevoked = 4
}

export enum IdentityEventTypeLocalization {
  SignIn = 'Přihlášení',
  SignInRefused = 'Odmítnuté přihlášení',
  SignOut = 'Odhlášení',
  SessionRevoked = 'Relace ukončena (přístup odebrán)'
}

const channelLocalization: Record<string, string> = {
  web: 'Administrace',
  legacy: 'Starší administrace'
};

/** The event as text. The API sends the enum as a number; its name is accepted too. */
export function mapIdentityEventType(value: number | string): string {
  const name = typeof value === 'number' ? IdentityEventType[value] : value;
  return IdentityEventTypeLocalization[name as keyof typeof IdentityEventTypeLocalization] ?? `Neznámá událost (${value})`;
}

export function mapIdentityChannel(value: string): string {
  return channelLocalization[value] ?? value;
}
