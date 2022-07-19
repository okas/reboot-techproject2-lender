import { ObjectID } from "@tsed/mongoose";
import { Groups } from "@tsed/schema";

/**
 * Common base with only `_id` that is titled to `id` and has `!creation` groups decoration.
 */
export class ModelBase {
  @Groups("!creation")
  @ObjectID("id")
  _id: string;
}