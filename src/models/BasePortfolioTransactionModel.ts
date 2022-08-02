import { AccountModel } from "@/models/AccountModel";
import { DiscriminatorKey, Model, Ref } from "@tsed/mongoose";
import { Description, Ignore, Required } from "@tsed/schema";
import { CommonTransaction } from "./common/CommonTransaction";

@Model({ collection: "portfolio-transactions" })
export abstract class BasePortfolioTransactionModel extends CommonTransaction {
  channel: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;

  @Ignore()
  @DiscriminatorKey()
  __t: string;
}
