import { Decimal128, Model, NumberDecimal } from "@tsed/mongoose";
import { Description, Example, Min, Required } from "@tsed/schema";
import { BasePenaltyModel } from "./PenaltyModel";

@Model({ discriminatorValue: "fix" })
@Description("`Fix amount` kind of penalty.")
export class FixAmountPenaltyModel extends BasePenaltyModel {
  @Description("The amount that will be added to the total amount owed.")
  @Example(10)
  @Required()
  @NumberDecimal()
  @Min(0, true)
  amount: Decimal128;
}
