import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { ContractModel } from "@/models/ContractModel";
import { Inject, Service } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

@Service()
export class ContractTransactionService extends BaseCRUDService<BaseContractTransactionModel> {
  constructor(
    @Inject(BaseContractTransactionModel)
    transactRepo: MongooseModel<BaseContractTransactionModel>,
    @Inject(ContractModel) private contractRepo: MongooseModel<ContractModel>
  ) {
    super(transactRepo);
  }

  async getByContract(contract: string) {
    return (await this.repository.find({ contract })).map((d) => d.toClass());
  }

  async createForContract(
    contractId: string,
    dto: BaseContractTransactionModel
  ): Promise<BaseContractTransactionModel> {
    await this.tryVerifyContractOrThrow(contractId, "create");

    return (await this.repository.create(dto)).toClass();
  }

  async updateForContract(
    contractId: string,
    dto: BaseContractTransactionModel
  ): Promise<number> {
    await this.tryVerifyContractOrThrow(contractId, "update");

    return (await this.repository.updateOne({ _id: dto._id }, dto))
      .matchedCount;
  }

  private async tryVerifyContractOrThrow(contractId: string, action: string) {
    const contractExist = await this.contractRepo
      .countDocuments({ _id: contractId })
      .exec();

    if (!contractExist) {
      throw new NotFound(`Cannot ${action} transaction: unknown contract`);
    }
  }
}
