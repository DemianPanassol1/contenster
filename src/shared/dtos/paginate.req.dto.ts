import {
  IsArray,
  IsInt,
  Min,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FieldType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
}

export enum Operation {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  BETWEEN = 'BETWEEN',
  NOT_BETWEEN = 'NOT_BETWEEN',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT_LIKE',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
}

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

  @IsOptional()
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
  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => Sort)
  @IsOptional()
  sortBy?: Sort[];

  @IsInt({ message: 'validation.invalidInteger' })
  @Min(0, { message: 'validation.equalOrHigherThanZero' })
  pageNumber: number = 0;

  @IsInt({ message: 'validation.invalidInteger' })
  @Min(1, { message: 'validation.equalOrHigherThanOne' })
  pageSize: number = Number.MAX_SAFE_INTEGER;

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => Filter)
  @IsOptional()
  filters?: Filter[];
}
