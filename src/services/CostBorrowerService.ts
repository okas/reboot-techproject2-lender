import { CostBorrowerModel } from "@/models/CostBorrowerModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

@Service()
export class CostBorrowerService extends BaseCRUDService<CostBorrowerModel> {
  constructor(@Inject(CostBorrowerModel) repository: MongooseModel<CostBorrowerModel>) {
    super(repository);
  }
}
