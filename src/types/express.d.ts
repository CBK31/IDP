import { Request, Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
      data?: any;
    }
    export interface Response {
      user?: any;
      data?: any;
    }
  }
}
