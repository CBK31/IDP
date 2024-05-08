import { ErrorHandler } from "../utils/errorHandler";
import { Request, Response } from "express";
import * as UserService from "./user.service";
import { signinDto } from "./user.dto/signin.dto";
import { signupDto } from "./user.dto/signup.dto";

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = await UserService.signUp(req.body as signupDto);
    res.status(201).json(result);
  } catch (error: any) {
    ErrorHandler.handle(error, res);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const result = await UserService.signIn(req.body as signinDto);
    res.status(200).send(result);
  } catch (error: any) {
    ErrorHandler.handle(error, res);
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.viewProfile(req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    ErrorHandler.handle(error, res);
  }
};
