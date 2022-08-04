import { DebitPortfolioTransactionModel } from "@/models/DebitPortfolioTransactionModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BasePortfolioTransactionService } from "./common/BasePortfolioTransactionService`1";

@Service()
export class DebitPortfolioTransactionService extends BasePortfolioTransactionService<DebitPortfolioTransactionModel> {
  constructor(
    @Inject(DebitPortfolioTransactionModel)
    repository: MongooseModel<DebitPortfolioTransactionModel>
  ) {
    super(repository);
  }
}
