import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';

import { EstablishmentsRepository } from './establishments.repository';

import { PutEstablishmentReqDto } from './dto/req/putEstablishment.req.dto';
import { GetEstablishmentReqDto } from './dto/req/getEstablishment.req.dto';
import { PostEstablishmentReqDto } from './dto/req/postEstablishment.req.dto';
import { DeleteEstablishmentReqDto } from './dto/req/deleteEstablishment.req.dto';
import { GetEstablishmentsListReqDto } from './dto/req/getEstablishmentsList.req.dto';

import { GetEstablishmentResDto } from './dto/res/getEstablishment.res.dto';
import { PutEstablishmentResDto } from './dto/res/putEstablishment.res.dto';
import { PostEstablishmentResDto } from './dto/res/postEstablishment.res.dto';
import { GetEstablishmentsListResDto } from './dto/res/getEstablishmentsList.res.dto';

import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { DeleteEstablishmentResDto } from './dto/res/deleteEstablishment.res.dto';

@Injectable()
export class EstablishmentsService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: EstablishmentsRepository,
  ) {
    super(i18n);
  }

  async getEstablishmentsList(body: GetEstablishmentsListReqDto) {
    const [data, total] = await this.repo.getEstablishmentsPaginated(body);

    const response = {
      data: data,
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetEstablishmentsListResDto, response);
  }

  async getEstablishment(req: Request, query: GetEstablishmentReqDto) {
    const { id } = query;

    const establishment = await this.repo.getEstablishmentById(id);

    if (!establishment) {
      throw new HttpException(this.i18n.t('errors.establishmentNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...establishment,
      imageId: establishment.image?.id ?? null,
    };

    return this.response(GetEstablishmentResDto, response);
  }

  async postEstablishment(body: PostEstablishmentReqDto) {
    const { email, fantasyName, imageId, phone1, phone2, zipCode } = body;
    const { address, addressNumber, corporateName, district, document, documentType } = body;

    const saveEstablishment: Partial<Establishment> = {
      email,
      phone1,
      phone2,
      address,
      zipCode,
      district,
      document,
      fantasyName,
      documentType,
      addressNumber,
      corporateName,
      image: imageId ? { id: imageId } : null,
    };

    const establishment = await this.repo.getEstablishmentByDocument(document);

    if (establishment) {
      throw new HttpException(
        this.i18n.t('errors.establishmentAlreadyExists'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.repo.saveEstablishment(saveEstablishment);

    return this.response(PostEstablishmentResDto, response);
  }

  async putEstablishment(body: PutEstablishmentReqDto) {
    const { id, email, fantasyName, imageId, phone1, phone2, zipCode } = body;
    const { address, addressNumber, corporateName, district, document, documentType } = body;

    const updateEstablishment: Partial<Establishment> = {
      id,
      email,
      phone1,
      phone2,
      address,
      zipCode,
      district,
      document,
      fantasyName,
      documentType,
      addressNumber,
      corporateName,
      image: imageId ? { id: imageId } : null,
    };

    const establishment = await this.repo.getEstablishmentByDocument(document);

    if (establishment && establishment.id !== id) {
      throw new HttpException(
        this.i18n.t('errors.establishmentAlreadyExists'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.repo.saveEstablishment(updateEstablishment);

    return this.response(PutEstablishmentResDto, response);
  }

  async deleteEstablishment(query: DeleteEstablishmentReqDto) {
    const { id, establishmentId } = query;

    const establishment = await this.repo.getEstablishmentById(id);

    if (!establishment) {
      throw new HttpException(this.i18n.t('errors.establishmentNotFound'), HttpStatus.BAD_REQUEST);
    }

    const count = await this.repo.getEstablishmentCount();

    if (count === 1 || establishmentId === establishment.id) {
      throw new HttpException(
        this.i18n.t('errors.establishmentCannotBeDeleted'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.repo.removeEstablishment(establishment);

    return this.response(DeleteEstablishmentResDto, response);
  }
}
