export interface ApiSearchRequest {
  controllerName: string | null;
  actionName: string | null;
  pathTemplate: string | null;
  durationFrom: number | null;
  durationTo: number | null;
  method: string | null;
  apiGroupName: string | null;
  identification: string | null;
}
