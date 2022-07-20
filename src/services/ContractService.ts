import { ContractModel } from "@/models/ContractModel";
import { UserModel } from "@/models/UserModel";
import { Inject, Service } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

@Service()
export class ContractService extends BaseCRUDService<ContractModel> {
  constructor(
    @Inject(ContractModel) contractModel: MongooseModel<ContractModel>,
    @Inject(UserModel) private userModel: MongooseModel<UserModel>
  ) {
    super(contractModel);
  }

  async create(dto: ContractModel): Promise<ContractModel> {
    const userDoc = (
      await this.userModel
        .findOne({
          $or: [
            { personCode1: dto.borrowerPersonCode },
            { personCode2: dto.borrowerPersonCode }
          ]
        })
        .select({ _id: true })
        .exec()
    )?.toClass();

    if (!userDoc?._id) {
      throw new NotFound(
        "Cannot create contract: unknown borrower",
        "ContractService"
      );
    }

    dto.borrowerId = userDoc._id;

    return super.create(dto);
  }
}
