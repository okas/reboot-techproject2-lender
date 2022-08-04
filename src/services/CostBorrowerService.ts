import { BorrowerExistsInterceptor } from "@/interceptors/model-validation/BorrowerExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { CostBorrowerModel } from "@/models/CostBorrowerModel";
import { nameof } from "@/utils/nameof-helpers";
import { Inject, Intercept, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCostService } from "./common/BaseCostService";

const options: ExistenceInterceptorOpts = { key: nameof<CostBorrowerModel>("borrower") };

@Service()
export class CostBorrowerService extends BaseCostService<CostBorrowerModel> {
  constructor(@Inject(CostBorrowerModel) repo: MongooseModel<CostBorrowerModel>) {
    super(repo);
  }

  @Intercept(BorrowerExistsInterceptor, options)
  async create(dto: Partial<CostBorrowerModel>): Promise<CostBorrowerModel> {
    return super.create(dto);
  }

  @Intercept(BorrowerExistsInterceptor, options)
  async update(dto: Partial<CostBorrowerModel>): Promise<number> {
    return super.update(dto);
  }
}
