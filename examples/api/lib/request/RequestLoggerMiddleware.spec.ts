import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { IMiddleware, IRequest, IResponse } from '../vendor';
import requestLoggerMiddlewareFactory from './RequestLoggerMiddleware';
import { mockLogger } from '../utils';

describe('RequestLoggerMiddleware', () => {
  let middleware: IMiddleware;
  let mockRequest: StubbedInstance<IRequest>;
  let mockResponse: StubbedInstance<IResponse>;

  beforeEach(() => {
    middleware = requestLoggerMiddlewareFactory(() => mockLogger);
    mockRequest = stubInterface<IRequest>();
    mockResponse = stubInterface<IResponse>();
  });

  describe('requestLoggerMiddleware()', () => {
    it(`should successfully log each request`, async () => {
      mockRequest.method = 'GET';
      mockRequest.protocol = 'https';
      mockRequest.get.withArgs('host').returns('rafterjs.com');
      mockRequest.originalUrl = '/about';

      const done = sinon.stub();
      await middleware(mockRequest, mockResponse, done);

      expect(done.calledOnce).toBeTruthy();
      expect(mockLogger.info.calledOnce).toBeTruthy();
      const log = mockLogger.info.args[0][0];

      expect(log).toEqual('GET https://rafterjs.com/about');
    });
  });
});
