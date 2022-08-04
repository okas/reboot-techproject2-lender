import { ContractModel } from "@/models/ContractModel";
import { Inject, Interceptor } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseRefExistsInterceptor } from "./BaseRefExistsInterceptor`2";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

@Interceptor()
export class ContractExistsInterceptor extends BaseRefExistsInterceptor<
  ContractModel,
  ExistenceInterceptorOpts
> {
  constructor(@Inject(ContractModel) repo: MongooseModel<ContractModel>) {
    super(repo);
  }
}
