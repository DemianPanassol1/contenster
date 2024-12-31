import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import variables from 'src/settings';
import { AuthRepository } from './auth.repository';
import { CoreService } from 'src/core/core.service';

import { SignInUserReqDto } from './dto/req/signIn.req.dto';
import { ResetPasswordReqDto } from './dto/req/resetPassword.req.dto';
import { CreatePasswordReqDto } from './dto/req/createPassword.req.dto';

import { PostSignInResDto } from './dto/res/postSignIn.res.dto';
import { GetSignOutResDto } from './dto/res/getSignOut.res.dto';
import { PostAuthorizeResDto } from './dto/res/postAuthorize.res.dto';
import { PostCreatePasswordResDto } from './dto/res/postCreatePassword.res.dto';

@Injectable()
export class AuthService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: AuthRepository,
  ) {
    super(i18n);
  }

  async postAuthorize(body: SignInUserReqDto) {
    const { username } = body;

    const user = await this.repo.findByUsername(username);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.invalidUserOrPassword'), HttpStatus.BAD_REQUEST);
    }

    const response = this.toOptions(
      user.userEstablishmentRole.map((item) => ({
        id: item.establishment.id,
        value: item.establishment.corporateName,
      })),
      'id',
      'value',
    );

    return this.response(PostAuthorizeResDto, response);
  }

  async postSignIn(request: Request, body: SignInUserReqDto) {
    const { establishmentId, password, staySign, username } = body;

    const user = await this.repo.findByUsername(username);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.invalidUserOrPassword'), HttpStatus.BAD_REQUEST);
    }

    if (user.isBlocked) {
      throw new HttpException(this.i18n.t('errors.userBlocked'), HttpStatus.BAD_REQUEST);
    }

    if (!this.validatePassword(password, user.password)) {
      throw new HttpException(this.i18n.t('errors.invalidUserOrPassword'), HttpStatus.BAD_REQUEST);
    }

    const roleId = user.userEstablishmentRole.find(
      (item) => item.establishment.id === establishmentId,
    ).role.id;

    const permissions = await this.repo.findPermissions(roleId, establishmentId);

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: this.generateFilePath(request, user.image?.filePath),
      username: user.username,
      isActive: user.isActive,
      phone: user.phone,
      homePage: user.preference?.functionality?.slug ?? null,
      establishmentCount: user.userEstablishmentRole.length,
      role: {
        id: roleId,
        title: this.translate(permissions.role.titles),
        description: this.translate(permissions.role.descriptions),
      },
      permissions: permissions.role.permission.map((permission) => ({
        id: permission.id,
        title: this.translate(permission.functionality.titles),
        slug: permission.functionality.slug,
        canRead: permission.canRead,
        canCreate: permission.canCreate,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
      })),
      company: {
        id: permissions.establishment.id,
        document: permissions.establishment.document,
        documentType: permissions.establishment.documentType,
        email: permissions.establishment.email,
        phone1: permissions.establishment.phone1,
        phone2: permissions.establishment.phone2,
        address: permissions.establishment.address,
        addressNumber: permissions.establishment.addressNumber,
        zipCode: permissions.establishment.zipCode,
        district: permissions.establishment.district,
        corporateName: permissions.establishment.corporateName,
        fantasyName: permissions.establishment.fantasyName,
        image:
          this.generateFilePath(request, permissions.establishment.image?.filePath) ??
          `${request.protocol}://${request.headers.host}/assets/images/system/react_icon.png`,
      },
    };

    request.session.user = response;

    if (staySign) {
      request.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
    }

    await this.repo.updateUserLastLoggedAt(user.id);

    return this.response(PostSignInResDto, response);
  }

  async getSignOut(request: Request) {
    const response = await new Promise<GetSignOutResDto>((resolve) => {
      request.session.destroy(() => {
        resolve({ logout: true });
      });
    });

    return this.response(GetSignOutResDto, response);
  }

  // eslint-disable-next-line
  async postResetPassword(request: Request, body: ResetPasswordReqDto) {
    throw new Error('Method not implemented.');
  }

  async postCreatePassword(body: CreatePasswordReqDto) {
    const { password, token } = body;

    const response = await new Promise<PostCreatePasswordResDto>((resolve, reject) => {
      return jwt.verify(token, variables.JWT_TOKEN, async (err, decoded) => {
        if (err) reject(this.i18n.t('errors.invalidToken'));

        const user = await this.repo.findByEmail((decoded as JwtPayload).email);

        if (!user) reject(this.i18n.t('errors.userNotFound'));

        await this.repo.updateUserPassword(user.id, this.generatePassword(password));

        resolve({ passwordReseted: true });
      });
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });

    return this.response(PostCreatePasswordResDto, response);
  }
}
