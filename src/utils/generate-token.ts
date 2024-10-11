import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: any = process.env.JWT_SECRET;

export const generateToken = () => {
  // FIXED_TEST_TOKEN from only for facilitating test purpose
  return (
    process.env.FIXED_TEST_TOKEN ||
    jwt.sign({ userId: "123", role: "user" }, JWT_SECRET, {
      expiresIn: "1d",
    })
  );
};
