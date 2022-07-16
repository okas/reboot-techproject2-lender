import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { AccessTokenModel } from "@/models/AccessTokenModel";
import { UsersService } from "@/services/UsersService";
import { BodyParams, Constant, Inject, Locals } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import { SignOptions } from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    session: false,
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify {
  @Constant("passport.protocols.login.settings")
  private jwtSettings: SignOptions;

  @Constant("passport.protocols.jwt.settings.secretOrKey")
  private secretOrKey: string;

  constructor(@Inject(UsersService) private service: UsersService) {}

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

    locals.accessToken = new AccessTokenModel(
      user,
      this.jwtSettings,
      this.secretOrKey
    );

    return user;
  }
}
