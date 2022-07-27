import { ShapesEnum } from "@/common/ShapesEnum";
import { ObjectID } from "@tsed/mongoose";
import { Groups } from "@tsed/schema";

/**
 * @classdesc Common base with only `_id` that is titled to `id` and has `ShapesEnum.nCRE` groups decoration.
 */
export abstract class BaseId {
  @Groups(ShapesEnum.nCRE)
  @ObjectID("id")
  _id: string;
}
