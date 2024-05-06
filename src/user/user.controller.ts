// import { Request, Response } from "express";

// import { userFunction } from "./user.service";
// import { stringify } from "querystring";

import { Request, Response } from "express";
import * as UserService from "./user.service";
import { signinDto } from "./user.dto/signin.dto";
import { signupDto } from "./user.dto/signup.dto";
import { CustomError } from "./exceptions";

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = await UserService.signUp(req.body as signupDto);
    res.status(200).json(result);
  } catch (error: any) {
    errorSender(error, res);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    return await UserService.signIn(req.body as signinDto);
  } catch (error) {
    console.error("SignIn Error in UserController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const errorSender = (error: any, res: Response) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
