export interface IDatabaseVariable {
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_NAME: string;
  FOLDER_NAME: string;
  DB_TYPE: 'postgres' | 'mysql';
  SINCRONIZE: boolean;
}

export interface IVariables {
  SSL: boolean;
  PORT: number;
  HOST: string;
  COOKIE_NAME: string;
  COOKIE_KEY: string;
  JWT_TOKEN: string;
  API_LOGIN: string;
  API_PASSWORD: string;
  SESSION_MAX_AGE: number;
  DATABASES: IDatabaseVariable[];
}

export interface ISession {
  signed: boolean;
  secure: boolean;
  httpOnly: boolean;
  sameSite: boolean | 'strict' | 'lax' | 'none';
  name: string;
  secret: string;
  maxAge: number;
}
