import { BodyParams, Constant, Inject } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import jwt, { SignOptions } from "jsonwebtoken";
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
  @Inject()
  usersService: UsersService;

  @Constant("passport.protocols.signup.settings")
  jwtSettings: SignOptions;

  @Constant("passport.protocols.jwt.settings.secretOrKey")
  secretOrKey: string;

  async $onVerify(@BodyParams() @Groups("creation") user: UserModel) {
    const newUser = await this.usersService.create(user);

    newUser.jwt = this.createJwt(newUser);

    // TODO: Handle validation errors here or handled bt TsED already?

    return newUser;
  }

  createJwt(user: UserModel) {
    const { issuer, audience } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user.email,
        exp: now + 3600 * 1000, //TODO: get from environment variables! => Config
        iat: now
      },
      this.secretOrKey
    );
  }
}
