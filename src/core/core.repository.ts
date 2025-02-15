import {
  Not,
  ILike,
  IsNull,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  In,
  Between,
} from 'typeorm';
import { join } from 'path';
import { I18nService } from 'nestjs-i18n';

import { FieldType, Operation } from 'src/shared/dtos/paginate.req.dto';

export class CoreRepository {
  public publicPath: string = join(__dirname, '..', '..', 'public');

  constructor(public readonly i18n: I18nService) {}

  buildFilter(query, search: object | object[] = null) {
    const searchArray = (Array.isArray(search) ? search : [search]).filter(Boolean);

    const andWhere = {};
    const orWhere = [];
    const order = {};

    for (const filter of query.filters) {
      const keys = filter.field.split('.');
      let value = null;

      switch (filter.type.toUpperCase()) {
        case FieldType.STRING:
          switch (filter.operation.toUpperCase()) {
            case Operation.EQUALS:
              value = filter.value;
              break;
            case Operation.NOT_EQUALS:
              value = Not(filter.value);
              break;
            case Operation.LIKE:
              value = ILike(`%${filter.value}%`);
              break;
            case Operation.NOT_LIKE:
              value = Not(ILike(`%${filter.value}%`));
              break;
            case Operation.IS_NULL:
              value = IsNull();
              break;
            case Operation.IS_NOT_NULL:
              value = Not(IsNull());
              break;
            default:
              throw new Error(`Unsupported operation for STRING: ${filter.operation}`);
          }
          break;

        case FieldType.NUMBER:
          const numValue = Number(filter.value);
          switch (filter.operation.toUpperCase()) {
            case Operation.EQUALS:
              value = numValue;
              break;
            case Operation.NOT_EQUALS:
              value = Not(numValue);
              break;
            case Operation.GREATER_THAN:
              value = MoreThan(numValue);
              break;
            case Operation.GREATER_THAN_OR_EQUAL:
              value = MoreThanOrEqual(numValue);
              break;
            case Operation.LESS_THAN:
              value = LessThan(numValue);
              break;
            case Operation.LESS_THAN_OR_EQUAL:
              value = LessThanOrEqual(numValue);
              break;
            case Operation.IN:
              value = In(filter.value);
              break;
            case Operation.NOT_IN:
              value = Not(In(filter.value));
              break;
            default:
              throw new Error(`Unsupported operation for NUMBER: ${filter.operation}`);
          }
          break;

        case FieldType.DATE:
          const dateValue = new Date(filter.value);
          switch (filter.operation.toUpperCase()) {
            case Operation.EQUALS:
              value = dateValue;
              break;
            case Operation.NOT_EQUALS:
              value = Not(dateValue);
              break;
            case Operation.BETWEEN:
              value = Between(
                new Date(filter.value[0]),
                new Date(filter.value[filter.value.length - 1]),
              );
              break;
            case Operation.NOT_BETWEEN:
              value = Not(
                Between(new Date(filter.value[0]), new Date(filter.value[filter.value.length - 1])),
              );
              break;
            case Operation.GREATER_THAN:
              value = MoreThan(dateValue);
              break;
            case Operation.GREATER_THAN_OR_EQUAL:
              value = MoreThanOrEqual(dateValue);
              break;
            case Operation.LESS_THAN:
              value = LessThan(dateValue);
              break;
            case Operation.LESS_THAN_OR_EQUAL:
              value = LessThanOrEqual(dateValue);
              break;
            default:
              throw new Error(`Unsupported operation for DATE: ${filter.operation}`);
          }
          break;

        default:
          throw new Error(`Unsupported FieldType: ${filter.type}`);
      }

      const obj = keys.reverse().reduce((acc, key) => ({ [key]: acc }), value);

      if (filter.disjunctive) {
        orWhere.push(obj);
      } else {
        Object.assign(andWhere, obj);
      }
    }

    searchArray.forEach((item) => this.deepMerge(andWhere, item));

    for (const sort of query.sortBy) {
      const keys = sort.field.split('.');
      const value = sort.order.toUpperCase();

      const obj = keys.reverse().reduce((acc, key) => ({ [key]: acc }), value);

      Object.assign(order, obj);
    }

    const where = [andWhere, ...orWhere].filter((item) => Object.keys(item).length > 0);

    return {
      where,
      order,
      take: query.pageSize,
      skip: (query.pageNumber - 1) * query.pageSize,
    };
  }

  private deepMerge(target, source) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (
          typeof source[key] === 'object' &&
          source[key] !== null &&
          typeof target[key] === 'object' &&
          target[key] !== null
        ) {
          this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }
}
