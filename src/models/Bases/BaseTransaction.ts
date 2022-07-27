import { getISODateAddDays } from "@/utils/date-helpers";
import { NumberDecimal, Trim } from "@tsed/mongoose";
import {
  Default,
  Description,
  Example,
  Format,
  JsonFormatTypes,
  MaxLength,
  Min,
  Nullable,
  Required
} from "@tsed/schema";
import { Decimal128 } from "mongoose";
import { BaseDiscriminator } from "./BaseDiscriminator";

export abstract class BaseTransaction extends BaseDiscriminator {
  @Description("Date")
  @Example(getISODateAddDays())
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  date: Date;

  @Description("Amount")
  @Example("50.0")
  @Required()
  @NumberDecimal()
  @Min(0, true)
  amount: Decimal128;

  @Description("Transaction fees (if applicable)")
  @Example("0.5")
  @Required(false)
  @NumberDecimal()
  @Nullable(Number)
  @Min(0)
  cost: Decimal128;

  @Description("Comments")
  @Example("if there is something to say")
  @Required(false)
  @Nullable(String)
  @MaxLength(100)
  @Trim()
  comments?: string;
}
