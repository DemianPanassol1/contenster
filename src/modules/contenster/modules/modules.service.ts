import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { ModulesRepository } from './modules.repository';

import { GetModuleReqDto } from './dto/req/getModule.req.dto';
import { PutModuleReqDto } from './dto/req/putModule.req.dto';
import { PostModuleReqDto } from './dto/req/postModule.req.dto';
import { DeleteModuleReqDto } from './dto/req/deleteModule.req.dto';
import { GetModulesListReqDto } from './dto/req/getModulesList.req.dto';

import { GetModuleResDto } from './dto/res/getModule.res.dto';
import { PutModuleResDto } from './dto/res/putModule.res.dto';
import { PostModuleResDto } from './dto/res/postModule.res.dto';
import { DeleteModuleResDto } from './dto/res/deleteModule.res.dto';
import { GetModulesListResDto } from './dto/res/getModulesList.res.dto';

import { Module } from 'src/entities/contensterdb/module.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

@Injectable()
export class ModulesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: ModulesRepository,
  ) {
    super(i18n);
  }

  async getModulesList(body: GetModulesListReqDto) {
    const [data, total] = await this.repo.getModulesPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        title: this.translate(item.titles),
        establishment: item.establishment.corporateName,
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetModulesListResDto, response);
  }

  async getModule(query: GetModuleReqDto) {
    const { id } = query;

    const module = await this.repo.getModuleById(id);

    if (!module) {
      throw new HttpException(this.i18n.t('errors.moduleNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...module,
      establishmentId: module.establishment.id,
    };

    return this.response(GetModuleResDto, response);
  }

  async postModule(body: PostModuleReqDto) {
    const { titles, descriptions, position, establishmentId } = body;

    const saveModule: Partial<Module> = {
      position: position,
      establishment: { id: establishmentId },
      titles: titles.map((title) => ({
        id: title.id,
        text: title.text,
        language: { id: title.language.id },
      })),
      descriptions: descriptions.map((description) => ({
        id: description.id,
        text: description.text,
        language: { id: description.language.id },
      })),
    };

    const response = await this.repo.saveModule(saveModule);

    return this.response(PostModuleResDto, response);
  }

  async putModule(body: PutModuleReqDto) {
    const { id, titles, descriptions, position, establishmentId } = body;

    const module = await this.repo.getModuleById(id);

    if (!module) {
      throw new HttpException(this.i18n.t('errors.moduleNotFound'), HttpStatus.BAD_REQUEST);
    }

    const updateModule: Partial<Module> = {
      id: module.id,
      position: position,
      establishment: { id: establishmentId },
      titles: titles.map((title) => ({
        id: title.id,
        text: title.text,
      })),
      descriptions: descriptions.map((description) => ({
        id: description.id,
        text: description.text,
      })),
    };

    const response = await this.repo.saveModule(updateModule);

    return this.response(PutModuleResDto, response);
  }

  async deleteModule(query: DeleteModuleReqDto) {
    const { id } = query;

    const module = await this.repo.getModuleById(id);

    if (!module) {
      throw new HttpException(this.i18n.t('errors.moduleNotFound'), HttpStatus.BAD_REQUEST);
    }

    if (module.functionality.length > 1) {
      throw new HttpException(
        this.i18n.t('errors.moduleHasFunctionalities'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.repo.removeModule(module);

    return this.response(DeleteModuleResDto, response);
  }
}
