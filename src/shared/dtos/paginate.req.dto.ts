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
  @IsString({ message: 'O campo "field" deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo "field" não pode estar vazio.' })
  field: string;

  @IsEnum(Order, {
    message: `O campo "order" deve ser um dos seguintes valores: ${Object.values(Order).join(', ')}`,
  })
  order: Order;
}

export class Filter {
  @IsString({ message: 'O campo "field" deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo "field" não pode estar vazio.' })
  field: string;

  @IsString({ each: true, message: 'Cada item no campo "value" deve ser uma string.' })
  value: string | string[] = '';

  @IsBoolean({ message: 'O campo "disjunctive" deve ser um booleano.' })
  disjunctive: boolean;

  @IsEnum(FieldType, {
    message: `O campo "type" deve ser um dos seguintes valores: ${Object.values(FieldType).join(', ')}`,
  })
  type: FieldType;

  @IsEnum(Operation, {
    message: `O campo "operation" deve ser um dos seguintes valores: ${Object.values(Operation).join(', ')}`,
  })
  operation: Operation;
}

export class PaginateReqDto {
  @IsArray({ message: 'O campo "sortBy" deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => Sort)
  @IsOptional()
  sortBy?: Sort[];

  @IsInt({ message: 'O campo "pageNumber" deve ser um número inteiro.' })
  @Min(0, { message: 'O campo "pageNumber" deve ser maior ou igual a 0.' })
  pageNumber: number = 0;

  @IsInt({ message: 'O campo "pageSize" deve ser um número inteiro.' })
  @Min(1, { message: 'O campo "pageSize" deve ser maior ou igual a 1.' })
  pageSize: number = Number.MAX_SAFE_INTEGER;

  @IsArray({ message: 'O campo "filters" deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => Filter)
  @IsOptional()
  filters?: Filter[];
}
