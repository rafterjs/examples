import { IRequest, IResponse } from '../vendor';
import { IJsonResponseData } from './IJsonResponse';
import { JsonErrorResponseDto } from './JsonErrorResponseDto';
import { JsonResponseDto } from './JsonResponseDto';

export interface IJsonController {
  render(request: IRequest, response: IResponse, responseDto: JsonResponseDto<IJsonResponseData>): Promise<void>;

  renderError(request: IRequest, response: IResponse, responseDto: JsonErrorResponseDto): Promise<void>;
}
