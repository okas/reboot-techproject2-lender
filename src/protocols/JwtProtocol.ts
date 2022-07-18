import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { JwtPayload } from "jsonwebtoken";
import { Strategy, StrategyOptions } from "passport-jwt";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy
})
export class JwtProtocol implements OnVerify {
  async $onVerify(@Arg(0) { sub: email, roles }: JwtPayload) {
    // By this time, JWT has been already validated.
    // It is a decision point whether to query db for every request
    // or to always do some extra checks.
    // const user = await this.usersService.findOne({ email });

    // if (!user) {
    //   throw new Unauthorized("Token subject do not exist.");
    // }

    return { email, roles };
  }
}
