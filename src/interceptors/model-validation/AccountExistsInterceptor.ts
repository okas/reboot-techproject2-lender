import { AccountModel } from "@/models/AccountModel";
import { Inject, Interceptor } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseRefExistsInterceptor } from "./BaseRefExistsInterceptor";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

@Interceptor()
export class AccountExistsInterceptor extends BaseRefExistsInterceptor<
  AccountModel,
  ExistenceInterceptorOpts
> {
  constructor(@Inject(AccountModel) repo: MongooseModel<AccountModel>) {
    super(repo);
  }

  getErrorMessage = (action: string): string => `Cannot ${action}: unknown account.`;
}
