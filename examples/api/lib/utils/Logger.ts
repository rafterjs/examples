/* eslint-disable @typescript-eslint/no-empty-function */
import { ILogger } from '@rafterjs/logger-plugin';
import { stubObject } from 'ts-sinon';

export { ILogger, ILoggerFactory } from '@rafterjs/logger-plugin';
export const mockLogger = stubObject<ILogger>({
  log: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
});

export const mockLoggerFactory = (): ILogger => {
  return mockLogger as ILogger;
};
