import { Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Middleware } from "@tsed/platform-middlewares";
import { Context } from "@tsed/platform-params";

@Middleware()
export class AuthorizedRolesMiddleware<TRole> {
  use(@Context() { endpoint }: Context, @Req() req: Req, @Req("user.roles") roles: TRole[]) {
    if (!(req.user && req.isAuthenticated())) {
      throw new Unauthorized("Roles authorization error: user not authenticated.");
    }
    const allowedRoles = endpoint.get<TRole[]>(AuthorizedRolesMiddleware<TRole>);

    if (!allowedRoles.some((aR) => roles?.includes(aR))) {
      throw new Unauthorized("Insufficient roles.");
    }
  }
}
