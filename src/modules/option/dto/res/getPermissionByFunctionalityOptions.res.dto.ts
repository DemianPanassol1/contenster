import { Expose, Type } from 'class-transformer';

class DataItem {
  @Expose()
  value: string;

  @Expose()
  label: string;
}

class SortBy {
  @Expose()
  field: string;

  @Expose()
  order: string;
}

class Filter {
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

class Meta {
  @Expose()
  pageNumber: number;

  @Expose()
  pageSize: number;

  @Expose()
  optional: boolean;

  @Expose()
  establishmentId: number | null;

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

export class GetPermissionByFunctionalityOptionsResDto {
  @Expose()
  @Type(() => DataItem)
  data: DataItem[];

  @Expose()
  @Type(() => Meta)
  meta: Meta;
}
