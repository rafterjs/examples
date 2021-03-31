import helmet from 'helmet';
import { IMiddleware } from '../vendor';

export default (): IMiddleware => {
  return helmet();
};
