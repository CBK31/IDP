export class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
// export class CustomError extends Error {
//   public statusCode: number;

//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.name = "CustomError";
//     this.statusCode = statusCode;
//   }
// }
export const ErrorMessages = {
  userAlreadyExists: new CustomError("User already exists", 409),
  invalidEmailOrPassword: new CustomError("Invalid email or password", 401),
};
