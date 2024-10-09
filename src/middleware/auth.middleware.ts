import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const user = jwt.verify(token, JWT_SECRET);
      (req as any).user = user;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  next();
};
