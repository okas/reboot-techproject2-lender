import { CostOperationModel } from "@/models/CostOperationModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCostService } from "./common/BaseCostService";

@Service()
export class CostOperationService extends BaseCostService<CostOperationModel> {
  constructor(@Inject(CostOperationModel) repo: MongooseModel<CostOperationModel>) {
    super(repo);
  }
}
