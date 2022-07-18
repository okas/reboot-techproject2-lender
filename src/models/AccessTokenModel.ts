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
    { email: subject, roles }: UserModel,
    options: SignOptions,
    secretOrKey: Secret
  ) {
    return jwt.sign({ roles }, secretOrKey, { subject, ...options });
  }
}
