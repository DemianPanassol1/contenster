import { join } from 'path';
import { DataSource } from 'typeorm';

import variables from '../../settings';

const folderName = process.env.FOLDER_NAME;

const dbConfig = variables.DATABASES.find((config) => config.FOLDER_NAME === folderName);

if (!folderName || !dbConfig) {
  throw Error('Erro ao obter as configurações do banco de dados');
}

const AppDataSource = new DataSource({
  type: 'postgres',
  dropSchema: false,
  port: dbConfig.DB_PORT,
  host: dbConfig.DB_HOST,
  database: dbConfig.DB_NAME,
  username: dbConfig.DB_USERNAME,
  password: dbConfig.DB_PASSWORD,
  entities: [join(__dirname, '..', '..', 'entities', dbConfig.FOLDER_NAME, '*.entity.ts')],
  migrations: [join(__dirname, '..', '..', 'migrations', dbConfig.FOLDER_NAME, '*.ts')],
});

export { AppDataSource };
