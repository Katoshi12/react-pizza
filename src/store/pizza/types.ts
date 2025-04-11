export type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface PizzaSliceInterface {
  items: PizzaItem[];
  status: Status;
}

export type FetchData = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number
}