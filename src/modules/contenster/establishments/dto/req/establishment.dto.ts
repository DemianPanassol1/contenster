import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

import { DocumentType } from 'src/shared/enums/common.enums';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class EstablishmentDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  corporateName: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  fantasyName: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  address: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  addressNumber: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  zipCode: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  district: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  document: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEnum(DocumentType, { message: 'validation.invalidDocumentType' })
  documentType: DocumentType;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  phone1: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  phone2: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;

  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  imageId: number;
}
