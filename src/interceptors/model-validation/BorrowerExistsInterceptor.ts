import { UserModel } from "@/models/UserModel";
import { Inject, Interceptor } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BaseRefExistsInterceptor } from "./BaseRefExistsInterceptor";
import { ExistenceInterceptorOpts } from "./ExistenceInterceptorOpts";

@Interceptor()
export class BorrowerExistsInterceptor extends BaseRefExistsInterceptor<
  UserModel,
  ExistenceInterceptorOpts
> {
  constructor(@Inject(UserModel) repo: MongooseModel<UserModel>) {
    super(repo);
  }

  getErrorMessage = (action: string): string => `Cannot ${action}: unknown borrower.`;
}
