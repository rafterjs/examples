import { configure, getLogger } from 'log4js';
import { ILogger, ILoggerFactory } from './Logger';
import { HttpContextHelper } from './HttpContextHelper';
import { config } from '../../config/config';

export type ILoggerContext = () => string;

export function loggerFactory(category?: string, transactionIdContext?: ILoggerContext): ILogger {
  // adding a transaction id to every log line if one exists.
  // This will primarily be during a request lifecycle
  const pattern = transactionIdContext ? '%[%d - %X{transactionId}%p %c%] - %m%n' : '%[%d - %p %c%] - %m%n';

  configure({
    appenders: {
      out: {
        type: 'stdout',
        layout: {
          type: 'pattern',
          pattern,
        },
      },
    },
    categories: {
      default: {
        appenders: ['out'],
        level: config.logger.level,
      },
    },
  });

  const logger = getLogger(category);
  logger.addContext('transactionId', transactionIdContext || '');

  return logger;
}

export default (httpContextHelper: HttpContextHelper): ILoggerFactory => {
  return (category?: string) => {
    return loggerFactory(category, (): string => {
      const transactionId = httpContextHelper.getTransactionId();
      return transactionId ? `${transactionId} - ` : '';
    });
  };
};
