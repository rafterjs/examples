import { HttpError, IRequest, IResponse } from '../vendor';
import { ILogger, ILoggerFactory } from '../utils';
import { JsonController, JsonErrorResponseDto, JsonResponseDto, Status, JsonResponseTransformer } from '../response';
import { HelloMessageDao } from './HelloMessageDao';

export class HelloController extends JsonController {
  private readonly logger: ILogger;

  constructor(
    protected readonly jsonResponseTransformer: JsonResponseTransformer,
    private readonly helloMessageDao: HelloMessageDao,
    private readonly loggerFactory: ILoggerFactory,
  ) {
    super(jsonResponseTransformer);
    this.logger = loggerFactory('HelloController');
  }

  public async index(request: IRequest, response: IResponse): Promise<void> {
    try {
      const jsonResponse = new JsonResponseDto({
        message: await this.helloMessageDao.getMessage(),
        data: {
          id: '1',
          name: 'Fancy pants',
        },
        status: 200,
      });

      this.logger.debug(`Rendering api response`, jsonResponse);

      return this.render(request, response, jsonResponse);
    } catch (error) {
      const jsonResponse = new JsonErrorResponseDto({
        errors: [error as HttpError],
        status: Status.BAD_REQUEST,
      });
      this.logger.error(`Error rendering api response`, jsonResponse);
      return this.renderError(request, response, jsonResponse);
    }
  }
}

export default HelloController;
