import { ContractExistsInterceptor } from "@/interceptors/model-validation/ContractExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { ContractViolationModel } from "@/models/ContractViolationModel";
import { nameof } from "@/utils/nameof-helpers";
import { Inject, Intercept, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

const options: ExistenceInterceptorOpts = { key: nameof<ContractViolationModel>("contract") };

@Service()
export class ContractViolationService extends BaseCRUDService<ContractViolationModel> {
  constructor(@Inject(ContractViolationModel) repo: MongooseModel<ContractViolationModel>) {
    super(repo);
  }

  @Intercept(ContractExistsInterceptor, options)
  async create(dto: Partial<ContractViolationModel>): Promise<ContractViolationModel> {
    return (await this.repo.create(dto)).toClass();
  }

  @Intercept(ContractExistsInterceptor, options)
  async update(dto: Partial<ContractViolationModel>): Promise<number> {
    return (await this.repo.updateOne({ _id: dto._id }, dto)).matchedCount;
  }
}
