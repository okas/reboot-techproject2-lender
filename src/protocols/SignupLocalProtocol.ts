import { ShapesEnum } from "@/common/modelShaping";
import { RolesEnum } from "@/config/authorization";
import { LocalProtocolConfig } from "@/config/passport/protocolsOptions";
import { BodyParams, Constant, Locals } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserModel } from "../models/UserModel";
import { LocalProtocolBase } from "./LocalProtocolBase";

const PROTO_NAME = "signup";

@Protocol<IStrategyOptions>({
  name: PROTO_NAME,
  useStrategy: Strategy
})
export class SignupLocalProtocol extends LocalProtocolBase implements OnVerify {
  @Constant(`passport.protocols.${PROTO_NAME}`)
  protected config: LocalProtocolConfig;

  async $onVerify(
    @BodyParams() @Groups(ShapesEnum.CRE) user: UserModel,
    @Locals() locals: Record<string, unknown>
  ) {
    user.roles = [RolesEnum.DEFAULT];

    const newUser = await this.service.create(user);

    SignupLocalProtocol.setAccessToken(locals, newUser, this.config);

    return newUser;
  }
}
