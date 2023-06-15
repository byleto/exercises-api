export class NotFoundError extends Error {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
