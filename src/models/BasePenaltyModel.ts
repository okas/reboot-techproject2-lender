import { DiscriminatorKey, Model, Trim, Unique } from "@tsed/mongoose";
import {
  Default,
  Description,
  Example,
  Ignore,
  MaxLength,
  MinLength,
  Nullable,
  Required
} from "@tsed/schema";
import { BaseHasId } from "./common/BaseHasId";

@Model({ collection: "penalties" })
export abstract class BasePenaltyModel extends BaseHasId {
  @Description("Penalty or reason for given violation.")
  @Example("")
  @Required()
  @MinLength(2)
  @MaxLength(50)
  @Trim()
  @Unique()
  name: string;

  @Description("Non-active penalty cannot be applied to nev Contract Violations.")
  @Required()
  @Default(true)
  active: boolean;

  @Description("Comments")
  @Example("if there is something to say")
  @Required(false)
  @Nullable(String)
  @MaxLength(100)
  @Trim()
  comments?: string;

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}
