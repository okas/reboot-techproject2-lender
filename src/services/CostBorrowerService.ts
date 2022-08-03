import { AccountModel } from "@/models/AccountModel";
import { CostBorrowerModel } from "@/models/CostBorrowerModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCostService } from "./common/BaseCostService";

@Service()
export class CostBorrowerService extends BaseCostService<CostBorrowerModel> {
  constructor(
    @Inject(CostBorrowerModel) repository: MongooseModel<CostBorrowerModel>,
    @Inject(AccountModel) repoAccount: MongooseModel<AccountModel>
  ) {
    super(repository, repoAccount);
  }
}
