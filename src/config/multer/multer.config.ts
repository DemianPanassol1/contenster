import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { mkdirSync, existsSync } from 'fs';
import { extname, join, resolve } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

const iconTypes = ['image/svg+xml', 'image/vnd.microsoft.icon'];
const imageTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];
const fileTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'application/zip',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  'application/x-tar',
  'application/x-gzip',
  'application/json',
  'application/xml',
  'text/csv',
  'text/html',
];

const multerInstance = (i18n: I18nService) => ({
  storage: diskStorage({
    destination(
      _: never,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string | null) => void,
    ) {
      const mimetype = file.mimetype;
      const dir = join(__dirname, '..', '..', '..', 'public', 'assets');

      let destination = '';

      if (iconTypes.includes(mimetype)) {
        destination = join(dir, 'icons');
      } else if (imageTypes.includes(mimetype)) {
        destination = join(dir, 'images');
      } else if (fileTypes.includes(mimetype)) {
        destination = join(dir, 'files');
      }

      try {
        if (!existsSync(destination)) {
          mkdirSync(destination, { recursive: true, mode: 0o755 });
        }

        callback(null, resolve(destination));
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        callback(
          new HttpException(i18n.t('errors.internalServerError'), HttpStatus.INTERNAL_SERVER_ERROR),
          null,
        );
      }
    },
    filename(
      _: never,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string | null) => void,
    ) {
      const now = new Date();

      const date = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
        .format(now)
        .replaceAll('/', '_');

      const time = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}_${now.getMilliseconds()}`;

      const ext = extname(file.originalname);
      const hash = randomBytes(8).toString('hex');

      const newFileName = file.originalname
        .replace(ext, '')
        .replace(/\s/g, '_')
        .replace(/[^a-zA-Z0-9_\-\.áéíóúãõâêîôûç]/g, '');

      callback(null, `${newFileName}_${hash}_${date}_${time}${ext}`);
    },
  }),
  fileFilter: (
    _: never,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const mimetype = file.mimetype;

    if (
      iconTypes.includes(mimetype) ||
      imageTypes.includes(mimetype) ||
      fileTypes.includes(mimetype)
    ) {
      callback(null, true);
    } else {
      callback(new HttpException(i18n.t('errors.invalidFileType'), HttpStatus.BAD_REQUEST), false);
    }
  },
});

export default multerInstance;
