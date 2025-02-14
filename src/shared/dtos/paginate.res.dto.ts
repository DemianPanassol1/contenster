import { Expose, Type } from 'class-transformer';

export class Filter {
  @Expose()
  value: string;

  @Expose()
  field: string;

  @Expose()
  disjunctive: boolean;

  @Expose()
  type: string;

  @Expose()
  operation: string;
}

export class SortBy {
  @Expose()
  field: string;

  @Expose()
  order: string;
}

export class Meta {
  @Expose()
  pageNumber: number;

  @Expose()
  pageSize: number;

  @Expose()
  optional: boolean;

  @Expose()
  @Type(() => SortBy)
  sortBy: SortBy[];

  @Expose()
  @Type(() => Filter)
  filters: Filter[];

  @Expose()
  totalItems: number;

  @Expose()
  totalPages: number;

  @Expose()
  hasNextPage: boolean;
}
