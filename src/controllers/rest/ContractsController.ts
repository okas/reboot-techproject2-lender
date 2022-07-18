import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { BodyParams, PathParams } from "@tsed/common";
import { Controller } from "@tsed/di";
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
import { ContractModel } from "../../models/ContractModel";

const STATUS_404_DESCR =
  "In case of any incomplete input or input validation failure.";
const STATUS_400_ID_MISMATCH =
  "`Id` parameter and `model.id` property mismatch.";
const STATUS_404 = "Contract model not found";
const get404ForNonExisting = (action: string) =>
  `Not able to ${action} a non-existing contract.`;

@Controller("/contracts")
@Description("Contracts management")
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(401)
export class ContractsController {
  // constructor(@Inject() private service: ContractsService) { }

  @Get("/")
  @Summary("Return all contracts (TO BE PAGINATED!)")
  @Status(200, Array).Of(ContractModel)
  get() {
    // TODO: https://tsed.io/docs/model.html#pagination
    return "all contracts";
  }

  @Get("/:id")
  @Summary("Return a contract by its ID.")
  @Status(200, ContractModel)
  @Status(404).Description(STATUS_404)
  async getId(@PathParams("id") @Required() id: string) {
    return `single contract by Id: ${id}`;
  }

  @Post()
  @Summary("Store a new contract.")
  @Status(201, ContractModel).Description("New model instance.")
  @Status(400).Description(STATUS_404_DESCR)
  async post(
    @Description("DTO to store new contract")
    @BodyParams()
    @Required()
    @Groups("creation")
    _: ContractModel
  ) {
    return " we have stored a new contract";
  }

  @Put("/:id")
  @Summary("Update a contract")
  @Status(204, String).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNonExisting("update"))
  async put(
    @Description("DTO to update new contract")
    @PathParams("id")
    @Required()
    id: string,
    @BodyParams() @Description("Model update DTO") model: ContractModel
  ) {
    if (id !== model._id) {
      throw new BadRequest(STATUS_400_ID_MISMATCH);
    }

    // const count = this.objectSvc.update(model);

    if (!1) {
      // TODO Fix it.
      throw new NotFound(STATUS_404);
    }

    return;
  }

  @Delete("/:id")
  @Summary("Remove contract by ID.")
  @AuthorizedRoles(RolesEnum.LENDER)
  @Status(204, String).Description("Deleted")
  @Status(404).Description(get404ForNonExisting("delete"))
  async delete(@PathParams("id") @Required() _: string) {
    // const count = this.objectSvc.remove(id);

    if (!1) {
      throw new NotFound(STATUS_404);
    }

    return;
  }
}
