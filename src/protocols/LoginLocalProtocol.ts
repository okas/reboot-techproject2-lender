import { LocalProtocolConfig } from "@/config/passport/protocolsOptions";
import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { BodyParams, Constant, Locals } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import { IStrategyOptions, Strategy } from "passport-local";
import { LocalProtocolBase } from "./LocalProtocolBase";

const name = "login";

@Protocol<IStrategyOptions>({
  name,
  useStrategy: Strategy
})
export class LoginLocalProtocol extends LocalProtocolBase implements OnVerify {
  @Constant(`passport.protocols.${name}`)
  protected config: LocalProtocolConfig;

  async $onVerify(
    @BodyParams() @Groups("*") { email, password }: CredentialsDTO,
    @Locals() locals: Record<string, unknown>
  ) {
    const user = await this.service.findForAuth(email);

    if (!user) {
      throw new Unauthorized("Wrong credentials");
    }

    if (!(await user.verifyPassword(password))) {
      throw new Unauthorized("Wrong credentials");
    }

    LoginLocalProtocol.setAccessToken(locals, user, this.config);

    return user;
  }
}
