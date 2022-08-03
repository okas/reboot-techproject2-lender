import { AccountModel } from "@/models/AccountModel";
import { CostOperationModel } from "@/models/CostOperationModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCostService } from "./common/BaseCostService";

@Service()
export class CostOperationService extends BaseCostService<CostOperationModel> {
  constructor(
    @Inject(CostOperationModel) repository: MongooseModel<CostOperationModel>,
    @Inject(AccountModel) repoAccount: MongooseModel<AccountModel>
  ) {
    super(repository, repoAccount);
  }
}
