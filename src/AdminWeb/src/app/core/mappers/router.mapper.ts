import { ActivatedRouteSnapshot, Params } from "@angular/router";

export const mapParamsFromSnapshot = (snapshot: ActivatedRouteSnapshot): Params => {
  return mapPropertyFromSnapshot(snapshot, s => s.params);
}

export const mapQueryParamsFromSnapshot = (snapshot: ActivatedRouteSnapshot): Params => {
  return mapPropertyFromSnapshot(snapshot, s => s.queryParams);
}

export const mapPropertyFromSnapshot = (
  snapshot: ActivatedRouteSnapshot,
  selector: (snapshot: ActivatedRouteSnapshot) => Params
): Params => {
  let result: Params = selector(snapshot);

  if (snapshot.children.length > 0) {
    for (const child of snapshot.children) {
      result = { ...result, ...mapPropertyFromSnapshot(child, selector) };
    }
  }

  return result;
}
