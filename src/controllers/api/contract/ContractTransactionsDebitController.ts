import { RolesEnum } from "@/common/RolesEnum";
import { ShapesEnum } from "@/common/ShapesEnum";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { DebitContractTransactionModel } from "@/models/DebitContractTransactionModel";
import { DebitTransactionService } from "@/services/DebitTransactionService";
import { OASDocs } from "@/utils/OASDocs";
import { BodyParams, PathParams } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
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
import { BaseContractTransactionController as BaseCtrl } from "../common/BaseContractTransactionController";

const d = new OASDocs("contract debit transaction");

@Controller("/transactions/debit")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class ContractTransactionsDebitController extends BaseCtrl {
  constructor(@Inject() private debitTransactService: DebitTransactionService) {
    super();
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get()
  @Summary(d.getAllSummary())
  @Status(200, Array).Of(DebitContractTransactionModel)
  async getDebits(@PathParams() @Required() { contractId }: never) {
    return await this.debitTransactService.getByContract(contractId);
  }

  @Get("/:id")
  @Summary(d.getDocId())
  @Status(200, DebitContractTransactionModel)
  @Status(404).Description(d.getNoDoc())
  async getDebitId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.debitTransactService.findById(id);

    BaseCtrl.assertNotNullish(objModel, d.getNoDoc());

    return objModel;
  }

  @Post()
  @Summary(d.getPostSummary())
  @Status(201, DebitContractTransactionModel).Description(d.getPost201StatusDescr())
  async postDebit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: DebitContractTransactionModel
  ) {
    this.assertContractIdEquals(contractId, dto);

    return await this.debitTransactService.createForContract(contractId, dto);
  }

  @Put("/:id")
  @Summary(d.getPutSummary())
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update"))
  async putDebit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPutIdDescr()) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr()) @BodyParams() dto: DebitContractTransactionModel
  ) {
    this.assertPutFixIfPossible(contractId, id, dto);

    BaseCtrl.assertNotNullish(
      await this.debitTransactService.updateForContract(contractId, dto),
      d.getNoDoc()
    );

    return;
  }

  @Delete("/:id")
  @Summary(d.getDeleteSummary())
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete"))
  async deleteDebit(@PathParams() @Required() { id }: never) {
    BaseCtrl.assertNotNullish(await this.debitTransactService.remove(id), d.getNoDoc());

    return;
  }
}
