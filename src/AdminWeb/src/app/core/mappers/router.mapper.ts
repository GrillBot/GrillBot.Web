import { ActivatedRouteSnapshot } from "@angular/router";

export const mapParamsFromSnapshot = (snapshot: ActivatedRouteSnapshot): { [k: string]: any } => {
  let result: { [k: string]: any } = snapshot.params;

  if (snapshot.children.length > 0) {
    for (const child of snapshot.children) {
      result = { ...result, ...mapParamsFromSnapshot(child) };
    }
  }

  return result;
}
