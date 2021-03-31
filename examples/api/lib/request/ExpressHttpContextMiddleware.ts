import expressHttpContext from 'express-http-context';
import { IMiddleware } from '../vendor';

export default (): IMiddleware => {
  return expressHttpContext.middleware;
};
