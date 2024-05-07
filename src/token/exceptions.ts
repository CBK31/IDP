export class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorMessages = {
  userAlreadyExists: new CustomError("User already exists", 409),
  invalidAuthToken: new CustomError("Authentication token is invalid", 401),
  noAuthTokenProvided: new CustomError("No authentication token provided", 401),
  tokenInfoMismatch: new CustomError(
    "Access denied for the provided token",
    403
  ),
};
