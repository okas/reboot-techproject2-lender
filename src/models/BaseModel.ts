import { ShapesEnum } from "@/common/modelShaping";
import { ObjectID } from "@tsed/mongoose";
import { Groups } from "@tsed/schema";

/**
 * Common base with only `_id` that is titled to `id` and has `!creation` groups decoration.
 */
export abstract class BaseModel {
  @Groups(ShapesEnum.nCRE)
  @ObjectID("id")
  _id: string;
}
