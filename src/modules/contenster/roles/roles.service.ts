import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { RolesRepository } from './roles.repository';

import { GetRoleReqDto } from './dto/req/getRole.req.dto';
import { PutRoleReqDto } from './dto/req/putRole.req.dto';
import { PostRoleReqDto } from './dto/req/postRole.req.dto';
import { DeleteRoleReqDto } from './dto/req/deleteRole.req.dto';
import { GetRolesListReqDto } from './dto/req/getRolesList.req.dto';

import { GetRoleResDto } from './dto/res/getRole.res.dto';
import { PutRoleResDto } from './dto/res/putRole.res.dto';
import { PostRoleResDto } from './dto/res/postRole.res.dto';
import { DeleteRoleResDto } from './dto/res/deleteRole.res.dto';
import { GetRolesListResDto } from './dto/res/getRolesList.res.dto';

import { Role } from 'src/entities/contensterdb/role.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

@Injectable()
export class RolesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: RolesRepository,
  ) {
    super(i18n);
  }

  async getRolesList(body: GetRolesListReqDto) {
    const [data, total] = await this.repo.getRolesPaginated(body);

    const response = {
      data: data.map((item) => ({
        id: item.id,
        title: this.translate(item.titles),
        description: this.translate(item.descriptions),
        establishment: item.establishment.corporateName,
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetRolesListResDto, response);
  }

  async getRole(query: GetRoleReqDto) {
    const { id } = query;

    const role = await this.repo.getRoleById(id);

    if (!role) {
      throw new HttpException(this.i18n.t('errors.roleNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = { ...role };

    return this.response(GetRoleResDto, response);
  }

  async putRole(body: PutRoleReqDto) {
    const { id, titles, descriptions, establishmentId } = body;

    const role = await this.repo.getRoleById(id);

    if (!role) {
      throw new HttpException(this.i18n.t('errors.roleNotFound'), HttpStatus.BAD_REQUEST);
    }

    const updateRole: Partial<Role> = {
      id: role.id,
      establishment: { id: establishmentId } as Establishment,
      titles: titles.map((title) => ({
        id: title.id,
        text: title.text,
      })) as Translation[],
      descriptions: descriptions.map((description) => ({
        id: description.id,
        text: description.text,
      })) as Translation[],
    };

    const response = await this.repo.saveRole(updateRole);

    return this.response(PutRoleResDto, response);
  }

  async postRole(body: PostRoleReqDto) {
    const { titles, descriptions, establishmentId } = body;

    const saveRole: Partial<Role> = {
      establishment: { id: establishmentId } as Establishment,
      titles: titles.map((title) => ({
        id: title.id,
        text: title.text,
        language: { id: title.language.id },
      })) as Translation[],
      descriptions: descriptions.map((description) => ({
        id: description.id,
        text: description.text,
        language: { id: description.language.id },
      })) as Translation[],
    };

    const response = await this.repo.saveRole(saveRole);

    return this.response(PostRoleResDto, response);
  }

  async deleteRole(query: DeleteRoleReqDto) {
    const { id } = query;

    const role = await this.repo.getRoleById(id);

    if (!role) {
      throw new HttpException(this.i18n.t('errors.roleNotFound'), HttpStatus.BAD_REQUEST);
    }

    const count = await this.repo.countRolesByEstablishmentRole(role.establishment.id, role.id);

    if (count > 0) {
      throw new HttpException(this.i18n.t('errors.roleInUse'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.remeveRole(role);

    return this.response(DeleteRoleResDto, response);
  }
}
