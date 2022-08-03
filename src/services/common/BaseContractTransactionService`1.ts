import { ShapesEnum } from "@/common/ShapesEnum";
import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { ContractModel } from "@/models/ContractModel";
import { ValidationError } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

export abstract class BaseContractTransactionService<
  TTransact extends BaseContractTransactionModel
> extends BaseCRUDService<TTransact> {
  constructor(
    transactRepo: MongooseModel<TTransact>,
    private contractRepo: MongooseModel<ContractModel>
  ) {
    super(transactRepo);
  }

  async getByContract(contract: string): Promise<TTransact[]> {
    return (await this.repository.find({ contract })).map((d) => d.toClass());
  }

  /**
   * @throws {ValidationError} in case of non-existing contract ref.
   */
  async createForContract(contractId: string, dto: TTransact): Promise<TTransact> {
    await this.tryVerifyContractOrThrow(contractId, ShapesEnum.CRE);

    return (await this.repository.create(dto)).toClass();
  }

  /**
   * @throws {ValidationError} in case of non-existing contract ref.
   */
  async updateForContract(contractId: string, dto: TTransact) {
    await this.tryVerifyContractOrThrow(contractId, ShapesEnum.UPD);

    return (await this.repository.updateOne({ _id: dto._id }, dto)).matchedCount;
  }

  private async tryVerifyContractOrThrow(contractId: string, action: string) {
    const contractExist = await this.contractRepo.countDocuments({ _id: contractId }).exec();

    if (!contractExist) {
      throw new ValidationError(`Cannot ${action} transaction: unknown contract`);
    }
  }
}
