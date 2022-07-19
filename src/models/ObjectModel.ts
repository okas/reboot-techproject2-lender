import { Model } from "@tsed/mongoose";
import { Description, Example, Integer, Required } from "@tsed/schema";
import { ModelBase } from "./ModelBase";

@Model({ name: "object" })
@Description("This is dummy model for testing.")
export class ObjectModel extends ModelBase {
  @Description("It is a name property.")
  @Example("test name val")
  @Required()
  name: string;

  @Description("It is a count property.")
  @Required()
  @Integer()
  count: number;
}
