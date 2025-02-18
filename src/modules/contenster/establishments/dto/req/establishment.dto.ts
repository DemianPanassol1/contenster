import {
  Allow,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { DocumentType } from 'src/shared/enums/common.enums';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class EstablishmentDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  corporateName: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  fantasyName: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  address: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  addressNumber: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  zipCode: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  district: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  document: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsEnum(DocumentType, { message: 'validation.invalidDocumentType' })
  documentType: DocumentType;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  phone1: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  phone2: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;

  @Allow()
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  imageId: number;
}
