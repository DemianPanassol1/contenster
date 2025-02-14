import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CoreService } from 'src/core/core.service';
import { RolesRepository } from './roles.repository';

import { GetRoleReqDto } from './dto/req/getRole.req.dto';
import { PutRoleReqDto } from './dto/req/putRole.req.dto';
import { PostRoleReqDto } from './dto/req/postRole.req.dto';
import { DeleteRoleReqDto } from './dto/req/deleteRole.req.dto';
import { GetRolesListReqDto } from './dto/req/getRolesList.req.dto';

@Injectable()
export class RolesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: RolesRepository,
  ) {
    super(i18n);
  }

  async getRolesList(body: GetRolesListReqDto) {
    throw new Error('Method not implemented.');
  }

  async getRole(query: GetRoleReqDto) {
    throw new Error('Method not implemented.');
  }

  async putRole(body: PutRoleReqDto) {
    throw new Error('Method not implemented.');
  }

  async postRole(body: PostRoleReqDto) {
    throw new Error('Method not implemented.');
  }

  async deleteRole(query: DeleteRoleReqDto) {
    throw new Error('Method not implemented.');
  }
}
