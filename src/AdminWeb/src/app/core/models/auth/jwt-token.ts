const AVATAR_URL_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata';

const isTokenExpired = (tokenBody: any | undefined): boolean => {
  return tokenBody && (Math.floor(new Date().getTime() / 1000) >= tokenBody.exp);
};

export class JwtToken {
  private header: any | undefined;
  private body: any | undefined;
  private footer: string | undefined;

  constructor(private rawToken: string | undefined) {
    if (!this.rawToken) {
      return;
    }

    const [header, body, footer] = this.rawToken.split('.');

    this.header = JSON.parse(atob(header.replace(/-/g, '+').replace(/_/g, '/')));
    this.body = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
    this.footer = footer;
  }

  get isLogged(): boolean {
    return this.body && !isTokenExpired(this.body);
  }

  get avatarUrl(): string | undefined {
    return this.body ? this.body[AVATAR_URL_KEY] : undefined;
  }

  get username(): string | undefined {
    return this.body ? this.body.unique_name : 'Unknown user';
  }

  get id(): string | undefined {
    return this.body ? this.body.nameid : undefined;
  }

  get permissions(): string[] {
    return this.body ? this.body['GrillBot:Permissions']?.split(',') : [];
  }
}
