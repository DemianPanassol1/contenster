import { join } from 'path';
import { readFileSync } from 'fs';

import { IVariables } from 'src/shared/types/system.types';

const loadVariables = () => {
  try {
    const file = readFileSync(join(__dirname, `${process.env.NODE_ENV}.json`), 'utf8');

    const content: IVariables = JSON.parse(file);

    return content;
  } catch (error) {
    console.log(error);

    return emptyVariables;
  }
};

const emptyVariables: IVariables = {
  SSL: false,
  PORT: null,
  HOST: '',
  COOKIE_NAME: '',
  COOKIE_KEY: '',
  JWT_TOKEN: '',
  API_LOGIN: '',
  API_PASSWORD: '',
  DATABASES: [],
  SESSION_MAX_AGE: 1000 * 60 * 120,
};

const variables: IVariables = loadVariables();

export default variables;
