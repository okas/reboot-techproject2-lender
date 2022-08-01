import { getISODateAddDays } from "@/utils/date-helpers";
import { Decimal128, Model, NumberDecimal, Ref, Trim } from "@tsed/mongoose";
import {
  Default,
  Description,
  Example,
  Format,
  JsonFormatTypes,
  MaxLength,
  Min,
  MinLength,
  Required
} from "@tsed/schema";
import { AccountModel } from "./AccountModel";
import { HasDiscriminator } from "./common/HasDiscriminator";

@Model({ collection: "business-costs" })
export class BaseCostModel extends HasDiscriminator {
  @Description("Date")
  @Example(getISODateAddDays())
  @Required()
  @Default(Date.now)
  @Format(JsonFormatTypes.DATE)
  date: Date;

  @Description("Cost amount.")
  @Example(10)
  @Required()
  @NumberDecimal()
  @Min(0, true)
  amount: Decimal128;

  @Description("Description.")
  @Example("Digital document signing service")
  @Required()
  @MinLength(2)
  @MaxLength(100)
  @Trim()
  description: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;
}
