import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { TranslationDto } from 'src/shared/dtos/translate.req.dto';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class FunctionalityDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  slug: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  icon: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  position: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  moduleId: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  titles: TranslationDto[];
}
