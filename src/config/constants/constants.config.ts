import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import variables from 'src/settings';
import { IDatabaseVariable } from 'src/shared/types/common.types';

export const dbOptions = (database: IDatabaseVariable): DataSourceOptions => ({
  port: database.DB_PORT,
  host: database.DB_HOST,
  database: database.DB_NAME,
  username: database.DB_USERNAME,
  password: database.DB_PASSWORD,
  extra: {
    idleTimeoutMillis: 20000,
  },
  poolSize: 20,
  type: database.DB_TYPE,
  installExtensions: true,
});

export const HTTPS: boolean = variables.SSL;

export const environment: string = process.env.NODE_ENV;

export const typeOrmModuleOptions = (
  config: IDatabaseVariable,
): TypeOrmModuleOptions => ({
  ...dbOptions(config),
  retryAttempts: 3,
  retryDelay: 5000,
  synchronize: environment === 'development',
  entities: [
    join(__dirname, '..', 'entities', config.FOLDER_NAME, '*.entity.js'),
  ],
  migrations: [
    join(__dirname, '..', 'migrations', config.FOLDER_NAME, '*.migration.js'),
  ],
});
