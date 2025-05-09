export class CounterNotFoundError extends Error {
  constructor() {
    super();
    this.name = "CounterNotFoundError";
    this.message = "Counter not found";
  }
}
