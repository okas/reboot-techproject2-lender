import { AccountExistsInterceptor } from "@/interceptors/model-validation/AccountExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { BasePortfolioTransactionModel } from "@/models/BasePortfolioTransactionModel";
import { Intercept } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

export abstract class BasePortfolioTransactionService<
  TTransact extends BasePortfolioTransactionModel
> extends BaseCRUDService<TTransact> {
  constructor(repository: MongooseModel<TTransact>) {
    super(repository);
  }

  @Intercept(AccountExistsInterceptor, {
    key: "account" as keyof BasePortfolioTransactionModel
  } as ExistenceInterceptorOpts)
  async create(dto: Partial<TTransact>): Promise<TTransact> {
    return super.create(dto);
  }

  @Intercept(AccountExistsInterceptor, {
    key: "account" as keyof BasePortfolioTransactionModel
  } as ExistenceInterceptorOpts)
  async update(dto: Partial<TTransact>): Promise<number> {
    return super.update(dto);
  }
}
