import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { ContractTransactionService } from "@/services/ContractTransactionService";
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
const STATUS_400_ID_MISMATCH = "`Id` parameter and `dto.id` property mismatch.";
const STATUS_404 = "Transaction not found";
const STATUS_404_TRANSACT_ID_MISMATCH = "Contract id mismatch";
const get404ForNonExisting = (action: string) =>
  `Not able to ${action} a non-existing transaction.`;

@Controller("/contract/:contractId/transactions")
@Description("Contract transactions management")
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(401)
export class ContractTransactionsController {
  constructor(
    @Inject() private service: ContractTransactionService // @Inject() private service: ContractTransactionService
  ) {}

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get()
  @Summary("Return all (TO BE PAGINATED!).")
  @Status(200, Array).Of(BaseContractTransactionModel)
  async get(@PathParams("contractId") @Required() contractId: string) {
    return await this.service.getByContract(contractId);
  }

  @Get("/:id")
  @Summary("Retrieve a transaction by its ID.")
  @Status(200, BaseContractTransactionModel)
  @Status(404).Description(STATUS_404)
  async getId(
    @PathParams("contractId")
    @Required()
    _: string,
    @Description("Transaction ID to retrieve")
    @PathParams("id")
    @Required()
    id: string
  ) {
    const objModel = await this.service.findById(id);

    if (!objModel) {
      throw new NotFound(STATUS_404);
    }

    return objModel;
  }

  @Post()
  @Summary("Store a new transaction")
  @Status(201, BaseContractTransactionModel).Description(
    "Stored transaction instance."
  )
  @Status(400).Description(STATUS_404_DESCR)
  async post(
    @PathParams("contractId")
    @Required()
    contractId: string,
    @Description("DTO to store new transaction")
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: BaseContractTransactionModel
  ) {
    if (contractId !== dto.contract) {
      throw new BadRequest(STATUS_404_TRANSACT_ID_MISMATCH);
    }

    return await this.service.createForContract(contractId, dto);
  }

  @Put("/:id")
  @Summary("Update a transaction")
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNonExisting("update"))
  async put(
    @PathParams("contractId")
    @Required()
    contractId: string,
    @Description("DTO of updated account.")
    @PathParams("id")
    @Required()
    id: string,
    @BodyParams()
    @Description("Model update DTO")
    dto: BaseContractTransactionModel
  ) {
    if (contractId !== dto.contract) {
      throw new BadRequest(STATUS_404_TRANSACT_ID_MISMATCH);
    }

    if (!dto._id) {
      dto._id = id;
    } else if (id !== dto._id) {
      throw new BadRequest(STATUS_400_ID_MISMATCH);
    }

    if (!(await this.service.updateForContract(contractId, dto))) {
      throw new NotFound(STATUS_404);
    }

    return;
  }

  @Delete("/:id")
  @Summary("Remove transaction by ID.")
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNonExisting("delete"))
  async delete(
    @PathParams("contractId")
    @Required()
    _: string,
    @PathParams("id") @Required() id: string
  ) {
    if (!(await this.service.remove(id))) {
      throw new NotFound(STATUS_404);
    }

    return;
  }
}
