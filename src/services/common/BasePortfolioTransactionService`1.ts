import { AccountExistsInterceptor } from "@/interceptors/model-validation/AccountExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { BasePortfolioTransactionModel } from "@/models/BasePortfolioTransactionModel";
import { nameof } from "@/utils/nameof-helpers";
import { Intercept } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

const options: ExistenceInterceptorOpts = { key: nameof<BasePortfolioTransactionModel>("account") };

export abstract class BasePortfolioTransactionService<
  TTransact extends BasePortfolioTransactionModel
> extends BaseCRUDService<TTransact> {
  constructor(repository: MongooseModel<TTransact>) {
    super(repository);
  }

  @Intercept(AccountExistsInterceptor, options)
  async create(dto: Partial<TTransact>): Promise<TTransact> {
    return super.create(dto);
  }

  @Intercept(AccountExistsInterceptor, options)
  async update(dto: Partial<TTransact>): Promise<number> {
    return super.update(dto);
  }
}
