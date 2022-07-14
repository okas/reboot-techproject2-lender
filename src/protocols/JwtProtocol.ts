import { Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/services/UsersService";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "thisismysupersecretprivatekey1", //TODO: get from environment variables!
    issuer: "localhost",
    audience: "localhost"
  }
})
export class JwtProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: JwtPayload) {
    const user = this.usersService.findOne({
      id: jwtPayload.sub
    });

    if (!user) {
      throw new Unauthorized("Wrong token");
    }

    req.user = user;

    return user;
  }
}
