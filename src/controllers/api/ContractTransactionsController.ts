import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { CreditTransactionModel } from "@/models/CreditTransactionModel";
import { DebitTransactionModel } from "@/models/DebitTransactionModel";
import { CreditTransactionService } from "@/services/CreditTransactionService";
import { DebitTransactionService } from "@/services/DebitTransactionService";
import { toTitleCase } from "@/utils/stringHelpers";
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

const STATUS_400_DESCR_VALIDATION = "In case of any incomplete input or input validation failure.";
const STATUS_400_ID_MISMATCH = "`Id` parameter and `dto.id` property mismatch.";
const STATUS_404_TRANSACT_ID_MISMATCH = "Contract id mismatch.";

const get404ForNoExisting = (action: string) => `Not able to ${action} a non-existing transaction.`;
const getNoTransact = (kind: string) => `${toTitleCase(kind)} transaction not found.`;
const getAllSummary = (kind: string) => `Return all ${kind} transactions (TO BE PAGINATED!).`;
const getGetParamId = (kind: string) => `${toTitleCase(kind)} transaction ID to retrieve.`;
const getKindId = (kind: string) => `Retrieve a ${kind} transaction by its ID.`;
const getPostSummary = (kind: string) => `Store a new ${kind} transaction.`;
const getParamPostDtoDescr = (kind: string) => `DTO to store new ${kind} transaction.`;
const getPost201StatusDescr = (kind: string) => `Stored ${kind} transaction instance.`;
const getPutSummary = (kind: string) => `Update a ${kind} transaction.`;
const getParamPutIdDescr = (kind: string) => `Id of updated ${kind} transaction.`;
const getParamPutDtoDescr = (kind: string) => `DTO of ${kind} transaction update.`;
const getDeleteSummary = (kind: string) => `Remove ${kind} transaction by ID.`;

@Controller("/contract/:contractId/transactions")
@Description("Contract transactions management")
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(STATUS_400_DESCR_VALIDATION)
@Status(401)
export class ContractTransactionsController {
  constructor(
    @Inject() private debitTransactService: DebitTransactionService,
    @Inject() private creditTransactService: CreditTransactionService
  ) {}

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/debit")
  @Summary(getAllSummary("debit"))
  @Status(200, Array).Of(DebitTransactionModel)
  async getDebits(@PathParams("contractId") @Required() contractId: string) {
    return await this.debitTransactService.getByContract(contractId);
  }

  @Get("/debit/:id")
  @Summary(getKindId("debit"))
  @Status(200, DebitTransactionModel)
  @Status(404).Description(getNoTransact("debit"))
  async getDebitId(
    @PathParams("contractId") @Required() _: string,
    @Description(getGetParamId("debit")) @PathParams("id") @Required() id: string
  ) {
    const objModel = await this.debitTransactService.findById(id);

    this.assertNotNullish(objModel, "debit");

    return objModel;
  }

  @Post("/debit")
  @Summary(getPostSummary("debit"))
  @Status(201, DebitTransactionModel).Description(getPost201StatusDescr("debit"))
  async postDebit(
    @PathParams("contractId") @Required() contractId: string,
    @Description(getParamPostDtoDescr("debit"))
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: DebitTransactionModel
  ) {
    this.assertContractIdEquals(contractId, dto.contract.toString());

    return await this.debitTransactService.createForContract(contractId, dto);
  }

  @Put("/debit/:id")
  @Summary(getPutSummary("debit"))
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNoExisting("update"))
  async putDebit(
    @PathParams("contractId") @Required() contractId: string,
    @Description(getParamPutIdDescr("debit")) @PathParams("id") @Required() id: string,
    @BodyParams() @Description(getParamPutDtoDescr("debit")) dto: DebitTransactionModel
  ) {
    this.assertPutFixIfPossible(contractId, id, dto);

    this.assertNotNullish(
      await this.debitTransactService.updateForContract(contractId, dto),
      "debit"
    );

    return;
  }

  @Delete("/debit/:id")
  @Summary(getDeleteSummary("debit"))
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNoExisting("delete"))
  async deleteDebit(
    @PathParams("contractId") @Required() _: string,
    @PathParams("id") @Required() id: string
  ) {
    this.assertNotNullish(await this.debitTransactService.remove(id), "debit");

    return;
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/credit")
  @Summary(getAllSummary("credit"))
  @Status(200, Array).Of(CreditTransactionModel)
  async getCredits(@PathParams("contractId") @Required() contractId: string) {
    return await this.creditTransactService.getByContract(contractId);
  }

  @Get("/credit/:id")
  @Summary(getKindId("credit"))
  @Status(200, CreditTransactionModel)
  @Status(404).Description(getNoTransact("credit"))
  async getCreditId(
    @PathParams("contractId") @Required() _: string,
    @Description(getGetParamId("credit")) @PathParams("id") @Required() id: string
  ) {
    const objModel = await this.creditTransactService.findById(id);

    this.assertNotNullish(objModel, "credit");

    return objModel;
  }

  @Post("/credit")
  @Summary(getPostSummary("credit"))
  @Status(201, CreditTransactionModel).Description(getPost201StatusDescr("credit"))
  async postCredit(
    @PathParams("contractId") @Required() contractId: string,
    @Description(getParamPostDtoDescr("credit"))
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: CreditTransactionModel
  ) {
    this.assertContractIdEquals(contractId, dto.contract.toString());

    return await this.creditTransactService.createForContract(contractId, dto);
  }

  @Put("/credit/:id")
  @Summary(getPutSummary("credit"))
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNoExisting("update"))
  async putCredit(
    @PathParams("contractId") @Required() contractId: string,
    @Description(getParamPutIdDescr("credit")) @PathParams("id") @Required() id: string,
    @BodyParams() @Description(getParamPutDtoDescr("credit")) dto: CreditTransactionModel
  ) {
    this.assertPutFixIfPossible(contractId, id, dto);

    this.assertNotNullish(
      await this.creditTransactService.updateForContract(contractId, dto),
      "credit"
    );

    return;
  }

  @Delete("/credit/:id")
  @Summary(getDeleteSummary("credit"))
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNoExisting("delete"))
  async deleteCredit(
    @PathParams("contractId") @Required() _: string,
    @PathParams("id") @Required() id: string
  ) {
    this.assertNotNullish(await this.creditTransactService.remove(id), "credit");

    return;
  }

  private assertContractIdEquals(contractId: string, dtoContract: string) {
    if (contractId !== dtoContract) {
      throw new BadRequest(STATUS_404_TRANSACT_ID_MISMATCH);
    }
  }

  private assertPutFixIfPossible(contractId: string, id: string, dto: CreditTransactionModel) {
    if (contractId !== dto.contract) {
      throw new BadRequest(STATUS_404_TRANSACT_ID_MISMATCH);
    }

    if (!dto._id) {
      dto._id = id;
    } else if (id !== dto._id) {
      throw new BadRequest(STATUS_400_ID_MISMATCH);
    }
  }

  private assertNotNullish<T>(doc: T, kind: string) {
    if (!doc) {
      throw new NotFound(getNoTransact(kind));
    }
  }
}
