import { getISODateAddDays } from "@/utils/date-helpers";
import { Decimal128, NumberDecimal, Schema } from "@tsed/mongoose";
import {
  Default,
  Description,
  Example,
  Format,
  JsonFormatTypes,
  Min,
  Nullable,
  Required
} from "@tsed/schema";

@Schema({ name: "payment", _id: false })
@Description("Embedded to Contract")
export class PaymentModel {
  @Description("Effective date")
  @Example(getISODateAddDays())
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  dueDate: Date;

  @Description("Base amount per payment")
  @Example("50.0")
  @Required()
  @NumberDecimal()
  @Min(0)
  amount: Decimal128;

  @Description("Interest amount per payment")
  @Example("15.5")
  @Required()
  @NumberDecimal()
  @Min(0)
  interest: Decimal128;

  @Description("Extra fees per payment (if applicable)")
  @Example("0.5")
  @Required(false)
  @NumberDecimal()
  @Nullable(Number)
  @Min(0)
  extra?: Decimal128;
}
