import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ContractModel } from "../models/ContractModel";
import { BaseCRUDService } from "./BaseCRUDService`1";

@Service()
export class ContractService extends BaseCRUDService<ContractModel> {
  constructor(@Inject(ContractModel) model: MongooseModel<ContractModel>) {
    super(model);
  }
}
