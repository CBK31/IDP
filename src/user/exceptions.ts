export class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorMessages = {
  userAlreadySignup: new CustomError("User not found", 404),
};
