import { AccessTokenModel } from "@/models/AccessTokenModel";
import { UserModel } from "@/models/UserModel";
import { Secret, SignOptions } from "jsonwebtoken";
import { StrategyOptions } from "passport-jwt";

export class ProtocolBase {
  static setAccessToken(
    locals: Record<string, unknown>,
    user: UserModel,
    { secretOrKey, jsonWebTokenOptions }: StrategyOptions
  ) {
    const options = jsonWebTokenOptions as SignOptions;
    options.expiresIn = jsonWebTokenOptions?.maxAge;

    locals.accessToken = new AccessTokenModel(
      user,
      options,
      secretOrKey as Secret
    );
  }
}
