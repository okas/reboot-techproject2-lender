import { AccountModel } from "@/models/AccountModel";
import { Model, Ref } from "@tsed/mongoose";
import { Description, Required } from "@tsed/schema";
import { CommonTransaction } from "./common/CommonTransaction";

@Model({ collection: "portfolio-transactions" })
export abstract class BasePortfolioTransactionModel extends CommonTransaction {
  channel: string;

  @Description("Account reference")
  @Required()
  @Ref(AccountModel)
  account: Ref<AccountModel>;
}
