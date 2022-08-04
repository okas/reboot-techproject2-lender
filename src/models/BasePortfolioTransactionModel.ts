import { AccountModel } from "@/models/AccountModel";
import { DiscriminatorKey, Model, Ref, Trim } from "@tsed/mongoose";
import { Description, Example, Ignore, MaxLength, MinLength, Required } from "@tsed/schema";
import { BaseTransaction } from "./common/BaseTransaction";

@Model({ collection: "portfolio-transactions" })
export abstract class BasePortfolioTransactionModel extends BaseTransaction {
  @Description("Other party of transaction.")
  @Example("Arbitrary descriptor")
  @Required()
  @MinLength(2)
  @MaxLength(50)
  @Trim()
  channel: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}
