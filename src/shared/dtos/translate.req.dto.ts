import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { parseNum } from '../utils/convertion.utils';

class Language {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  languageCode: string;
}

export class TranslationDto {
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id?: number;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString({ message: 'validation.invalidString' })
  text?: string;

  @IsObject({ message: 'validation.invalidObject' })
  @ValidateNested()
  @Type(() => Language)
  language: Language;
}
