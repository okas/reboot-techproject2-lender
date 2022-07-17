import { UserModel } from "@/models/UserModel";
import { Description, Required } from "@tsed/schema";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export class AccessTokenModel {
  constructor(user: UserModel, options: SignOptions, secretOrKey: Secret) {
    const signedToken = AccessTokenModel.createJwt(user, options, secretOrKey);

    this.jwt = `Bearer ${signedToken}`;
  }

  @Description("Signed JWT token, for use with `Bearer` schema")
  @Required()
  readonly jwt: string;

  static createJwt(
    { email, roles }: UserModel,
    { issuer, audience, expiresIn }: SignOptions,
    secretOrKey: Secret
  ) {
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: email,
        roles,
        exp: now + Number(expiresIn) * 1000,
        iat: now
      },
      secretOrKey
    );
  }
}
