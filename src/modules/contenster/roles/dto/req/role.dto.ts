import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class RoleDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  titles: TranslationDto[];

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  descriptions: TranslationDto[];

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}

class TranslationDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  languageId: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  text: string;
}
