import { AccountExistsInterceptor } from "@/interceptors/model-validation/AccountExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { BaseCostModel } from "@/models/BaseCostModel";
import { BasePortfolioTransactionModel } from "@/models/BasePortfolioTransactionModel";
import { Intercept } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

export abstract class BaseCostService<TCost extends BaseCostModel> extends BaseCRUDService<TCost> {
  constructor(repo: MongooseModel<TCost>) {
    super(repo);
  }

  @Intercept(AccountExistsInterceptor, {
    key: "account" as keyof BasePortfolioTransactionModel
  } as ExistenceInterceptorOpts)
  async create(dto: TCost): Promise<TCost> {
    return super.create(dto);
  }

  @Intercept(AccountExistsInterceptor, {
    key: "account" as keyof BasePortfolioTransactionModel
  } as ExistenceInterceptorOpts)
  async update(dto: TCost): Promise<number> {
    return super.update(dto);
  }
}
