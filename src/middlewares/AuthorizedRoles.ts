import { StoreSet, useDecorators } from "@tsed/core";
import { Use } from "@tsed/platform-middlewares";
import { AuthorizedRolesMiddleware } from "./AuthorizedRolesMiddleware";

export function AuthorizedRoles<TRole>(...roles: TRole[]) {
  return useDecorators(
    Use(AuthorizedRolesMiddleware<TRole>),
    StoreSet(AuthorizedRolesMiddleware<TRole>, roles)
  );
}
