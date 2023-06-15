export class ReachLimitError extends Error {
  constructor(message: string = 'The user has reach the allowed number of exercises.') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
