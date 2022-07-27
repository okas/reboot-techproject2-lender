import { RolesEnum } from "@/common/RolesEnum";
import { ShapesEnum } from "@/common/ShapesEnum";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { FixAmountPenaltyModel } from "@/models/FixAmountPenaltyModel";
import { RateOfBasePenaltyModel } from "@/models/RateOfBasePenaltyModel";
import { FixAmountPenaltyService } from "@/services/FixAmountPenaltyService";
import { RateOfBaseService } from "@/services/RateOfBaseService";
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
import { BaseController } from "./BaseController";

const FIX_AMNT = "fix-amount";
const RATE_OBS = "rate-of-base";

const d = new OASDocs("penalty");

@Controller("/penalties")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class PenaltiesController extends BaseController {
  constructor(
    @Inject() private fixAmountService: FixAmountPenaltyService,
    @Inject() private rateOfBaseService: RateOfBaseService
  ) {
    super();
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/fix-amount")
  @Summary(d.getAllSummary(FIX_AMNT))
  @Status(200, Array).Of(FixAmountPenaltyModel)
  async getFixAmounts() {
    return await this.fixAmountService.getAll();
  }

  @Get("/fix-amount/:id")
  @Summary(d.getDocId(FIX_AMNT))
  @Status(200, FixAmountPenaltyModel)
  @Status(404).Description(d.getNoDoc(FIX_AMNT))
  async getFixAmountId(@PathParams() @Required() { id }: never) {
    const objModel = await this.fixAmountService.findById(id);

    BaseController.assertNotNullish(objModel, d.getNoDoc(FIX_AMNT));

    return objModel;
  }

  @Post("/fix-amount")
  @Summary(d.getPostSummary(FIX_AMNT))
  @Status(201, FixAmountPenaltyModel).Description(d.getPost201StatusDescr(FIX_AMNT))
  async postFixAmount(
    @Description(d.getParamPostDtoDescr(FIX_AMNT))
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: FixAmountPenaltyModel
  ) {
    return await this.fixAmountService.create(dto);
  }

  @Put("/fix-amount/:id")
  @Summary(d.getPutSummary(FIX_AMNT))
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update", FIX_AMNT))
  async putFixAmount(
    @Description(d.getParamPutIdDescr(FIX_AMNT)) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr(FIX_AMNT)) @BodyParams() dto: FixAmountPenaltyModel
  ) {
    BaseController.assertPutFixIfPossible(id, dto);

    BaseController.assertNotNullish(await this.fixAmountService.update(dto), d.getNoDoc(FIX_AMNT));

    return;
  }

  @Delete("/fix-amount/:id")
  @Summary(d.getDeleteSummary(FIX_AMNT))
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete", FIX_AMNT))
  async deleteFixAmount(@PathParams() @Required() { id }: never) {
    BaseController.assertNotNullish(await this.fixAmountService.remove(id), d.getNoDoc(FIX_AMNT));

    return;
  }
  //-----------
  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/rate-of-base")
  @Summary(d.getAllSummary(RATE_OBS))
  @Status(200, Array).Of(RateOfBasePenaltyModel)
  async getRateOfBase() {
    return await this.rateOfBaseService.getAll();
  }

  @Get("/rate-of-base/:id")
  @Summary(d.getDocId(RATE_OBS))
  @Status(200, RateOfBasePenaltyModel)
  @Status(404).Description(d.getNoDoc(RATE_OBS))
  async getId(@PathParams() @Required() { id }: never) {
    const objModel = await this.rateOfBaseService.findById(id);

    BaseController.assertNotNullish(objModel, d.getNoDoc(RATE_OBS));

    return objModel;
  }

  @Post("/rate-of-base")
  @Summary(d.getPostSummary(RATE_OBS))
  @Status(201, RateOfBasePenaltyModel).Description(d.getPost201StatusDescr(RATE_OBS))
  async postRateOfBase(
    @Description(d.getParamPostDtoDescr(RATE_OBS))
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: RateOfBasePenaltyModel
  ) {
    return await this.rateOfBaseService.create(dto);
  }

  @Put("/rate-of-base/:id")
  @Summary(d.getPutSummary(RATE_OBS))
  @Status(204).Description("Updated")
  @Status(400).Description(OASDocs.STATUS_400_ID_MISMATCH)
  @Status(404).Description(d.get404ForNonExisting("update", RATE_OBS))
  async putRateOfBase(
    @Description(d.getParamPutIdDescr(RATE_OBS)) @PathParams() @Required() { id }: never,
    @Description(d.getParamPutDtoDescr(RATE_OBS)) @BodyParams() dto: RateOfBasePenaltyModel
  ) {
    BaseController.assertPutFixIfPossible(id, dto);

    BaseController.assertNotNullish(await this.rateOfBaseService.update(dto), d.getNoDoc(RATE_OBS));

    return;
  }

  @Delete("/rate-of-base/:id")
  @Summary(d.getDeleteSummary(RATE_OBS))
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete", RATE_OBS))
  async deleteRateOfBase(@PathParams() @Required() { id }: never) {
    BaseController.assertNotNullish(await this.rateOfBaseService.remove(id), d.getNoDoc(RATE_OBS));

    return;
  }
}
