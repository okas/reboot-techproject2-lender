import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { Controller } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { Get, Security, Status } from "@tsed/schema";

@Controller("/stub")
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.DEFAULT)
@Status(401)
export class StubController {
  @Get("/")
  @Status(200, String).Description(
    "Dummy test endpoint, which lets in user, who have `default` role."
  )
  get() {
    return "Hello from GET /stub";
  }
}
