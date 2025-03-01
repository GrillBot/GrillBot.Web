export { };

declare global {
  interface String {
    toNullIfEmpty(this: string | null): string | null;
  }
}
