import { CredentialsDTO } from "@/dtos/CredentialsDTO";
import { AccessTokenModel } from "@/models/AccessTokenModel";
import { UserModel } from "@/models/UserModel";
import { BodyParams, Controller, Get, Locals, Post, Req } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import {
  Description,
  Groups,
  Required,
  Returns,
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

@Description(CTRL_DESCR)
@Controller("/auth")
export class AuthController {
  @Post("/signup")
  @Summary(SIGNUP_SUMMARY)
  @Status(201, AccessTokenModel).Description(AUTH_SUCCESS_DESCR)
  @Status(400).Description(STATUS_404_DESCR)
  @Authenticate("signup", { session: false }) // TODO: Is it redundant?
  signup(
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
  login(
    @Locals("accessToken") accessToken: AccessTokenModel,
    @BodyParams() @Required() @Groups("*") _: CredentialsDTO
  ) {
    // FACADE
    return accessToken;
  }

  @Get("/userinfo")
  @Returns(200, UserModel)
  @Authenticate("jwt")
  @Security("jwt")
  getUserInfo(@Req("user") user: UserModel) {
    // FACADE
    return user;
  }
}
