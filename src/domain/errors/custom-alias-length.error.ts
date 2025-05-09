import {
  MAX_CUSTOM_ALIAS_LENGTH,
  MIN_CUSTOM_ALIAS_LENGTH,
} from "@environment/env";
import { AppError } from "./app-error.error";

export class CustomAliasLengthError extends AppError {
  constructor() {
    super();
    this.name = "CustomAliasLengthError";
    this.message = `Custom alias length exceeds the maximum or minimum allowed length. The maximum length is ${MAX_CUSTOM_ALIAS_LENGTH} and the minimum length is ${MIN_CUSTOM_ALIAS_LENGTH}`;
    this.statusCode = 422;
    this.isError = true;
    this.stack = new Error().stack;
  }
}
