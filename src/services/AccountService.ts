import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { AccountModel } from "../models/AccountModel";
import { BaseCRUDService } from "./common/BaseCRUDService`1";

@Service()
export class AccountService extends BaseCRUDService<AccountModel> {
  constructor(@Inject(AccountModel) repository: MongooseModel<AccountModel>) {
    super(repository);
  }
}
