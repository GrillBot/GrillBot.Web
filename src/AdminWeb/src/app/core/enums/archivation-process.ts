const processLocalization: Record<string, string> = {
  AuditLog: 'Audit log',
  Unverify: 'Unverify log'
};

/** The archived log as text. Unknown names are shown as they came. */
export function mapArchivationProcess(value: string): string {
  return processLocalization[value] ?? value;
}

/** Czech plural of "záznam" for the given count (1 záznam, 2–4 záznamy, 5+ záznamů). */
export function recordsWord(count: number): string {
  if (count === 1) {
    return 'záznam';
  }

  return count >= 2 && count <= 4 ? 'záznamy' : 'záznamů';
}
