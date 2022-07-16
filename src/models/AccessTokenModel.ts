import { UserModel } from "@/models/UserModel";
import { Description, Required } from "@tsed/schema";
import jwt, { SignOptions } from "jsonwebtoken";

export class AccessTokenModel {
  constructor(user: UserModel, options: SignOptions, secretOrKey: string) {
    this.jwt = AccessTokenModel.createJwt(user, options, secretOrKey);
  }

  @Description("Signed JWT token, for use with `Bearer` schema")
  @Required()
  readonly jwt: string;

  static createJwt(
    { email }: UserModel,
    { issuer, audience }: SignOptions,
    secretOrKey: string
  ) {
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: email,
        exp: now + 3600 * 1000, //TODO: get settings from environment variables! => Config
        iat: now
      },
      secretOrKey
    );
  }
}
