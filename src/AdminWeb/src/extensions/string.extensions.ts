export { };

String.prototype.toNullIfEmpty = function (this: string | null): string | null {
  return !this || this.length === 0 ? null : this;
}
