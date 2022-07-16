import { AccessTokenModel } from "@/models/AccessTokenModel";
import { BodyParams, Constant, Inject, Locals } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import { SignOptions } from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserModel } from "../models/UserModel";
import { UsersService } from "../services/UsersService";

@Protocol<IStrategyOptions>({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    session: false,
    usernameField: "email",
    passwordField: "password"
  }
})
export class SignupLocalProtocol implements OnVerify {
  @Constant("passport.protocols.signup.settings")
  private jwtSettings: SignOptions;

  @Constant("passport.protocols.jwt.settings.secretOrKey")
  private secretOrKey: string;

  constructor(@Inject() private service: UsersService) {}

  async $onVerify(
    @BodyParams() @Groups("creation") user: UserModel,
    @Locals() locals: Record<string, unknown>
  ) {
    const newUser = await this.service.create(user);

    locals.accessToken = new AccessTokenModel(
      newUser,
      this.jwtSettings,
      this.secretOrKey
    );

    return newUser;
  }
}
