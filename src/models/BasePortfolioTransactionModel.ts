import { AccountModel } from "@/models/AccountModel";
import { Model, Ref } from "@tsed/mongoose";
import { Description, Required } from "@tsed/schema";
import { BaseTransaction } from "./Bases/BaseTransaction";

@Model({ collection: "portfolio-transactions" })
export abstract class BasePortfolioTransactionModel extends BaseTransaction {
  channel: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;
}
