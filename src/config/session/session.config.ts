import { Pool } from 'pg';
import session from 'express-session';
import pgSession from 'connect-pg-simple';

import variables from 'src/settings';
import { HTTPS } from '../constants/constants.config';
import { IDatabaseVariable } from 'src/shared/types/system.types';

const PgStore = pgSession(session);

const DATABASE: IDatabaseVariable = variables.DATABASES[0];

const pgPool = new Pool({
  user: DATABASE.DB_USERNAME,
  host: DATABASE.DB_HOST,
  database: DATABASE.DB_NAME,
  password: DATABASE.DB_PASSWORD,
  port: DATABASE.DB_PORT,
});

function sessionInstance(): session.SessionOptions {
  return {
    store: new PgStore({
      pool: pgPool,
      tableName: 'sessions',
      createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: false,
    name: variables.COOKIE_NAME,
    secret: variables.COOKIE_KEY,
    cookie: {
      signed: true,
      secure: HTTPS,
      httpOnly: true,
      maxAge: variables.SESSION_MAX_AGE || 1000 * 60 * 60,
      sameSite: HTTPS ? 'strict' : 'lax',
    },
  };
}

export default sessionInstance;
