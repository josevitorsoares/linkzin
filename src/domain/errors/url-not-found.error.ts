export class UrlNotFoundError extends Error {
  constructor() {
    super();
    this.name = "UrlNotFoundError";
    this.message = "Url not found";
  }
}
