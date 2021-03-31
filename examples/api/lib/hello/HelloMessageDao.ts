import { ILogger, ILoggerFactory } from '../utils';
import { IApiConfig } from '../../config';

export class HelloMessageDao {
  private readonly logger: ILogger;

  constructor(private readonly config: IApiConfig, private readonly loggerFactory: ILoggerFactory) {
    this.logger = loggerFactory('HelloMessageDao');
  }

  public async getMessage(): Promise<string> {
    this.logger.info(`Getting message: ${this.config.home.message}`);
    return this.config.home.message;
  }
}

export default HelloMessageDao;
