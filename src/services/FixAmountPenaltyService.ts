import { FixAmountPenaltyModel } from "@/models/FixAmountPenaltyModel";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class FixAmountPenaltyService extends BaseCRUDService<FixAmountPenaltyModel> {
  constructor(@Inject(FixAmountPenaltyModel) repository: MongooseModel<FixAmountPenaltyModel>) {
    super(repository);
  }
}
