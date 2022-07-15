import { Description, Example, Integer, Required } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model({ name: "object" })
export class ObjectModel {
  @ObjectID()
  _id: string;

  @Description("It is a name property.")
  @Example("test name val")
  @Required()
  name: string;

  @Description("It is a count property.")
  @Required()
  @Integer()
  count: number;
}
