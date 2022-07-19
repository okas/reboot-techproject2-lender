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

@Schema({ name: "payment" })
@Description("Embedded to Contract")
export class PaymentModel {
  @Description("Effective date")
  @Example("2022-01-01")
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  dueDate: Date;

  @Description("Base amount per payment")
  @Example("50")
  @Required()
  @NumberDecimal()
  @Min(0)
  amount: Decimal128;

  @Description("Interest amount per payment")
  @Example("12.5")
  @Required()
  @NumberDecimal()
  @Min(0)
  interest: Decimal128;

  @Description("Extra fees per payment (if applicable)")
  @Example("0.45")
  @Required(false)
  @NumberDecimal()
  @Nullable(Number)
  @Min(0)
  extras?: Decimal128;
}
