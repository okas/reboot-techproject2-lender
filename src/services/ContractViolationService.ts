import { ContractExistsInterceptor } from "@/interceptors/model-validation/ContractExistsInterceptor";
import { ExistenceInterceptorOpts } from "@/interceptors/model-validation/ExistenceInterceptorOpts";
import { PenaltyExistsInterceptor } from "@/interceptors/model-validation/PenaltyExistsInterceptor";
import { ContractViolationModel } from "@/models/ContractViolationModel";
import { nameofFactory } from "@/utils/nameof-helpers";
import { Inject, Intercept, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

const nameof = nameofFactory<ContractViolationModel>();

const contractOptions: ExistenceInterceptorOpts = { key: nameof("contract") };
const penaltyOptions: ExistenceInterceptorOpts = { key: nameof("penalty") };

@Service()
export class ContractViolationService extends BaseCRUDService<ContractViolationModel> {
  constructor(@Inject(ContractViolationModel) repo: MongooseModel<ContractViolationModel>) {
    super(repo);
  }

  @Intercept(PenaltyExistsInterceptor, penaltyOptions)
  @Intercept(ContractExistsInterceptor, contractOptions)
  async create(dto: Partial<ContractViolationModel>): Promise<ContractViolationModel> {
    return (await this.repo.create(dto)).toClass();
  }

  @Intercept(PenaltyExistsInterceptor, penaltyOptions)
  @Intercept(ContractExistsInterceptor, contractOptions)
  async update(dto: Partial<ContractViolationModel>): Promise<number> {
    return (await this.repo.updateOne({ _id: dto._id }, dto)).matchedCount;
  }
}
