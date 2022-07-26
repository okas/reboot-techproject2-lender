import { Decimal128, Model, NumberDecimal } from "@tsed/mongoose";
import { Description, Example, Min, Required } from "@tsed/schema";
import { BasePenaltyModel } from "./PenaltyModel";

@Model({ discriminatorValue: "rateOfBase" })
@Description("`Rate` kind of penalty, based on loaned base amount.")
export class RateOfBasePenaltyModel extends BasePenaltyModel {
  @Description("The rate against loan base amount.")
  @Example(10)
  @Required()
  @NumberDecimal()
  @Min(0, true)
  rate: Decimal128;
}
