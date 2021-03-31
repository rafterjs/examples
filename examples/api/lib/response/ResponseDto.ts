import { HttpError } from '../vendor';

export interface IResponseDto {
  message: string;
  data: Record<string, unknown>;
  status: number;
}

export interface IErrorResponseDto {
  errors: HttpError[];
  status: number;
}
