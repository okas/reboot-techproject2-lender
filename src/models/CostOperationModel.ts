import { getISODateAddDays } from "@/utils/date-helpers";
import { Model } from "@tsed/mongoose";
import { Default, Description, Example, Format, JsonFormatTypes, Required } from "@tsed/schema";
import { BaseCostModel } from "./BaseCostModel";

@Model({ discriminatorValue: "op" })
export class CostOperationModel extends BaseCostModel {
  @Description("Period start. TODO: other prop validation!")
  @Example(getISODateAddDays())
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  periodStart: Date;

  @Description("Period end. TODO: other prop validation!")
  @Example(getISODateAddDays())
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  periodEnd: Date;
}
