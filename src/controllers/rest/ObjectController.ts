import { NewObjectDTO } from "@/dtos/NewObjectDTO";
import { ObjectModel } from "@/models/ObjectModel";
import { ObjectService } from "@/services/ObjectService";
import { Controller } from "@tsed/di";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import {
  Delete,
  Description,
  Get,
  Post,
  Put,
  Security,
  Status,
  Summary
} from "@tsed/schema";

@Controller("/objects")
@Authenticate("jwt", {
  session: false
})
@Security("jwt")
@Status(401)
export class ObjectController {
  constructor(private objectSvc: ObjectService) {}

  @Get()
  @Summary("Return all object models.")
  @Status(200, Array).Of(ObjectModel).Description("Success")
  async get() {
    return await this.objectSvc.getAll();
  }

  @Get("/:id")
  @Summary("Return a object by its ID.")
  @Status(200, ObjectModel).Description("Success")
  @Status(404).Description("Not Found")
  async getId(@PathParams("id") id: string) {
    const objModel = await this.objectSvc.find(id);

    if (!objModel) {
      throw new NotFound("Object model not found");
    }

    return objModel;
  }

  @Post()
  @Summary("Store new object")
  @Status(201, ObjectModel).Description("New model instance.")
  async post(
    @BodyParams() @Description("DTO to store new object") dto: NewObjectDTO
  ) {
    return this.objectSvc.create(dto);
  }

  @Put("/:id")
  @Summary("Update object model")
  @Status(204, String).Description("Updated")
  @Status(400).Description("`Id` parameter and model `_id` property mismatch.")
  @Status(404)
  async put(
    @PathParams("id") id: string,
    @BodyParams() @Description("Model update info.") model: ObjectModel
  ) {
    if (id !== model._id) {
      throw new BadRequest("Id parameter and model `Id` property mismatch.");
    }

    const count = this.objectSvc.update(model);

    if (!count) {
      throw new NotFound("Object model not found");
    }

    return;
  }

  @Delete("/:id")
  @Summary("Remove object model by ID.")
  @Status(204, String).Description("Deleted.")
  @Status(404).Description("Not Found")
  async delete(@PathParams("id") id: string) {
    const count = this.objectSvc.remove(id);

    if (!count) {
      throw new NotFound("Object model not found");
    }

    return;
  }
}
