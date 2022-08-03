import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { RateOfBasePenaltyModel } from "../models/RateOfBasePenaltyModel";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class RateOfBaseService extends BaseCRUDService<RateOfBasePenaltyModel> {
  constructor(@Inject(RateOfBasePenaltyModel) repository: MongooseModel<RateOfBasePenaltyModel>) {
    super(repository);
  }
}
