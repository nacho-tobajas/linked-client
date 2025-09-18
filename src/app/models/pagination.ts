export interface Page<T> {
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  sort: string;
  size: number;
  number: number;
  content: T[];
}
