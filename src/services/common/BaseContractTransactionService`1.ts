import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { BaseContractTransactionModel } from "@/models/BaseContractTransactionModel";
import { nameof } from "@/utils/nameof-helpers";
import { Intercept } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ContractExistsInterceptor } from "../../interceptors/model-validation/ContractExistsInterceptor";
import { BaseCRUDService } from "./BaseCRUDService`1";

const options: ExistenceInterceptorOpts = { key: nameof<BaseContractTransactionModel>("contract") };

export abstract class BaseContractTransactionService<
  TTransact extends BaseContractTransactionModel
> extends BaseCRUDService<TTransact> {
  constructor(transactRepo: MongooseModel<TTransact>) {
    super(transactRepo);
  }

  async getByContract(contract: string): Promise<TTransact[]> {
    return (await this.repo.find({ contract })).map((d) => d.toClass());
  }

  @Intercept(ContractExistsInterceptor, options)
  async create(dto: Partial<TTransact>): Promise<TTransact> {
    return (await this.repo.create(dto)).toClass();
  }

  @Intercept(ContractExistsInterceptor, options)
  async update(dto: Partial<TTransact>): Promise<number> {
    return (await this.repo.updateOne({ _id: dto._id }, dto)).matchedCount;
  }
}
