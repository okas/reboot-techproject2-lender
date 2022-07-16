import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { UsersService } from "@/services/UsersService";
import { BodyParams, Constant, Inject, Locals } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import { StrategyOptions } from "passport-jwt";
import { IStrategyOptions, Strategy } from "passport-local";
import { ProtocolBase } from "./ProtocolBase";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    session: false,
    usernameField: "email"
  }
})
export class LoginLocalProtocol extends ProtocolBase implements OnVerify {
  @Constant("passport.protocols.jwt.settings")
  private jwtSettings: StrategyOptions;

  constructor(@Inject(UsersService) private service: UsersService) {
    super();
  }

  async $onVerify(
    @BodyParams() @Groups("*") { email, password }: CredentialsDTO,
    @Locals() locals: Record<string, unknown>
  ) {
    const user = await this.service.findForAuth(email);

    if (!user) {
      throw new Unauthorized("Wrong credentials");
    }

    if (!(await user.verifyPassword(password))) {
      throw new Unauthorized("Wrong credentials");
    }

    LoginLocalProtocol.setAccessToken(locals, user, this.jwtSettings);

    return user;
  }
}
