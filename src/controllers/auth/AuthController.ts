import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { AccessTokenModel } from "@/models/AccessTokenModel";
import { UserModel } from "@/models/UserModel";
import { UsersService } from "@/services/UsersService";
import {
  BodyParams,
  Controller,
  Get,
  Inject,
  Locals,
  Post,
  Req
} from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import {
  Deprecated,
  Description,
  Groups,
  Header,
  Required,
  Security,
  Status,
  Summary
} from "@tsed/schema";

const STATUS_404_DESCR =
  "In case of any incomplete input or input validation failure";
const CTRL_DESCR = `\`Passport.js\` based authentication; use \`login\` or \`signup\` actions to
  obtain JWT token for \`Authorization\` testing`;
const SIGNUP_SUMMARY = "Create new user and obtain `JWT` token";
const LOGIN_SUMMARY = "Log in user to obtain `JWT` info";
const AUTH_SUCCESS_DESCR = "Success, pick up the JWT token";

const SELF_SUMMARY = "Get logged in users own information";
const BECOME_DEPRECATED_DESCR =
  "It is demonstration of deprecation of an endpoint in upcoming release or API version.";
@Controller("/auth")
@Description(CTRL_DESCR)
@Status(401)
export class AuthController {
  constructor(@Inject() private usersService: UsersService) {}

  @Post("/signup")
  @Summary(SIGNUP_SUMMARY)
  @Status(201, AccessTokenModel).Description(AUTH_SUCCESS_DESCR)
  @Status(400).Description(STATUS_404_DESCR)
  @Authenticate("signup", { session: false })
  async signup(
    @Locals("accessToken") accessToken: AccessTokenModel,
    @BodyParams() @Required() @Groups("creation") _: UserModel
  ) {
    // FACADE
    return accessToken;
  }

  @Post("/login")
  @Summary(LOGIN_SUMMARY)
  @Status(200, AccessTokenModel).Description(AUTH_SUCCESS_DESCR)
  @Status(400).Description(STATUS_404_DESCR)
  @Authenticate("login", { session: false })
  async login(
    @Locals("accessToken") accessToken: AccessTokenModel,
    @BodyParams() @Required() @Groups("*") _: CredentialsDTO
  ) {
    // FACADE
    return accessToken;
  }

  @Get("/userinfo")
  @Deprecated(true)
  @Summary(SELF_SUMMARY)
  @Description(BECOME_DEPRECATED_DESCR)
  @Header({
    Deprecation: {
      value: `"version="0.0.1"`,
      description: "Will become deprecated"
    },
    Link: {
      value: `</api/self>; rel="alternate"`,
      description: "Alternative endpoint to same resource",
      type: "application/json"
    }
  })
  @Security("jwt")
  @Authenticate("jwt", { session: false })
  @Status(200, UserModel)
  async getUserInfo(@Req("user.email") email: string) {
    // FACADE
    return await this.usersService.findOne({ email });
  }

  @Get("/self")
  @Summary(SELF_SUMMARY)
  @Security("jwt")
  @Authenticate("jwt", { session: false })
  @Status(200, UserModel)
  async getSelf(@Req("user.email") email: string) {
    // FACADE
    return await this.usersService.findOne({ email });
  }
}
