import { Model } from "@tsed/mongoose";
import { BasePortfolioTransactionModel } from "./BasePortfolioTransactionModel";

@Model({ discriminatorValue: "debit-portfolio" })
export class DebitPortfolioTransactionModel extends BasePortfolioTransactionModel {}
