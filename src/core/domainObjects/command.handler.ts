import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseCommandHandler {
  private errors: string[];

  constructor() {
    this.errors = [];
  }

  AddError = (error: string) => this.errors.push(error);

  GetErrors = (): string[] => this.errors;

  CheckErrors = () => {
    if (this.errors.length > 0)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: this.errors,
        },
        HttpStatus.BAD_REQUEST,
      );
  };
}
