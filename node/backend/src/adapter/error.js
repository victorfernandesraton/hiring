export class ApplicationError extends Error {
  constructor(message, status) {
    super(message ?? "Internal Server Error");
    this.status = status ?? 500;
    this.name = "ApplicationError";
  }
}
