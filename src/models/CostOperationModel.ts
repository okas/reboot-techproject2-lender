import { ValidationError } from "@tsed/common";
import { InternalServerError } from "@tsed/exceptions";
import { Model } from "@tsed/mongoose";
import { Description, Example, Format, JsonFormatTypes, Nullable } from "@tsed/schema";
import { BaseCostModel } from "./BaseCostModel";

@Model({
  discriminatorValue: "op-cost",
  pre: [
    // { method: "findOneAndUpdate", fn: CostOperationModel.validateHook },
    { method: "validate", fn: CostOperationModel.validateHook },
    { method: "updateOne", fn: CostOperationModel.updateOneHook }
  ]
})
export class CostOperationModel extends BaseCostModel {
  @Description("Period start, if set then `periodEnd` must be set as well.")
  @Example(Date.now)
  @Nullable(Date)
  @Format(JsonFormatTypes.DATE)
  periodStart?: Date;

  @Description("Period end, if set then `periodStart` must be set as well.")
  @Example(Date.now)
  @Nullable(Date)
  @Format(JsonFormatTypes.DATE)
  periodEnd?: Date;

  static async updateOneHook({ _update }: { _update: CostOperationModel }) {
    if (!_update) {
      throw new InternalServerError(
        "Validation failure: updateOne hook didn't receive expected object to validate."
      );
    }

    return CostOperationModel.validateHook(_update);
  }

  static async validateHook({ periodStart, periodEnd }: CostOperationModel) {
    if (!periodStart && !periodEnd) {
      return;
    }

    if (!periodStart || !periodEnd) {
      throw new ValidationError("If period is need, both start and end must be specified.");
    }

    if (periodStart > periodEnd) {
      throw new ValidationError("Start period cannot be later than end period.");
    }
  }
}
