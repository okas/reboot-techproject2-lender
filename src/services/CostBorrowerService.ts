import { ShapesEnum } from "@/common/ShapesEnum";
import { AccountModel } from "@/models/AccountModel";
import { CostBorrowerModel } from "@/models/CostBorrowerModel";
import { UserModel } from "@/models/UserModel";
import { ValidationError } from "@tsed/common";
import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCostService } from "./common/BaseCostService";

@Service()
export class CostBorrowerService extends BaseCostService<CostBorrowerModel> {
  constructor(
    @Inject(CostBorrowerModel) repository: MongooseModel<CostBorrowerModel>,
    @Inject(AccountModel) repoAccount: MongooseModel<AccountModel>,
    @Inject(UserModel) private repoUser: MongooseModel<UserModel>
  ) {
    super(repository, repoAccount);
  }

  async create(dto: CostBorrowerModel): Promise<CostBorrowerModel> {
    await this.tryVerifyBorrowerOrThrow(dto.borrower.toString(), ShapesEnum.CRE);

    return super.create(dto);
  }

  async update(dto: CostBorrowerModel): Promise<number> {
    await this.tryVerifyBorrowerOrThrow(dto.borrower.toString(), ShapesEnum.UPD);

    return super.update(dto);
  }

  private async tryVerifyBorrowerOrThrow(_id: string, action: string) {
    const borrowerExist = await this.repoUser.countDocuments({ _id }).exec();

    if (!borrowerExist) {
      throw new ValidationError(`Cannot ${action} cost: unknown borrower.`);
    }
  }
}
