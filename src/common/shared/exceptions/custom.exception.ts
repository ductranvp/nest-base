import { HttpStatus } from '@nestjs/common';
import { IErrorDetail } from '../interfaces/IErrorDetail';

export class CustomException extends Error {
  constructor(statusCode: HttpStatus, error: IErrorDetail) {
    super();
    this.statusCode = statusCode;
    this.error = error;
  }
  statusCode: HttpStatus;
  error: IErrorDetail;
}
