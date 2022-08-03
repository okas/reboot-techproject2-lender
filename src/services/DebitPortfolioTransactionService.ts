import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { DebitPortfolioTransactionModel } from "../models/DebitPortfolioTransactionModel";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class DebitPortfolioTransactionService extends BaseCRUDService<DebitPortfolioTransactionModel> {
  constructor(
    @Inject(DebitPortfolioTransactionModel)
    repository: MongooseModel<DebitPortfolioTransactionModel>
  ) {
    super(repository);
  }
}
