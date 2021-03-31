import { ILogger, ILoggerFactory } from './Logger';
import { IRequest } from '../vendor';

export class UrlHelper {
  private readonly logger: ILogger;

  constructor(private readonly loggerFactory: ILoggerFactory) {
    this.logger = loggerFactory('UrlHelper');
  }

  public getSelf(request: IRequest): string {
    const self = new URL(`${request.protocol}://${request.get('host')}${request.originalUrl}`);
    this.logger.debug(`Getting the self endpoint: ${self}`);
    return self.href;
  }
}

export default UrlHelper;
