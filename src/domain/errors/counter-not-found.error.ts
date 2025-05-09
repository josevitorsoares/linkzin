import { AppError } from "./app-error.error";

export class CounterNotFoundError extends AppError {
  constructor() {
    super();
    this.name = "CounterNotFoundError";
    this.message = "Counter not found";
    this.statusCode = 404;
    this.stack = new Error().stack;
  }
}
