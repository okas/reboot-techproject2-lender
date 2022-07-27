import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { BaseModel } from "@/models/BaseModel";
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
import { ContractViolationModel } from "../../models/ContractViolationModel";
import { ContractViolationService } from "../../services/ContractViolationService";

const M_NAME = "contract violation";

const STATUS_404_DESCR = "In case of any incomplete input or input validation failure.";
const STATUS_400_ID_MISMATCH = "`id` parameter and `dto.id` property mismatch.";
const STATUS_404 = `\`${toTitleCase(M_NAME)}\` document not found.`;

const getControllerDecr = () => `\`${toTitleCase(M_NAME)}s\` management.`;

const get404ForNonExisting = (action: string) =>
  `Not able to \`${action}\` non-existing \`${M_NAME}\`.`;
const getNoDoc = () => `\`${toTitleCase(M_NAME)}\` not found.`;
const getAllSummary = () => `Retrieve all \`${M_NAME}s\` (TO BE PAGINATED!).`;
const getGetParamId = () => `ID of \`${toTitleCase(M_NAME)}\` to retrieve.`;
const getDocId = () => `Retrieve \`${M_NAME}\` by its ID.`;
const getPostSummary = () => `Store new \`${M_NAME}\`.`;
const getParamPostDtoDescr = () => `DTO to store new \`${M_NAME}\`.`;
const getPost201StatusDescr = () => `Stored \`${M_NAME}\` instance.`;
const getPutSummary = () => `Update \`${M_NAME}\`.`;
const getParamPutIdDescr = () => `Id of \`${M_NAME}\` to update.`;
const getParamPutDtoDescr = () => `DTO of updated \`${M_NAME}\`.`;
const getDeleteSummary = () => `Remove \`${M_NAME}\` by ID.`;

@Controller("/contract-violations")
@Description(getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(401)
export class ContractViolationsController {
  constructor(@Inject() private service: ContractViolationService) {}

  @Get()
  @Summary(getAllSummary())
  @Status(200, Array).Of(ContractViolationModel)
  async get() {
    // TODO: https://tsed.io/docs/model.html#pagination
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary(getDocId())
  @Status(200, ContractViolationModel)
  @Status(404).Description(STATUS_404)
  async getId(@Description(getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.service.findById(id);

    this.assertNotNullish(objModel);

    return objModel;
  }

  @Post()
  @Summary(getPostSummary())
  @Status(201, ContractViolationModel).Description(getPost201StatusDescr())
  @Status(400).Description(STATUS_404_DESCR)
  async post(
    @Description(getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups("creation")
    dto: ContractViolationModel
  ) {
    return await this.service.create(dto);
  }

  @Put("/:id")
  @Summary(getPutSummary())
  @Status(204).Description("Updated")
  @Status(400).Description(STATUS_400_ID_MISMATCH)
  @Status(404).Description(get404ForNonExisting("update"))
  async put(
    @Description(getParamPutIdDescr()) @Required() { id }: never,
    @Description(getParamPutDtoDescr()) @BodyParams() dto: ContractViolationModel
  ) {
    this.assertPutFixIfPossible(id, dto);

    this.assertNotNullish(await this.service.update(dto));

    return;
  }

  @Delete("/:id")
  @Summary(getDeleteSummary())
  @Status(204).Description("Deleted")
  @Status(404).Description(get404ForNonExisting("delete"))
  async delete(@PathParams() @Required() { id }: never) {
    this.assertNotNullish(await this.service.remove(id));

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

  private assertNotNullish<TModel>(doc: TModel) {
    if (!doc) {
      throw new NotFound(getNoDoc());
    }
  }
}
