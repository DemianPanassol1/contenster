import { Expose } from 'class-transformer';

export class GetEstablishmentResDto {
  @Expose()
  id: number;

  @Expose()
  corporateName: string;

  @Expose()
  fantasyName: string;

  @Expose()
  document: string;

  @Expose()
  documentType: string;

  @Expose()
  address: string;

  @Expose()
  addressNumber: string;

  @Expose()
  district: string;

  @Expose()
  zipCode: string;

  @Expose()
  phone1: string;

  @Expose()
  phone2: string;

  @Expose()
  email: string;

  @Expose()
  imageId: number;
}
