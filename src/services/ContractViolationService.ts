import { ContractViolationModel } from "@/models/ContractViolationModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class ContractViolationService extends BaseCRUDService<ContractViolationModel> {
  constructor(@Inject(ContractViolationModel) repo: MongooseModel<ContractViolationModel>) {
    super(repo);
  }
}
