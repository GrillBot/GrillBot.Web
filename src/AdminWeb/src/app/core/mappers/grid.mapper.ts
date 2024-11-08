import { SortChangedEvent } from "ag-grid-community";
import { SortParameters } from "../models/common";

export const mapSortEventToSortingParams = (event: SortChangedEvent<any, any>) => {
  const sortingColumn = event.columns?.find(o => o.getSortIndex() !== null);
  if (!sortingColumn) {
    return undefined;
  }

  return {
    descending: sortingColumn.getSort() === 'desc',
    orderBy: sortingColumn.getColDef().context?.sortKey ?? sortingColumn.getId()
  } as SortParameters
};
