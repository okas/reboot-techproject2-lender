import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ContractModel } from "../models/ContractModel";
import { CRUDServiceBase } from "./CRUDServiceBase`1";

@Service()
export class ContractService extends CRUDServiceBase<ContractModel> {
  constructor(@Inject(ContractModel) model: MongooseModel<ContractModel>) {
    super(model);
  }
}
