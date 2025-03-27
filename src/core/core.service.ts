import _ from 'lodash';
import { join } from 'path';
import { unlink } from 'fs';
import { Request } from 'express';
import { readFile } from 'fs/promises';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IToOptions } from 'src/shared/types/api.types';
import { defaultLanguage } from 'src/config/constants/constants.config';

import { Translation } from 'src/entities/contensterdb/translation.entity';
import { EmailSetting } from 'src/entities/contensterdb/emailSetting.entity';

export class CoreService {
  public publicPath: string = join(__dirname, '..', '..', 'public');
  public systemIconsPath: string = join(this.publicPath, 'assets', 'icons', 'system');

  constructor(public readonly i18n: I18nService) {}

  translate(translations: Translation[]): string | null {
    const currentLang = I18nContext.current().lang;

    let result = translations.find((elem) => elem.language.languageCode === currentLang);

    if (result === undefined || result.text === '') {
      result = translations.find((elem) => elem.language.languageCode === defaultLanguage);
    }

    if (result === undefined || result.text === '') {
      return this.i18n.t('general.languageNotTranslated', { args: { lang: currentLang } });
    }

    return result.text;
  }

  generatePassword(password: string): string {
    if (!password) return null;

    const salt = randomBytes(32).toString('hex');
    const genHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    const result = `${genHash}.${salt}`.trim();

    return result;
  }

  validatePassword(incomingPassword: string, hash: string): boolean {
    if (!incomingPassword || !hash) return false;

    const salt = hash.split('.')[1];

    if (!salt) return false;

    const hashVerify = pbkdf2Sync(incomingPassword, salt, 10000, 64, 'sha512').toString('hex');

    const result = `${hashVerify}.${salt}`.trim();

    return hash === result;
  }

  toOptions(data: any[], value: string, label: string, optional = false): IToOptions[] {
    const options = data.map((content) => ({
      value: content[value].toString(),
      label: content[label].toString(),
    }));

    if (optional) {
      options.unshift({ label: this.i18n.t('general.select'), value: '' });
    }

    return options;
  }

  generateFilePath(req: Request, path: string): string {
    return path ? `${req.protocol}://${req.headers.host}/${path}` : null;
  }

  degenerateFilePath(path: string): string {
    return path ? path.split('/').slice(-4).join('/') : null;
  }

  deleteFile(filename: string) {
    if (filename) {
      unlink(join(this.publicPath, filename), () => null);
    }
  }

  response<T>(dtoClass: { new (): T }, data: any): T {
    return plainToClass(dtoClass, data, { excludeExtraneousValues: true });
  }

  paginateData(data: any[], currentPage: number, pageSize: number): any[] {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return _.slice(data, startIndex, endIndex);
  }

  filterDataByField(data: any[], field: string | string[], searchTerm: string): any[] {
    const fields = Array.isArray(field) ? field.flat() : [field];

    return _.filter(data, (item) => fields.some((field) => item[field].includes(searchTerm)));
  }

  slugify(fantasyName: string): string {
    return fantasyName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  async sendEmail(
    emailConfig: EmailSetting,
    recipient: string[] | string,
  ): Promise<{ success: boolean; error: string }> {
    const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
      host: emailConfig.server,
      port: emailConfig.port,
      secure: emailConfig.ssl,
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
      },
    });

    let boilerplate = await readFile(
      join(__dirname, '..', 'shared', 'boilerplates', 'email.html'),
      {
        encoding: 'utf-8',
      },
    );

    const title = emailConfig.titles?.shift()?.text ?? '';
    const content = emailConfig.contents?.shift()?.text ?? '';
    const footer = emailConfig.footers?.shift()?.text ?? '';

    boilerplate = boilerplate
      .replaceAll('[EMAIL_TITLE]', title)
      .replaceAll('[EMAIL_CONTENT]', content)
      .replaceAll('[EMAIL_FOOTER]', footer);

    const recipients = Array.isArray(recipient) ? recipient : [recipient];

    const mailOptions = {
      from: emailConfig.sender,
      to: [...recipients, emailConfig.recipient],
      cc: emailConfig.recipientCopy,
      subject: emailConfig.subjects?.shift()?.text ?? '',
      html: boilerplate,
    };

    try {
      await transporter.sendMail(mailOptions);

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
