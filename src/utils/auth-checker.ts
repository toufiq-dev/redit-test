import { AuthChecker } from "type-graphql";
import { Context } from "../types/context";

export const CustomAuthChecker: AuthChecker<Context> = (
  { context: { user } },
  roles
) => {
  if (!user) {
    return false;
  }

  return true;
};
