import { ValidationError } from "@tsed/common";
import { Model } from "@tsed/mongoose";
import { Default, Description, Example, Format, JsonFormatTypes, Required } from "@tsed/schema";
import { BaseCostModel } from "./BaseCostModel";

@Model({
  discriminatorValue: "op-cost",
  pre: [
    { method: "validate", fn: CostOperationModel.validateHook },
    { method: "findOneAndUpdate", fn: CostOperationModel.validateHook },
    { method: "updateOne", fn: CostOperationModel.validateHook }
  ]
})
export class CostOperationModel extends BaseCostModel {
  @Description("Period start.")
  @Example(Date.now)
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  periodStart: Date;

  @Description("Period end.")
  @Example(Date.now)
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  periodEnd: Date;

  static async validateHook({ periodStart, periodEnd }: CostOperationModel) {
    if (periodStart > periodEnd) {
      throw new ValidationError("Start period cannot be later than end period.");
    }
  }
}
