import { UsersService } from "@/services/UsersService";
import { Inject } from "@tsed/common";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "thisismysupersecretprivatekey2", //TODO: get from environment variables! => Config
    jsonWebTokenOptions: {
      issuer: "localhost", //TODO: get from environment variables! => Config
      audience: "localhost", //TODO: get from environment variables! => Config
      maxAge: 3600 //TODO: get from environment variables! => Config
    }
  }
})
export class JwtProtocol implements OnVerify {
  constructor(@Inject() private usersService: UsersService) {}

  async $onVerify(@Arg(0) { sub: email }: JwtPayload) {
    // By this time, JWT has been already validated.
    // It is a decision point whether to query db for every request
    // or to always do some extra checks.
    // const user = await this.usersService.findOne({ email });

    // if (!user) {
    //   throw new Unauthorized("Token subject do not exist.");
    // }

    return { email };
  }
}
