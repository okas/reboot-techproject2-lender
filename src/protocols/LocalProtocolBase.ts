import { LocalProtocolConfig } from "@/config/passport/protocolsOptions";
import { AccessTokenModel } from "@/models/AccessTokenModel";
import { UserModel } from "@/models/UserModel";
import { UsersService } from "@/services/UsersService";
import { Inject } from "@tsed/di";

export abstract class LocalProtocolBase {
  constructor(@Inject(UsersService) protected service: UsersService) {}

  static setAccessToken(
    locals: Record<string, unknown>,
    user: UserModel,
    { secretOrKey, signingOptions }: LocalProtocolConfig
  ) {
    locals.accessToken = new AccessTokenModel(user, signingOptions, secretOrKey);
  }
}
