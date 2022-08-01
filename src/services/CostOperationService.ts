import { CostOperationModel } from "@/models/CostOperationModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

@Service()
export class CostOperationService extends BaseCRUDService<CostOperationModel> {
  constructor(@Inject(CostOperationModel) repository: MongooseModel<CostOperationModel>) {
    super(repository);
  }
}
