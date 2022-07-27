import { Model } from "@tsed/mongoose";
import { BasePortfolioTransactionModel } from "./BasePortfolioTransactionModel";

@Model({ discriminatorValue: "debit" })
export class DebitPortfolioTransactionModel extends BasePortfolioTransactionModel {}
