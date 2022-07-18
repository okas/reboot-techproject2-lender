import { UserModel } from "@/models/UserModel";
import { Description, Required } from "@tsed/schema";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export class AccessTokenModel {
  @Description("Signed JWT token, for use with `Bearer` schema")
  @Required()
  readonly jwt: string;

  constructor(user: UserModel, options: SignOptions, secretOrKey: Secret) {
    this.jwt = AccessTokenModel.createJwt(user, options, secretOrKey);
  }

  static createJwt(
    { email: subject, roles }: UserModel,
    { ...options }: SignOptions,
    secretOrKey: Secret
  ) {
    return jwt.sign({ roles }, secretOrKey, { subject, ...options });
  }
}
