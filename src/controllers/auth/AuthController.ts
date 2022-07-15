import { UserModel } from "@/models/UserModel";
import { BodyParams, Controller, Get, Post, Req } from "@tsed/common";
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

@Description(
  "`Passport.js` based authentication; use `login` or `signup` actions to obtain JWT token for `Authorization` testing"
)
@Controller("/auth")
export class AuthController {
  @Post("/signup")
  @Summary("Create new user")
  @Status(201, UserModel).Groups("auth")
  @Status(400).Description(
    "In case of any incomplete input or input validation failure"
  )
  @Authenticate("signup", { session: false }) // TODO: Is it redundant?
  signup(
    @Req() { user }: Req,
    @BodyParams() @Required() @Groups("creation") _: UserModel
  ) {
    // FACADE
    return user;
  }

  @Post("/login")
  @Authenticate("local")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(
    @Req("user") user: UserModel,
    @Required() @BodyParams("email") email: string,
    @Required() @BodyParams("password") password: string
  ) {
    return user;
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
