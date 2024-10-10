import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest, User } from "../types/context";

dotenv.config();

const JWT_SECRET: any = process.env.JWT_SECRET;

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next();
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    next();
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as User;
    req.user = user;
  } catch (err) {
    console.error("Invalid token:", err);
  }

  next();
};
