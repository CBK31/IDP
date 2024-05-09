import { Request, Response } from "express";
import { validateToken } from "./token.service";
import { ErrorHandler } from "../utils/errorHandler";

const verifyTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await validateToken(req.headers.authorization);
    res.status(200).json(result);
  } catch (error) {
    ErrorHandler.handle(error, res);
  }
};

export { verifyTokenController };
