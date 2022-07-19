import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { AccountModel } from "@/models/AccountModel";
import { AccountService } from "@/services/AccountService";
import { BodyParams, PathParams } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { Authenticate } from "@tsed/passport";
import {
  Delete,
  Description,
  Get,
  Groups,
  Post,
  Put,
  Required,
  Security,
  Status,
  Summary
} from "@tsed/schema";

const STATUS_404_DESCR =
  "In case of any incomplete input or input validation failure.";
const STATUS_400_ID_MISMATCH =
  "`Id` parameter and `model.id` property mismatch.";
const STATUS_404 = "Account model not found";
const get404ForNonExisting = (action: string) =>
  `Not able to ${action} a non-existing account.`;

@Controller("/accounts")
@Description("Accounts management")
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(401)
export class AccountsController {
  constructor(@Inject() private service: AccountService) {}

  @Get()
  @Summary("Return all accounts (TO BE PAGINATED!).")
  @Status(200, Array).Of(AccountModel)
  async get() {
    // TODO: https://tsed.io/docs/model.html#pagination
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary("Return a account by its ID.")
  @Status(200, AccountModel)
  @Status(404).Description(STATUS_404)
  async getId(@PathParams("id") @Required() id: string) {
    const objModel = await this.service.find(id);

    if (!objModel) {
      throw new NotFound("Object model not found");
    }

    return objModel;
  }

  @Post()
  @Summary("Store a new account.")
  @Status(201, AccountModel).Description("Stored model instance.")
  @Status(400).Description(STATUS_404_DESCR)
  async post(
    @Description("DTO to store new account")
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: AccountModel
  ) {
    return await this.service.create(dto);
  }

  @Put("/:id")
  @Summary("Update a account")
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNonExisting("update"))
  async put(
    @Description("DTO of updated account.")
    @PathParams("id")
    @Required()
    id: string,
    @BodyParams() @Description("Model update DTO") model: AccountModel
  ) {
    if (id !== model._id) {
      throw new BadRequest(STATUS_400_ID_MISMATCH);
    }

    if (!(await this.service.update(model))) {
      throw new NotFound(STATUS_404);
    }

    return;
  }

  @Delete("/:id")
  @Summary("Remove account by ID.")
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNonExisting("delete"))
  async delete(@PathParams("id") @Required() id: string) {
    if (!(await this.service.remove(id))) {
      throw new NotFound(STATUS_404);
    }

    return;
  }
}
