export interface MessageDeletedSearchRequest {
  containsEmbed: boolean | null;
  contentContains: string | null;
  authorId: string | null;
}
