import { Request, Response } from "express";

import { validateToken } from "./token.service";
import { stringify } from "querystring";

const verifyTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await validateToken(req, res);
  } catch (error) {
    console.log(" exception handeling verifyTokenController ");
    console.log("verifyTokenController error : " + error);
  }
};

export { verifyTokenController };
