import { ShapesEnum } from "@/common/modelShaping";
import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { BaseModel } from "@/models/BaseModel";
import { ContractModel } from "@/models/ContractModel";
import { ContractService } from "@/services/ContractService";
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

const d = new OASDocs("contract");

@Controller("/contracts")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(400).Description(OASDocs.STATUS_400_DESCR_VALIDATION)
@Status(401).Description(OASDocs.STATUS_401_DESCR)
export class ContractsController {
  constructor(@Inject() private service: ContractService) {}

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get()
  @Summary(d.getAllSummary())
  @Status(200, Array).Of(ContractModel)
  async get() {
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary(d.getDocId())
  @Status(200, ContractModel)
  @Status(404).Description(d.getNoDoc())
  async getId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.service.findById(id);

    this.assertNotNullish(objModel);

    return objModel;
  }

  @Post()
  @Summary(d.getPostSummary())
  @Status(201, ContractModel).Description(d.getPost201StatusDescr())
  async post(
    @Description(d.getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: ContractModel
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
    @Description(d.getParamPutDtoDescr()) @BodyParams() @Groups(ShapesEnum.UPD) dto: ContractModel
  ) {
    this.assertPutFixIfPossible(id, dto);

    this.assertNotNullish(await this.service.update(dto));

    return;
  }

  @Delete("/:id")
  @Summary(d.getDeleteSummary())
  @Status(204).Description("Deleted")
  @Status(404).Description(d.get404ForNonExisting("delete"))
  async delete(@PathParams() @Required() { id }: never) {
    this.assertNotNullish(await this.service.remove(id));

    return;
  }

  // TODO: https://tsed.io/docs/model.html#pagination
  @Get("/client/:personCode")
  @Summary(d.getAllSummary("client's"))
  @AuthorizedRoles(RolesEnum.LENDER, RolesEnum.BORROWER)
  @Status(200, Array).Of(ContractModel)
  async getClientAll(@PathParams() @Required() { personCode }: never) {
    return await this.service.getAllByClient(personCode);
  }

  @Get("/client/:personCode/:id")
  @Summary(d.getDocId("client's"))
  @AuthorizedRoles(RolesEnum.LENDER, RolesEnum.BORROWER)
  @Status(200, ContractModel)
  @Status(404).Description(d.getNoDoc())
  async getClientId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.service.findById(id);

    this.assertNotNullish(objModel);

    return objModel;
  }
  //-----------
  private assertPutFixIfPossible<TModel extends BaseModel>(id: string, dto: TModel) {
    if (!dto._id) {
      dto._id = id;
    } else if (id !== dto._id) {
      throw new BadRequest(OASDocs.STATUS_400_ID_MISMATCH);
    }
  }

  private assertNotNullish<TModel>(doc: TModel) {
    if (!doc) {
      throw new NotFound(d.getNoDoc());
    }
  }
}
