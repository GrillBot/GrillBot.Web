import { ApiSearchComponent } from './api-search/api-search.component';
import { ExecutionSearchComponent } from './execution-search/execution-search.component';
import { MessageDeletedSearchComponent } from './message-deleted-search/message-deleted-search.component';
import { TextSearchComponent } from './text-search/text-search.component';
import { UserSearchComponent } from './user-search/user-search.component';

export * from './api-search/api-search.component';
export * from './execution-search/execution-search.component';
export * from './message-deleted-search/message-deleted-search.component';
export * from './text-search/text-search.component';
export * from './user-search/user-search.component';

export const AdvancedFilters = [
  ApiSearchComponent,
  ExecutionSearchComponent,
  MessageDeletedSearchComponent,
  TextSearchComponent,
  UserSearchComponent
]
