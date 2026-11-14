/** The signed-in user, as returned by `GET /api/session/me`. */
export interface SessionInfo {
  id: string;
  username: string;
  avatarUrl?: string;
  permissions: string[];
}

/**
 * The current AdminWeb session. The browser never sees an access token: it holds only an
 * HttpOnly session cookie, and the bot attaches the token to each request on its side.
 */
export class Session {
  constructor(private readonly info: SessionInfo | null) { }

  get isLogged(): boolean {
    return !!this.info;
  }

  get id(): string | undefined {
    return this.info?.id;
  }

  get username(): string | undefined {
    return this.info?.username ?? 'Unknown user';
  }

  get avatarUrl(): string | undefined {
    return this.info?.avatarUrl;
  }

  get permissions(): string[] {
    return this.info?.permissions ?? [];
  }
}
