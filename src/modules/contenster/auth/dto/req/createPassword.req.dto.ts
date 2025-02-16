import { IsNotEmpty } from 'class-validator';

export class CreatePasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  password: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  token: string;
}
