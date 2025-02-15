import _ from 'lodash';
import { join } from 'path';
import { unlink } from 'fs';
import { Request } from 'express';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { IToOptions } from 'src/shared/types/api.types';
import { Translation } from 'src/entities/contensterdb/translation.entity';

export class CoreService {
  public publicPath: string = join(__dirname, '..', '..', 'public');
  public systemIconsPath: string = join(this.publicPath, 'assets', 'icons', 'system');

  constructor(public readonly i18n: I18nService) {}

  translate(translations: Translation[]): string | null {
    const currentLang = I18nContext.current().lang;

    const result = translations.find((elem) => elem.language.languageCode === currentLang);

    if (typeof result === 'undefined' || result.text === '') {
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
}
