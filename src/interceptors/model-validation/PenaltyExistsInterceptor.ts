import { BasePenaltyModel } from "@/models/BasePenaltyModel";
import { Inject, Interceptor } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseRefExistsInterceptor } from "./BaseRefExistsInterceptor`2";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

@Interceptor()
export class PenaltyExistsInterceptor extends BaseRefExistsInterceptor<
  BasePenaltyModel,
  ExistenceInterceptorOpts
> {
  constructor(@Inject(BasePenaltyModel) repo: MongooseModel<BasePenaltyModel>) {
    super(repo);
  }
}
