import {
  IsArray,
  IsInt,
  Min,
  IsString,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

import { FieldType, Operation, Order } from '../enums/common.enums';

export class Sort {
  @IsString({ message: 'validation.invalidString' })
  @IsNotEmpty({ message: 'validation.notEmpty' })
  field: string;

  @IsEnum(Order, { message: 'validation.invalidOrderField' })
  order: Order;
}

export class Filter {
  @IsString({ message: 'validation.invalidString' })
  @IsNotEmpty({ message: 'validation.notEmpty' })
  field: string;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString({ each: true, message: 'validation.invalidStringOrArrayOf' })
  value?: string | string[];

  @IsBoolean({ message: 'validation.invalidBoolean' })
  disjunctive: boolean;

  @IsEnum(FieldType, { message: 'validation.invalidTypeField' })
  type: FieldType;

  @IsEnum(Operation, { message: 'validation.invalidOperationField' })
  operation: Operation;
}

export class PaginateReqDto {
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => Sort)
  sortBy?: Sort[];

  @IsInt({ message: 'validation.invalidInteger' })
  @Min(0, { message: 'validation.equalOrHigherThanZero' })
  pageNumber: number = 0;

  @IsInt({ message: 'validation.invalidInteger' })
  @Min(1, { message: 'validation.equalOrHigherThanOne' })
  pageSize: number = Number.MAX_SAFE_INTEGER;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => Filter)
  filters?: Filter[];
}
