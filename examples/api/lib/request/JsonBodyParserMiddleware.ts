import { json } from 'body-parser';
import { IMiddleware } from '../vendor';

export default (): IMiddleware => {
  return json();
};
