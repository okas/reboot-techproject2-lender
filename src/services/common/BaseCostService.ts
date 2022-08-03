import { ShapesEnum } from "@/common/ShapesEnum";
import { AccountModel } from "@/models/AccountModel";
import { BaseCostModel } from "@/models/BaseCostModel";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

export abstract class BaseCostService<TCost extends BaseCostModel> extends BaseCRUDService<TCost> {
  constructor(repo: MongooseModel<TCost>, private repoAccount: MongooseModel<AccountModel>) {
    super(repo);
  }

  async create(dto: TCost): Promise<TCost> {
    await this.tryVerifyAccountOrThrow(dto.account.toString(), ShapesEnum.CRE);

    return super.create(dto);
  }

  async update(dto: TCost): Promise<number> {
    await this.tryVerifyAccountOrThrow(dto.account.toString(), ShapesEnum.UPD);

    return super.update(dto);
  }

  private async tryVerifyAccountOrThrow(_id: string, action: string) {
    const accountExist = await this.repoAccount.countDocuments({ _id }).exec();

    if (!accountExist) {
      throw new NotFound(`Cannot ${action} cost: unknown account.`);
    }
  }
}
