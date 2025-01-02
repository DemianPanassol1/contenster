import { join } from 'path';

export class CoreInterceptor {
  public static publicPath: string = join(__dirname, '..', '..', 'public');
}
