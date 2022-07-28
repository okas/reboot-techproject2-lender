import { ContractViolationModel } from "@/models/ContractViolationModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

@Service()
export class ContractViolationService extends BaseCRUDService<ContractViolationModel> {
  constructor(@Inject(ContractViolationModel) repository: MongooseModel<ContractViolationModel>) {
    super(repository);
  }
}
