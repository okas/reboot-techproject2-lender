import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { ContractService } from "@/services/ContractService";
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
  constructor(@Inject() private service: ContractService) {}

  @Get()
  @Summary("Return all contracts (TO BE PAGINATED!).")
  @Status(200, Array).Of(ContractModel)
  async get() {
    // TODO: https://tsed.io/docs/model.html#pagination
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary("Return a contract by its ID.")
  @Status(200, ContractModel)
  @Status(404).Description(STATUS_404)
  async getId(@PathParams("id") @Required() id: string) {
    const objModel = await this.service.find(id);

    if (!objModel) {
      throw new NotFound("Object model not found");
    }

    return objModel;
  }

  @Post()
  @Summary("Store a new contract.")
  @Status(201, ContractModel).Description("Stored model instance.")
  @Status(400).Description(STATUS_404_DESCR)
  async post(
    @Description("DTO to store new contract")
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: ContractModel
  ) {
    return await this.service.create(dto);
  }

  @Put("/:id")
  @Summary("Update a contract")
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNonExisting("update"))
  async put(
    @Description("DTO of updated contract.")
    @PathParams("id")
    @Required()
    id: string,
    @BodyParams()
    @Description("Model update DTO")
    @Groups("update")
    model: ContractModel
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
  @Summary("Remove contract by ID.")
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNonExisting("delete"))
  async delete(@PathParams("id") @Required() id: string) {
    if (!(await this.service.remove(id))) {
      throw new NotFound(STATUS_404);
    }

    return;
  }
}
