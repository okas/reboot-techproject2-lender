import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { CreditPortfolioTransactionModel } from "../models/CreditPortfolioTransactionModel";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class CreditPortfolioTransactionService extends BaseCRUDService<CreditPortfolioTransactionModel> {
  constructor(
    @Inject(CreditPortfolioTransactionModel)
    repository: MongooseModel<CreditPortfolioTransactionModel>
  ) {
    super(repository);
  }
}
