import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

import { TranslationDto } from 'src/shared/dtos/translate.req.dto';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class RoleDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  titles: TranslationDto[];

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  descriptions: TranslationDto[];
}
