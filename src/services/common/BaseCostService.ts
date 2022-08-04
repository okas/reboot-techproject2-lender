import { AccountExistsInterceptor } from "@/interceptors/model-validation/AccountExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { BaseCostModel } from "@/models/BaseCostModel";
import { BasePortfolioTransactionModel } from "@/models/BasePortfolioTransactionModel";
import { nameof } from "@/utils/nameof-helpers";
import { Intercept } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./BaseCRUDService`1";

const options: ExistenceInterceptorOpts = { key: nameof<BasePortfolioTransactionModel>("account") };

export abstract class BaseCostService<TCost extends BaseCostModel> extends BaseCRUDService<TCost> {
  constructor(repo: MongooseModel<TCost>) {
    super(repo);
  }

  @Intercept(AccountExistsInterceptor, options)
  async create(dto: Partial<TCost>): Promise<TCost> {
    return super.create(dto);
  }

  @Intercept(AccountExistsInterceptor, options)
  async update(dto: Partial<TCost>): Promise<number> {
    return super.update(dto);
  }
}
