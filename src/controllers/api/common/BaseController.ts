import { BaseHasId } from "@/models/common/BaseHasId";
import { OASDocs } from "@/utils/OASDocs";
import { BadRequest } from "@tsed/exceptions";

export abstract class BaseController {
  protected static assertPutFixIfPossible<TModel extends BaseHasId>(id: string, dto: TModel) {
    if (!dto._id) {
      dto._id = id;
    } else if (id !== dto._id) {
      throw new BadRequest(OASDocs.STATUS_400_ID_MISMATCH);
    }
  }
}
