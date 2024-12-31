import { IsString, IsArray, IsEnum, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

class Sort {
  @IsString()
  field: string;

  @IsEnum(Order)
  order: Order;
}

class Filter {
  @IsString()
  field: string;

  @IsString()
  value: string;

  @IsBoolean()
  disjunctive: boolean;
}

export class PaginateReqDto {
  @IsArray()
  @IsOptional()
  sortBy: Sort[];

  @IsInt()
  @Min(0)
  pageNumber: number;

  @IsInt()
  @Min(0)
  pageSize: number;

  @IsArray()
  @IsOptional()
  filters: Filter[];
}
