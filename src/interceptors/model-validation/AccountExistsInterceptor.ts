import { AccountModel } from "@/models/AccountModel";
import { Inject, Interceptor } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseRefExistsInterceptor } from "./BaseRefExistsInterceptor`2";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

@Interceptor()
export class AccountExistsInterceptor extends BaseRefExistsInterceptor<
  AccountModel,
  ExistenceInterceptorOpts
> {
  constructor(@Inject(AccountModel) repo: MongooseModel<AccountModel>) {
    super(repo);
  }
}
