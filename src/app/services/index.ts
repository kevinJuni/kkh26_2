


// Just wraps NgbTypeaheadSelectItemEvent
export interface SelectItemEvent<T> {
  item: T;
  preventDefault: () => void;
}


export class PagedList<T> {
  items: T[] = <T[]>[];
  currentPage: number = 1;
  perPage: number = 20;
  totalCount: number = 0;
  query: any;
}