import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

import { TranslationDto } from 'src/shared/dtos/translate.req.dto';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class ModuleDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  position: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @IsArray({ message: 'validation.invalidArray' })
  @ArrayNotEmpty({ message: 'validation.notEmpty' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  titles: TranslationDto[];

  @IsArray({ message: 'validation.invalidArray' })
  @ArrayNotEmpty({ message: 'validation.notEmpty' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  descriptions: TranslationDto[];
}
