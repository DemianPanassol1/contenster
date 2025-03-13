import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';

import { FunctionalitiesRepository } from './functionalities.repository';

import { GetFunctionalityReqDto } from './dto/req/getFunctionality.req.dto';
import { PutFunctionalityReqDto } from './dto/req/putFunctionality.req.dto';
import { PostFunctionalityReqDto } from './dto/req/postFunctionality.req.dto';
import { DeleteFunctionalityReqDto } from './dto/req/deleteFunctionality.req.dto';
import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';

import { PutFunctionalityResDto } from './dto/res/putFunctionality.res.dto';
import { GetFunctionalityResDto } from './dto/res/getFunctionality.res.dto';
import { PostFunctionalityResDto } from './dto/res/postFunctionality.res.dto';
import { DeleteFunctionalityResDto } from './dto/res/deleteFunctionality.res.dto';
import { GetFunctionalitiesListResDto } from './dto/res/getFunctionalitiesList.res.dto';

import { Functionality } from 'src/entities/contensterdb/functionality.entity';

@Injectable()
export class FunctionalitiesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: FunctionalitiesRepository,
  ) {
    super(i18n);
  }

  async getFunctionalitiesList(req: Request, body: GetFunctionalitiesListReqDto) {
    const [data, total] = await this.repo.getFunctionalitiesPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        title: this.translate(item.titles),
        icon: this.generateFilePath(req, item.icon),
        establishment: item.module.establishment.corporateName,
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetFunctionalitiesListResDto, response);
  }

  async getFunctionality(req: Request, query: GetFunctionalityReqDto) {
    const { id } = query;

    const functionality = await this.repo.getFunctionalityById(id);

    if (!functionality) {
      throw new HttpException(this.i18n.t('errors.functionalityNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...functionality,
      moduleId: functionality.module.id,
      establishmentId: functionality.module.establishment.id,
      icon: this.generateFilePath(req, functionality.icon),
    };

    return this.response(GetFunctionalityResDto, response);
  }

  async postFunctionality(body: PostFunctionalityReqDto) {
    const { moduleId, establishmentId, icon, position, slug, titles } = body;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, count] = await this.repo.getBySlugAndEstablishment(slug, establishmentId);

    if (count > 0) {
      throw new HttpException(this.i18n.t('errors.slugAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    const saveFunctionality: Partial<Functionality> = {
      slug,
      position,
      module: { id: moduleId },
      icon: this.degenerateFilePath(icon),
      titles: titles.map((title) => ({
        ...(title.id && { id: title.id }),
        text: title.text,
        language: { id: title.language.id },
      })),
    };

    const response = await this.repo.saveFunctionality(saveFunctionality);

    return this.response(PostFunctionalityResDto, response);
  }

  async putFunctionality(body: PutFunctionalityReqDto) {
    const { id, moduleId, establishmentId, icon, position, slug, titles } = body;

    const functionality = await this.repo.getFunctionalityById(id);

    if (!functionality) {
      throw new HttpException(this.i18n.t('errors.functionalityNotFound'), HttpStatus.BAD_REQUEST);
    }

    const [functionalities] = await this.repo.getBySlugAndEstablishment(slug, establishmentId);

    if (functionalities.filter((item) => item.id !== id).length > 0) {
      throw new HttpException(this.i18n.t('errors.slugAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    const updateFunctionality: Partial<Functionality> = {
      id,
      position,
      slug,
      module: { id: moduleId },
      icon: this.degenerateFilePath(icon),
      titles: titles.map((title) => ({
        ...(title.id && { id: title.id }),
        text: title.text,
        language: { id: title.language.id },
      })),
    };

    const response = await this.repo.saveFunctionality(updateFunctionality);

    return this.response(PutFunctionalityResDto, response);
  }

  async deleteFunctionality(query: DeleteFunctionalityReqDto) {
    const { id } = query;

    const functionality = await this.repo.getFunctionalityById(id);

    if (!functionality) {
      throw new HttpException(this.i18n.t('errors.functionalityNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.removeFunctionality(functionality);

    return this.response(DeleteFunctionalityResDto, response);
  }
}
