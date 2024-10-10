import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface User {
  userId: string;
  role: string;
}

export interface CustomRequest extends Request {
  user?: User;
}
export interface Context {
  req: CustomRequest;
  user?: User;
}
