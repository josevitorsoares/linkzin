interface IAppError {
  name: string;
  message: string;
  statusCode: number;
  isError: boolean;
  stack?: string;
}

export class AppError extends Error implements IAppError {
  statusCode: number;
  isError: boolean;

  constructor(
    message: string = "An unexpected error occurred",
    statusCode: number = 500,
  ) {
    super();
    this.name = "AppError";
    this.message = message;
    this.statusCode = statusCode;
    this.isError = true;
    this.stack = new Error().stack;
  }
}
