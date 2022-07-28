import { Model } from "@tsed/mongoose";
import { BasePortfolioTransactionModel } from "./BasePortfolioTransactionModel";

@Model({ discriminatorValue: "credit" })
export class CreditPortfolioTransactionModel extends BasePortfolioTransactionModel {}
