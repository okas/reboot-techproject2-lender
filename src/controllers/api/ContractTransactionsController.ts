import { ShapesEnum } from "@/common/modelShaping";
import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { CreditTransactionModel } from "@/models/CreditTransactionModel";
import { DebitTransactionModel } from "@/models/DebitTransactionModel";
import { CreditTransactionService } from "@/services/CreditTransactionService";
import { DebitTransactionService } from "@/services/DebitTransactionService";
import { OASDocs } from "@/utils/OASDocs";
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

const DEBIT = "debit";
const CREDIT = "credit";

const STATUS_404_TRANSACT_ID_MISMATCH = "Contract id mismatch.";

const d = new OASDocs("contract transaction");

@Controller("/contract/:contractId/transactions")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class ContractTransactionsController {
  constructor(
    @Inject() private debitTransactService: DebitTransactionService,
    @Inject() private creditTransactService: CreditTransactionService
  ) {}

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/debit")
  @Summary(d.getAllSummary(DEBIT))
  @Status(200, Array).Of(DebitTransactionModel)
  async getDebits(@PathParams() @Required() { contractId }: never) {
    return await this.debitTransactService.getByContract(contractId);
  }

  @Get("/debit/:id")
  @Summary(d.getDocId(DEBIT))
  @Status(200, DebitTransactionModel)
  @Status(404).Description(d.getNoDoc(DEBIT))
  async getDebitId(@Description(d.getGetParamId(DEBIT)) @PathParams() @Required() { id }: never) {
    const objModel = await this.debitTransactService.findById(id);

    this.assertNotNullish(objModel, DEBIT);

    return objModel;
  }

  @Post("/debit")
  @Summary(d.getPostSummary(DEBIT))
  @Status(201, DebitTransactionModel).Description(d.getPost201StatusDescr(DEBIT))
  async postDebit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPostDtoDescr(DEBIT))
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: DebitTransactionModel
  ) {
    this.assertContractIdEquals(contractId, dto.contract.toString());

    return await this.debitTransactService.createForContract(contractId, dto);
  }

  @Put("/debit/:id")
  @Summary(d.getPutSummary(DEBIT))
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update", DEBIT))
  async putDebit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPutIdDescr(DEBIT)) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr(DEBIT)) @BodyParams() dto: DebitTransactionModel
  ) {
    this.assertPutFixIfPossible(contractId, id, dto);

    this.assertNotNullish(
      await this.debitTransactService.updateForContract(contractId, dto),
      DEBIT
    );

    return;
  }

  @Delete("/debit/:id")
  @Summary(d.getDeleteSummary(DEBIT))
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete", DEBIT))
  async deleteDebit(@PathParams() @Required() { id }: never) {
    this.assertNotNullish(await this.debitTransactService.remove(id), DEBIT);

    return;
  }
  //-----------
  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/credit")
  @Summary(d.getAllSummary(CREDIT))
  @Status(200, Array).Of(CreditTransactionModel)
  async getCredits(@PathParams() @Required() { contractId }: never) {
    return await this.creditTransactService.getByContract(contractId);
  }

  @Get("/credit/:id")
  @Summary(d.getDocId(CREDIT))
  @Status(200, CreditTransactionModel)
  @Status(404).Description(d.getNoDoc(CREDIT))
  async getCreditId(@Description(d.getGetParamId(CREDIT)) @PathParams() @Required() { id }: never) {
    const objModel = await this.creditTransactService.findById(id);

    this.assertNotNullish(objModel, CREDIT);

    return objModel;
  }

  @Post("/credit")
  @Summary(d.getPostSummary(CREDIT))
  @Status(201, CreditTransactionModel).Description(d.getPost201StatusDescr(CREDIT))
  async postCredit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPostDtoDescr(CREDIT))
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: CreditTransactionModel
  ) {
    this.assertContractIdEquals(contractId, dto.contract.toString());

    return await this.creditTransactService.createForContract(contractId, dto);
  }

  @Put("/credit/:id")
  @Summary(d.getPutSummary(CREDIT))
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update", CREDIT))
  async putCredit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPutIdDescr(CREDIT)) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr(CREDIT)) @BodyParams() dto: CreditTransactionModel
  ) {
    this.assertPutFixIfPossible(contractId, id, dto);

    this.assertNotNullish(
      await this.creditTransactService.updateForContract(contractId, dto),
      CREDIT
    );

    return;
  }

  @Delete("/credit/:id")
  @Summary(d.getDeleteSummary(CREDIT))
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete", CREDIT))
  async deleteCredit(@PathParams() @Required() { id }: never) {
    this.assertNotNullish(await this.creditTransactService.remove(id), CREDIT);

    return;
  }
  //-----------
  private assertContractIdEquals(contractId: string, dtoContract: string) {
    if (contractId !== dtoContract) {
      throw new BadRequest(STATUS_404_TRANSACT_ID_MISMATCH);
    }
  }

  private assertPutFixIfPossible(
    contractId: string,
    id: string,
    dto: BaseContractTransactionModel
  ) {
    if (contractId !== dto.contract) {
      throw new BadRequest(STATUS_404_TRANSACT_ID_MISMATCH);
    }

    if (!dto._id) {
      dto._id = id;
    } else if (id !== dto._id) {
      throw new BadRequest(OASDocs.STATUS_400_ID_MISMATCH);
    }
  }

  private assertNotNullish<T>(doc: T, kind: string) {
    if (!doc) {
      throw new NotFound(d.getNoDoc(kind));
    }
  }
}
