import { HttpContextHelper } from '../utils/HttpContextHelper';
import { IMiddleware, INextFunction, IRequest, IResponse } from '../vendor';
import { RequestHelper } from './RequestHelper';
import { ILoggerFactory, UuidHelper } from '../utils';

export function correlationIdMiddleware(
  httpContextHelper: HttpContextHelper,
  requestHelper: RequestHelper,
  uuidHelper: UuidHelper,
  loggerFactory: ILoggerFactory,
): IMiddleware {
  const logger = loggerFactory('CorrelationIdMiddleware');
  return async (request: IRequest, response: IResponse, next: INextFunction) => {
    const uuid = requestHelper.getTransactionIdFromHeader(request) || uuidHelper.create();

    // set all the correlation headers
    httpContextHelper.setTransactionId(uuid);

    logger.debug(`Applying the correlation id: ${uuid}`);

    next();
  };
}

export default correlationIdMiddleware;
