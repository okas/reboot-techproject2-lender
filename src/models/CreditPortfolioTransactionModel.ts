import { Model } from "@tsed/mongoose";
import { BasePortfolioTransactionModel } from "./BasePortfolioTransactionModel";

@Model({ discriminatorValue: "credit-portfolio" })
export class CreditPortfolioTransactionModel extends BasePortfolioTransactionModel {}
