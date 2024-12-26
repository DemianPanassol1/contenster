import { join } from 'path';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { plainToClass } from 'class-transformer';

export class CoreService {
  public static publicPath: string = join(__dirname.replace('dist', ''), '..', '..', 'public');

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

  response<T>(dtoClass: { new (): T }, data: any): T {
    return plainToClass(dtoClass, data, { excludeExtraneousValues: true });
  }
}
