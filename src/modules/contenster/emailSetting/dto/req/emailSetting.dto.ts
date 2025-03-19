import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TranslationDto } from 'src/shared/dtos/translate.req.dto';

import { EmailPurpose } from 'src/shared/enums/common.enums';
import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class EmailSettingDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEnum(EmailPurpose, { message: 'validation.invalidEmailPurpose' })
  purpose: EmailPurpose;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  server: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  username: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  password: string;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  port: number;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  tls: boolean;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  ssl: boolean;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  sender: string;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString({ message: 'validation.invalidString' })
  recipient?: string;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString({ message: 'validation.invalidString' })
  recipientCopy?: string;

  @IsArray({ message: 'validation.invalidArray' })
  @ArrayNotEmpty({ message: 'validation.notEmpty' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  titles: TranslationDto[];

  @IsArray({ message: 'validation.invalidArray' })
  @ArrayNotEmpty({ message: 'validation.notEmpty' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  subjects: TranslationDto[];

  @IsArray({ message: 'validation.invalidArray' })
  @ArrayNotEmpty({ message: 'validation.notEmpty' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  contents: TranslationDto[];

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  footers: TranslationDto[];
}
