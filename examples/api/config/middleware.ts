import { IMiddlewareConfig, IMiddlewares } from '../lib/vendor';

export default (): IMiddlewares =>
  new Set<IMiddlewareConfig>([
    'jsonBodyParserMiddleware', // NOTE: jsonBodyParser must come before expressHttpContextMiddleware
    'expressHttpContextMiddleware',
    'correlationIdMiddleware',
    'requestLoggerMiddleware',
    'helmetMiddleware',
    'cors',
  ]);
