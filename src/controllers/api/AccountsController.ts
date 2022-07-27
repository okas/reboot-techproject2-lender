import { ShapesEnum } from "@/common/modelShaping";
import { RolesEnum } from "@/config/authorization";
import { AuthorizedRoles } from "@/middlewares/AuthorizedRoles";
import { AccountModel } from "@/models/AccountModel";
import { BaseModel } from "@/models/BaseModel";
import { AccountService } from "@/services/AccountService";
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

const d = new OASDocs("account");

@Controller("/accounts")
@Description(d.getControllerDecr())
@Security("jwt")
@Authenticate("jwt", { session: false })
@AuthorizedRoles(RolesEnum.LENDER)
@Status(401)
export class AccountsController {
  constructor(@Inject() private service: AccountService) {}

  @Get()
  @Summary(d.getAllSummary())
  @Status(200, Array).Of(AccountModel)
  async get() {
    // TODO: https://tsed.io/docs/model.html#pagination
    return await this.service.getAll();
  }

  @Get("/:id")
  @Summary(d.getDocId())
  @Status(200, AccountModel)
  @Status(404).Description(d.getNoDoc())
  async getId(@Description(d.getGetParamId()) @PathParams() @Required() { id }: never) {
    const objModel = await this.service.findById(id);

    this.assertNotNullish(objModel);

    return objModel;
  }

  @Post()
  @Summary(d.getPostSummary())
  @Status(201, AccountModel).Description(d.getPost201StatusDescr())
  @Status(400).Description(OASDocs.STATUS_404_DESCR)
  async post(
    @Description(d.getParamPostDtoDescr())
    @BodyParams()
    @Required()
    @Groups(ShapesEnum.CRE)
    dto: AccountModel
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
    @Description(d.getParamPutDtoDescr())
    @BodyParams()
    @Description("DTO of updated account.")
    dto: AccountModel
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
