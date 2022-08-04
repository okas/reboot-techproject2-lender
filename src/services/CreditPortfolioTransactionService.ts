import { CreditPortfolioTransactionModel } from "@/models/CreditPortfolioTransactionModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BasePortfolioTransactionService } from "./common/BasePortfolioTransactionService`1";

@Service()
export class CreditPortfolioTransactionService extends BasePortfolioTransactionService<CreditPortfolioTransactionModel> {
  constructor(
    @Inject(CreditPortfolioTransactionModel) repo: MongooseModel<CreditPortfolioTransactionModel>
  ) {
    super(repo);
  }
}
