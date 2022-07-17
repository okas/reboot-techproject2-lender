import { RolesEnum } from "@/config/authorization";
import { BodyParams, Constant, Inject, Locals } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import { StrategyOptions } from "passport-jwt";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserModel } from "../models/UserModel";
import { UsersService } from "../services/UsersService";
import { ProtocolBase } from "./ProtocolBase";

@Protocol<IStrategyOptions>({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    session: false,
    usernameField: "email"
  }
})
export class SignupLocalProtocol extends ProtocolBase implements OnVerify {
  @Constant("passport.protocols.jwt.settings")
  private jwtSettings: StrategyOptions;

  constructor(@Inject() private service: UsersService) {
    super();
  }

  async $onVerify(
    @BodyParams() @Groups("creation") user: UserModel,
    @Locals() locals: Record<string, unknown>
  ) {
    user.roles = [RolesEnum.DEFAULT];
    const newUser = await this.service.create(user);

    SignupLocalProtocol.setAccessToken(locals, newUser, this.jwtSettings);

    return newUser;
  }
}
