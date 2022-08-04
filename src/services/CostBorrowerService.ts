import { BorrowerExistsInterceptor } from "@/interceptors/model-validation/BorrowerExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { CostBorrowerModel } from "@/models/CostBorrowerModel";
import { nameofFactory } from "@/utils/nameof-helpers";
import { Inject, Intercept, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCostService } from "./common/BaseCostService";

const nameofCost = nameofFactory<CostBorrowerModel>();

@Service()
export class CostBorrowerService extends BaseCostService<CostBorrowerModel> {
  constructor(@Inject(CostBorrowerModel) repo: MongooseModel<CostBorrowerModel>) {
    super(repo);
  }

  @Intercept(BorrowerExistsInterceptor, {
    key: nameofCost("borrower")
  } as ExistenceInterceptorOpts)
  async create(dto: CostBorrowerModel): Promise<CostBorrowerModel> {
    return super.create(dto);
  }

  @Intercept(BorrowerExistsInterceptor, {
    key: nameofCost("borrower")
  } as ExistenceInterceptorOpts)
  async update(dto: CostBorrowerModel): Promise<number> {
    return super.update(dto);
  }
}
