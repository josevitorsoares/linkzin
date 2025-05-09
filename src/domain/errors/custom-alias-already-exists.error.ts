import { AppError } from "./app-error.error";

export class CustomAliasAlreadyExistsError extends AppError {
  constructor() {
    super();
    this.name = "CustomAliasAlreadyExistsError";
    this.message = "Custom alias already exists";
    this.statusCode = 409;
    this.isError = true;
    this.stack = new Error().stack;
  }
}
