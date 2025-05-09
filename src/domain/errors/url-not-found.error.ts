import { AppError } from "./app-error.error";

export class UrlNotFoundError extends AppError {
  constructor() {
    super();
    this.name = "UrlNotFoundError";
    this.message = "Url not found";
    this.statusCode = 404;
    this.stack = new Error().stack;
  }
}
