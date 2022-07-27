import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { BaseModel } from "@/models/BaseModel";
import { RateOfBasePenaltyModel } from "@/models/RateOfBasePenaltyModel";
import { FixAmountPenaltyService } from "@/services/FixAmountPenaltyService";
import { RateOfBaseService } from "@/services/RateOfBaseService";
import { toTitleCase } from "@/utils/stringHelpers";
import { Controller, Inject } from "@tsed/di";
import { BadRequest, NotFound } from "@tsed/exceptions";
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
import { FixAmountPenaltyModel } from "../../models/FixAmountPenaltyModel";

const STATUS_400_DESCR_VALIDATION = "In case of any incomplete input or input validation failure.";
const STATUS_400_ID_MISMATCH = "`Id` parameter and `dto.id` property mismatch.";

const get404ForNoExisting = (action: string) => `Not able to ${action} a non-existing penalty.`;
const getNoPenalty = (kind: string) => `\`${toTitleCase(kind)}\` penalty not found.`;

const getAllSummary = (kind: string) => `Return all \`${kind}\` penalties (TO BE PAGINATED!).`;
const getKindId = (kind: string) => `Retrieve a \`${kind}\` penalty by its ID.`;
const getPostSummary = (kind: string) => `Store a new \`${kind}\` penalty.`;
const getParamPostDtoDescr = (kind: string) => `DTO to store new \`${kind}\` penalty.`;
const getPost201StatusDescr = (kind: string) => `Stored \`${kind}\` penalty instance.`;
const getPutSummary = (kind: string) => `Update a \`${kind}\` penalty.`;
const getParamPutIdDescr = (kind: string) => `Id of updated \`${kind}\` penalty.`;
const getParamPutDtoDescr = (kind: string) => `DTO of \`${kind}\` penalty update.`;
const getDeleteSummary = (kind: string) => `Remove \`${kind}\` penalty by ID.`;

@Controller("/penalties")
@Description("Penalty management (lookup setup).")
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(STATUS_400_DESCR_VALIDATION)
@Status(401)
export class PenaltiesController {
  constructor(
    @Inject() private fixAmountService: FixAmountPenaltyService,
    @Inject() private rateOfBaseService: RateOfBaseService
  ) {}

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/fix-amount")
  @Summary(getAllSummary("fix-amount"))
  @Status(200, Array).Of(FixAmountPenaltyModel)
  async getFixAmounts() {
    return await this.fixAmountService.getAll();
  }

  @Get("/fix-amount/:id")
  @Summary(getKindId("fix-amount"))
  @Status(200, FixAmountPenaltyModel)
  @Status(404).Description(getNoPenalty("fix-amount"))
  async getFixAmountId(@PathParams() @Required() { id }: never) {
    const objModel = await this.fixAmountService.findById(id);

    this.assertNotNullish(objModel, "fix-amount");

    return objModel;
  }

  @Post("/fix-amount")
  @Summary(getPostSummary("fix-amount"))
  @Status(201, FixAmountPenaltyModel).Description(getPost201StatusDescr("fix-amount"))
  async postFixAmount(
    @Description(getParamPostDtoDescr("fix-amount"))
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: FixAmountPenaltyModel
  ) {
    return await this.fixAmountService.create(dto);
  }

  @Put("/fix-amount/:id")
  @Summary(getPutSummary("fix-amount"))
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNoExisting("update"))
  async putFixAmount(
    @Description(getParamPutIdDescr("fix-amount")) @PathParams() @Required() { id }: never,
    @BodyParams() @Description(getParamPutDtoDescr("fix-amount")) dto: FixAmountPenaltyModel
  ) {
    this.assertPutFixIfPossible(id, dto);

    this.assertNotNullish(await this.fixAmountService.update(dto), "debit");

    return;
  }

  @Delete("/fix-amount/:id")
  @Summary(getDeleteSummary("fix-amount"))
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNoExisting("delete"))
  async deleteFixAmount(@PathParams() @Required() { id }: never) {
    this.assertNotNullish(await this.fixAmountService.remove(id), "fix-amount");

    return;
  }
  //-----------
  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/rate-of-base")
  @Summary(getAllSummary("rate-of-base"))
  @Status(200, Array).Of(RateOfBasePenaltyModel)
  async getRateOfBase() {
    return await this.rateOfBaseService.getAll();
  }

  @Get("/rate-of-base/:id")
  @Summary(getKindId("rate-of-base"))
  @Status(200, RateOfBasePenaltyModel)
  @Status(404).Description(getNoPenalty("rate-of-base"))
  async getId(@PathParams() @Required() { id }: never) {
    const objModel = await this.rateOfBaseService.findById(id);

    this.assertNotNullish(objModel, "rate-of-base");

    return objModel;
  }

  @Post("/rate-of-base")
  @Summary(getPostSummary("rate-of-base"))
  @Status(201, RateOfBasePenaltyModel).Description(getPost201StatusDescr("rate-of-base"))
  async postRateOfBase(
    @Description(getParamPostDtoDescr("rate-of-base"))
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: RateOfBasePenaltyModel
  ) {
    return await this.rateOfBaseService.create(dto);
  }

  @Put("/rate-of-base/:id")
  @Summary(getPutSummary("rate-of-base"))
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNoExisting("update"))
  async putRateOfBase(
    @Description(getParamPutIdDescr("rate-of-base")) @PathParams() @Required() { id }: never,
    @BodyParams() @Description(getParamPutDtoDescr("rate-of-base")) dto: RateOfBasePenaltyModel
  ) {
    this.assertPutFixIfPossible(id, dto);

    this.assertNotNullish(await this.rateOfBaseService.update(dto), "debit");

    return;
  }

  @Delete("/rate-of-base/:id")
  @Summary(getDeleteSummary("rate-of-base"))
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNoExisting("delete"))
  async deleteRateOfBase(@PathParams() @Required() { id }: never) {
    this.assertNotNullish(await this.rateOfBaseService.remove(id), "rate-of-base");

    return;
  }
  //-----------
  private assertPutFixIfPossible<TModel extends BaseModel>(id: string, dto: TModel) {
    if (!dto._id) {
      dto._id = id;
    } else if (id !== dto._id) {
      throw new BadRequest(STATUS_400_ID_MISMATCH);
    }
  }

  private assertNotNullish<TModel>(doc: TModel, kind: string) {
    if (!doc) {
      throw new NotFound(getNoPenalty(kind));
    }
  }
}
