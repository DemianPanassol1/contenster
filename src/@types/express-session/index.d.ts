// eslint-disable-next-line
import * as expressSession from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: any;
  }
}
