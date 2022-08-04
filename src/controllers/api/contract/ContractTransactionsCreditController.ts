import { RolesEnum } from "@/common/RolesEnum";
import { ShapesEnum } from "@/common/ShapesEnum";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { CreditContractTransactionModel } from "@/models/CreditContractTransactionModel";
import { CreditTransactionService } from "@/services/CreditTransactionService";
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

const d = new OASDocs("contract credit transaction");

@Controller("/transactions/credit")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class ContractTransactionsCreditController extends BaseCtrl {
  constructor(@Inject() private creditTransactService: CreditTransactionService) {
    super();
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get()
  @Summary(d.getAllSummary())
  @Status(200, Array).Of(CreditContractTransactionModel)
  async getCredits(@PathParams() @Required() { contractId }: never) {
    return await this.creditTransactService.getByContract(contractId);
  }

  @Get("/:id")
  @Summary(d.getDocId())
  @Status(200, CreditContractTransactionModel)
  @Status(404).Description(d.getNoDoc())
  async getCreditId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.creditTransactService.findById(id);

    BaseCtrl.assertNotNullish(objModel, d.getNoDoc());

    return objModel;
  }

  @Post()
  @Summary(d.getPostSummary())
  @Status(201, CreditContractTransactionModel).Description(d.getPost201StatusDescr())
  async postCredit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: CreditContractTransactionModel
  ) {
    this.assertContractIdEquals(contractId, dto);

    return await this.creditTransactService.create(dto);
  }

  @Put("/:id")
  @Summary(d.getPutSummary())
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update"))
  async putCredit(
    @PathParams() @Required() { contractId }: never,
    @Description(d.getParamPutIdDescr()) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr()) @BodyParams() dto: CreditContractTransactionModel
  ) {
    this.assertPutFixIfPossible(contractId, id, dto);

    BaseCtrl.assertNotNullish(await this.creditTransactService.update(dto), d.getNoDoc());

    return;
  }

  @Delete("/:id")
  @Summary(d.getDeleteSummary())
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete"))
  async deleteCredit(@PathParams() @Required() { id }: never) {
    BaseCtrl.assertNotNullish(await this.creditTransactService.remove(id), d.getNoDoc());

    return;
  }
}
