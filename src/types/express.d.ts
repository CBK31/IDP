import { Request as ExpressRequest } from "express";

import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}

declare global {
  namespace Express {
    interface User {
      id: string;
    }

    interface Request {
      user?: User;
    }
  }
}
