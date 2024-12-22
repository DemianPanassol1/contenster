// import { join } from 'path';
import { utilities } from 'nest-winston';
import winston, { createLogger, format } from 'winston';

const winstonInstance = createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        utilities.format.nestLike('NestJS', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    // new winston.transports.File({
    //   tailable: true,
    //   level: 'error',
    //   filename: `errors-logs-${new Date().toLocaleDateString().replace(/\//g, '-')}.log`,
    //   dirname: join(__dirname.replace('dist', ''), '..', '..', 'logs'),
    //   maxsize: 1000000, // Tamanho máximo de cada arquivo: 1mb
    //   maxFiles: 20, // Máximo de arquivos: 20 arquivos de 1mb cada
    //   format: format.combine(
    //     format.timestamp(),
    //     format.ms(),
    //     format.splat(),
    //     format.json({ space: 2 }),
    //   ),
    // }),
  ],
});

export default winstonInstance;
