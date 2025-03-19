import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { EmailSettingRepository } from './emailSetting.repository';
import { EmailSetting } from 'src/entities/contensterdb/emailSetting.entity';

import { GetEmailSettingReqDto } from './dto/req/getEmailSetting.req.dto';
import { PutEmailSettingReqDto } from './dto/req/putEmailSetting.req.dto';
import { PostEmailSettingReqDto } from './dto/req/postEmailSetting.req.dto';
import { DeleteEmailSettingReqDto } from './dto/req/deleteEmailSetting.req.dto';
import { GetEmailSettingListReqDto } from './dto/req/getEmailSettingList.req.dto';

import { GetEmailSettingResDto } from './dto/res/getEmailSetting.res.dto';
import { PutEmailSettingResDto } from './dto/res/putEmailSetting.res.dto';
import { PostEmailSettingResDto } from './dto/res/postEmailSetting.res.dto';
import { GetEmailSettingListResDto } from './dto/res/getEmailSettingList.res.dto';

@Injectable()
export class EmailSettingService extends CoreService {
  constructor(
    readonly i18n: I18nService,
    private readonly repo: EmailSettingRepository,
  ) {
    super(i18n);
  }

  async getEmailSettingList(body: GetEmailSettingListReqDto) {
    const [data, total] = await this.repo.getEmailSettingPaginated(body);

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

    return this.response(GetEmailSettingListResDto, response);
  }

  async getEmailSetting(query: GetEmailSettingReqDto) {
    const { id } = query;

    const emailSetting = await this.repo.getEmailSettingById(id);

    if (!emailSetting) {
      throw new HttpException(this.i18n.t('errors.emailSettingNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...emailSetting,
      establishmentId: emailSetting.establishment.id,
    };

    return this.response(GetEmailSettingResDto, response);
  }

  async putEmailSetting(body: PutEmailSettingReqDto) {
    const { id, contents, footers, titles, subjects } = body;
    const { server, username, password, port, ssl, tls } = body;
    const { establishmentId, purpose, sender, recipient, recipientCopy } = body;

    const emailSetting = await this.repo.getEmailSettingByPurpose(purpose, establishmentId);

    if (emailSetting && emailSetting.id !== id) {
      throw new HttpException(
        this.i18n.t('errors.emailSettingAlreadyExists'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const saveEmailSetting: Partial<EmailSetting> = {
      id,
      server,
      username,
      password,
      port,
      ssl,
      tls,
      purpose,
      sender,
      recipient,
      recipientCopy,
      establishment: { id: establishmentId },
      titles: titles.map((title) => ({
        ...(title.id && { id: title.id }),
        text: title.text,
        language: { id: title.language.id },
      })),
      subjects: subjects.map((subject) => ({
        ...(subject.id && { id: subject.id }),
        text: subject.text,
        language: { id: subject.language.id },
      })),
      contents: contents.map((content) => ({
        ...(content.id && { id: content.id }),
        text: content.text,
        language: { id: content.language.id },
      })),
      footers: footers.map((footer) => ({
        ...(footer.id && { id: footer.id }),
        text: footer.text,
        language: { id: footer.language.id },
      })),
    };

    const response = await this.repo.saveEmailSetting(saveEmailSetting);

    return this.response(PutEmailSettingResDto, response);
  }

  async postEmailSetting(body: PostEmailSettingReqDto) {
    const { contents, footers, titles, subjects } = body;
    const { server, username, password, port, ssl, tls } = body;
    const { establishmentId, purpose, sender, recipient, recipientCopy } = body;

    const emailSetting = await this.repo.getEmailSettingByPurpose(purpose, establishmentId);

    if (emailSetting) {
      throw new HttpException(
        this.i18n.t('errors.emailSettingAlreadyExists'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const saveEmailSetting: Partial<EmailSetting> = {
      server,
      username,
      password,
      port,
      ssl,
      tls,
      purpose,
      sender,
      recipient,
      recipientCopy,
      establishment: { id: establishmentId },
      titles: titles.map((title) => ({
        ...(title.id && { id: title.id }),
        text: title.text,
        language: { id: title.language.id },
      })),
      subjects: subjects.map((subject) => ({
        ...(subject.id && { id: subject.id }),
        text: subject.text,
        language: { id: subject.language.id },
      })),
      contents: contents.map((content) => ({
        ...(content.id && { id: content.id }),
        text: content.text,
        language: { id: content.language.id },
      })),
      footers: footers.map((footer) => ({
        ...(footer.id && { id: footer.id }),
        text: footer.text,
        language: { id: footer.language.id },
      })),
    };

    const response = await this.repo.saveEmailSetting(saveEmailSetting);

    return this.response(PostEmailSettingResDto, response);
  }

  async deleteEmailSetting(query: DeleteEmailSettingReqDto) {
    throw new Error('Method not implemented.');
  }
}
