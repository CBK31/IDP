import { Response } from "express";

export class ErrorHandler {
  public static handle(error: any, res: Response): void {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ error: message });
  }
}
