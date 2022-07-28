import { RolesEnum } from "@/common/RolesEnum";
import { ShapesEnum } from "@/common/ShapesEnum";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { CreditPortfolioTransactionModel } from "@/models/CreditPortfolioTransactionModel";
import { CreditPortfolioTransactionService } from "@/services/CreditPortfolioTransactionService";
import { OASDocs } from "@/utils/OASDocs";
import { Controller, Inject } from "@tsed/di";
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
import { BaseController } from "../common/BaseController";

const d = new OASDocs("portfolio credit transaction");

@Controller("/transactions/credit")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class PortfolioTransactionsCreditController extends BaseController {
  constructor(@Inject() private service: CreditPortfolioTransactionService) {
    super();
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get()
  @Summary(d.getAllSummary())
  @Status(200, Array).Of(CreditPortfolioTransactionModel)
  async get() {
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary(d.getDocId())
  @Status(200, CreditPortfolioTransactionModel)
  @Status(404).Description(d.getNoDoc())
  async getId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.service.findById(id);

    BaseController.assertNotNullish(objModel, d.getNoDoc());

    return objModel;
  }

  @Post()
  @Summary(d.getPostSummary())
  @Status(201, CreditPortfolioTransactionModel).Description(d.getPost201StatusDescr())
  async post(
    @Description(d.getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: CreditPortfolioTransactionModel
  ) {
    return await this.service.create(dto);
  }

  @Put("/:id")
  @Summary("Update an account")
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update"))
  async put(
    @Description(d.getParamPutIdDescr()) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr()) @BodyParams() dto: CreditPortfolioTransactionModel
  ) {
    BaseController.assertPutFixIfPossible(id, dto);

    BaseController.assertNotNullish(await this.service.update(dto), d.getNoDoc());

    return;
  }

  @Delete("/:id")
  @Summary(d.getDeleteSummary())
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete"))
  async delete(@PathParams() @Required() { id }: never) {
    BaseController.assertNotNullish(await this.service.remove(id), d.getNoDoc());

    return;
  }
}
