export enum SortPropertyEnums {
  Rating_DESC = 'rating',
  Rating_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnums;
}

export interface FilterSliceInterface {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: SortItem,
}
