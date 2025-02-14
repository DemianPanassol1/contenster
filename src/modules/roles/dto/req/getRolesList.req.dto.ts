import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';

export class GetRolesListReqDto extends OptionsReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}
