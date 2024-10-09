import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface Context {
  req: Request;
  user?: any;
}
