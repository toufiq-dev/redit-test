import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: any = process.env.JWT_SECRET;

export const generateToken = () => {
  const token = jwt.sign({ userId: "123", role: "user" }, JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log(token);
  return token;
};
