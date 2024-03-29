import { RolesEnum } from "@/common/RolesEnum";
import { ShapesEnum } from "@/common/ShapesEnum";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { DebitPortfolioTransactionModel } from "@/models/DebitPortfolioTransactionModel";
import { DebitPortfolioTransactionService } from "@/services/DebitPortfolioTransactionService";
import { OASDocs } from "@/utils/OASDocs";
import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
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
import { ok } from "node:assert/strict";
import { BaseController } from "../common/BaseController";

export const d = new OASDocs("portfolio debit transaction");

@Controller("/transactions/debit")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class PortfolioTransactionsDebitController extends BaseController {
  constructor(@Inject() private service: DebitPortfolioTransactionService) {
    super();
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get()
  @Summary(d.getAllSummary())
  @Status(200, Array).Of(DebitPortfolioTransactionModel)
  async get() {
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary(d.getDocId())
  @Status(200, DebitPortfolioTransactionModel)
  @Status(404).Description(d.getNoDoc())
  async getId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.service.findById(id);

    ok(objModel, new NotFound(d.getNoDoc()));

    return objModel;
  }

  @Post()
  @Summary(d.getPostSummary())
  @Status(201, DebitPortfolioTransactionModel).Description(d.getPost201StatusDescr())
  async post(
    @Description(d.getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: DebitPortfolioTransactionModel
  ) {
    return await this.service.create(dto);
  }

  @Put("/:id")
  @Summary(d.getPutSummary())
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update"))
  async put(
    @Description(d.getParamPutIdDescr()) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr()) @BodyParams() dto: DebitPortfolioTransactionModel
  ) {
    BaseController.assertPutFixIfPossible(id, dto);

    ok(await this.service.update(dto), new NotFound(d.getNoDoc()));

    return;
  }

  @Delete("/:id")
  @Summary(d.getDeleteSummary())
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete"))
  async delete(@PathParams() @Required() { id }: never) {
    ok(await this.service.remove(id), new NotFound(d.getNoDoc()));

    return;
  }
}
