import { Decimal128, DiscriminatorKey, Model, NumberDecimal, Ref, Trim } from "@tsed/mongoose";
import {
  Default,
  Description,
  Example,
  Format,
  Ignore,
  JsonFormatTypes,
  MaxLength,
  Min,
  MinLength,
  Required
} from "@tsed/schema";
import { AccountModel } from "./AccountModel";
import { HasId } from "./common/HasId";

@Model({ collection: "business-costs" })
export class BaseCostModel extends HasId {
  @Description("Date")
  @Example(Date.now)
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

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}
