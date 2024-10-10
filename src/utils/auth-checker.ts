import { AuthChecker } from "type-graphql";
import { Context } from "../types/context";

export const CustomAuthChecker: AuthChecker<Context> = ({
  context: { user },
}) => {
  if (!user) {
    return false;
  }

  return true;
};
