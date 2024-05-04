import { Request, Response } from "express";
import { Express } from "express";
declare global {
  namespace Express {
    export interface Response {
      userInfo?: any;
      // userInfo?: {
      //   id?: any;
      //   [key: any]: any;
      // };
    }
  }
}

declare global {
  namespace Express {
    export interface Request {
      userInfo?: any;
      // userInfo?: {
      //   id?: any;
      //   [key: any]: any;
      // };
    }
  }
}

// declare global {
//   namespace Express {
//     export interface Request {
//       userInfo?: any;
//       data?: any;
//     }
//     export interface Response {
//       userInfo?: any;
//       data?: any;
//     }
//   }
// }
