import { Observable } from "rxjs";
import { PaginatedResponse } from "../../core/models/common";

export type TSourceGenerator = (filter: any) => Observable<PaginatedResponse<any>>;
