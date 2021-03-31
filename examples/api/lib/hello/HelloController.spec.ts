import { StubbedInstance, stubConstructor, stubInterface, stubObject } from 'ts-sinon';
import { HelloController } from './HelloController';
import { HelloMessageDao } from './HelloMessageDao';
import { IRequest, IResponse, BadRequestError } from '../vendor';
import { JsonResponseTransformer } from '../response';
import { IApiConfig } from '../../config';
import { mockLoggerFactory } from '../utils';

describe('HelloController', () => {
  let mockRequest: StubbedInstance<IRequest>;
  let mockResponse: StubbedInstance<IResponse>;
  let mockHelloMessageDao: StubbedInstance<HelloMessageDao>;
  let mockJsonResponseTransformer: StubbedInstance<JsonResponseTransformer>;
  let helloController: HelloController;

  beforeEach(() => {
    mockRequest = stubInterface<IRequest>();
    mockResponse = stubInterface<IResponse>();
    mockResponse.status.returns(mockResponse);

    const mockConfig = stubInterface<IApiConfig>();
    // since the constructor of this class executes a function, we have to use stubObject instead
    mockHelloMessageDao = stubObject<HelloMessageDao>(new HelloMessageDao(mockConfig, mockLoggerFactory));
    mockJsonResponseTransformer = stubConstructor(JsonResponseTransformer);

    // instantiate the controller with the dependencies mocked
    helloController = new HelloController(mockJsonResponseTransformer, mockHelloMessageDao, mockLoggerFactory);
  });

  describe('index()', () => {
    it(`should successfully return a response with a message`, async () => {
      // mocks
      const mockJsonResponse = {
        transactionId: '123',
        message: 'Hi there',
        data: {
          id: '1',
          name: 'Fancy pants',
        },
        links: {
          self: 'http://localhost/hello',
        },
      };

      // return values of dependencies
      mockHelloMessageDao.getMessage.resolves('Hi there');
      mockJsonResponseTransformer.convert.returns(mockJsonResponse);

      // call the controller
      await helloController.index(mockRequest, mockResponse);

      expect(mockHelloMessageDao.getMessage.calledOnce).toBeTruthy();
      expect(mockJsonResponseTransformer.convert.calledOnce).toBeTruthy();
      expect(mockResponse.status.withArgs(200).calledOnce).toBeTruthy();
      expect(mockResponse.json.withArgs(mockJsonResponse).calledOnce).toBeTruthy();
    });

    it(`should successfully return an error response when the message dao fails`, async () => {
      // mocks
      const mockJsonErrorResponse = {
        transactionId: '123',
        errors: [
          {
            code: 400,
            title: 'Bad Request',
            message: '',
          },
        ],
      };

      // return values of dependencies
      mockHelloMessageDao.getMessage.rejects(new BadRequestError());
      mockJsonResponseTransformer.convertError.returns(mockJsonErrorResponse);

      // call the controller
      await helloController.index(mockRequest, mockResponse);

      expect(mockHelloMessageDao.getMessage.calledOnce).toBeTruthy();
      expect(mockJsonResponseTransformer.convertError.calledOnce).toBeTruthy();
      expect(mockResponse.status.withArgs(400).calledOnce).toBeTruthy();
      expect(mockResponse.json.withArgs(mockJsonErrorResponse).calledOnce).toBeTruthy();
    });
  });
});
